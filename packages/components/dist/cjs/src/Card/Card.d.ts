import { PropsWithChildren, ReactElement } from "react";
import { ViewStyle } from "react-native";
declare type CardProps = PropsWithChildren & ViewStyle;
declare const Card: ({ children }: CardProps) => ReactElement;
export default Card;
