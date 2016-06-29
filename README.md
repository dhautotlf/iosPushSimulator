# PushSimulator

Really simple page to send notifications on Android & iOs Devices with their Device ID.

It is based on those 2 projects :
 - [node-GCM - Push notifications for android devices](https://github.com/ToothlessGear/node-gcm)
 - [node-APN - Push notifications for iOS devices](https://github.com/argon/node-apn)

## Install 

`npm install`

## Configuration

#### Android

You will need `android.json` file :
```
{
  "key": "YOUR_API_KEY"
}
```

#### iOS

You will need `cert.pem` & `cert.pkey` files to connect to the apn server


## Run 
 
 `npm start`
 
## Visit 
 
 Go to the page http://localhost:3001
 
 And play ! 
