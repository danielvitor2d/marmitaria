import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import { RestaurantCard } from "../src/components/restaurant_card";
import AuthContext from "../src/contexts/auth";

interface Restaurant {
  name: string;
}

type ModeType = "list" | "fav-list" | "map";

export default function Restaurants() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { logout } = authContext;
  const router = useRouter();

  const [mode, setMode] = useState<ModeType>("list");

  const restaurants: Array<Restaurant> = [
    {
      name: "Restaurante Bondiboka",
    },
    {
      name: "Sabores do Sertão",
    },
    {
      name: "Nori",
    },
    {
      name: `Pizza's`,
    },
    {
      name: `Vila da Telha`,
    },
    {
      name: `Quinta Estação`,
    },
    {
      name: `Pannetus`,
    },
  ];

  function onChangeMode(newMode: ModeType) {
    setMode(newMode);
  }

  function onLogout() {
    logout();
    router.replace("login");
  }

  return (
    <View className="flex-1 relative">
      <Header className="absolute top-1 left-0 right-0">
        <BackButton
          name={"log-out"}
          type={"NEUTRAL"}
          onPress={() => onLogout()}
          size={26}
        ></BackButton>

        <Text className="text-white text-lg">Restaurantes</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 mt-16">
        <View className="w-full h-20 bg-white items-center justify-center">
          <View className="flex-row gap-16 items-center justify-between">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChangeMode("map")}
              className="items-center gap-2"
            >
              {mode === "map" ? (
                <MaterialCommunityIcons
                  size={36}
                  color={"#A60C0C"}
                  name="map"
                />
              ) : (
                <MaterialCommunityIcons
                  size={36}
                  color={"#A60C0C"}
                  name="map-outline"
                />
              )}
              <Text className="text-[#A60C0C] text-xs">Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChangeMode("list")}
              className="items-center gap-2"
            >
              {mode === "list" ? (
                <Ionicons
                  size={38}
                  color={"#A60C0C"}
                  name="list-circle-sharp"
                />
              ) : (
                <Ionicons
                  size={38}
                  color={"#A60C0C"}
                  name="list-circle-outline"
                />
              )}

              <Text className="text-[#A60C0C] text-xs">Listagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChangeMode("fav-list")}
              className="items-center gap-2"
            >
              {mode === "fav-list" ? (
                <FontAwesome size={36} color={"#A60C0C"} name="bookmark" />
              ) : (
                <FontAwesome size={36} color={"#A60C0C"} name="bookmark-o" />
              )}
              <Text className="text-[#A60C0C] text-xs">Favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {mode === "list" ? (
          <View className="px-1">
            {restaurants.map((rest, idx) => (
              <RestaurantCard key={idx} name={rest.name} />
            ))}
          </View>
        ) : mode === "fav-list" ? (
          <View className="px-1">
            {restaurants.map((rest, idx) => (
              <RestaurantCard key={idx} name={rest.name} />
            ))}
          </View>
        ) : (
          <View className="w-full h-full p-1 flex-1 items-center justify-center">
            <Text>Mapa</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
