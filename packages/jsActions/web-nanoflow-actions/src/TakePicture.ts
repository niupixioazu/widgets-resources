// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Does stuff.
 * @returns {Promise.<void>}
 */
export async function TakePicture(picture: mendix.lib.MxObject): Promise<void | Error> {
    // BEGIN USER CODE
    if (!picture) {
        // TODO: message does not appear in client. Because Error is used. Likewise for all other errors.
        return Promise.reject(new Error("Input parameter 'Picture' is required"));
    }

    if (!picture.inheritsFrom("System.FileDocument")) {
        const entity = picture.getEntity();
        return Promise.reject(new Error(`Entity ${entity} does not inherit from 'System.FileDocument'`));
    }

    const supportsCameraAccess = "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

    if (!supportsCameraAccess) {
        return Promise.reject(new Error("Camera is unsupported"));
    }

    let error: string | undefined;
    let stream: MediaStream | undefined;
    let styleElements: HTMLStyleElement[] = [];
    let videoIsReady = false;

    createAndInsertStyles(styleElements);
    const { video, wrapper, actionControl, closeControl } = createAndInsertElements();

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            switch (e.name) {
                case "NotAllowedError":
                    error = "Permission denied.";
                    break;
                case "NotFoundError":
                    error = "Media not available.";
                    break;
                case "NotReadableError":
                    error = "Media not available, is it already in use elsewhere?";
                    break;
                default:
                    error = e.message;
                    break;
            }
        }
    }

    if (error) {
        closeHandler();
        return Promise.reject(new Error(error));
    }

    closeControl.onclick = closeHandler;
    actionControl.onclick = takePictureHandler;
    video.onloadedmetadata = () => (videoIsReady = true);
    video.srcObject = stream!;

    function createAndInsertStyles(styleElements: HTMLStyleElement[]) {
        const styles = [
            `
                .pwa-take-picture-wrapper {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                };
                `,
            `
                .pwa-take-picture-video-element {
                    position: absolute;
                    z-index: 10;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    background-color: black;
                };
                `,
            `
                .pwa-take-picture-action-control-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    justify-content: flex-end;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    z-index: 15;
                };
                `,
            `
                .pwa-take-picture-close-control-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;
                    align-items: flex-end;
                    height: 100%;
                    width: 100%;
                    z-index: 15;
                };
                `,
            `
                .pwa-take-picture-action-control {
                    border-radius: 50%;
                    background-color: red;
                    width: 50px;
                    height: 50px;
                };`,
            `
                .pwa-take-picture-close-control {
                    border-radius: 50%;
                    background-color: red;
                    width: 50px;
                    height: 50px;
                };
                `,
            `
                .pwa-take-picture-confirm-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 0;
                    background-color: white;
                }
                `
        ];

        for (const style of styles) {
            const styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(style));
            styleElements.push(styleElement);
            document.head.appendChild(styleElement);
        }
    }

    function createAndInsertElements() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("pwa-take-picture-wrapper");

        const video = document.createElement("video");
        video.classList.add("pwa-take-picture-video-element");
        video.setAttribute("autoplay", "autoplay");
        video.setAttribute("muted", "muted");
        video.setAttribute("playsinline", "");

        const actionControlWrapper = document.createElement("div");
        actionControlWrapper.classList.add("pwa-take-picture-action-control-wrapper");

        const closeControlWrapper = document.createElement("div");
        closeControlWrapper.classList.add("pwa-take-picture-close-control-wrapper");

        const actionControl = document.createElement("div");
        actionControl.classList.add("pwa-take-picture-action-control");

        const closeControl = document.createElement("div");
        closeControl.classList.add("pwa-take-picture-close-control");

        actionControlWrapper.appendChild(actionControl);
        closeControlWrapper.appendChild(closeControl);
        wrapper.appendChild(actionControlWrapper);
        wrapper.appendChild(closeControlWrapper);
        wrapper.appendChild(video);

        document.body.appendChild(wrapper);

        return { video, wrapper, actionControl, closeControl };
    }

    function takePictureHandler() {
        if (videoIsReady) {
            // TODO: take the picture.
        }
    }

    function closeHandler() {
        const tracks = stream?.getTracks();

        tracks?.forEach(track => {
            track.stop();
        });

        stream = undefined;
        document.body.removeChild(wrapper);

        for (const styleElement of styleElements) {
            document.head.removeChild(styleElement);
        }
    }
    // END USER CODE
}
