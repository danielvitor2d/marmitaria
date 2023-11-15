import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

interface Props extends ViewProps {
  name: keyof typeof Feather.glyphMap;
  size: number;
  onPress?: TouchableOpacityProps["onPress"];
  type?: "PRIMARY" | "NEUTRAL";
}

export function BackButton({
  name,
  size,
  type = "NEUTRAL",
  onPress,
  ...rest
}: Props) {
  const router = useRouter();

  return (
    <View {...rest}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress === undefined ? () => router.back() : onPress}
      >
        <Feather
          name={name}
          size={size}
          color={type === "PRIMARY" ? "#A60C0C" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
}
