import React, { PropsWithChildren, ReactElement } from "react";
import { View, ViewStyle } from "react-native";

import { styles } from "./Card.styles";

type CardProps = PropsWithChildren & ViewStyle;

const Card = ({ children }: CardProps): ReactElement => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;
