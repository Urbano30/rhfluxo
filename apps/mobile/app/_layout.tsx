import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  BalooBhaina2_400Regular,
  BalooBhaina2_500Medium,
  BalooBhaina2_600SemiBold,
  BalooBhaina2_700Bold,
} from "@expo-google-fonts/baloo-bhaina-2";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BalooBhaina2_400Regular,
    BalooBhaina2_500Medium,
    BalooBhaina2_600SemiBold,
    BalooBhaina2_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
