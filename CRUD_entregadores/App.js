import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntregadorList from './screens/EntregadorList';
import EntregadorForm from './screens/EntregadorForm';
import EntregaList from './screens/EntregaList';
import EntregaForm from './screens/EntregaForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entregadores">
        <Stack.Screen name="Entregadores" component={EntregadorList} />
        <Stack.Screen name="Novo Entregador" component={EntregadorForm} />
        <Stack.Screen name="Entregas" component={EntregaList} />
        <Stack.Screen name="Nova Entrega" component={EntregaForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
