import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Modal, Pressable, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Meal } from "../../app/restaurants";
import FeijoadaImage from "../assets/feijoada.png";
import AuthContext from "../contexts/auth";
import { generateRandomPatternArray } from "../utils/fake";

interface Props {
  meal: Meal;
  onSuggestRemoveMeal: () => Promise<void>
}

export function MealCard({ meal, onSuggestRemoveMeal }: Props) {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { setMeal } = authContext;

  const router = useRouter();

  const [modalSuggestDelete, setModalSuggestDelete] = useState(false);

  function onClickPedirMarmita() {
    ToastAndroid.showWithGravity(
      `Pedir Marmita`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  function onClickAddComentario() {
    ToastAndroid.showWithGravity(
      `Adicionar avaliação`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    setMeal(meal);

    router.push("meal_info");
  }

  function onEditMeal() {
    ToastAndroid.showWithGravity(
      `Redirecionando para página da refeição`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    setMeal({
      ...meal,
      id: meal._id ?? '',
    });

    router.push('edit_meal')
  }

  function handleSuggestRemoveMeal() {
    setModalSuggestDelete(false)

    onSuggestRemoveMeal()
  }

  return (
    <TouchableOpacity
      className="w-full h-32 p-1 flex-row gap-0"
    >
      <Image source={FeijoadaImage} className="w-36 h-28" />

      <View className="w-full h-28 py-3 px-5 flex-1 bg-[#FFF2F2] flex-col justify-between">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xs text-[#A60C0C]">{meal.name}</Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onEditMeal()}
            >
              <FontAwesome size={16} color={"#A60C0C"} name={"pencil"} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalSuggestDelete(true)}
            >
              <FontAwesome size={16} color={"#A60C0C"} name={"trash"} />
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSuggestDelete}
              onRequestClose={() => setModalSuggestDelete(false)}
            >
              <View className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000080]">
                <View className="bg-white rounded-lg p-8">
                  <Text className="text-lg mb-4">Tem certeza de que deseja prosseguir?</Text>
                  
                  <View className='flex-row items-center justify-end'>
                    <Pressable className='ml-2 px-2 py-1 bg-[#d9d9d9] rounded-md' onPress={() => setModalSuggestDelete(false)}>
                      <Text className="text-black">Cancelar</Text>
                    </Pressable>

                    <Pressable className='ml-2 px-2 py-1 bg-[#ce1717] rounded-md' onPress={() => handleSuggestRemoveMeal()}>
                      <Text className="text-white">Sim</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <Text className="text-[#EA6767] text-[10px]">Valor:</Text>

            <Text className="ml-1 text-[#EA6767] text-[10px]">
              R$ {meal.value}
            </Text>
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

        <View className="w-full flex-col">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onClickPedirMarmita()}
              className="px-4 py-2 bg-[#A60C0C] rounded-md"
            >
              <Text className="text-[10px] text-white">Pedir marmita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onClickAddComentario()}
            >
              <FontAwesome size={24} color={"#A60C0C"} name={"plus-circle"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
