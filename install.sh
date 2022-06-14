#!/bin/bash

#Files that need to be generated from Secrets
AndroidGoogleFile=./google-services.json
AppleGoogleFile=./GoogleService-Info.plist

if [ -f "$AndroidGoogleFile" ];then
  rm $AndroidGoogleFile
fi
echo $ANDROID_GOOGLE_SECRET > $AndroidGoogleFile
cp $AndroidGoogleFile ./android/app/google-services.json

if [ -f "$AppleGoogleFile" ];then
  rm $AppleGoogleFile
fi
echo $IOS_GOOGLE_SECRET > $AppleGoogleFile
cp $AppleGoogleFile ./ios/Pasta/GoogleService-Info.plist

#TODO Firebase admin SDK -> get API keys from server?
