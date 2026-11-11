import { useEffect } from "react";
import { Stack } from "expo-router";
import "../../global.css"
import { useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import {
  AuthProvider,
} from "@/context/AuthContext";

import { useAuth } from "@/hooks/useAuth";

function RootNavigation() {
  const { user, loading } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(protected)/dashboard");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}


