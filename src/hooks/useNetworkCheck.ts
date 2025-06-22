import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Network } from "@capacitor/network";
import type { PluginListenerHandle } from "@capacitor/core";

export const useNetworkCheck = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    let listenerHandle: PluginListenerHandle;

    const setupNetworkListener = async () => {
      const status = await Network.getStatus();

      if (!status.connected) {
        history.replace("/no-internet");
      }

      listenerHandle = await Network.addListener(
        "networkStatusChange",
        (status) => {
          if (!status.connected) {
            history.replace("/no-internet");
          } else {
            // When connection is restored and user is on no-internet page, redirect
            if (location.pathname === "/no-internet") {
              history.replace("/home"); // Or restore to previous route
            }
          }
        }
      );
    };

    setupNetworkListener();

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, [history, location.pathname]);
};
