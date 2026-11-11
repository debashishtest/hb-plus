import { useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import "../../global.css"

export default function RootLayout() {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("user-theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          Appearance.setColorScheme(savedTheme as ColorSchemeName);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  return <Stack />;
}
