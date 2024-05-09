import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PredictScreen from './Screens/Predict';
import HistoryScreen from './Screens/HistoryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Predict">
        <Stack.Screen name="Predict" component={PredictScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="History" component={HistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

