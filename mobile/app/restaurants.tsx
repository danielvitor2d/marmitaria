import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from "../src/components/header";

export default function Restaurants() {
  return (
    <ScrollView>
      <Header title="Restaurantes" />

      <View className="w-full flex-1">
        <View className="w-full h-20 bg-white border border-b-red-600 items-center justify-center">

          <View className='flex-row gap-6 items-center justify-between'>
            <TouchableOpacity>
              <Feather
                size={42}
                color={'#A60C0C'}
                name='list'
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather
                size={40}
                color={'#A60C0C'}
                name='map-pin'
              />
            </TouchableOpacity>
          </View>

        </View>

        <View>
          
        </View>

      </View>
    </ScrollView>
  )
}