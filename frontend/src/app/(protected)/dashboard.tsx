
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  const displayName = user?.displayName || "HB+ Member";
  const email = user?.email || "No email available";
  const initial = displayName.charAt(0).toUpperCase();
  const firstName = displayName.split(" ")[0];
  const isVerified = user?.emailVerified ?? false;

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FA]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[1000px] self-center px-6 pb-10 pt-5">

          <View className="flex-row items-center justify-between border-b border-[#E5EAF1] pb-6">

            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-[13px] bg-[#172554]">
                <Text className="text-base font-extrabold text-white">
                  HB+
                </Text>
              </View>

              <View>
                <Text className="text-[17px] font-extrabold tracking-widest text-[#172554]">
                  HB+ FIT
                </Text>

                <Text className="mt-[3px] text-[9px] font-bold tracking-widest text-slate-400">
                  MEMBER PORTAL
                </Text>
              </View>
            </View>

            <Pressable
              onPress={handleLogout}
              disabled={loggingOut}
              className={`min-w-[85px] items-center rounded-[10px] border border-red-200 bg-red-50 px-[17px] py-[10px] ${
                loggingOut ? "opacity-60" : "active:bg-red-100"
              }`}
            >
              {loggingOut ? (
                <ActivityIndicator color="#DC2626" size="small" />
              ) : (
                <Text className="text-[13px] font-semibold text-red-600">
                  Sign out
                </Text>
              )}
            </Pressable>
          </View>

          <View className="mb-7 mt-10">
            <Text className="mb-3 text-[11px] font-bold tracking-[2px] text-slate-500">
              YOUR WORKSPACE
            </Text>

            <Text className="text-3xl font-extrabold tracking-tight text-[#172554]">
              Welcome back, {firstName}.
            </Text>

            <Text className="mt-2 text-sm leading-[21px] text-slate-500">
              Here's an overview of your HB+ account.
            </Text>
          </View>

          <View
            className={`flex-row items-center justify-between gap-3 rounded-[15px] border p-[18px] ${
              isVerified
                ? "border-emerald-100 bg-emerald-50"
                : "border-amber-100 bg-amber-50"
            }`}
          >
            <View className="flex-1 flex-row items-center gap-3">
              <View
                className={`h-[38px] w-[38px] items-center justify-center rounded-xl ${
                  isVerified ? "bg-emerald-100" : "bg-amber-100"
                }`}
              >
                <Text
                  className={`text-xl font-extrabold ${
                    isVerified ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isVerified ? "✓" : "!"}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  className={`text-sm font-bold ${
                    isVerified ? "text-emerald-800" : "text-amber-800"
                  }`}
                >
                  {isVerified ? "Email verified" : "Email not verified"}
                </Text>

                <Text
                  className={`mt-1 text-[11px] ${
                    isVerified ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {isVerified
                    ? "Your email address has been verified."
                    : "Please verify your email address."}
                </Text>
              </View>
            </View>

            <View
              className={`flex-row items-center gap-[6px] rounded-full px-[10px] py-[6px] ${
                isVerified ? "bg-emerald-100" : "bg-amber-100"
              }`}
            >
              <View
                className={`h-[6px] w-[6px] rounded-full ${
                  isVerified ? "bg-emerald-600" : "bg-amber-600"
                }`}
              />

              <Text
                className={`text-[11px] font-bold ${
                  isVerified ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {isVerified ? "Verified" : "Pending"}
              </Text>
            </View>
          </View>

          {/* Account Overview */}
          <View className="mb-4 mt-9">
            <Text className="text-lg font-bold text-[#172554]">
              Account overview
            </Text>

            <Text className="mt-[5px] text-xs text-slate-400">
              Your profile information
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E8EBF1] bg-white p-[22px]">

            <View className="flex-row items-center gap-[15px]">
              {user?.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  className="h-[58px] w-[58px] rounded-[18px]"
                />
              ) : (
                <View className="h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-blue-100">
                  <Text className="text-[23px] font-extrabold text-blue-700">
                    {initial}
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#172554]">
                  {displayName}
                </Text>

                <Text className="mt-[5px] text-[13px] text-slate-500">
                  {email}
                </Text>
              </View>
            </View>

            <View className="my-[22px] h-px bg-slate-100" />

            <View className="mb-[17px] flex-row items-center justify-between gap-3">
              <Text className="text-[13px] text-slate-500">
                Authentication
              </Text>

              <Text className="text-[13px] font-semibold text-slate-700">
                Google
              </Text>
            </View>

            <View className="mb-[17px] flex-row items-center justify-between gap-3">
              <Text className="text-[13px] text-slate-500">
                Email verification
              </Text>

              <Text
                className={`text-[13px] font-bold ${
                  isVerified ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {isVerified ? "Verified" : "Not verified"}
              </Text>
            </View>

            <View className="flex-row items-center justify-between gap-3">
              <Text className="text-[13px] text-slate-500">
                Account provider
              </Text>

              <Text className="text-[13px] font-semibold text-slate-700">
                Firebase
              </Text>
            </View>
          </View>

          <View className="mb-4 mt-9">
            <Text className="text-lg font-bold text-[#172554]">
              Quick access
            </Text>

            <Text className="mt-[5px] text-xs text-slate-400">
              Explore your workspace
            </Text>
          </View>

          <View className="flex-row gap-4">

            <View className="min-w-0 flex-1 rounded-2xl border border-[#E8EBF1] bg-white p-5">
              <View className="mb-[15px] h-[42px] w-[42px] items-center justify-center rounded-xl bg-blue-50">
                <Text className="text-[21px] font-bold text-blue-600">
                  ◉
                </Text>
              </View>

              <Text className="text-sm font-bold text-[#172554]">
                My Profile
              </Text>

              <Text className="mt-[7px] text-xs leading-[18px] text-slate-500">
                View your personal information
              </Text>
            </View>

            {/* Settings Card */}
            <View className="min-w-0 flex-1 rounded-2xl border border-[#E8EBF1] bg-white p-5">
              <View className="mb-[15px] h-[42px] w-[42px] items-center justify-center rounded-xl bg-blue-50">
                <Text className="text-[21px] font-bold text-blue-600">
                  ⚙
                </Text>
              </View>

              <Text className="text-sm font-bold text-[#172554]">
                Settings
              </Text>

              <Text className="mt-[7px] text-xs leading-[18px] text-slate-500">
                Manage your account preferences
              </Text>
            </View>

          </View>

          {/* Footer */}
          <View className="mt-[50px] items-center border-t border-[#E5EAF1] pt-6">
            <Text className="text-[13px] font-extrabold tracking-[2px] text-[#172554]">
              HB+ FIT
            </Text>

            <Text className="mt-[7px] text-xs text-slate-500">
              Secure organization workspace
            </Text>

            <Text className="mt-3 text-[10px] text-slate-400">
              © 2026 HB+ FIT. All rights reserved.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
