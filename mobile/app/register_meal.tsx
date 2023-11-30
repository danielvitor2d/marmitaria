import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

import ProfileImage from "../src/assets/mini_profile.svg";
import { BackButton } from "../src/components/back_button";
import { CustomButton } from "../src/components/custom_button";
import { Header } from "../src/components/header";
import AuthContext from "../src/contexts/auth";
import { addSuggestion } from "../src/services/suggeestions-service";

interface Prato {
  id: string;
  name: string;
  description: string;
  value: string;
}

export default function RegisterMeal() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { rest } = authContext
  if (!rest) return null;

  const router = useRouter();

  const [prato, setPrato] = useState<Prato>({
    id: '',
    description: '',
    name: '',
    value: '',
  });

  async function onCadastrarSugestao() {
    if (!prato.description || !prato.name || !prato.value) {
      ToastAndroid.showWithGravity(
        `Existem informações faltando.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      return;
    }

    await addSuggestion({
      type: 'create',
      model: 'meal',
      data: {
        meal: {
          ...prato,
          desc: prato.description,
        },
        rest
      },
    })

    router.back();
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

        <Text className="text-white text-lg">Sugerir marmita</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("profile")}
        >
          <ProfileImage className="h-2 w-2 border bg-green-600" />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 mt-16 px-1">
        <View className="w-full px-4 pt-2">
          <View className="w-full gap-1 mb-5 mt-1">
            <Text className="text-base text-[#A60C0C]">Nome</Text>

            <TextInput
              testID="name"
              className="px-2 py-1 border border-[#797979] rounded-md"
              placeholder={"Ex. Feijoada"}
              selectionColor={"black"}
              value={prato.name}
              onChangeText={(newText) => {
                setPrato(prev => ({
                  ...prev,
                  name: newText
                }))
              }}
            ></TextInput>
          </View>

          <View className="w-full gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">
              Descrição
            </Text>

            <TextInput
              testID="name"
              className="px-2 py-1 border border-[#797979] rounded-md"
              placeholder={"Ex. Feijão, calabresa"}
              selectionColor={"black"}
              value={prato.description}
              onChangeText={(newText) => {
                setPrato(prev => ({
                  ...prev,
                  description: newText
                }))
              }}
            ></TextInput>
          </View>

          <View className="w-full gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Valor</Text>

            <TextInput
              testID="name"
              className="px-2 py-1 border border-[#797979] rounded-md"
              placeholder={"Ex. R$ 20,00"}
              selectionColor={"black"}
              value={prato.value}
              onChangeText={(newText) => {
                setPrato(prev => ({
                  ...prev,
                  value: newText
                }))
              }}
            ></TextInput>
          </View>
        </View>

        <CustomButton
          fontSize={14}
          text={"Cadastrar sugestão"}
          type="PRIMARY"
          testID="registerButton"
          className="self-center mt-5"
          onPress={() => onCadastrarSugestao()}
        ></CustomButton>
      </ScrollView>
    </View>
  )
}