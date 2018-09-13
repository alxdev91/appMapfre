package facephi.plugin.widget;

import android.util.Log;
import java.util.regex.Pattern;

public class QRValidator implements com.facephi.FPhiWidgetAndroid.ui.IFPhiWidgetQR {

    public static String evaluatorReg="";

    @Override
    public boolean isValidQR(String QRData) {

        Log.w("cordova test","Expression regular: "+evaluatorReg+" qrData: "+QRData);

        boolean toReturn = Pattern.matches(evaluatorReg,QRData);
        Log.w("cordova test","Match result: "+toReturn);

        return toReturn;
        //Pattern p = Pattern.compile(evaluatorReg);
        //Matcher m = p.matcher(QRData);
        //return (m.matches());
    }
}
