import React, { useState } from 'react'
import Text from '../components/Text'
import { Image, TouchableOpacity, Modal, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Dialog from 'react-native-dialog'

export default Gallery = ({ removeDrawing, drawings, navigation, screen }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [renameDialogVisible, setRenameDialogVisible] = useState(false)

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          position: 'absolute',
          bottom: 40,
          right: 40,
          backgroundColor: "white",
          borderColor: '#d9d9d9',
          borderWidth: 3,
          borderRadius: 100,
          elevation: 5,
          zIndex: 5
        }}
        onPress={() => {
          navigation.navigate("Canvas", {
            selectedDrawing:
              { uri: null, name: null, pixels: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"] },
          })
        }}
      >
        <Icon
          size={44}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-add-outline" : "md-add-outline"}
        />
      </TouchableOpacity>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Content style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', rowGap: 30 }}>
          {drawings.map((image) => {
            return (
              <TouchableOpacity key={image.name} onPress={() => { setModalVisible(true); setSelectedDrawing(image) }} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 150, display: "flex", alignItems: 'center' }}>
                <Image source={{ uri: image.uri }} style={{ width: 150, height: 150 }} />
                <Text>{image.name}</Text>
              </TouchableOpacity>
            );
          })}
          <Dialog.Container visible={renameDialogVisible}>
            <Dialog.Title>Rename drawing</Dialog.Title>
            <Dialog.Description>
              Sorry, this feature is not available yet.
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={() => setRenameDialogVisible(false)} />
          </Dialog.Container>

          <Dialog.Container visible={deleteDialogVisible}>
            <Dialog.Title>Delete drawing</Dialog.Title>
            <Dialog.Description>
              {`Are you sure you want to delete ${selectedDrawing?.name}?`}
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={() => setDeleteDialogVisible(false)} />
            <Dialog.Button label="Delete" onPress={() => { removeDrawing(selectedDrawing); setDeleteDialogVisible(false) }} />
          </Dialog.Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Icon size={20} type="ionicon" name="close" />
              </TouchableOpacity>
              <View style={{ display: 'flex', width: '100%', height: '85%', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    navigation.navigate('Canvas', { selectedDrawing: selectedDrawing });
                    setModalVisible(!modalVisible)
                  }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Icon
                      size={24}
                      type="ionicon"
                      name={Platform.OS === "ios" ? "ios-pencil-outline" : "md-pencil-outline"}
                    />
                    <Text>Edit</Text>

                  </View>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    navigation.navigate('Share', { selectedDrawing: selectedDrawing });
                    setModalVisible(!modalVisible)
                  }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Icon
                      size={24}
                      type="ionicon"
                      name={Platform.OS === "ios" ? "ios-share-outline" : "md-share-outline"}
                    />
                    <Text>Share</Text>

                  </View>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    navigation.navigate('Collaborate', { selectedDrawing: selectedDrawing });
                    setModalVisible(!modalVisible)
                  }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Icon
                      size={24}
                      type="ionicon"
                      name={Platform.OS === "ios" ? "ios-people-outline" : "md-people-outline"}
                    />
                    <Text>Collaborate</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => { setModalVisible(!modalVisible); setDeleteDialogVisible(true) }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Icon
                      size={24}
                      type="ionicon"
                      name={Platform.OS === "ios" ? "ios-trash-outline" : "md-trash-outline"}
                    />
                    <Text>Delete</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => { setModalVisible(!modalVisible); setRenameDialogVisible(true) }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Icon
                      size={24}
                      type="ionicon"
                      name={Platform.OS === "ios" ? "ios-create-outline" : "md-create-outline"}
                    />
                    <Text>Rename</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal >
        </Content >
      </ScrollView>
    </View>
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
