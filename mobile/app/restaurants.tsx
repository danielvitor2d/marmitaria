import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import SuggestionO from "../src/assets/suggestion-o.png";
import Suggestion from "../src/assets/suggestion.png";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import { RestaurantCard } from "../src/components/restaurant_card";
import { SuggestionCard } from "../src/components/suggestion_card";
import AuthContext from "../src/contexts/auth";
import { register, update } from "../src/services/meal-service";
import { addMeal, getRests, register as registerRest } from "../src/services/rest-service";
import { finishSuggestion, getSuggestions } from "../src/services/suggeestions-service";
import { addFavorite, rmvFavorite } from "../src/services/user-service";
import { generateRandomPatternArray } from "../src/utils/fake";
import { Prato } from "./register_restaurant";

export interface Meal {
  _id?: string;
  id: string;
  name: string;
  desc: string;
  value: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  value: string;
  paymentforms: string;
  isSuggestion: boolean;
  meals: Array<Meal>;
}

export interface Suggestion {
  id: string;
  type: 'create' | 'update' | 'delete',
  model: 'rest' | 'meal'
  data: object;
}

type ModeType = "list" | "fav-list" | "map" | "suggestions";

export default function Restaurants() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { logout, isAdmin, setRest, user, refetchUser } = authContext;
  if (!user) return null;

  const router = useRouter();

  const [mode, setMode] = useState<ModeType>("list");

  const [restaurants, setrestaurants] = useState<Array<Restaurant>>([]);
  const [suggestions, setsuggestions] = useState<Array<Suggestion>>([]);

  function onChangeMode(newMode: ModeType) {
    setMode(newMode);
  }

  function onLogout() {
    logout();
    router.replace("login");
  }

  function onAddRestaurant() {
    router.push("register_restaurant");
  }

  async function fetchRestaurants() {
    const rests = await getRests();
    setrestaurants([...rests]);
  }

  async function fetchSuggestions() {
    const suggestions = await getSuggestions();
    setsuggestions([...suggestions]);
  }

  async function onClickFavorite(rest_id: string) {
    if (!user) return;

    if (user.favorites && user.favorites.includes(rest_id)) {
      rmvFavorite(user.id, rest_id);
    } else {
      addFavorite(user.id, rest_id);
    }

    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
    await fetchRestaurants();
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
    await refetchUser();
  }

  async function handleAcceptSuggestion(suggestion: Suggestion) {
    if (suggestion.model === 'meal') {
      if (suggestion.type === 'create') {
        const prato = (suggestion.data as { meal: Meal }).meal
        const rest = (suggestion.data as { rest: Restaurant }).rest

        const { registered, meal } = await register({
          name: prato.name,
          desc: prato.desc,
          value: prato.value,
        });

        if (registered && meal) {
          await addMeal(rest.id, meal.id)

          await finishSuggestion(suggestion.id)
  
          await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

          ToastAndroid.showWithGravity(
            `Sugestão aceita!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    
          setRest(null);
          fetchRestaurants();
          fetchSuggestions();
        } else {
          ToastAndroid.showWithGravity(
            `Erro ao aceitar sugestão! Tente novamente mais tarde.`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
          
        return;
      }

      if (suggestion.type === 'update') {
        const { meal, updated } = await update({
          ...(suggestion.data as Meal)
        })

        if (updated && meal) {
          await finishSuggestion(suggestion.id)
  
          await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

          ToastAndroid.showWithGravity(
            `Sugestão aceita!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    
          setRest(null);
          fetchRestaurants();
          fetchSuggestions();
        } else {
          ToastAndroid.showWithGravity(
            `Erro ao aceitar sugestão! Tente novamente mais tarde.`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }

        return;
      }

      

      return;
    }

    if (suggestion.model === 'rest') {
      console.log(suggestion)

      const { rest: { name, address, paymentforms, value: price }, meals: pratos } = suggestion.data as { rest: Restaurant, meals: Prato[] };

      let mealsId: Array<string> = [];
      for await (const prato of pratos) {
        const { registered, meal } = await register({
          name: prato.name,
          desc: prato.description,
          value: prato.value,
        });
        if (registered && meal) {
          mealsId.push(meal?.id);
        }
      }
  
      const { rest, registered: restRegistered } = await registerRest({
        name,
        address,
        paymentforms,
        value: price,
        isSuggestion: false,
      });
  
      if (restRegistered && rest) {
        for await (const mealId of mealsId) {
          await addMeal(rest.id, mealId);
        }

        await finishSuggestion(suggestion.id)
  
        await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  
        ToastAndroid.showWithGravity(
          `Sugestão aceita!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
  
        setRest(null);
        fetchRestaurants();
        fetchSuggestions();
      } else {
        ToastAndroid.showWithGravity(
          `Erro ao cadastrar restaurante. Tente novamente mais tarde.`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      setRest(null);
      fetchRestaurants();
      fetchSuggestions();
    }, [])
  );

  return (
    <View className="flex-1 relative">
      <Header className="absolute top-1 left-0 right-0">
        <BackButton
          name={"log-out"}
          type={"NEUTRAL"}
          onPress={() => onLogout()}
          size={26}
          className="rotate-180"
        ></BackButton>

        <Text className="text-white text-lg">
          Restaurantes {isAdmin ? " (admin)" : ""}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 h-full mt-16">
        <View className="w-full h-20 bg-white items-center justify-center">
          <View className="w-full px-12 flex-row items-center justify-around">
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

            {!isAdmin && (
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
            )}

            {isAdmin && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onChangeMode("suggestions")}
                className="flex items-center gap-2"
              >
                {mode === "suggestions" ? (
                  <Image source={Suggestion} className="h-10 w-10" />
                ) : (
                  <Image source={SuggestionO} className="h-10 w-10" />
                )}
                <Text className="text-[#A60C0C] text-xs">Sugestões</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {mode === "list" ? (
          <View className="px-1">
            {restaurants
              .filter((rest) => !rest.isSuggestion)
              .map((rest, idx) => (
                <RestaurantCard
                  key={idx}
                  rest={rest}
                  estrelas={generateRandomPatternArray()}
                  isFavorite={
                    user.favorites && user.favorites.includes(rest.id)
                  }
                  onClickFavorite={() => onClickFavorite(rest.id)}
                />
              ))}
          </View>
        ) : mode === "fav-list" ? (
          <View className="px-1">
            {restaurants.map(
              (rest, idx) =>
                user.favorites &&
                user.favorites.includes(rest.id) && (
                  <RestaurantCard
                    key={idx}
                    rest={rest}
                    estrelas={generateRandomPatternArray()}
                    isFavorite={true}
                    onClickFavorite={() => onClickFavorite(rest.id)}
                  />
                )
            )}
          </View>
        ) : mode === "suggestions" ? (
          <View className="px-1">
            {suggestions
              .map((suggestion, idx) => (
                <SuggestionCard
                  key={idx}
                  suggestion={suggestion}
                  onAcceptSuggestion={() => handleAcceptSuggestion(suggestion)}
                />
              ))}
          </View>
        ) : (
          // MAPA
          <View className="w-full h-full p-1 flex-1 items-center justify-center">
            <Text className="text-lg font-bold">Em Breve!</Text>
            {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE} /> */}
          </View>
        )}
      </ScrollView>

      <View className={"absolute bottom-4 right-4"}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onAddRestaurant()}
          className={"bg-[#A60C0C] p-4 rounded-full shadow-md"}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
