import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import logo from "../src/assets/logo.jpeg";
import AuthContext from "../src/contexts/auth";

export default function Login() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { signIn } = authContext;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function login() {
    if (await signIn(email, pwd)) {
      ToastAndroid.showWithGravity(
        `Dados corretos.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      router.replace("restaurants");
    } else {
      ToastAndroid.showWithGravity(
        `E-mail e/ou senha incorretos`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  return (
    <View className="flex-1 flex-col items-center justify-center gap-10">
      <Image source={logo} className="h-32 w-44 border" />

      <View className="flex-col w-full items-center">
        <View className="w-8/12 gap-1 mb-5">
          <Text className="text-base text-[#A60C0C]">Login</Text>

          <TextInput
            className="px-4 py-2 border border-[#797979] rounded-xl"
            placeholder={"Digite seu e-mail"}
            selectionColor={"black"}
            onChangeText={setEmail}
          ></TextInput>
        </View>

        <View className="w-8/12 gap-1">
          <Text className="text-base text-[#A60C0C]">Senha</Text>

          <TextInput
            className="px-4 py-2 border border-[#797979] rounded-xl"
            placeholder={"Digite sua senha"}
            selectionColor={"black"}
            onChangeText={setPwd}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("forgot_password")}
            testID="forgot_password"
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
          onPress={() => login()}
          testID="login"
          className="px-4 py-2 w-8/12 bg-[#A60C0C] rounded-xl items-center"
        >
          <Text className="text-white text-base">Entrar</Text>
        </TouchableOpacity>

        <Text className="text-[#797979">ou</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            ToastAndroid.showWithGravity(
              `Em breve.`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }}
          testID="loginWithG"
          className="px-4 py-2 w-8/12 bg-[#34416D] rounded-xl items-center"
        >
          <Text className="text-white text-base">Login com G</Text>
        </TouchableOpacity>
      </View>

      <View className="pt-5 flex-row items-center gap-1">
        <Text className="text-[#797979]">Não possui acesso?</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("registration")}
          testID="registerButton"
        >
          <Text className="text-[#A60C0C]">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
