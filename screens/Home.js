import React, { useState, useEffect } from 'react'
import Content from '../components/Content'
import { StyleSheet, View, Image } from 'react-native';
import Button from '../components/Button';
import images from '../Variables/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 56,
  },
  image: {
    width: 310,
    height: 310
  }
})

export default Home = ({ drawings, navigation, screen }) => {
  const [picture, setPicture] = useState(drawings[Math.floor(Math.random() * drawings.length)])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPicture(drawings[Math.floor(Math.random() * drawings.length)])
    });
    return unsubscribe;
  }, [navigation])

  return (
    <Content style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', flex: 1 }}>
      <Image style={{ width: 170, height: 80, marginTop: 40 }} source={images['Logo']}></Image>

      <View style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { navigation.navigate("Canvas", { selectedDrawing: picture }) }}>
          <Image style={styles.image} source={{ uri: picture.uri }} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <Button style={{ width: 150 }} textSize={24} onPress={() => navigation.navigate('Gallery')}>My Gallery</Button>
          <Button style={{ width: 150 }} textSize={24} onPress={() => navigation.navigate("Lessons")}>Lessons</Button>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          {/* <Button style={{ width: 150 }} textSize={24} onPress={() => navigation.navigate("Collaborate")}>Collaborate</Button> */}
          <Button style={{ width: 150 }} textSize={24} onPress={() => navigation.navigate("Friends")}>Friends</Button>
          <Button style={{ width: 150 }} textSize={24} onPress={() => navigation.navigate("Canvas", {selectedDrawing:
                { uri: null, name: null, pixels: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"] },
            })
          }>Create</Button>
        </View>
      </View>
    </Content >
  )
}


