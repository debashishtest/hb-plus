
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";

import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FA]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[460px] self-center px-6 py-10">

          <View className="mb-8 flex-row items-center justify-center gap-3">
            <View className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#172554]">
              <Text className="text-[17px] font-extrabold tracking-tight text-white">
                HB+
              </Text>
            </View>

            <Text className="text-lg font-extrabold tracking-[2px] text-[#172554]">
              HB+ FIT
            </Text>
          </View>

          <View className="rounded-[22px] border border-[#E8EBF1] bg-white p-[30px]">

            <View className="mb-8">
              <Text className="mb-3 text-[11px] font-bold tracking-[2px] text-slate-500">
                MEMBER PORTAL
              </Text>

              <Text className="mb-3 text-[32px] font-extrabold tracking-tight text-[#172554]">
                Welcome back.
              </Text>

              <Text className="text-[15px] leading-[23px] text-slate-500">
                Sign in to access your HB+ workspace
                and manage your account.
              </Text>
            </View>

            <View className="gap-[22px]">

              <GoogleSignInButton />

              <View className="flex-row items-center gap-3">
                <View className="h-px flex-1 bg-[#E8EBF1]" />

                <Text className="text-[10px] font-bold tracking-widest text-slate-400">
                  SECURE ACCESS
                </Text>

                <View className="h-px flex-1 bg-[#E8EBF1]" />
              </View>

              <View className="flex-row items-start gap-3 rounded-xl bg-slate-100 p-4">
                <Text className="text-base text-slate-600">
                  ⓘ
                </Text>

                <Text className="flex-1 text-xs leading-[19px] text-slate-600">
                  Access is restricted to verified
                  @hbplus.fit accounts.
                </Text>
              </View>
            </View>

            <View className="mt-7 flex-row items-center justify-center gap-2 border-t border-slate-100 pt-5">
              <Text className="font-extrabold text-green-600">
                ✓
              </Text>

              <Text className="text-[11px] text-slate-500">
                Secure authentication powered by Google
              </Text>
            </View>
          </View>

          <View className="mt-[30px] items-center gap-2">
            <Text className="text-[11px] text-slate-500">
              © 2026 HB+ FIT. All rights reserved.
            </Text>

            <Text className="text-[10px] text-slate-400">
              Authorized access only
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
