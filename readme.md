# HB+ FIT – Member Portal

A secure organization member portal built with **Expo, React Native, Expo Router, NativeWind, and Firebase Authentication**. Users sign in using Google accounts with a verified `@hbplus.fit` email address.

## Tech Stack

- React Native + Expo
- Expo Router
- NativeWind
- Firebase Authentication
- Google Sign-In

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### 2. Configure Firebase

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Register a Web App and obtain its Firebase configuration.
3. Navigate to **Authentication → Sign-in method** and enable Google.
4. Configure the Google OAuth Web Client ID and Client Secret.
5. Add `localhost` and `hb-plus-0.firebaseapp.com` to Firebase authorized domains.

### 3. Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=hb-plus-0.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=hb-plus-0
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id
```

Replace placeholders with your Firebase and Google OAuth configuration values.

### 4. Run the Application

```bash
npx expo start
```

For web:

```bash
npx expo start --web
```

## Authentication Flow

1. User opens the login page and selects **Continue with Google**.
2. Firebase authenticates the user through Google Sign-In.
3. The application retrieves the authenticated Firebase user.
4. It validates the user's email domain and verification status.
5. Invalid or unverified accounts are immediately signed out.
6. Valid users can access the protected dashboard.

The application uses Firebase's `onAuthStateChanged()` through React Context to maintain authentication state across screens.

## Domain Restriction

Access is restricted to verified organization email addresses ending in:

`@hbplus.fit`

The application checks both the email domain and Firebase's `emailVerified` property.

```typescript
const email = result.user.email?.trim().toLowerCase();

if (
  !email ||
  !email.endsWith("@hbplus.fit") ||
  !result.user.emailVerified
) {
  await signOut(auth);
  throw new Error(
    "Access denied: use a verified @hbplus.fit account."
  );
}
```

**Expected behavior:**

| Account | Access |
|---|---|
| `employee@hbplus.fit` (verified) | Allowed |
| `employee@gmail.com` | Denied |
| `employee@hbplus.fit` (unverified) | Denied |

## Security Note

Domain validation is currently implemented on the client side. For production security, the backend must independently verify Firebase ID tokens using Firebase Admin SDK and enforce email verification, domain restrictions, and account permissions.

---

**HB+ FIT — Secure Organization Member Portal**