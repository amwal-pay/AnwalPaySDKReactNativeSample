# React Amwal Pay Example

This is a standalone example application demonstrating how to use the `react-amwal-pay` package from npm.

## Prerequisites

- Node.js >= 18
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and SDK

## Installation

1. Install dependencies:

```bash
npm install
```

2. For iOS, install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

## Running the App

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Start Metro bundler separately

```bash
npm start
```

## Project Structure

```
.
├── src/
│   ├── App.tsx           # Main app component
│   └── PaymentScreen.tsx # Payment configuration screen
├── android/              # Android native code
├── ios/                  # iOS native code
├── package.json          # Dependencies (includes react-amwal-pay from npm)
└── metro.config.js       # Metro bundler configuration
```

## Using react-amwal-pay

This example uses the `react-amwal-pay` package installed from npm. The package is configured in `package.json`:

```json
{
  "dependencies": {
    "react-amwal-pay": "^0.1.12"
  }
}
```

## Key Features

The example demonstrates:
- Configuring Amwal Pay SDK
- Handling different environments (SIT, UAT, PROD)
- Supporting multiple transaction types (NFC, CARD_WALLET, APPLE_PAY)
- Currency configuration
- Payment callbacks and responses

## Configuration

Edit the payment configuration in `src/PaymentScreen.tsx` to customize:
- Merchant ID
- Terminal ID
- Secure Hash
- Environment
- Currency
- Transaction Type

## Learn More

For more information about the Amwal Pay SDK, visit the package repository or documentation.
