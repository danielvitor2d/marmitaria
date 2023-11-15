import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import RestaurantImage from "../src/assets/restaurant.png";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import { MealCard } from "../src/components/meal_card";

interface Restaurant {
  name: string;
}

export default function Restaurant() {
  const meals: Array<Restaurant> = [
    {
      name: "Feijoada do Restaurante Bondiboka",
    },
    {
      name: "Feijoada do Sabores do Sertão",
    },
    {
      name: "Feijoada do Nori",
    },
    {
      name: `Feijoada do Pizza's`,
    },
    {
      name: `Feijoada do Vila da Telha`,
    },
    {
      name: `Feijoada do Quinta Estação`,
    },
    {
      name: `Feijoada do Pannetus`,
    },
  ];

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
          <Text className="text-xl text-[#A60C0C]">Restaurante Bondiboka</Text>
        </View>

        <View className="px-1 mt-2">
          <Image source={RestaurantImage} className="w-full" />

          <View className="mt-2">
            {meals.map((rest, idx) => (
              <MealCard key={idx} name={rest.name} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
