import React, { useState, useCallback, useEffect } from 'react'
import Text from '../components/Text'
import { Image, TouchableOpacity, Modal, StyleSheet, View, Alert, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import Content from '../components/Content';


const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
});

// const customtInputToolbar = props => {
//   return (
//     <InputToolbar
//       {...props}
//       containerStyle={{
//         backgroundColor: "white",
//         borderTopColor: "#E8E8E8",
//         borderTopWidth: 2,
//         padding: 8,
//         flex:1,
//       }}
//     />
//   );
// };

const renderBubble = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return <LocationView location={currentMessage.location} />;
  }
  return <Bubble {...props} />;
};

export default Chat = ({ route }) => {
  const name = route?.params?.name ? route.params.name : null;

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 9,
        text: 'anything else you wanted me to add?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: `${name}`,
          avatar: '',
        },
      },
      {
        _id: 8,
        text: 'I saw the invite to collaborate!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: `${name}`,
          avatar: '',
        },
      },
      {
        _id: 7,
        text: 'it was nice catching up :))',
        createdAt: new Date('2023-11-18T04:47:41.597Z'),
        user: {
          _id: 1,
          name: 'Me',
          avatar: '',
        },
      },
      {
        _id: 6,
        text: 'see u then',
        createdAt: new Date('2023-11-11T08:07:41.597Z'),
        user: {
          _id: 2,
          name: `${name}`,
          avatar: '',
        },
      },
      {
        _id: 5,
        text: 'see you at 6 on Thursday then? Khao Kang?',
        createdAt: new Date('2023-11-11T08:01:41.597Z'),
        user: {
          _id: 1,
          name: 'Me',
          avatar: '',
        },
      },
      {
        _id: 4,
        text: 'ye sg I\'m craving some Thai food',
        createdAt: new Date('2023-11-11T07:50:41.597Z'),
        user: {
          _id: 2,
          name: `${name}`,
          avatar: '',
        },
      },
      {
        _id: 3,
        text: 'wanna get dinner???',
        createdAt: new Date('2023-11-11T07:49:41.597Z'),
        user: {
          _id: 1,
          name: 'Me',
          avatar: '',
        },
      },
      {
        _id: 2,
        text: 'I\'m free on Thursday',
        createdAt: new Date('2023-11-11T07:47:41.597Z'),
        user: {
          _id: 2,
          name: `${name}`,
          avatar: '',
        },
      },
      {
        _id: 1,
        text: 'When is a good day for us to catch up?',
        createdAt: new Date('2023-11-11T04:53:41.597Z'),
        user: {
          _id: 1,
          name: 'Me',
          avatar: '',
        },
      },
    ])
  }, [name])

  const onSend = useCallback((messages = []) => {

    // messages = [, ... messages]

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [{
        _id: 2,
        text: 'Got it',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: `${name}`,
        },
      }, ...messages]
      ))
  }, [name])

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   enabled
    //   behavior="padding">
    //   <ScrollView style={{ flexGrow: 1 }}>
    <GiftedChat
      // bottomOffset={20}
      messages={messages}
      onSend={messages => onSend(messages)}
      // renderInputToolbar={props => customtInputToolbar(props)}
      user={{
        _id: 1,
      }}
    />
    // </ScrollView>
    // </KeyboardAvoidingView>

  )
}

// export default Chat = ({ route }) => {
//   const friend = route?.params?.friend ? route.params.friend : null;
//   const [messages, sendMessages] = useState([{
//     _id: 1,
//     text: "Hello Could you add some",
//     createdAt: new Date()
//   }]
//   )

//   return (
//     <ScrollView vertical showsVerticalScrollIndicator={false}>
//       {friend && <Text>{friend}</Text>}
//       <GiftedChat messages={messages} />
//       <GiftedChat
//           user={{
//             _id: 1
//           }}
//           messages={messages}
//           onSend={this.onSend}
//         />
//     </ScrollView>
//   )
// }



