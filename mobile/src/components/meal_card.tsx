import { FontAwesome } from '@expo/vector-icons';
import { Image, Text, ToastAndroid, View } from "react-native";

import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RestaurantImage from '../assets/restaurant.png';
import { generateRandomPatternArray, generateRandomValue } from '../utils/fake';

interface Props {
  name: string
}

export function MealCard({
  name
}: Props) {
  const router = useRouter();

  function handleSeeMeal() {
    ToastAndroid.showWithGravity(
      `Ver refeição`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    router.push('meal_info');
  }

  function onClickPedirMarmita() {
    ToastAndroid.showWithGravity(
      `Pedir Marmita`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  function onClickAddComentario() {
    ToastAndroid.showWithGravity(
      `Adicionar comentário`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  return (
    <TouchableOpacity
      onPress={() => handleSeeMeal()}
      className="w-full h-32 p-1 flex-row gap-0"
    >
      <Image
        source={RestaurantImage}
        className="w-36 h-28"
      />

      <View className="w-full h-28 py-3 px-5 flex-1 bg-[#FFF2F2] flex-col justify-between">
        <Text className='font-bold text-xs text-[#A60C0C]'>
          {name}
        </Text>

        <View className='flex-row items-center justify-between'>
          <View className='flex-row'>
            <Text className='text-[#EA6767] text-[10px]'>
              Valor: 
            </Text>

            <Text className='ml-1 text-[#EA6767] text-[10px]'>
              R$ {generateRandomValue()}
            </Text>
          </View>

          <View className='flex-row'>
            {generateRandomPatternArray().map((i, v) => (
              i == 1 ? <FontAwesome key={v} name='star' /> : <FontAwesome key={v} name='star-o' disabled={true} />
            ))}
          </View>
        </View>

        <View className="w-full flex-col">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onClickPedirMarmita()}
              className='px-4 py-2 bg-[#A60C0C] rounded-md'
            >
              <Text className='text-[10px] text-white'>
                Pedir marmita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onClickAddComentario()}
            >
              <FontAwesome size={24} color={'#A60C0C'} name={'plus-circle'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  )
}