import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage,
  Image,
  Pressable,
  Animated,
  Easing
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { db } from '../config/config';

//import {Twefes} from './Twefes';
var userCurrent;

let opacity = new Animated.Value(0);

class ImageLoader extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 3000,
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


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usuario = '';
    this.senha = '';
    this.state = {
      usuarios: [],
    };
  }

  buscar2() {
    db.ref('/usuarios')
      .orderByChild('usuario')
      .equalTo(this.usuario)
      .once('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        if (data == null) {
          alert('Não encontrado!');
        } else {
          alert("OK!")
          //let dados = Object.values(data);
          //this.setState({ notebooks: dados });
        }
      });
  }

  buscar() {
    db.ref('/usuarios')
      .orderByChild('usuario')
      .equalTo(this.usuario)
      .once('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        if (data == null) {
          alert('Usuário não existente');
        } else {
          let dados = Object.values(data);
          this.setState({ usuarios: dados });
          this.state.usuarios.map(objeto => {
            if(objeto.usuario == this.usuario){
              if(objeto.senha == this.senha){
                this.props.navigation.navigate('Twefes');
              }
              else{
                alert("Senha incorreta")
              }
            }
            else{
              alert("Usuário não existente")
            }
          })
        }
      });
  }
  

  render() {
    return (
      <View style = {style.Main}>
        <TextInput style = {style.InputStyle}
          placeholder="Digite o usuário"
          onChangeText={(texto) => {
            this.usuario = texto;
            userCurrent = texto
          }}></TextInput>
        <TextInput caretHidden="true" style = {style.InputStyle} secureTextEntry={true}
          placeholder="Digite o senha"
          onChangeText={(texto) => {
            this.senha = texto;
          }}></TextInput>
        <Pressable style={style.Button} onPress={() => this.buscar()}>
        <Text style = {style.text}>Logar</Text>
        </Pressable>
          <ImageLoader style = {style.ImageStyle} source = {require('../assets/duck-icon.png')} />
      </View>
    );
  }
}

export {userCurrent as user}

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