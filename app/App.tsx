import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button as RNButton,
} from 'react-native';

import { Card, Button } from '@packages/components';

const App = () => {
  return (
    <SafeAreaView>
      <Text>App</Text>
      <TextInput />
      <RNButton title="react natve" />
      <Card>
        <Text>Children</Text>
      </Card>
      <Button />
    </SafeAreaView>
  );
};

export default App;
