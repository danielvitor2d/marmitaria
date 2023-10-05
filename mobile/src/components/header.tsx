import { ScrollView, Text, View } from "react-native";
import { BackButton } from "./back_button";

import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfileImage from '../assets/mini_profile.svg';

interface Props {
  title: string
}

export function Header({
  title
}: Props) {
  const router = useRouter();

  return (
    <ScrollView>
      <View
        className="w-full h-14 px-4 bg-[#A60C0C] flex-row justify-between items-center"
      >
        <BackButton
          name={'arrow-left'}
          type={'NEUTRAL'}
          size={26}
        />

        <Text className="text-white text-lg">
          {title}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('profile')}
        >
          <ProfileImage
            className="h-2 w-2 border bg-green-600"
          />
        </TouchableOpacity>
      </View>  
    </ScrollView>
  )
}