# integration-external-app-example

Demonstration of integration with Davinci.

**User Scenario**:
1. User enters the application
2. Popup is shown for email/applicant id entering
3. Afer filling the data it's saved to a local storage
4. In the right upper corner user can see entered parameters (If user wants to clear entered parameters just click at this button)
5. Popup with Nft buy is show
6. All enetered and required parameters are filled in buy link
7. Click at buy button 
8. User is redirected to davinci site
9. Buy nft at davinci
10. Got redirected back to this site
11. SDK got connected and listens to events
12. Event of NFT buy receved
13. Popup is shown to the user


# Usefull links
- Cere skd usage is located in <code>cere-integration-service.jsx</code>
- Local storage operations are placed in <code>local-storage-service.jsx</code>
- UI actions processing are happening in <code>Header.jsx</code> Block starts from **START_CERE BLOCK** and ends with **END_CERE_BLOCK**
