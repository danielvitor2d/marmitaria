import { FontAwesome } from '@expo/vector-icons';
import { Image, Text, View } from "react-native";

import RestaurantImage from '../assets/restaurant.png';
import { generateRandomPatternArray, generateRandomValue } from '../utils/fake';

interface Props {
  name: string
}

export function Card({
  name
}: Props) {
  return (
    <View className="w-full h-32 p-1 flex-row gap-0">
      <Image
        source={RestaurantImage}
        className="w-36 h-28"
      />

      <View
        className="w-full h-28 py-3 px-5 flex-1 bg-[#FFF2F2] flex-col justify-between"
      >
        <View className="w-full flex-col">

          <View className="flex-row justify-between items-center">
            <Text className='text-[#A60C0C]'>
              {name}
            </Text>

            <FontAwesome color={'#A60C0C'} name={'bookmark'} />
          </View>

          <View className='flex-row items-center justify-start'>
            <FontAwesome
              size={12}
              color={'#A60C0C'}
              name='map-marker'
            />

            <Text className='ml-1 text-[#A60C0C] text-xs'>
              12km de você
            </Text>
          </View>
        </View>

        <View className='flex-row items-center justify-between'>
          <View className='flex-row'>
            <Text className='ml-1 text-[#EA6767] text-xs'>
              Valor médio: 
            </Text>

            <Text className='ml-1 text-[#EA6767] text-xs'>
              R$ {generateRandomValue()}
            </Text>
          </View>

          <View className='flex-row'>
            {generateRandomPatternArray().map((i, v) => (
              i == 1 ? <FontAwesome name='star' /> : <FontAwesome name='star-o' disabled={true} />
            ))}
          </View>
        </View>
      </View>

    </View>
  )
}