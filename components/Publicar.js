import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable
} from 'react-native';

import { db } from '../config/config';

import { user } from './Login';

export class Publicar extends React.Component {
  constructor(props){
    super(props);
    this.twefe = '';
    this.usuario = '';
  }

  salvar(){
    db.ref('/publicacoes').push({
      twefe: this.twefe,
      usuario: user
    });
    alert("Publicado com sucesso!");
  }

  render() {
    return (
      <View style = {style.Main}>
      <Text style = {style.think}>O que esta pensando {user}?</Text>
        <TextInput onChangeText={(texto) => {
            this.twefe = texto;
          }} style = {style.InputStyle} />
        <Pressable style = {style.Button} onPress={() => this.salvar()}><Text style = {style.text}>Publicar</Text></Pressable>
      </View>
    );
  }
}
const style = StyleSheet.create ({
  Main: {
    flex: 1,
    backgroundColor: '#43ADD8',
    alignItems: 'center',
    //height: '100%',
  },
  InputStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    height: 80,
    width: 220,
    marginTop: 30,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    top: 40,
    backgroundColor: '#162F95',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  think: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
})