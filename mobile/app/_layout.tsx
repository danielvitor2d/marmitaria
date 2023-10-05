import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isUserAuthenticated] = useState(false);

  const [hasLoadedFonts, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (hasLoadedFonts || fontError) {
      SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts, fontError]);

  if (!hasLoadedFonts && !fontError) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onLayout={onLayoutRootView}
      className="flex-1 py-6"
    >
      <SafeAreaView
        className="flex-1 w-full"
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
          <Stack.Screen name="profile" />
          <Stack.Screen name="registration" />
          <Stack.Screen name="forgot_password" />

          <Stack.Screen name="restaurants" />
        </Stack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
