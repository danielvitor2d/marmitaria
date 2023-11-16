import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import ProfileImage from "../src/assets/profile.svg";
import { BackButton } from "../src/components/back_button";
import { CustomButton } from "../src/components/custom_button";
import AuthContext from "../src/contexts/auth";

export default function Profile() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { user, update } = authContext;
  if (!user) return null;

  const router = useRouter();

  const [id] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);

  async function onSaveUpdates() {
    const response = await update({
      id,
      name,
      lastName,
      address,
      email,
    });
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <ScrollView>
      <BackButton
        name={"arrow-left"}
        type={"PRIMARY"}
        size={28}
        testID="goBack"
        className={"w-full ml-4"}
      />

      <View className="flex-1 w-full flex-col items-center gap-4">
        <Text className="text-2xl text-[#A60C0C] font-bold">Perfil</Text>

        <ProfileImage className="h-32 w-44 border" />

        <View className="w-full flex-col gap-2 items-center">
          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">E-mail</Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. joao@mail.com"}
              selectionColor={"black"}
              value={email}
              onChangeText={setEmail}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Nome</Text>

            <TextInput
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Ex. João"}
              selectionColor={"black"}
              value={name}
              onChangeText={setName}
            ></TextInput>
          </View>

          <View className="w-8/12 gap-1 mb-5">
            <Text className="text-base text-[#A60C0C]">Sobrenome</Text>

            <TextInput
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
              className="px-4 py-2 border border-[#797979] rounded-xl"
              placeholder={"Av. Equador, 556, Centro"}
              selectionColor={"black"}
              value={address}
              onChangeText={setAddress}
            ></TextInput>
          </View>
        </View>
      </View>

      <CustomButton
        fontSize={14}
        text={"Salvar alterações"}
        type="PRIMARY"
        testID="seeRestaurants"
        className="self-center mt-10"
        onPress={() => onSaveUpdates()}
      />
    </ScrollView>
  );
}
