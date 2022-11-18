import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const bottom = createBottomTabNavigator();

import {Publicar} from './Publicar';
import {Perfil} from './Perfil';
import {Timeline} from './Timeline';

export class Twefes extends React.Component {
  render() {
    return (
      <bottom.Navigator>
        <bottom.Screen name="Publicar" component={Publicar} options={{
            tabBarLabel: 'Publicar',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="note-plus-outline"
                color={color}
                size={32}
              />
            ),
          }}></bottom.Screen>
        <bottom.Screen name="Timeline" component={Timeline} options={{
            tabBarLabel: 'Timeline',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={color}
                size={32}
              />
            ),
          }}></bottom.Screen>
        <bottom.Screen name="Perfil" component={Perfil} options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="card-account-details-outline"
                color={color}
                size={32}
              />
            ),
          }}></bottom.Screen>
      </bottom.Navigator>
    );
  }
}