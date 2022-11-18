import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cadastro } from './components/Cadastro';
import { Login } from './components/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Timeline } from './components/Timeline';
import { Twefes } from './components/Twefes';
import { Perfil } from './components/Perfil';


const Navegacao = createBottomTabNavigator();
const Stack = createStackNavigator();

export class Interface extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Twefes" component={Twefes} options = {{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Navegacao.Navigator>
        <Navegacao.Screen
          name={'Cadastro'}
          component={Cadastro}
          options={{
            tabBarLabel: 'Cadastro',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-plus"
                color={color}
                size={32}
              />
            ),
          }}
        />
        <Navegacao.Screen
          name={'Login'}
          component={Interface}
          options={{
            headerShown: false,
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={32} />
            ),
          }}
        />
      </Navegacao.Navigator>
    </NavigationContainer>
  );
}
