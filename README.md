# Pasta Mobile App
The mobile version of the PASTA ELN

## Development-Status
Currently still in early alpha, basic functionality like scanning QR-Codes, adding a QR-Code to an Item, browsing the Database and adding Issues is Working.
Comments and Attachments are currently in Development.

## Security

Codespace has some secrets that automatically log you into expo/eas and firebase.
As Firebase requires its API tokens in file format, the install.sh script simply pastes the secrets into their files.
Make sure the install script is run frequently to update the tokens.

## Commands

- ```bash
    npm start
  ```
  starts the development server and accepts connections to metro

- ```bash
    npm run android
    npm run ios
  ```
  uploads the development build to a local device (connected to the PC) <br/>
  **INFO** does not work with Codespaces

- ```bash
    npm run rebuild
  ```
  rebuilds the native side (android/ios folder), only run if native packages need to be installed as it deletes the native code and rebuilds it!

- ```bash
    npm run device
  ```
  adds a provisioning profile for connected ios devices <br/>
  **INFO** don't know if this works in codespaces, we do not have a developer account to test on iOS yet

- ```bash
    npm run build:android
    npm run build:ios
  ```
  build a dev-client build that can be installed onto a device and as a replacement for the Expo GO app

## How does it work ?

We use Expo Development Clients to run the PASTA mobile app. There are some native Packages like firebase and Vision-Camera that require some tinkering with the native code. The Expo go app uses a fixed native backend for React Native which does not allow these packages. <br/>

First install a Dev-Client build on the Device, then start the development server and connect through the Expo QR-Code and connect to metro.

We mainly use codespaces to Develop this so usually there is no setting up to do, but a install script and a Wiki Page will be Provided.