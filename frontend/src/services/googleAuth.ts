import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

export async function signInWithGoogleIdToken(idToken: string) {
  if (!idToken) {
    throw new Error("Google ID token is missing.");
  }

  const credential = GoogleAuthProvider.credential(idToken);

  const result = await signInWithCredential(auth, credential);

  const email = result.user.email?.trim().toLowerCase();

  if (
    !email ||
    !email.endsWith("@hbplus.fit") ||
    !result.user.emailVerified
  ) {
    await signOut(auth);

    throw new Error(
      "Access denied. Use a verified @hbplus.fit Google account."
    );
  }

  return result.user;
}