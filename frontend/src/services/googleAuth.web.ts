
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const result = await signInWithPopup(auth, provider);

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
