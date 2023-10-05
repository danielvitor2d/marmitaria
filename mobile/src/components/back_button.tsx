import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props extends ViewProps {
  name: keyof typeof Feather.glyphMap
  size: number
  type?: 'PRIMARY' | 'NEUTRAL'
}

export function BackButton({
  name,
  size,
  type = 'NEUTRAL',
  ...rest
}: Props) {
  const router = useRouter()

  return (
    <View {...rest}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Feather
          name={name}
          size={size}
          color={type === 'PRIMARY' ? '#A60C0C' : 'white'}
        />
      </TouchableOpacity>
    </View>
  )
}