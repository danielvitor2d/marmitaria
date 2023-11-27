import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";

import { BackButton } from "../src/components/back_button";
import { CustomButton } from "../src/components/custom_button";
import { register } from "../src/services/auth-service";

export default function Registration() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [confirmpwd, setconfirmpwd] = useState("");

  async function onRegister() {
    if (pwd != confirmpwd) {
      ToastAndroid.showWithGravity(
        `As senhas estão diferentes.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    const { registered } = await register({
      address,
      email,
      lastName,
      name,
      pwd,
    });

    if (registered) {
      ToastAndroid.showWithGravity(
        `Cadastrado com sucesso!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      router.replace("login");
    } else {
      ToastAndroid.showWithGravity(
        `Erro ao cadastrar`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  return (
    <ScrollView>
      <BackButton
        className="w-full ml-4"
        name={"arrow-left"}
        type={"PRIMARY"}
        testID="goBack"
        size={28}
      ></BackButton>

      <View className="w-full flex-col items-center">
        <Text className="text-2xl text-[#A60C0C] font-bold">Cadastre-se</Text>

        <View className="w-full flex-col gap-2 items-center">
          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Nome</Text>

            <TextInput
              testID="name"
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. João"}
              selectionColor={"black"}
              value={name}
              onChangeText={setname}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Sobrenome</Text>

            <TextInput
              testID="lastname"
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. Ferreira"}
              selectionColor={"black"}
              value={lastName}
              onChangeText={setLastName}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Endereço</Text>

            <TextInput
              testID="address"
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. Av. Equador, 123, Itaoca"}
              selectionColor={"black"}
              value={address}
              onChangeText={setaddress}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">E-mail</Text>

            <TextInput
              testID="email"
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"fulano1234@gmail.com"}
              selectionColor={"black"}
              value={email}
              onChangeText={setemail}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Senha</Text>

            <TextInput
              testID="pwd"
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Digite sua senha"}
              selectionColor={"black"}
              secureTextEntry={true}
              value={pwd}
              onChangeText={setpwd}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">
              Confirmação de senha
            </Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Digite novamente sua senha"}
              selectionColor={"black"}
              secureTextEntry={true}
              value={confirmpwd}
              onChangeText={setconfirmpwd}
            ></TextInput>
          </View>
        </View>
      </View>

      <CustomButton
        fontSize={14}
        text={"Cadastrar"}
        type="PRIMARY"
        testID="registerButton"
        className="self-center mt-10 mb-10"
        onPress={() => onRegister()}
      />
    </ScrollView>
  );
}
