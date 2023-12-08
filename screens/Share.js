import Content from '../components/Content'
import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import * as SMS from 'expo-sms';
import numbers from '../Variables/Numbers';

export default Share = ({ navigation, route, buttonText, drawings }) => {
  // image is {name: string, uri: string}
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

  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState(new Set())
  const addFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends, name]))
  }
  const removeFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends].filter(x => x !== name)))
  }

  useEffect(() => {
    // declare the data fetching function
    const isSmsAvailable = async () => {
      const available = await SMS.isAvailableAsync();
      setIsAvailable(available)
    }

    // call the function
    isSmsAvailable()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const sendSMS = async (numbers) => {
    const { result } = await SMS.sendSMSAsync(
      numbers,
      `Check out my ${image.name} artwork!`,
      {
        attachments: {
          uri: image.uri,
          mimeType: 'image/png',
          filename: `${image.name}.png`,
          data: image.data
        },
      }
    ).catch(
      await SMS.sendSMSAsync(numbers, `Check out my ${image.name} artwork!`)
    )
  }

  return (
    <Content>
      <Text bold>Select friends</Text>
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
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <Text>{image.name}</Text>
        </View>
        <View style={{ padding: 50, alignItems: 'center' }}>
          {isAvailable ? <Button onPress={() => { sendSMS([...selectedFriends].map(x => numbers[x])); setClear(true)}} textSize={30}>{buttonText}</Button> : <Text>sms not available</Text>}
          <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
        </View>
      </View >
    </Content>
  )
}

