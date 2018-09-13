package facephi.plugin.widget;

import android.graphics.Bitmap;
import android.util.Base64;
import com.facephi.FPhiWidgetAndroid.library.FPhiImage;
import com.facephi.FPhiWidgetAndroid.library.WidgetResult;
import com.facephi.FPhiWidgetAndroid.library.WidgetExceptionType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

/**
 * @description Encapsulates the User Control Result.
 */
public class OutputBundle {

    public int _finishStatus = 1;

    public int _errorDiagnostic = 2;

    public int _livenessDiagnostic = 1;

    public String _errorMessage = null;

    public String _base64Template = null;

    public ArrayList<String> _base64Images = new ArrayList<String>();

    public float eyeGlassesScore = 0.0f;
    public float templateScore = 0.0f;
    public String qrData = null;

    /**
	* @description Default overloaded. Process the User Control result exception.
	* @param exceptionType User Control Exception type if exists.
	*/
    public OutputBundle(WidgetExceptionType exceptionType) {
        switch (exceptionType) {
            case StoppedManually:
                _finishStatus = 3; // CancelByUser
                _errorDiagnostic = 2; // NoError
                _livenessDiagnostic = 1; // Not Rated
                break;
            case Timeout:
                _finishStatus = 4; // Timeout
                _errorDiagnostic = 2; // NoError
                _livenessDiagnostic = 1; // Not Rated
                break;
            case None:
                _finishStatus = 1; // Ok
                _errorDiagnostic = 2; // NoError
                _livenessDiagnostic = 1; // Not Rated
                break;
            case CameraPermissionDenied:
                _finishStatus = 2; // Error
                _errorDiagnostic = 3; // CameraPermissionDenied
                _livenessDiagnostic = 1; // Not Rated
                break;
            case SettingsPermissionDenied:
                _finishStatus = 2; // Error
                _errorDiagnostic = 4; // SettingsPermissionDenied
                _livenessDiagnostic = 1; // Not Rated
                break;
            case HardwareError:
                _finishStatus = 2; // Error
                _errorDiagnostic = 5; // HardwareError
                _livenessDiagnostic = 1; // Not Rated
                break;
            default:
                _finishStatus = 2; // Error
                _errorDiagnostic = 1; // UnknownError
                _livenessDiagnostic = 1; // Not Rated
                break;
        }
    }

	/**
	* @description Default constructor. Process the User Control result and encapsulates his values
	* @param result Control result
	*/
    public OutputBundle(WidgetResult result) {
        if(result.getException() != null && result.getException().getExceptionType() != null) {
			switch (result.getException().getExceptionType()) {
                case StoppedManually:
					_finishStatus = 3; // CancelByUser
					_errorDiagnostic = 2; // NoError
					_livenessDiagnostic = 1; // Not Rated
					return;
				case Timeout:
					_finishStatus = 4; // Timeout
					_errorDiagnostic = 2; // NoError
					_livenessDiagnostic = 1; // Not Rated
					return;
				case None:
					_finishStatus = 1; // Ok
					_errorDiagnostic = 2; // NoError
					_livenessDiagnostic = 1; // Not Rated
					break;
				case CameraPermissionDenied:
					_finishStatus = 2; // Error
					_errorDiagnostic = 3; // CameraPermissionDenied
					_livenessDiagnostic = 1; // Not Rated
					return;
				case SettingsPermissionDenied:
					_finishStatus = 2; // Error
					_errorDiagnostic = 4; // SettingsPermissionDenied
					_livenessDiagnostic = 1; // Not Rated
					return;
                case HardwareError:
					_finishStatus = 2; // Error
					_errorDiagnostic = 5; // HardwareError
					_livenessDiagnostic = 1; // Not Rated
					return;
                /** NUEVOS CASES **/
                case ExtractionLicenseError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 6; // ExtractionLicenseError
                    _livenessDiagnostic = 1; // Not Rated
                case UnexpectedCaptureError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 7; // UnexpectedCaptureError
                    _livenessDiagnostic = 1; // Not Rated
                case ControlNotInitializedError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 8; // ControlNotInitializedError
                    _livenessDiagnostic = 1; // Not Rated
                case BadExtractorConfiguration:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 9; // ControlNotInitializedError
                    _livenessDiagnostic = 1; // Not Rated
				default:
					_finishStatus = 2; // Error
					_errorDiagnostic = 1; // UnknownError
					_livenessDiagnostic = 1; // Not Rated
					return;
			}
    }

        if(result.getLivenessDiagnostic() != null) {
            switch (result.getLivenessDiagnostic()) {
                case NotRated:
                    _livenessDiagnostic = 1;
                    break;
                case PhotoDetected:
                    _livenessDiagnostic = 2;
                    break;
                case LivenessDetected:
                    _livenessDiagnostic = 3;
                    break;
                case Unsuccess:
                    _livenessDiagnostic = 4;
                    break;
                case UnsuccessLowPerformance:
                    _livenessDiagnostic = 5;
                    break;
                case UnsuccessGlasses:
                    _livenessDiagnostic = 6;
                    break;
                case UnsuccessLight:
                    _livenessDiagnostic = 7;
                    break;
            }
        }


        if(result.getTemplate() != null)
            _base64Template = Base64.encodeToString(result.getTemplate(), Base64.NO_WRAP);
        else
            _base64Template = null;

        List<FPhiImage> fphiImages = result.getImages();

        if(fphiImages == null || fphiImages.size() == 0) {
            _base64Images = null;
        }
        else {
            for(int im = 0; im < fphiImages.size(); im++) {
                String base64Image = processPicture(GetBitmap(fphiImages.get(im)));
                String jvsImage = "data:image/jpg;base64," + base64Image;
                _base64Images.add(jvsImage);
            }
        }

        eyeGlassesScore = result.getTemplateInfo().getEyeGlassesScore();
        templateScore = result.getTemplateInfo().getTemplateScore();
        /** Nuevos **/
        if(result.getQRData() != null)
            qrData = result.getQRData();
    }


	/**
	* @description Sets the results message.
	*
    * @param errorMessage The error message.
	*/
    public void setResultMessage(String errorMessage) {
        _errorMessage = errorMessage;
    }

	/**
	* @description Result output values in JSON format.
	*/
    public JSONObject ReturnOutputJSON() throws JSONException {
        JSONObject result = new JSONObject();
        JSONArray images;
        if(_base64Images == null || _base64Images.size() == 0)
            images = null;
        else {
            images = new JSONArray();
            int tam = _base64Images.size();
            if(tam > 1) tam = 1; // FOR TESTING
            for(int p = 0; p < tam; p++) {
                images.put(_base64Images.get(tam));
            }
        }

        result.put("finishStatus", _finishStatus);
        result.put("template", _base64Template);
        result.put("images", images);
        result.put("livenessDiagnostic", _livenessDiagnostic);
        result.put("errorType", _errorDiagnostic);
        result.put("errorMessage", _errorMessage);

        result.put("eyeGlassesScore",eyeGlassesScore);
        result.put("templateScore",templateScore);
        if (qrData != null)
            result.put("qrData",qrData);
        return result;
    }

    /**
     * @description Compress bitmap using jpeg, convert to Base64 encoded string, and return to JavaScript.
     *
     * @param bitmap
     */
    private String processPicture(Bitmap bitmap) {
        ByteArrayOutputStream jpeg_data = new ByteArrayOutputStream();
        Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.JPEG;

        try {
            if (bitmap.compress(compressFormat, 95, jpeg_data)) {
                byte[] code = jpeg_data.toByteArray();
                byte[] output = Base64.encode(code, Base64.NO_WRAP);
                String js_out = new String(output);
               return js_out;
            }
        } catch (Exception e) {
       //     this.failPicture("Error compressing image.");
        }
        return null;
    }


    /**
     * @description Creates a bitmap from the information coming from the user control.
     * @param image a FPhiImage
     * @return The converted Bitmap.
     */
    private static Bitmap GetBitmap(FPhiImage image)
    {
        int width = image.getWidth();
        int height = image.getHeight();
        ByteBuffer buffer = image.getImage();
        Bitmap.Config config = image.getFormat();

        buffer.rewind();
        Bitmap bitmap = Bitmap.createBitmap(width, height, config);
        bitmap.copyPixelsFromBuffer(buffer);
        return bitmap;
    }
}

