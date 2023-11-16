import { router } from "expo-router";
import { useContext, useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import RestaurantImage from "../src/assets/restaurant.png";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import { MealCard } from "../src/components/meal_card";
import AuthContext from "../src/contexts/auth";

interface Restaurant {
  name: string;
}

export default function Restaurant() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { rest, setMeal } = authContext;
  if (!rest) return null;

  const meals = useMemo(() => {
    // console.log(rest);
    return rest.meals ?? [];
  }, [rest.meals]);

  return (
    <View className="flex-1 relative">
      <Header className="absolute top-0 left-0 right-0">
        <BackButton
          name={"arrow-left"}
          size={28}
          testID="goBack"
          className={"text-white"}
          onPress={() => router.back()}
        />

        <Text className="text-white text-lg">Cardápio</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 mt-16">
        <View className="w-full h-20 bg-white items-center justify-center">
          <Text className="text-xl text-[#A60C0C]">{rest.name}</Text>
        </View>

        <View className="px-1 mt-2">
          <Image source={RestaurantImage} className="w-full" />

          <View className="mt-2">
            {meals.map((meal, idx) => (
              <MealCard key={idx} meal={meal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
