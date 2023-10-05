import { ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";

import { BackButton } from "../src/components/back_button";
import { CustomButton } from "../src/components/custom_button";

export default function Registration() {
  function register() {
    ToastAndroid.showWithGravity(
      'Cadastrando...',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  return (
    <ScrollView>
      <BackButton
        name={'arrow-left'}
        type={'PRIMARY'}
        size={28}
      />

      <View className="w-full flex-col items-center">

        <Text className="text-2xl text-[#A60C0C] font-bold">
          Cadastre-se
        </Text>

        <View className="w-full flex-col gap-2 items-center">
          <View className="w-8/12 gap-1 mb-5">
            <Text
              className="text-base text-[#A60C0C]"
            >
              Nome
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. João"}
              selectionColor={'black'}
            ></TextInput>

          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text
              className="text-base text-[#A60C0C]"
            >
              Sobrenome
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. Ferreira"}
              selectionColor={'black'}
            ></TextInput>

          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text
              className="text-base text-[#A60C0C]"
            >
              Endereço
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Av. Equador, 556, Centro"}
              selectionColor={'black'}
            ></TextInput>

          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text
              className="text-base text-[#A60C0C]"
            >
              Senha
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Digite sua senha"}
              selectionColor={'black'}
              secureTextEntry={true}
            ></TextInput>

          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text
              className="text-base text-[#A60C0C]"
            >
              Confirmação de senha
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Digite novamente sua senha"}
              selectionColor={'black'}
              secureTextEntry={true}
            ></TextInput>

          </View>
        </View>

      </View>

      <CustomButton
        fontSize={14}
        text={'Cadastrar'}
        type="PRIMARY"
        className="self-center mt-10"
        onPress={() => register()}
      />
    </ScrollView>
  )
}