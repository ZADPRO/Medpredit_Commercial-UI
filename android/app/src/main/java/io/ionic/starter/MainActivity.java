package io.zadroit.medpredit;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsCompat.Type;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // ✅ Initialize Capacitor bridge with custom plugins
        this.init(
            savedInstanceState,
            new ArrayList<Class<? extends Plugin>>() {{
                add(HealthConnectPlugin.class);
                // Add other plugins if needed
            }}
        );

        // ✅ Facebook SDK setup
        FacebookSdk.setApplicationId(getString(R.string.facebook_app_id));
        FacebookSdk.setClientToken(getString(R.string.facebook_client_token));
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(getApplication());

        // ✅ Handle window insets (status bar, nav bar, notch, keyboard)
        Window window = getWindow();

        // Remove edge-to-edge mode
        window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);

        View rootView = window.getDecorView();

        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, insets) -> {
            WindowInsetsCompat windowInsets = insets;

            // System bar + notch insets
            int left = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).left;
            int top = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).top;
            int right = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).right;
            int bottom = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).bottom;

            // Keyboard (IME) handling
            boolean imeVisible = windowInsets.isVisible(Type.ime());
            int imeHeight = windowInsets.getInsets(Type.ime()).bottom;

            // Apply padding to avoid overlap
            view.setPadding(
                left,
                top,
                right,
                imeVisible ? imeHeight : bottom
            );

            return insets;
        });
    }
}
