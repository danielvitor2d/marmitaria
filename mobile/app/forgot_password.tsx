import { Text, View } from "react-native";
import { BackButton } from "../src/components/back_button";

export default function ForgotPassword() {
  return (
    <View className="w-full items-center">
      <BackButton
        className="w-full ml-4"
        name={'arrow-left'}
        type={'PRIMARY'}
        size={28}
      />

      <Text className="mt-12 text-lg">
        Recuperação de senha.
      </Text>
    </View>
  )
}