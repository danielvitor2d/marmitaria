import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export default function MealAccordion({ title, children, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  });

  function toggleListItem() {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    setOpen(!open);
  }

  return (
    <View className="w-full items-center mb-2">
      <View className="flex-row items-center justify-center">
        <TouchableWithoutFeedback onPress={() => toggleListItem()}>
          <View className="w-7/12 px-4 py-2 flex-row justify-between items-center border border-[#797979] rounded-lg">
            <Text className="text-lg">{title}</Text>
            <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={26}
                color="black"
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          activeOpacity={0.5}
          className="ml-2"
          onPress={() => onRemove()}
        >
          <FontAwesome size={20} name={"trash"} />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{ height: bodyHeight }}
        className={"w-full rounded-lg overflow-hidden items-center"}
      >
        <View
          className="w-6/12 absolute bottom-0"
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
