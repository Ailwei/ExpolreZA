import React from "react";
import { TouchableOpacity } from "react-native";
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

interface FavouriteHeaderIconProps {
  isSharedActivity: boolean;
  onPress: () => void;
  iconSize?: number;
}

const ShareHeaderIcon: React.FC<FavouriteHeaderIconProps> = ({ isSharedActivity, onPress, iconSize = 24 }) => (
  <TouchableOpacity
    style={{ marginRight: 16 }}
    onPress={onPress}
    activeOpacity={0.7}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <FontAwesome5 name="share" size={iconSize} color={isSharedActivity ? "green" : "black"} />
  </TouchableOpacity>
);

export default ShareHeaderIcon;