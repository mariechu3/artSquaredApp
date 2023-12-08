import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'

export default Collaborate = ({ route, navigation, drawings }) => {
  const [image, setImage] = useState({ name: drawings[0].name, uri: drawings[0].uri });
  const selectedDrawing = route?.params?.selectedDrawing ? route.params.selectedDrawing : null;
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setClear(false)
    });
    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    if (selectedDrawing) {
      setImage(selectedDrawing);
    }
  }, [selectedDrawing])

  const [selectedFriends, setSelectedFriends] = useState(new Set())
  const addFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends, name]))
  }
  const removeFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends].filter(x => x !== name)))
  }


  return (
    <Content>
      <Text bold>Select collaborators</Text>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'row', columnGap: '8' }}>
            <Friend name="Leyth" addFriend={addFriend} removeFriend={removeFriend} picture={images["Leyth"]} parentClear={clear} />
            <Friend name="Marie" addFriend={addFriend} removeFriend={removeFriend} picture={images["Marie"]} parentClear={clear} />
            <Friend name="David" addFriend={addFriend} removeFriend={removeFriend} picture={images["David"]} parentClear={clear} />
            <Friend name="Becky" addFriend={addFriend} removeFriend={removeFriend} picture={images["Becky"]} parentClear={clear} />
          </View>
        </ScrollView>
        <View style={{ flexGrow: 1, display: "flex", alignItems: 'center' }}>
          <Image style={{ width: 200, height: 200 }} source={{ uri: image.uri }} />
          <Text>{image.name}</Text>
        </View>
        <View style={{ padding: 50, alignItems: 'center' }}>
          <Button onPress={() => { setClear(true); setSelectedFriends(() => new Set()); navigation.navigate("Canvas", { selectedFriends: selectedFriends, selectedDrawing: image }); }} textSize={24}>Add collaborators</Button>
          <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
        </View>
      </View >
    </Content>
  )
}
