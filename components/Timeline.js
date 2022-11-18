import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
//import { Divider } from "@react-native-material/core";
import { Login } from './Login';
import { db } from '../config/config';
import Divider from 'react-native-divider';


export class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicacoes: [],
    };
  }

  componentDidMount() {
    db.ref('/publicacoes').on('value', (snapshot) => {
      let data = snapshot.val();
      let dados = Object.values(data);
      this.setState({ publicacoes: dados });
    });
  }

  render() {
    return (
      <View style = {style.Main}>
        {this.state.publicacoes.length > 0 ? (
          <FlatList
            data={this.state.publicacoes}
            renderItem={({ item }) => (
              <View>
                <Divider>{item.usuario} twefou</Divider>
                <Text style = {style.DividerStyle}>{item.twefe}</Text>
              </View>
            )}
          />
        ) : (
          <Text>{'Não há twefes publicados, seja o primeiro a publicar!'}</Text>
        )}
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
  DividerStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    padding: 10,
  },
})

