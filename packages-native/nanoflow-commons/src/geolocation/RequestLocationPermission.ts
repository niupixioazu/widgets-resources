// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNative from "react-native";

/**
 * @returns {boolean}
 */
function RequestLocationPermission(): Promise<boolean> {
    // BEGIN USER CODE

    if (navigator && navigator.product === "ReactNative") {
        const RN: typeof ReactNative = require("react-native");

        if (RN.Platform.OS === "android") {
            const locationPermission = RN.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

            return RN.PermissionsAndroid.check(locationPermission).then(hasPermission =>
                hasPermission
                    ? true
                    : RN.PermissionsAndroid.request(locationPermission).then(
                          status => status === RN.PermissionsAndroid.RESULTS.GRANTED
                      )
            );
        } else {
            if (navigator.geolocation && navigator.geolocation.requestAuthorization) {
                navigator.geolocation.requestAuthorization();
            }
        }
    }

    return Promise.resolve(true);

    // END USER CODE
}