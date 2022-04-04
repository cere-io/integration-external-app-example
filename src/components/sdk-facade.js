// application: {
//     apiKey: ""
//     appId: ""
//     userId: ""
//     container: ""
//     onEngagementFunc: ""
//     onDismissEngagementFc: ""
// }

export function initCereSDK(application) {
    const initStr = application.apiKey ?
        `const cereWebSDKInstance = await CereSDK.web.cereWebSDK('${application.appId}', '${application.userId}', { container: ${application.container}, token: '${application.apiKey}' });` :
        `const cereWebSDKInstance = await CereSDK.web.cereWebSDK('${application.appId}', '${application.userId}', { container: ${application.container} });`


    return `// ensure that your REPLACE_WITH_YOUR_USER_ID with your user id
${initStr}
console.log(${initStr});
if(${application.onEngagementFunc})
    cereWebSDKInstance.onEngagement(${application.onEngagementFunc});

if(${application.onDismissEngagementFc})
cereWebSDKInstance.onDismissEngagement(${application.onDismissEngagementFc});

await cereWebSDKInstance.sendEvent('APP_LAUNCHED', {});`;
}
