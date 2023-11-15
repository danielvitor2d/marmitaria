import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

type Props = {
  children: ReactNode;
} & ViewProps;

export function Header({ children, ...rest }: Props) {
  return (
    <View
      className="w-full h-14 px-4 bg-[#A60C0C] flex-row justify-between items-center"
      {...rest}
    >
      {children}
    </View>
  );
}
