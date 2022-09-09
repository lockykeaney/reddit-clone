import React, { ReactElement } from 'react';
import { Button as RNButton, StyleSheet } from 'react-native';
// import type { Button as ButtonType } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

type ButtonType = {
  color?: string;
};

export const Button: React.FC<ButtonType> = ({
  color = 'green',
}): ReactElement => {
  return <RNButton title="Button" color={color} />;
};

export default Button;
