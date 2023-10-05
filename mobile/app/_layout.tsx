import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isUserAuthenticated] = useState(false);

  const [hasLoadedFonts, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (hasLoadedFonts || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts, fontError]);

  if (!hasLoadedFonts && !fontError) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      className="flex-1"
    >
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" redirect={!isUserAuthenticated} />
        <Stack.Screen name="login" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="forgot_password" />
      </Stack>
    </View>
  );
}
