/**
 * Predefined application id for integration purposes.
 * For each campaign a separate application has to be created.
 * Use 2095 for testing.
 * @type {string}
 */
const applicationId = '2095';

/**
 * Predefined user id for integration purpose.
 * Use REPLACE_WITH_YOUR_USER_ID for testing.
 * @type {string}
 */
const userId = 'REPLACE_WITH_YOUR_USER_ID';

/**
 * Type defined for 3rd party integrations.
 * @type {string}
 */
const type = 'TRUSTED_3RD_PARTY';

/**
 * Session token provided by third party.
 * Use value 1234567890 for testing.
 * @type {string}
 */
const token = '1234567890';

/**
 * Event name triggered by SDK to receive the response.
 * Use HOME_PAGE_LIVE_ONE_ENTERED for testing.
 * @type {string}
 */
export const EVENT = 'HOME_PAGE_LIVE_ONE_ENTERED';

/**
 * Publicly available cere sdk location
 * @type {string}
 */
const CERE_SDK_URL = "https://sdk.dev.cere.io/v4.2.0/web.js";

function initCereSdk(type, externalUserId, token) {
    return window.CereSDK.web.cereWebSDK(applicationId, userId, {
        authMethod: {
            type: type,
            externalUserId: externalUserId,
            token: token
        }
    });
}

export function initSdk(externalUserId, token, onEngagementFunction) {
    setTimeout(() => {

        const script = createScriptElement();

        let sdk;

        script.addEventListener('load', (event) => {
            try {
                /**
                 * Init SDK with parameters provided.
                 */
                sdk = initCereSdk(type, externalUserId, token);
            } catch (error) {
                console.log('SDK initialisation failed: ' + error);
            }

            /**
             * Specify the action after engagement data received.
             * Please note: this action happens asynchronously.
             */
            sdk.onEngagement((template) => {
                onEngagementFunction(template);
            });

            setTimeout(() => {
                /**
                 * Send event to Cere system.
                 */
                sdk.sendEvent(EVENT, {});
            });

        });

        document.head.appendChild(script)

        return () => {
            document.body.removeChild(script);
        }
    }, 700);
}

/**
 * Create js tag with content dynamically.
 *
 * @returns {HTMLScriptElement}
 */
function createScriptElement() {
    let script = document.createElement('script');
    script.src = CERE_SDK_URL;
    script.async = true;
    return script;
}

/**
 * Build NFT url with get back redirectUrl parameter.
 * @param applicantId
 * @param email
 * @returns {string}
 */
export function getNftUrl(applicantId, email) {
    const nftUrl = "https://client.davinci.dev.cere.network/?event=test_exhibition_dont_delete_live";
    const redirectHost = "https://integration.dev.cere.io";
    return nftUrl + "&redirectUrl=" + encodeURIComponent(redirectHost + "/?off=true&type=" + type + "&token=" +
        token + "&externalUserId=" + applicantId + "&email=" + encodeURIComponent(email))
}
