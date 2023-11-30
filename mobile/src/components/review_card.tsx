import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from "react";
import { Text, View } from "react-native";

import { Review } from "../services/reviews-service";

interface Props {
  review: Review
}

export default function ReviewCard({
  review
}: Props) {
  const stars = useMemo(() => {
    let arr = []
    for (let i = 0; i < review.cntStar; ++i) {
      arr.push(1);
    }
    for (let i = 0; i < 5-review.cntStar; ++i) {
      arr.push(0);
    }
    return arr;
  }, [review.cntStar])

  return (
    <View className="w-full min-h-24 rounded-sm border border-[#C6C6C6]">
      <View className="w-full">
        <Text>
          Comentários: {' ' + review.comments}
        </Text>

        <View className="flex-row items-center gap-4">
          <View className='flex-row gap-1'>
            {stars.map((value, idx) =>
              value == 1 ? (
                <FontAwesome key={idx} name="star" disabled={true} accessibilityHint='star' />
              ) : (
                <FontAwesome key={idx} name="star-o" disabled={true} accessibilityHint='star-o' />
              )
            )}
          </View>
          <Text>Nota: {' ' +review.cntStar}</Text>
        </View>
      </View>
    </View>
  )
}