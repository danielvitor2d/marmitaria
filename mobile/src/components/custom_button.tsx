import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  fontSize: number;
  text: string;
  type?: "PRIMARY" | "SECONDARY" | "NEUTRAL";
}

export function CustomButton({
  text,
  fontSize,
  type = "NEUTRAL",
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className={`px-4 py-2 w-8/12 bg-[${
        type === "PRIMARY"
          ? "#A60C0C"
          : (type === "SECONDARY"
          ? "#34416D"
          : "#797979")
      }] rounded-xl items-center`}
    >
      <Text className="text-lg text-white">{text}</Text>
    </TouchableOpacity>
  );
}
