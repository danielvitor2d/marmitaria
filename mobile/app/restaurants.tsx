import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import ProfileImage from '../src/assets/mini_profile.svg';
import { BackButton } from '../src/components/back_button';
import { Header } from "../src/components/header";
import { RestaurantCard } from '../src/components/restaurant_card';

interface Restaurant {
  name: string;
}

export default function Restaurants() {
  const restaurants: Array<Restaurant> = [
    {
      name: 'Restaurante Bondiboka',
    },
    {
      name: 'Sabores do Sertão',
    },
    {
      name: 'Nori',
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
  ]

  return (
    <View className='flex-1 relative'>
      <Header className='absolute top-1 left-0 right-0'>
        <BackButton
          name={'log-out'}
          type={'NEUTRAL'}
          onPress={() => router.replace('login')}
          size={26}
        ></BackButton>

        <Text className="text-white text-lg">
          Restaurantes
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('profile')}
        >
          <ProfileImage
            className="h-2 w-2 border bg-green-600"
          />
        </TouchableOpacity>
      </Header>

      <ScrollView className="flex-1 mt-16">
        <View className="w-full h-20 bg-white items-center justify-center">

          <View className='flex-row gap-8 items-center justify-between'>
            <TouchableOpacity>
              <Feather
                size={38}
                color={'#A60C0C'}
                name='list'
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome
                size={36}
                color={'#A60C0C'}
                name='map-o'
              />
            </TouchableOpacity>
          </View>

        </View>

        <View className='px-1'>
          {
            restaurants.map((rest, idx) => (
              <RestaurantCard key={idx} name={rest.name} />
            ))
          }
        </View>

      </ScrollView>
    </View>
  )
}