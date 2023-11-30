import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import { BackButton } from "../src/components/back_button";
import { CustomButton } from "../src/components/custom_button";
import { Header } from "../src/components/header";
import ReviewCard from "../src/components/review_card";
import AuthContext from "../src/contexts/auth";
import { Review, findAllReviews, findByMeal } from "../src/services/reviews-service";

export default function Meal() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { meal } = authContext;
  if (!meal) return null;

  const [reviews, setReviews] = useState<Array<Review>>([])

  const router = useRouter();

  async function fetchReviews() {
    if (!meal) return;

    const rev = await findByMeal(meal._id ?? '');
    // console.log(rev);
    setReviews([...rev])
  }

  useFocusEffect(useCallback(
    () => {
      fetchReviews()
    },
  []))

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

        <Text className="text-white text-lg">Ver Avaliações</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="w-full flex-1 mt-16">
        <Text className="text-black text-lg font-bold text-center">
          {`Avaliações de ${meal.name}`}
        </Text>

        <View className="w-full px-1">
          {reviews
            .map((review, idx) => (
              <ReviewCard
                key={idx}
                review={review}
              />
            ))}
        </View>
      </ScrollView>

      <CustomButton
        fontSize={14}
        text={"Nova avaliação"}
        type="PRIMARY"
        testID="registerButton"
        className="self-center mt-5"
        onPress={() => router.push('meal_info')}
      ></CustomButton>
    </View>
  );
}
