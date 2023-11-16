import { useState } from "react";
import { ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";

import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackButton } from "../../src/components/back_button";
import { CustomButton } from "../../src/components/custom_button";
import MealAccordion from "../../src/components/meal_accordion";
import { register } from "../../src/services/meal-service";
import {
  addMeal,
  register as registerRest,
} from "../../src/services/rest-service";

interface Prato {
  id: number;
  name: string;
  description: string;
  value: string;
}

export default function RegisterRestaurant() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [price, setprice] = useState("");
  const [paymentforms, setpaymentforms] = useState("");

  const [counterIdx, setCounterIdx] = useState(0);
  const [pratos, setPratos] = useState<Array<Prato>>([]);

  async function onRegister() {
    if (
      !name.length ||
      !address.length ||
      !price.length ||
      !paymentforms.length ||
      !pratos.length
    ) {
      ToastAndroid.showWithGravity(
        `Existem informações faltando.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      return;
    }

    let mealsId: Array<string> = [];
    for await (const prato of pratos) {
      const { registered, meal } = await register({
        name: prato.name,
        desc: prato.description,
        value: prato.value,
      });
      if (registered && meal) {
        mealsId.push(meal?.id);
      }
    }

    const { rest, registered: restRegistered } = await registerRest({
      name,
      address,
      paymentforms,
      value: price,
    });

    if (restRegistered && rest) {
      for await (const mealId of mealsId) {
        await addMeal(rest.id, mealId);
      }

      await new Promise(resolve => setTimeout(() => resolve(true), 1000))

      ToastAndroid.showWithGravity(
        `Restaurante cadastrado com sucesso!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      router.back();
    } else {
      ToastAndroid.showWithGravity(
        `Erro ao cadastrar restaurante.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  function onAddPrato() {
    setPratos((prev) => [
      ...prev,
      {
        id: counterIdx,
        name: "",
        description: "",
        value: "",
      },
    ]);
    setCounterIdx((prev) => prev + 1);
  }

  function onRemovePrato(idx: number) {
    setPratos((prev) => [...prev.filter((prato) => prato.id !== idx)]);
  }

  return (
    <View className="flex-1 items-center">
      <BackButton
        className="w-full ml-4"
        name={"arrow-left"}
        type={"PRIMARY"}
        testID="goBack"
        size={28}
      />

      <ScrollView className="w-full mt-4">
        <View className="w-full flex-col items-center">
          <Text className="mb-4 text-2xl text-[#A60C0C] font-bold">
            Novo Restaurante
          </Text>

          <View className="w-full flex-col gap-2 items-center">
            <View className="w-8/12 gap-1 mb-5">
              <Text className="text-base text-black">Nome</Text>

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
              <Text className="text-base text-black">Endereço</Text>

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
              <Text className="text-base text-black">Valor Médio</Text>

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
              <Text className="text-base text-black">Formas de Pagamento</Text>

              <TextInput
                testID="name"
                className="px-4 py-2 border border-[#797979] rounded-xl"
                placeholder={"Ex. Dinheiro, Cartão, Pix"}
                selectionColor={"black"}
                value={paymentforms}
                onChangeText={setpaymentforms}
              ></TextInput>
            </View>

            <View className="w-full items-center">
              <View className="mb-5 flex-row gap-3 items-center justify-center">
                <Text className="text-xl text-[#A60C0C] font-bold">Pratos</Text>

                {/* <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onAddPrato()}
                >
                  <FontAwesome
                    size={20}
                    name={"plus-circle"}
                    color={"#A60C0C"}
                  />
                </TouchableOpacity> */}
              </View>

              <View className="w-full">
                {pratos.map((prato) => (
                  <MealAccordion
                    key={prato.id}
                    title={prato.name}
                    onRemove={() => onRemovePrato(prato.id)}
                  >
                    <View className="w-full pt-2">
                      {/* <TouchableOpacity
                        activeOpacity={0.5}
                        className="px-[2px] py-[1px] flex-row gap-2"
                        onPress={() => onRemovePrato(prato.id)}
                      >
                        <Text>Remover prato</Text>
                        <FontAwesome
                          size={20}
                          name={"remove"}
                          color={"#A60C0C"}
                        />
                      </TouchableOpacity> */}

                      <View className="w-full gap-1 mb-5 mt-1">
                        <Text className="text-base text-[#A60C0C]">Nome</Text>

                        <TextInput
                          testID="name"
                          className="px-2 py-1 border border-[#797979] rounded-md"
                          placeholder={"Ex. Feijoada"}
                          selectionColor={"black"}
                          value={prato.name}
                          onChangeText={(newText) =>
                            setPratos((prev) =>
                              prev.map((p) => {
                                if (p.id !== prato.id) return p;
                                return {
                                  ...prato,
                                  name: newText,
                                };
                              })
                            )
                          }
                        ></TextInput>
                      </View>

                      <View className="w-full gap-1 mb-5">
                        <Text className="text-base text-[#A60C0C]">
                          Descrição
                        </Text>

                        <TextInput
                          testID="name"
                          className="px-2 py-1 border border-[#797979] rounded-md"
                          placeholder={"Ex. Feijão, calabresa"}
                          selectionColor={"black"}
                          value={prato.description}
                          onChangeText={(newText) =>
                            setPratos((prev) =>
                              prev.map((p) => {
                                if (p.id !== prato.id) return p;
                                return {
                                  ...prato,
                                  description: newText,
                                };
                              })
                            )
                          }
                        ></TextInput>
                      </View>

                      <View className="w-full gap-1 mb-5">
                        <Text className="text-base text-[#A60C0C]">Valor</Text>

                        <TextInput
                          testID="name"
                          className="px-2 py-1 border border-[#797979] rounded-md"
                          placeholder={"Ex. R$ 20,00"}
                          selectionColor={"black"}
                          value={prato.value}
                          onChangeText={(newText) =>
                            setPratos((prev) =>
                              prev.map((p) => {
                                if (p.id !== prato.id) return p;
                                return {
                                  ...prato,
                                  value: newText,
                                };
                              })
                            )
                          }
                        ></TextInput>
                      </View>
                    </View>
                  </MealAccordion>
                ))}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onAddPrato()}
                  className={`w-fit px-4 py-1 self-center rounded-md items-center bg-white border border-black`}
                >
                  <Text className="text-base">{"Novo prato"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        fontSize={14}
        text={"Salvar"}
        type="PRIMARY"
        testID="registerButton"
        className="mt-4"
        onPress={() => onRegister()}
      />
    </View>
  );
}
