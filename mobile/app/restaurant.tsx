import { router } from "expo-router";
import { useContext, useMemo } from "react";
import { Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import RestaurantImage from "../src/assets/restaurant.png";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import { MealCard } from "../src/components/meal_card";
import AuthContext from "../src/contexts/auth";
import { addSuggestion } from "../src/services/suggestions-service";
import { Meal } from "./restaurants";

interface Restaurant {
  name: string;
}

export default function Restaurant() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { rest } = authContext;
  if (!rest) return null;

  const meals = useMemo(() => {
    return rest.meals ?? [];
  }, [rest.meals]);

  async function handleSuggestRemoveMeal(meal: Meal) {
    await addSuggestion({
      type: 'delete',
      model: 'meal',
      data: {
        ...meal,
        id: meal._id,
      }
    })

    ToastAndroid.showWithGravity(
      `Sugestão cadastrada!`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  function handleSuggestMeal() {
    router.push('register_meal');
  }

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

        <Text className="text-white text-lg">Marmitas</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          testID="profile"
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

          <View className="mt-2" testID="mealsList">
            {meals.map((meal, idx) => (
              <MealCard
                key={idx}
                meal={meal}
                onSuggestRemoveMeal={() => handleSuggestRemoveMeal(meal)}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleSuggestMeal()}
            className="px-4 py-2 bg-[#A60C0C] rounded-md items-center justify-center"
          >
            <Text className="text-xl text-white">Sugerir nova marmita</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
