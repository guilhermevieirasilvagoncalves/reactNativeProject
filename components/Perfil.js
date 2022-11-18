import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { db } from '../config/config';
import { user } from './Login';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export class Perfil extends React.Component {
  constructor(props){
    super(props);
    this.usuario = user;
    this.state = {
      publicacoes: [],
      locationResult: null,
      hasLocationPermissions: false,
      mapRegion: null,
    };
  }


  componentDidMount() {
    this.getLocationAsync();
    db.ref('/publicacoes')
    .orderByChild('usuario')
    .equalTo(this.usuario)
    .once('value', (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      if (data == null) {
        alert('Não encontrado!');
      } else {
        let dados = Object.values(data);
        this.setState({ publicacoes: dados });
      }
    });
  }

  handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
    } else {
      alert("Location permission not granted");
    }
  }

  render() {
    const json = JSON.stringify(this.state.locationResult);
    const t = json.substring(16,63);
    const j = json.substring(93,115);
    console.log(t)
    console.log(j)
    console.log(json)
    return (
      <View style = {style.Main}>
        <Image style = {style.icon} source = {require('../assets/perfil-icon/download.png')} />
        <Text style = {style.perfilNome}>{user}</Text>
        <Text style = {style.perfiltitulo}>Localizado em:</Text>
        <Text style = {style.geo}>{t}{'\n'}</Text>
        <Text style = {style.perfiltitulo}>Seus Twefes:</Text>
        {this.state.publicacoes.length > 0 ?
          <FlatList
            data={this.state.publicacoes}
            renderItem={({ item }) => (
              <View>
                <Text style = {style.twefes}>{item.twefe}</Text>
              </View>
            )}
          />
          : 
          <Text>{'Você não publicou nenhum twefe ainda'}</Text>
        }
        
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
  perfilNome: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  perfiltitulo: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  twefes: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
  geo: {
    elevation: 3,
    backgroundColor: '#162F95',
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    marginBottom: 0,
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderStyle: 'solid',
    position: 'absolute',
    left: 20,
    marginTop: 20,
  }
})