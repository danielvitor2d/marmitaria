import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

import FeijoadaImage from '../src/assets/feijoada.png';
import ProfileImage from '../src/assets/mini_profile.svg';
import { BackButton } from "../src/components/back_button";
import { CustomButton } from '../src/components/custom_button';
import { Header } from "../src/components/header";
import { generateRandomPatternArray } from "../src/utils/fake";

export default function MealInfo() {
  const router = useRouter()

  function onAddFoto() {
    ToastAndroid.showWithGravity(
      `Adicionar foto`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  function onCadastrarAvaliacao() {
    ToastAndroid.showWithGravity(
      `Cadastrando avaliação`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  return (
    <View className="flex-1 relative">
      <Header className="absolute top-0 left-0 right-0">
        <BackButton
          name={"arrow-left"}
          size={28}
          testID="goBack"
          className={'text-white'}
          onPress={() => router.back()}
        />

        <Text className="text-white text-lg">
          Cardápio
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
          <Text className="text-xl text-[#A60C0C] font-semibold">
            Feijoada do Bondiboka
          </Text>
        </View>

        <View className="px-1 mt-2 flex-1">
          <Image
            source={FeijoadaImage}
            className="w-full"
          />

          <View className="flex-1 w-full mt-1 px-8 py-2 items-center">
            <View className="w-full mb-3">
              <Text className="w-full mb-3 text-[#A60C0C] text-base">
                Comentários
              </Text>

              <TextInput
                className="h-28 w-full p-2 border border-s-2 border-[#797979] rounded-md"
                multiline
                cursorColor={'#5C6265'}
                textAlignVertical='top'
                numberOfLines={8}
              />
            </View>

            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onAddFotos()}
              className="w-1/2 px-4 py-2 mb-1 border border-[#A60C0C] rounded-lg items-center"
            >
              <Text className="text-lg text-[#A60C0C]">
                Adicionar Fotos
              </Text>
            </TouchableOpacity> */}

            <View className="w-full mb-3">
              <Text className="w-full mb-1 text-[#A60C0C] text-base">
                Fotos
              </Text>

              <View className="w-full flex-row gap-2 items-center">
                {[1, 1, 1, 1].map(() => (
                  <TouchableOpacity activeOpacity={0.7}>
                    <Image
                      source={FeijoadaImage}
                      className="w-12 h-12 bg-[#A60C0C] rounded-md"
                    />
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onAddFoto()}
                >
                  <Feather
                    name={'plus-circle'}
                    size={35}
                    color={'#A60C0C'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full">
              <Text className="w-full mb-1 text-[#A60C0C] text-base">
                Experiência
              </Text>

              <View className='flex-row'>
                {generateRandomPatternArray().map((i, v) => (
                  i == 1 
                    ? <FontAwesome size={24} color='#E49024' key={v} name='star' />
                    : <FontAwesome size={24} color='#FF8B3A' key={v} name='star-o' disabled={true} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        fontSize={14}
        text={'Cadastrar avaliação'}
        type="PRIMARY"
        testID="registerButton"
        className="self-center mt-5"
        onPress={() => onCadastrarAvaliacao()}
      />
    </View>
  )
}