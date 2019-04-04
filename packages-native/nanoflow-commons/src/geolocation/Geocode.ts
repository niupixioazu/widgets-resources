// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import RNGeocoder from "react-native-geocoder";

type GeocodingProvider = "Google" | "Geocodio" | "LocationIQ" | "MapQuest";

/**
 * @param {string} address - This field is required.
 * @param {"NanoflowCommons.GeocodingProvider.Google"|"NanoflowCommons.GeocodingProvider.Geocodio"|"NanoflowCommons.GeocodingProvider.LocationIQ"|"NanoflowCommons.GeocodingProvider.MapQuest"} geocodingProvider - This field is required for use on web.
 * @param {string} providerApiKey - This field is required for use on web.
 * @returns {MxObject}
 */
function Geocode(
    address?: string,
    geocodingProvider?: GeocodingProvider,
    providerApiKey?: string
): Promise<mendix.lib.MxObject> {
    // BEGIN USER CODE
    /**
     * Documentation:
     *  - Native: https://github.com/devfd/react-native-geocoder
     *  - Google: https://developers.google.com/maps/documentation/geocoding/intro#GeocodingRequests
     *  - Geocodio: https://www.geocod.io/docs/#geocoding
     *  - LocationIQ: https://locationiq.com/docs-html/index.html#search-forward-geocoding
     *  - MapQuest: https://developer.mapquest.com/documentation/open/geocoding-api/address/get/
     */

    if (!address) {
        throw new TypeError("Input parameter 'Address' is required");
    }

    if (navigator && navigator.product === "ReactNative") {
        const Geocoder: typeof RNGeocoder = require("react-native-geocoder").default;

        return Geocoder.geocodeAddress(address).then(results => {
            if (results.length === 0) {
                throw new Error("No results found");
            }
            return createMxObject(String(results[0].position.lat), String(results[0].position.lng));
        });
    }

    if (!geocodingProvider) {
        throw new TypeError("Input parameter 'Geocoding provider' is required for use on web");
    }

    if (!providerApiKey) {
        throw new TypeError("Input parameter 'Provider api key' is required for use on web");
    }

    const url = getApiUrl(geocodingProvider, address, providerApiKey);

    return fetch(url)
        .then(response =>
            response.json().catch(() =>
                response.text().then(text => {
                    throw new Error(text);
                })
            )
        )
        .then(response => getLatLong(geocodingProvider, response))
        .then(latLong => createMxObject(latLong[0], latLong[1]));

    function getApiUrl(provider: GeocodingProvider, query: string, key: string): string {
        query = encodeURIComponent(query);
        key = encodeURIComponent(key);

        switch (provider) {
            case "Google":
                return `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${key}`;
            case "Geocodio":
                return `https://api.geocod.io/v1.3/geocode?q=${query}&api_key=${key}`;
            case "LocationIQ":
                return `https://eu1.locationiq.com/v1/search.php?format=json&q=${query}&key=${key}`;
            case "MapQuest":
                return `https://open.mapquestapi.com/geocoding/v1/address?location=${query}&key=${key}`;
        }
    }

    function getLatLong(provider: GeocodingProvider, response: any): [string, string] {
        switch (provider) {
            case "Google":
                if (response.status !== "OK") {
                    throw new Error(response.error_message);
                }
                return [response.results[0].geometry.location.lat, response.results[0].geometry.location.lng];
            case "Geocodio":
                if (response.error) {
                    throw new Error(response.error);
                }
                if (response.results.length === 0) {
                    throw new Error("No results found");
                }
                return [response.results[0].location.lat, response.results[0].location.lng];
            case "LocationIQ":
                if (response.error) {
                    throw new Error(response.error);
                }
                if (response.length === 0) {
                    throw new Error("No results found");
                }
                return [response[0].lat, response[0].lon];
            case "MapQuest":
                if (response.info.statuscode !== 0) {
                    throw new Error(response.info.messages.join(", "));
                }
                if (response.results.length === 0) {
                    throw new Error("No results found");
                }
                return [response.results[0].locations[0].latLng.lat, response.results[0].locations[0].latLng.lng];
        }
    }

    function createMxObject(lat: string, long: string): Promise<mendix.lib.MxObject> {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity: "NanoflowCommons.Position",
                callback: mxObject => {
                    mxObject.set("Latitude", lat);
                    mxObject.set("Longitude", long);
                    resolve(mxObject);
                },
                error: () => {
                    reject("Could not create 'NanoflowCommons.Position' object to store coordinates");
                }
            });
        });
    }

    // END USER CODE
}