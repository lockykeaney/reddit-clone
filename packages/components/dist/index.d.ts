/// <reference types="react" />
import React, { ReactElement, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';

declare type CardProps = PropsWithChildren & ViewStyle;
declare const Card: ({ children }: CardProps) => ReactElement;

declare const TextInput: ({}: any) => JSX.Element;

declare type ButtonType = {
    color?: string;
};
declare const Button: React.FC<ButtonType>;

export { Button, Card, TextInput };
