package io.zadroit.medpredit;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsCompat.Type;
import androidx.core.view.WindowInsetsControllerCompat;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // ✅ Facebook SDK setup
        FacebookSdk.setApplicationId(getString(R.string.facebook_app_id));
        FacebookSdk.setClientToken(getString(R.string.facebook_client_token));
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(getApplication());

        // ✅ Window setup
        Window window = getWindow();

        // Allow us to change system bar colors
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // Set status bar + navigation bar colors
        window.setStatusBarColor(getResources().getColor(com.getcapacitor.android.R.color.colorPrimaryDark));
        window.setNavigationBarColor(getResources().getColor(com.getcapacitor.android.R.color.colorPrimaryDark));

        // ✅ Handle window insets (status bar, nav bar, keyboard)
        View rootView = window.getDecorView();

        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, insets) -> {
            WindowInsetsCompat windowInsets = insets;

            // Get system bar insets (status, nav, notch)
            int left = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).left;
            int top = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).top;
            int right = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).right;
            int bottom = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).bottom;

            // Handle IME (keyboard) visibility
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

        // ✅ Use WindowInsetsControllerCompat for status bar icons (instead of systemUiVisibility)
        WindowInsetsControllerCompat insetsController =
                ViewCompat.getWindowInsetsController(window.getDecorView());
        if (insetsController != null) {
            // false = light status bar background with dark icons
            insetsController.setAppearanceLightStatusBars(false);
            insetsController.setAppearanceLightNavigationBars(false);
        }
    }
}
