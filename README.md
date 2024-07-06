# Reflekt - Journaling App

This is a simple journaling app with a backend built using Node.js, Express.js, TypeScript, and PostgreSQL, and a mobile frontend built using React Native.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Mobile Setup](#mobile-setup)

## Prerequisites

- Node.js
- PostgreSQL
- npm
- Expo Go App - on your mobile phone

## Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/brianMunyao/reflekt.git
   cd reflekt/backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` folder and add the following variables:
   Copy the values in the .env.example file and update with the correct values for your environment

5. **Run database migrations:**

   ```sh
   npm run migrate
   # or
   yarn migrate
   ```

6. **Start the backend server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Mobile Setup

1. **Navigate to the mobile directory**

   ```sh
   cd reflekt/mobile
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `mobile` folder and add copy the values in the .env.example file and update with the correct values for your environment

4. **Start the app**

   ```sh
    npm start
   ```

   This command will start the Expo CLI and launch the development server. You'll see a QR code and a Metro Bundler interface in your terminal or default browser.

5. **Open Expo Go App:**

   On your mobile device, open the Expo Go app.

6. **Scan the QR Code:**

   Use the Expo Go app to scan the QR code displayed in the terminal or Metro Bundler interface.

7. **View Your App:**

   Once scanned, your Expo app will load on your mobile device. Any changes you make to your code will automatically refresh in the Expo Go app.
