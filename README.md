# Art^2
## App Overview
Art^2 is an app that allows users to learn an artistic medium with a lower barrier to entry (pixel art) and collaborate with others to build a community. The app is geared towards individuals who want to learn art and/or build a community out of formal education. 
Installation Procedure
The high fidelity prototype of the Art^2 app is published through expo, an environment to run apps that have been developed in React Native. To run the app on an Android or iOS device: 

## Spinning up the project locally
```
$ npm i #installs the project dependencies
$ npm run start #starts the expo project
```
Now scan the QR code to open the app on your phone!

## Operating Instructions
The creation canvas, gallery of previous work, exploring friends' work, and lessons on pixel art techniques are accessible from the home page. New artwork can be created, or previous work can be modified. For a complete app overview and tutorial, see the first video in the lessons hub. You can navigate to it from the “Lessons” button home page or from the navigation menu by clicking the menu button at the top right of the app and clicking “Lessons” in the side navigation that pops out.

## Hard Coded and Wizard of Oz
### While navigating the app, you might discover some aspects that are hard coded to simulate more complicated future functionality. The following parts have been hardcoded:

- **Pre-populated artwork**:
The user already has artwork already populated upon opening the app. In the final product, these would be the user’s creations.

- **Friends**:
The user upon entering the app has hardcoded friends along with their numbers for purposes of sharing and collaboration. In the final product, users would have their own friends with their numbers.

- **Collaboration**
### The collaboration feature is also hardcoded to demonstrate what it would like to collaborate on pixel art pieces. Messages and responses are hard coded. 
## Limitations
We’ve made significant progress in our Hi-Fi Prototype however, some parts remain hard coded or simulated due to the time constraint and reliance on an established user community. 
- **Renaming Artwork**:
Once a user saves artwork under a certain name, it cannot be renamed. 
- **Resaving Artwork**:
If a user edits an art piece that they have already created and saves their changes, the app creates a new piece in the gallery rather than updating the original. 
- **Messaging Others**:
Messages for every friend right now are the same and there’s only one response of “Got it” each time you type a message to them. Navigating to different chats also leaves “phantom” responses from the previous chats as the most recent message. 
- **Fixed Canvas Size**:
Users can only create artwork of size 8x8. 
- **Sharing With Friends**:
Currently only pre-populated artwork is embedded in the messages when sharing with others, custom artwork only sends a text with no attachment.
 

Marie C. Becky M. David C. Leyth T.
 __Note: this repo is a copy of [our combined repo](https://github.com/mariechu3/ArtSquared) with commit history__



