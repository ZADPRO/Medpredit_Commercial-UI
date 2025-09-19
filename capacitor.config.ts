import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.zadroit.medpredit",
  appName: "Medpredit_Commercial",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    PhotoLibrary: {
      read: true,
      write: false,
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
      google: {
        scopes: ["profile", "email"],
        serverClientId:
          "158794026736-r7o7fcnp5t410iojsmeiqbomhpkjm2qp.apps.googleusercontent.com",
      },
    },
  },
};

export default config;
