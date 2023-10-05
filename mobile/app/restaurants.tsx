import { Feather, FontAwesome } from '@expo/vector-icons';
import { ScrollView, View } from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from '../src/components/card';
import { Header } from "../src/components/header";

export default function Restaurants() {
  return (
    <ScrollView>
      <Header title="Restaurantes" />

      <View className="w-full flex-1">
        <View className="w-full h-20 bg-white border border-b-red-600 items-center justify-center">

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
          <Card name='Restaurante Bondiboka' />
          <Card name='Sabores do Sertão' />
          <Card name='Nori' />
          <Card name="Pizza's" />
          <Card name='Vila da Telha' />
          <Card name='Quinta Estação' />
          <Card name='Pannetus' />
          <Card name='Restaurante Bondiboka' />
          <Card name='Restaurante Bondiboka' />
          <Card name='Sabores do Sertão' />
          <Card name='Nori' />
          <Card name="Pizza's" />
          <Card name='Vila da Telha' />
          <Card name='Quinta Estação' />
          <Card name='Pannetus' />
          <Card name='Restaurante Bondiboka' />
        </View>

      </View>
    </ScrollView>
  )
}