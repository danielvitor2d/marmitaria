import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState } from "react";
import { Modal, Pressable, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Restaurant, Suggestion } from "../../app/restaurants";
import AuthContext from "../contexts/auth";
import { Meal } from '../services/meal-service';

interface Props {
  suggestion: Suggestion;
  onAcceptSuggestion: () => Promise<void>
}

export function SuggestionCard({
  suggestion,
  onAcceptSuggestion
}: Props) {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const [modalVisible, setModalVisible] = useState(false);

  const { type, model, data } = suggestion;

  function handleAcceptSuggestion() {
    setModalVisible(false)

    ToastAndroid.showWithGravity(
      `Aceitando sugestão...`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    onAcceptSuggestion()
  }

  function handleClickVisualizeSuggestion() {
    ToastAndroid.showWithGravity(
      `Visualizando...`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  const getTitle = () => {
    if (type === 'create') return "Criar";
    if (type === 'update') return "Editar";
    return "Deletar";
  }

  const getModel = () => {
    if (model === 'meal') return 'Marmita';
    return 'Restaurante';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='w-full mt-3 pr-4 bg-[#FFF2F2] rounded-lg border border-red-600'
    >
      <View
        className="w-full flex-row items-center"
      >
        <View className="py-3 px-5 flex-1 flex-col justify-between">
          <View className="w-full flex-col">
            <Text className="text-[#A60C0C] text-lg">{getTitle() + ' ' + getModel()}</Text>
            {
              model === 'meal'
              ? <Text className="text-[#A60C0C] text-lg">{(data as Meal).name}</Text>
              : <Text className="text-[#A60C0C] text-lg">{(data as { rest: Restaurant }).rest.name}</Text>
            }
          </View>

          <View className="w-52 mt-2 flex flex-row">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClickVisualizeSuggestion}
              className="px-2 py-1 bg-[#ce1717] rounded-md"
            >
              <Text className="text-[13px] text-white text-center">Visualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(prev => !prev)}
              className="ml-2 px-2 py-1 bg-[#1020cb] rounded-md"
            >
              <Text className="text-[13px] text-white text-center">Aceitar</Text>
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

                    <Pressable className='ml-2 px-2 py-1 bg-[#ce1717] rounded-md' onPress={() => handleAcceptSuggestion()}>
                      <Text className="text-white">Sim</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
        >
          <FontAwesome size={16} color={"#A60C0C"} name={"close"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
