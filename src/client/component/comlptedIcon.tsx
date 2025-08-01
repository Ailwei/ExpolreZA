import React from "react";
import { TouchableOpacity } from "react-native";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

interface FavouriteHeaderIconProps {
  isFavourited: boolean;
  onPress: () => void;
  iconSize?: number;
}

const CompletedHeaderIcon: React.FC<FavouriteHeaderIconProps> = ({ isFavourited, onPress, iconSize = 24 }) => (
  <TouchableOpacity
    style={{ marginRight: 16 }}
    onPress={onPress}
    activeOpacity={0.7}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <FontAwesome5 name="check-circle" size={iconSize} color={isFavourited ? "green" : "black"} />
  </TouchableOpacity>
);

export default CompletedHeaderIcon;