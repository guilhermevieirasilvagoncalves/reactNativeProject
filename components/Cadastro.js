import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Pressable,
  Animated
} from 'react-native';
import { db } from '../config/config';

class ImageLoader extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

export class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.usuario = '';
    this.senha = '';
  }

  salvar(){
    db.ref('/usuarios').push({
      usuario: this.usuario,
      senha: this.senha
    });
    alert("Usuário Registrado!");
  }
  
  render() {
    return (
      <View style = {style.Main}>
        <TextInput style = {style.InputStyle}
          placeholder="Digite o usuário"
          onChangeText={(texto) => {
            this.usuario = texto;
          }}></TextInput>
        <TextInput style = {style.InputStyle} secureTextEntry={true}
          placeholder="Digite o senha"
          onChangeText={(texto) => {
            this.senha = texto;
          }}></TextInput>
        <Pressable style = {style.Button} onPress={() => this.salvar()}>
        <Text style= {style.text}>Cadastrar</Text>
        </Pressable>
        <ImageLoader style = {style.ImageStyle} source = {require('../assets/duck-icon.png')} />
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
    height: 60,
    width: 220,
    marginTop: 30,
    padding: 10,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
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
  ImageStyle: {
    height: 50,
    width: 50,
    marginTop: 140,
  }
})