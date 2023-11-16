import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Restaurant } from "../../app/restaurants";
import RestaurantImage from "../assets/restaurant.png";
import AuthContext from "../contexts/auth";
import { generateRandomPatternArray } from "../utils/fake";

interface Props {
  rest: Restaurant;
  isFavorite: boolean;
  onClickFavorite: () => void;
}

export function RestaurantCard({ rest, isFavorite, onClickFavorite }: Props) {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { isAdmin, setRest } = authContext;

  const router = useRouter();

  async function handleSeeRestaurant() {
    ToastAndroid.showWithGravity(
      `Redirecionando para página do restaurante`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    setRest(rest);
    // console.log(rest)

    router.push("restaurant");
  }

  function onEditRestaurant() {
    if (!isAdmin) return;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSeeRestaurant()}
      className="w-full h-32 p-1 flex-row gap-0"
    >
      <Image source={RestaurantImage} className="w-36 h-28" />

      <View className="w-full h-28 py-3 px-5 flex-1 bg-[#FFF2F2] flex-col justify-between">
        <View className="w-full flex-col">
          <View className="flex-row justify-between items-center">
            <Text className="text-[#A60C0C]">{rest.name}</Text>

            {!isAdmin ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onClickFavorite()}
              >
                {isFavorite ? (
                  <FontAwesome size={16} color={"#A60C0C"} name={"bookmark"} />
                ) : (
                  <FontAwesome
                    size={16}
                    color={"#A60C0C"}
                    name={"bookmark-o"}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onEditRestaurant()}
              >
                <FontAwesome size={16} color={"#A60C0C"} name={"pencil"} />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row items-center justify-start">
            <FontAwesome size={12} color={"#A60C0C"} name="map-marker" />

            <Text className="ml-1 text-[#A60C0C] text-xs">12km de você</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <Text className="ml-1 text-[#EA6767] text-xs">Valor médio:</Text>

            <Text className="ml-1 text-[#EA6767] text-xs">R$ {rest.value}</Text>
          </View>

          <View className="flex-row">
            {generateRandomPatternArray().map((i, v) =>
              i == 1 ? (
                <FontAwesome key={v} name="star" />
              ) : (
                <FontAwesome key={v} name="star-o" disabled={true} />
              )
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
