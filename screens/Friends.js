import React, { useState } from 'react'
import Text from '../components/Text'
import { Image, TouchableOpacity, Modal, StyleSheet, View, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Post from '../components/Post'

export default Messages = ({ route }) => {
  const friend = route?.params?.friend ? route.params.friend : null;
  
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      <Content style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', rowGap: 30 }}>
        <Post name="Becky" drawing="toad" caption="Art^2 is TOAD-ally the best!" />
        <Post name="Marie" drawing="frog" caption="RibBt ._." />
        <Post name="Leyth" drawing="flower" caption="Pixel art is iris-istible!" />
        <Post name="David" drawing="whale" caption="Whale, what's next?" />
      </Content >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 'auto',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  action: {
    alignItems: 'center',
  },
  divider: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-end'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});
