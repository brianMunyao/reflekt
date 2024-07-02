# Reflekt - Journaling App

This is a simple journaling app with a backend built using Node.js, Express.js, TypeScript, and PostgreSQL, and a mobile frontend built using React Native.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Mobile Setup](#mobile-setup)
- [Running the Application](#running-the-application)

## Prerequisites

- Node.js
- PostgreSQL
- npm
- React Native CLI

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
   Copy the values in the .ev.example file and update with the correct values for your environment

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
- Coming soon 😁

## Running the Application

1. Ensure PostgreSQL is running and the backend server is started:

   ```sh
   cd backend
   npm run dev
   # or
   yarn dev
   ```

2. Mobile folder coming soon 😁
