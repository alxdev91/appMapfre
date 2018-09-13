package facephi.plugin.widget;

import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;

import com.facephi.FPhiWidgetAndroid.library.WidgetConfiguration;
import com.facephi.FPhiWidgetAndroid.library.WidgetLivenessMode;
import com.facephi.FPhiWidgetAndroid.library.WidgetMode;
import com.facephi.FPhiWidgetAndroid.library.WidgetResult;
import com.facephi.FPhiWidgetAndroid.library.WidgetException;
import com.facephi.FPhiWidgetAndroid.library.WidgetExceptionType;
import com.facephi.FPhiWidgetAndroid.ui.FPhiWidgetAndroid;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Iterator;

/**
 * This class echoes a string called from JavaScript. Launches the Android User Control.
 */
public class WidgetFacephi extends CordovaPlugin {

	public static final String WIZARD_REG      = "Register";
	public static final String AUTHENTICATE    = "Authenticate";
	public static final String SHOW_TUTORIAL    = "ShowTutorial";

	public CallbackContext _callbackContext;
    public JSONArray _args = null;


	public boolean _isCordovaActivityDestroyed = false;

	/**
	 * Entry method from Javascript code. Executes the request and returns PluginResult.
	 *
	 * @param action	 		Is used to distinguish between different method calls that users may make to your plugin.
	 * @param args		 		Method arguments in JSON format.
	 * @param callbackContext	The callback id used when calling back into JavaScript.
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        _callbackContext = callbackContext;
        _args = args;
		configureUCMode();

        return true;
    }

	/**
	 * Configures the user control operation and launches the activity that will execute it.
	 *
	 */
    private void configureUCMode() throws JSONException {
		String mode = getUCArg(_args, "mode");
		String resourcesPath = getUCArg(_args, "resourcesPath");
		if(!mode.isEmpty()) {
			if (mode.equals(WIZARD_REG)) {
				WidgetConfiguration conf = new WidgetConfiguration(WidgetMode.Register, resourcesPath + ".zip");
				conf = getUCConfiguration(conf, _args);
				this.launchActivityUC(conf, 100);
			}

			if (mode.equals(AUTHENTICATE)) {
				WidgetConfiguration conf = new WidgetConfiguration(WidgetMode.Authenticate, resourcesPath + ".zip");
				conf = getUCConfiguration(conf, _args);
				this.launchActivityUC(conf, 101);
			} if (mode.equals(SHOW_TUTORIAL)) {
				WidgetConfiguration conf = new WidgetConfiguration();
				conf = getUCConfiguration(conf, _args);
				conf.setResourcesPath(resourcesPath + ".zip");
				launchTutorial(conf, 102);
			}
		}
    }


	 /**
	 * Launches the User Control Activity selected by the user.
	 *
	 * @param conf	 			The User Control configuration
	 * @param operation			Index of the User Control operation
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	private boolean launchActivityUC(WidgetConfiguration conf, int operation) {
		// TODO
		// cordova.getActivity ().runOnUiThread (new Runnable () {

		try {
			Intent intent = new Intent(cordova.getActivity().getBaseContext(), FPhiWidgetAndroid.class);
			intent.putExtra("configuration", conf);
			PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
			r.setKeepCallback(true);
			_callbackContext.sendPluginResult(r);

			cordova.startActivityForResult(this, intent, operation);
		} catch (Exception exc) {
			System.err.println("Exception: " + exc.getMessage());
			_callbackContext.error(exc.getMessage());
		}
		return true;
	}


	/**
	 * Launches the User Control Activity selected by the user.
	 *
	 * @param conf	 			The User Control configuration
	 * @param operation			Index of the User Control operation
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	private boolean launchTutorial(WidgetConfiguration conf, int operation) {
		// TODO
		// cordova.getActivity ().runOnUiThread (new Runnable () {

		try {
			Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.FPhiWidgetAndroid.tutorial.TutorialActivity.class);
			intent.putExtra("configuration", conf);

			PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
			r.setKeepCallback(true);
			_callbackContext.sendPluginResult(r);

			cordova.startActivityForResult(this, intent, operation);
		} catch (Exception exc) {
			System.err.println("Exception: " + exc.getMessage());
			_callbackContext.error(exc.getMessage());
		}
		return true;
	}

	/**
	 * Processes the activity result from the User Control.
	 *
	 * @param requestCode	 	Code Request
	 * @param resultCode		Operation code
	 * @param data				Result of the User Control
	 */
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		try {

			// Gestionar WRITE_SETTINGS permission
			/*if (requestCode == 1500 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
				if (!Settings.System.canWrite(cordova.getActivity())) {
					OutputBundle output = new OutputBundle(UserControlExceptionType.SettingsPermissionDenied);
					_callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, output.ReturnOutputJSON()));
					return;
				} else {
					requestPermissions(2000);
				}
			}*/

			if(_isCordovaActivityDestroyed) {
				return;
			}

			if(requestCode == 102)
				return;

			if (requestCode == -1) {
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			if (data == null) {
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			WidgetResult ucResult = data.getParcelableExtra("result");
			OutputBundle output = new OutputBundle(ucResult);

			if (ucResult == null) {
				// Toast.makeText(cordova.getActivity().getBaseContext(), cordova.getActivity().getResources().getString(R.string.message_no_results), Toast.LENGTH_LONG).show();
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			// at last call sendPluginResult
			if(output._finishStatus == 2) { // Es un error. Se envía al evento de error.
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, output.ReturnOutputJSON()));
			}
			else { // Ha salido sin producirse un error en el control de usuario, se gestiona en el evento de acierto.
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, output.ReturnOutputJSON()));
			}
		} catch (Exception exc) {
			System.err.println("Exception: " + exc.getMessage());
			this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, new String()));
			this._callbackContext.error(exc.getMessage());
		}
	}


	/**
	 * Processes the JSON input argument and gets the execution mode of the User Control.
	 *
	 * @param args		JSON array with input arguments.
	 * @return 			Mode of the user control
	 */
	private String getUCArg(JSONArray args, String argId) throws JSONException {
		WidgetConfiguration conf = new WidgetConfiguration();
		if(args == null || args.length() == 0)
			return "";

		JSONObject actualObject = args.getJSONObject(0);

		Iterator iterator = actualObject.keys();
		while(iterator.hasNext()){
			String key = (String)iterator.next();
			if(key.equalsIgnoreCase(argId)) {
				String issue = actualObject.getString(key);
				return issue;
			}
		}
		return "";
	}




	/**
	 * Processes the JSON input argument and sets the configuration of the User Control.
	 *
	 * @param args		JSON array with input arguments.
	 * @return 			Configuration of the user control
	 */
	private WidgetConfiguration getUCConfiguration(WidgetConfiguration conf, JSONArray args) throws JSONException {
		if(args == null || args.length() == 0)
			return conf;

		JSONObject actualObject = args.getJSONObject(0);

		Iterator iterator = actualObject.keys();
		while(iterator.hasNext()){
			String key = (String)iterator.next();
			if(key.equalsIgnoreCase("config")) {
				JSONObject issue = actualObject.getJSONObject(key);
				boolean enableImages = issue.optBoolean("enableImages");
				double sceneTimeout = issue.optDouble("sceneTimeout");
				double cropPercent = issue.optDouble("cropPercent");
				boolean debug = issue.optBoolean("debug");
				boolean crop = issue.optBoolean("crop");
				boolean fullscreen = issue.optBoolean("fullscreen");
				boolean enableLiveness = issue.optBoolean("enableLiveness");
				String locale = issue.optString("locale");
				String qrValidatorExpression = issue.optString("qrValidatorExpression");
				boolean isFrontalCamera = issue.optBoolean("frontalCameraPreferred", true);

				if(isFrontalCamera)
					conf.setFrontFacingCameraAsPreferred();
				else
					conf.setBackFacingCameraAsPreferred();

				String userTagsStr = issue.optString("uTags", null);
				byte[] userTags = null;
				if(userTagsStr != null && !userTagsStr.isEmpty()) {
					userTags = Base64.decode(userTagsStr, Base64.DEFAULT);
					conf.setUserTags(userTags);
				}

				conf.setFullscreen(fullscreen);
				if(enableLiveness) conf.setLivenessMode(WidgetLivenessMode.LIVENESS_BLINK);
				else conf.setLivenessMode(WidgetLivenessMode.LIVENESS_NONE);
				if(locale != null && !locale.equalsIgnoreCase("null")) conf.setLocale(locale);
				if (!qrValidatorExpression.isEmpty()) {
					facephi.plugin.widget.QRValidator.evaluatorReg = qrValidatorExpression;
					conf.setIFPhiWidgetQR_classname("facephi.plugin.usercontrol.QRValidator");
				}

				conf.enableImages(enableImages);
				conf.setSceneTimeout((float)sceneTimeout);
				if(conf.getExtractionConfig() != null) conf.getExtractionConfig().setCropImagePercent((float)cropPercent);
				if(conf.getExtractionConfig() != null) conf.getExtractionConfig().setCropImageDebug(crop);
				conf.setDebug(debug);

			}
		}
		return conf;
	}


	
	/**
	 * Called when the Activity is being destroyed (e.g. if a plugin calls out to an
	 * external Activity and the OS kills the CordovaActivity in the background).
	 * The plugin should save its state in this method only if it is awaiting the
	 * result of an external Activity and needs to preserve some information so as
	 * to handle that result; onRestoreStateForActivityResult() will only be called
	 * if the plugin is the recipient of an Activity result
	 *
	 * @return  Bundle containing the state of the plugin or null if state does not
	 *          need to be saved
	 */
	public Bundle onSaveInstanceState() {
		return null;
	}

	/**
	 * Called when a plugin is the recipient of an Activity result after the
	 * CordovaActivity has been destroyed. The Bundle will be the same as the one
	 * the plugin returned in onSaveInstanceState()
	 *
	 * @param state             Bundle containing the state of the plugin
	 * @param errorCallbackContext   Replacement Context to return the plugin result to
	 */
	public void onRestoreStateForActivityResult(Bundle state, CallbackContext errorCallbackContext) {
		this._isCordovaActivityDestroyed = true;
		WidgetResult ucResult = new WidgetResult();
		ucResult.setException(new WidgetException(WidgetExceptionType.HardwareError));
		OutputBundle _outputBundle = new OutputBundle(ucResult);

		try {
			errorCallbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, _outputBundle.ReturnOutputJSON()));
			this._callbackContext = errorCallbackContext;
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return;

	}

	/**
	 * Gets the color from the Cordova/Phonegap client and modify the configuration.
	 *
	 * @param rgba	 			The rgba color in string format. (ie, 'rgba(100, 100, 100, 255))'
	 * @return 					Integer that represents the RGBA color value
	 */
	/*private int getUIColorFromJS(String rgba) {
		Pattern pattern = Pattern.compile("((?<![\\w.])[+-]?(?:\\d+\\.\\d+|\\d+\\.|\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?(?![\\w.]))");
		Matcher matcher = pattern.matcher(rgba);
		ArrayList<String> arrayRGBA = new ArrayList<String>();

		while(matcher.find()) {
			arrayRGBA.add(matcher.group());
		}

		if (arrayRGBA.size() != 4)
			return Integer.MAX_VALUE;

		int r,g,b;

		// Normalizamos
		r = Math.min(255,Math.max(Math.round(Integer.parseInt(arrayRGBA.get(0))),0));
		g = Math.min(255,Math.max(Math.round(Integer.parseInt(arrayRGBA.get(1))),0));
		b = Math.min(255,Math.max(Math.round(Integer.parseInt(arrayRGBA.get(2))),0));
		float a = Float.parseFloat(arrayRGBA.get(3));
		if (a < 0.0f) a=0.0f;
		if (a>1.0f) a=1.0f;

		return Color.argb((int)(a*255), r, g, b);
	}*/
}
