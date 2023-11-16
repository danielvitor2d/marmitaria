import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { BackButton } from "../../src/components/back_button";
import { CustomButton } from "../../src/components/custom_button";

export default function RegisterRestaurant() {
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [price, setprice] = useState("");
  const [paymentforms, setpaymentforms] = useState("");

  function onRegister() {}

  return (
    <View className="flex-1 items-center">
      <BackButton
        className="w-full ml-4"
        name={"arrow-left"}
        type={"PRIMARY"}
        testID="goBack"
        size={28}
      />

      <ScrollView className="w-full">
        <View className="w-full flex-col items-center">
          <Text className="mb-4 text-2xl text-[#A60C0C] font-bold">
            Novo Restaurante
          </Text>

          <View className="w-full flex-col gap-2 items-center">
            <View className="w-8/12 gap-1 mb-5">
              <Text className="text-base text-[#A60C0C]">Nome</Text>

              <TextInput
                testID="name"
                className="px-4 py-2 border border-[#797979] rounded-xl"
                placeholder={"Ex. Pizzaria Califória"}
                selectionColor={"black"}
                value={name}
                onChangeText={setName}
              ></TextInput>
            </View>

            <View className="w-8/12 gap-1 mb-5">
              <Text className="text-base text-[#A60C0C]">Endereço</Text>

              <TextInput
                testID="name"
                className="px-4 py-2 border border-[#797979] rounded-xl"
                placeholder={"Ex. Av. Equador, 556, Centro"}
                selectionColor={"black"}
                value={address}
                onChangeText={setaddress}
              ></TextInput>
            </View>

            <View className="w-8/12 gap-1 mb-5">
              <Text className="text-base text-[#A60C0C]">Valor Médio</Text>

              <TextInput
                testID="name"
                keyboardType="numeric"
                className="px-4 py-2 border border-[#797979] rounded-xl"
                placeholder={"Ex. R$ 12,00"}
                selectionColor={"black"}
                value={price}
                onChangeText={setprice}
              ></TextInput>
            </View>

            <View className="w-8/12 gap-1 mb-5">
              <Text className="text-base text-[#A60C0C]">
                Formas de Pagamento
              </Text>

              <TextInput
                testID="name"
                keyboardType="numeric"
                className="px-4 py-2 border border-[#797979] rounded-xl"
                placeholder={"Ex. Dinheiro, Cartão, Pix"}
                selectionColor={"black"}
                value={paymentforms}
                onChangeText={setpaymentforms}
              ></TextInput>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        fontSize={14}
        text={"Salvar"}
        type="PRIMARY"
        testID="registerButton"
        onPress={() => onRegister()}
      />
    </View>
  );
}
