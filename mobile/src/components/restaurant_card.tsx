import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Modal, Pressable, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Restaurant } from "../../app/restaurants";
import RestaurantImage from "../assets/restaurant.png";
import AuthContext from "../contexts/auth";

interface Props {
  rest: Restaurant;
  isFavorite: boolean;
  estrelas: number[];
  onClickFavorite: () => void;
  onRemoveRestaurant: () => Promise<void>;
}

export function RestaurantCard({
  rest,
  isFavorite,
  estrelas,
  onClickFavorite,
  onRemoveRestaurant,
}: Props) {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { isAdmin, setRest } = authContext;

  const [modalVisible, setModalVisible] = useState(false);

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

  function handleRemoveRestaurant() {
    if (!isAdmin) return;
    setModalVisible(false);

    onRemoveRestaurant();
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
              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onEditRestaurant()}
                >
                  <FontAwesome size={16} color={"#A60C0C"} name={"pencil"} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(true)}
                >
                  <FontAwesome size={16} color={"#A60C0C"} name={"trash"} />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000080]">
                    <View className="bg-white rounded-lg p-8">
                      <Text className="text-lg mb-4">Tem certeza de que deseja prosseguir?</Text>
                      
                      <View className='flex-row items-center justify-end'>
                        <Pressable className='ml-2 px-2 py-1 bg-[#d9d9d9] rounded-md' onPress={() => setModalVisible(false)}>
                          <Text className="text-black">Cancelar</Text>
                        </Pressable>

                        <Pressable className='ml-2 px-2 py-1 bg-[#ce1717] rounded-md' onPress={() => handleRemoveRestaurant()}>
                          <Text className="text-white">Sim</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
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
            {estrelas.map((i, v) =>
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
