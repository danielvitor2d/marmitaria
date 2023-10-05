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
          <Card key={0} name='Restaurante Bondiboka' />
          <Card key={1} name='Sabores do Sertão' />
          <Card key={2} name='Nori' />
          <Card key={3} name="Pizza's" />
          <Card key={4} name='Vila da Telha' />
          <Card key={5} name='Quinta Estação' />
          <Card key={6} name='Pannetus' />
          <Card key={7} name='Restaurante Bondiboka' />
          <Card key={8} name='Restaurante Bondiboka' />
          <Card key={9} name='Sabores do Sertão' />
          <Card key={10} name='Nori' />
          <Card key={12} name="Pizza's" />
          <Card key={13} name='Vila da Telha' />
          <Card key={14} name='Quinta Estação' />
          <Card key={15} name='Pannetus' />
          <Card key={16} name='Restaurante Bondiboka' />
        </View>

      </View>
    </ScrollView>
  )
}