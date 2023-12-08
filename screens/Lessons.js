import React from 'react'
import Text from '../components/Text'
import Content from '../components/Content'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ScrollView } from 'react-native-gesture-handler'
import { View } from 'react-native'

export default Lessons = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <View>
          <YoutubePlayer
            height={230}
            play={false}
            videoId={'nw0NXODWVio'}
          />
          <Text textAlign='center'>  {"Art^2 walkthrough and Curves"}</Text>
        </View>
        <View>
          <YoutubePlayer
            height={230}
            play={false}
            videoId={'ye21r27kN9I'}
          />
          <Text textAlign='center'>  {"Lines and Curves"}</Text>
        </View>
        <View>
          <YoutubePlayer
            height={230}
            play={false}
            videoId={'u7v4uEDwW9o'}
          />
          <Text textAlign='center'> {"Shading"}</Text>
        </View>
        <View>
          <YoutubePlayer
            height={230}
            play={false}
            videoId={'NDno0U5UxSI'}
          />
          <Text textAlign='center'> {"Tips from a Master"}</Text>
        </View>
      </View>
    </ScrollView>
  )
}