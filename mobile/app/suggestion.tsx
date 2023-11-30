import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import ProfileImage from "../src/assets/mini_profile.svg";
import { BackButton } from "../src/components/back_button";
import { Header } from "../src/components/header";
import AuthContext from "../src/contexts/auth";
import { Meal, Restaurant, Suggestion } from "./restaurants";

export default function SuggestionView() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { suggestion: ss } = authContext;
  const suggestion = ss as Suggestion

  const router = useRouter();

  const data = suggestion.data as {
    rest: Restaurant,
    meal: Meal
  }

  const getTitle = () => {
    if (suggestion.type === 'create') return "Criar";
    if (suggestion.type === 'update') return "Editar";
    return "Deletar";
  }

  const getModel = () => {
    if (suggestion.model === 'meal') return 'Marmita';
    return 'Restaurante';
  }

  useEffect(() => {
    console.log(suggestion)
  }, [])

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

        <Text className="text-white text-lg">Visualizar Sugestão</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          testID="profile"
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 mt-16">

        <Text className="text-2xl font-bold text-center">
          {"Sugestão: " + getTitle() + ' ' + getModel()}
        </Text>
        
        {
          data.rest && (
            <View className="flex-col items-center justify-center">
              <Text className="text-black text-lg">{'Restaurante: ' + data.rest.name}</Text>
              <Text className="text-black">{'Endereço: ' + data.rest.address}</Text>
              <Text className="text-black">{'Preço Médio: ' + data.rest.value}</Text>
              <Text className="text-black">{'Formas de Pagamento: ' + data.rest.paymentforms}</Text>
            </View>
          )
        }
        
        {
          data.meal && (
            <View className="flex-col items-center justify-center">
              <Text className="text-black text-lg">{'Nome: ' + data.meal.name}</Text>
              <Text className="text-black">{'Descrição: ' + data.meal.desc}</Text>
              <Text className="text-black">{'Preço Médio: ' + data.meal.value}</Text>
            </View>
          )
        }

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className={`w-fit mt-4 px-4 py-1 self-center rounded-md items-center bg-white border border-black`}
        >
          <Text className="text-base">{"Voltar"}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}