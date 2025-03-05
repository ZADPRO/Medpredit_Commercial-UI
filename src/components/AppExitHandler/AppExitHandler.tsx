import { useEffect } from "react";
import { App } from "@capacitor/app";
import { isPlatform } from "@ionic/react";

const AppExitHandler = () => {
    useEffect(() => {
        const backButtonListener = () => {
            App.addListener("backButton", ({ canGoBack }) => {
                if (!canGoBack) {
                    App.exitApp(); // Exit the app if there's no page to go back to
                }
            });
        };

        if (isPlatform("android")) {
            backButtonListener();
        }

        return () => {
            App.removeAllListeners();
        };
    }, []);

    return null; // This component does not render anything
};

export default AppExitHandler;
