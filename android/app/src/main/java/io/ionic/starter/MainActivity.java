package io.zadroit.medpredit;

import android.os.Bundle;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.getcapacitor.BridgeActivity;
// import com.getcapacitor.Plugin;
// import java.util.ArrayList;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // this.init(
        //     savedInstanceState,
        //     new ArrayList<Class<? extends Plugin>>() {{
        //         add(HealthConnectPlugin.class);
        //         // You can add other custom plugins here
        //     }}
        // ); 
        // ✅ Set both App ID and Client Token before initializing SDK
        FacebookSdk.setApplicationId(getString(R.string.facebook_app_id));
        FacebookSdk.setClientToken(getString(R.string.facebook_client_token)); // <-- Add this line

        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(getApplication());
    }
}
