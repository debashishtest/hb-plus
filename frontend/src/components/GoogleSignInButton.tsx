
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

import { signInWithGoogle } from "@/services/googleAuth.web";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const user = await signInWithGoogle();

      console.log("Authenticated:", user.email);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google authentication failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-3">
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className={`h-[54px] flex-row items-center justify-center gap-3 rounded-xl border border-[#DCE1E9] bg-white ${
          loading ? "opacity-60" : "active:bg-slate-50"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#172554" />
        ) : (
          <>
            <Text className="text-[21px] font-extrabold text-[#4285F4]">
              G
            </Text>

            <Text className="text-sm font-semibold text-slate-800">
              Continue with Google
            </Text>
          </>
        )}
      </Pressable>

      {error ? (
        <Text className="text-center text-xs leading-[18px] text-red-600">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
