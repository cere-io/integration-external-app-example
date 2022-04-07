# integration-external-app-example

Demonstration of integration with Davinci.


# Tech Used
 ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
      

# User Scenario:
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


# Useful links
- Cere skd usage is located in <code>cere-integration-service.jsx</code>
- Local storage operations are placed in <code>local-storage-service.jsx</code>
- UI actions processing are happening in <code>Header.jsx</code> Block starts from **START_CERE BLOCK** and ends with **END_CERE_BLOCK**


## Build Setup

``` bash

# install dependencies
$ npm install

# serve with host at localhost:8000
$ npm start
```

# Description
NFT Marketplace template for creation, sale, and purchase of digital art as NFTs.
Initial repo: https://github.com/kasim393/NFT-Marketplace.git
