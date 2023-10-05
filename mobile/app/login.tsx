import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import logo from '../src/assets/logo.jpeg';

export default function Login() {
  const router = useRouter()

  return (
    <View
      className="flex-1 flex-col items-center justify-center gap-10"
    >
      <Image
        source={logo}
        className="h-32 w-44 border"
      />

      <View className="flex-col w-full items-center">
        <View className="w-8/12 gap-1 mb-5">
          <Text
            className="text-base text-[#A60C0C]"
          >
            Login
          </Text>

          <TextInput
            className="px-4 py-2 border border-[#797979] rounded-xl"
            placeholder={"Digite seu e-mail"}
            selectionColor={'black'}
          ></TextInput>

        </View>

        <View className="w-8/12 gap-1">
          <Text
            className="text-base text-[#A60C0C]"
          >Senha</Text>

          <TextInput
            className="px-4 py-2 border border-[#797979] rounded-xl"
            placeholder={"Digite sua senha"}
            selectionColor={'black'}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('forgot_password')}
          >
            <Text className="text-[#797979] text-right">
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      <View className="mt-10 w-full items-center gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          className="px-4 py-2 w-8/12 bg-[#A60C0C] rounded-xl items-center"
        >
          <Text className="text-white text-base">
            Entrar
          </Text>
        </TouchableOpacity>

        <Text className="text-[#797979">ou</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="px-4 py-2 w-8/12 bg-[#34416D] rounded-xl items-center"
        >
          <Text className="text-white text-base">
            Login com G
          </Text>
        </TouchableOpacity>

      </View>

      <View className="pt-5 flex-row items-center gap-1">
        <Text className="text-[#797979]">
          Não possui acesso?
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('registration')}
        >
          <Text className="text-[#A60C0C]">
            Cadastre-se
          </Text>
        </TouchableOpacity>

      </View>

      {/* <View className="flex-1" /> */}
    </View>
  )
}