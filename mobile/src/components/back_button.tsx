import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  name: keyof typeof Feather.glyphMap
  size: number
  type?: 'PRIMARY' | 'NEUTRAL'
}

export function BackButton({
  name,
  size,
  type = 'NEUTRAL'
}: Props) {
  const router = useRouter()

  return (
    <View className="w-full px-4 absolute left-0 top-0">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Feather
          name={name}
          size={size}
          color={type === 'PRIMARY' ? '#A60C0C' : 'black'}
        />
      </TouchableOpacity>
    </View>
  )
}