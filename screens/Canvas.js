import React, { useState, useRef, useEffect } from 'react'
import { Modal, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TriangleColorPicker, toHsv } from 'react-native-color-picker'
import ViewShot from 'react-native-view-shot'
import Button from '../components/Button'
import Text from '../components/Text'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Dialog from 'react-native-dialog'
import TextInput from '../components/TextInput'
import images from '../Variables/Images'

const NUM_ROWS = 8
const NUM_COLS = 8
// NOTE: These constants will effect "backend" construction, components need to be updated manually

eraseColor = "#ffffff"
nonSelectColor = "#aaaaaa"
workingToolColor = "#555555"
undoRedoFadedBackground = "#f0f0f0"
undoRedoFadedText = "#e0e0e0"

/*~~~~~~~~~~~*\
| tool codes  |
| 0 -> draw   |
| 1 -> erase  |
\*~~~~~~~~~~~*/

class Action {
  constructor(colorNew, colorOld, row, col) {
    this.colorNew = colorNew;
    this.colorOld = colorOld
    this.row = row;
    this.col = col;
  }
}

var Actions = new Array;
var Redos = new Array;

var collabActions = [
  new Action("#000000", "#000000", 2, 2),
  new Action("#000000", "#000000", 2, 5),
  new Action("#000000", "#000000", 5, 1),
  new Action("#000000", "#000000", 6, 2),
  new Action("#000000", "#000000", 6, 3),
  new Action("#000000", "#000000", 6, 4),
  new Action("#000000", "#000000", 6, 5),
  new Action("#000000", "#000000", 5, 6)
]

export default Canvas = ({ addDrawing, navigation, route }) => {
  const selectedDrawing = route?.params?.selectedDrawing ? route.params.selectedDrawing : null;
  const selectedFriends = route?.params?.selectedFriends ? route.params.selectedFriends : null;

  useEffect(() => {
    if (selectedFriends != null && selectedFriends.size > 0) {
      runCollabActions()
    }
  }, [selectedFriends])

  /*********** Canvas Drawing/Tools States *******/
  var emptyCanvas = new Array
  for (i = 0; i < NUM_ROWS * NUM_COLS; i++) {
    emptyCanvas[i] = eraseColor
  }

  useEffect(() => {
    if (selectedDrawing) {
      setName(selectedDrawing.name)
      setCanvasData(selectedDrawing.pixels)
    }
  }, [selectedDrawing])

  const [canvasData, setCanvasData] = useState(selectedDrawing != null ? selectedDrawing.pixels : emptyCanvas)
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [actionsLen, setActionsLen] = useState(Actions.length)
  const [redosLen, setRedosLen] = useState(Redos.length)
  const [gridShow, setGridShow] = useState(true)

  /********** Stuff for screen capture ***********/
  const [name, setName] = useState(null);
  const [editName, setEditName] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  const viewShot = useRef(null);
  const [uri, setUri] = useState("");
  const captureScreen = () => {
    viewShot.current.capture().then((uri) => {
      setUri(uri);
      setPreviewModalVisible(true)
      const data = MediaLibrary.saveToLibraryAsync(uri);
      console.log(canvasData)
      addDrawing({
        uri: uri, name: name ? name : 'Untitiled', pixels: canvasData
      })


    }).catch(console.error);
  };

  // useEffect(() => {
  //   // declare the data fetching function
  //   const saveImage = async () => {
  //     // const localuri = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + uri)
  //     // const asset = await MediaLibrary.createAssetAsync(localuri)
  //     // const album = await MediaLibrary.createAlbumAsync("ArtSquared", asset);
  //     const data = await MediaLibrary.saveToLibraryAsync(uri);
  //     console.log(data)
  //     // if (!name) {
  //     //   console.log("here")
  //     //   setNameDialogVisible(true)
  //     // }
  //     // else {
  //     // setPreviewModalVisible(true)

  //     addDrawing({ uri: uri, data: data, name: name ? name : 'Untitiled', pixels: null })
  //     // }
  //   }

  // call the function
  //   saveImage()
  //     // make sure to catch any error
  //     .catch("this is the error", console.error);

  // }, [uri])


  /**********************************************/

  updateCanvas = () => {

  }

  rowCol2Index = (row, col) => {
    return (NUM_COLS * row) + col
  }

  applyAction = (action) => {
    cd = [...canvasData]
    cd[rowCol2Index(action.row, action.col)] = action.colorNew
    setCanvasData(cd)
  }

  revertAction = (action) => {
    cd = [...canvasData]
    cd[rowCol2Index(action.row, action.col)] = action.colorOld
    setCanvasData(cd)
  }

  runCollabActions = () => {
    setTimeout(() => {
      applyAction(collabActions[0])
    }, 500);
    setTimeout(() => {
      applyAction(collabActions[1])
    }, 1000);
    setTimeout(() => {
      applyAction(collabActions[2])
    }, 1500);
    setTimeout(() => {
      applyAction(collabActions[3])
    }, 2000);
    setTimeout(() => {
      applyAction(collabActions[4])
    }, 2500);
    setTimeout(() => {
      applyAction(collabActions[5])
    }, 3000);
    setTimeout(() => {
      applyAction(collabActions[6])
    }, 3500);
    setTimeout(() => {
      applyAction(collabActions[7])
    }, 4000);
  }

  undo = () => {
    if (Actions.length < 1) {
      return false
    }
    action = Actions.pop()
    setActionsLen(Actions.length)
    revertAction(action)
    Redos = Redos.concat([action])
    setRedosLen(Redos.length);
    return true
  }

  redo = () => {
    if (Redos.length < 1) {
      return false
    }
    redo = Redos.pop()
    setRedosLen(Redos.length)
    applyAction(redo)
    Actions = Actions.concat([redo])
    setActionsLen(Actions.length)
    return true
  }

  _onDrawButtonPress = () => {
    setSelectedTool(0)
  }

  _onEraseButtonPress = () => {
    setSelectedTool(1)
  }

  Pixel = props => {
    _onPressButton = () => {
      newColor = selectedColor  // By default assume the draw tool
      if (selectedTool == 1) {  // If the tool is the erase tool, use the erase color
        newColor = eraseColor;
      }
      if (newColor != canvasData[rowCol2Index(props.row, props.col)]) {
        action = new Action(newColor, canvasData[rowCol2Index(props.row, props.col)], props.row, props.col)
        Actions = Actions.concat([action])
        setActionsLen(Actions.length);
        Redos = []
        setRedosLen(Redos.length);
        cd = [...canvasData]
        cd[rowCol2Index(props.row, props.col)] = newColor
        setCanvasData(cd);  // Set the current color to the new color.
      }
    }

    return (
      <TouchableWithoutFeedback onPress={this._onPressButton} >
        <View style={styles.pixel} margin={gridShow ? 0.5 : 0} marginHorizontal={gridShow ? 0.5 : 0} backgroundColor={canvasData[rowCol2Index(props.row, props.col)]/*[this.col]*/}>

        </View>
      </TouchableWithoutFeedback>
    );
  };

  Row = props => {
    return (
      <View style={styles.row}>
        <Pixel col={0} row={props.row} />
        <Pixel col={1} row={props.row} />
        <Pixel col={2} row={props.row} />
        <Pixel col={3} row={props.row} />
        <Pixel col={4} row={props.row} />
        <Pixel col={5} row={props.row} />
        <Pixel col={6} row={props.row} />
        <Pixel col={7} row={props.row} />
      </View>
    );
  }

  function Tools() {
    onDrawButtonPress = () => {
      setSelectedTool(0);
    }

    onEraseButtonPress = () => {
      setSelectedTool(1);
    }

    onPickerPress = () => {
      setPickerModalVisible(!pickerModalVisible);
    }

    onGridPress = () => {
      setGridShow(!gridShow);
    }

    return (
      <View style={styles.toolbar}>
        {/* Draw Button */}
        <TouchableWithoutFeedback onPress={this.onDrawButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 0 ? selectedColor : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: selectedTool == 0 ? selectedColor : 'gray'}}>Draw</Text>*/}
            <Icon color={selectedTool == 0 ? selectedColor : 'gray'} size={25} type='ionicon' name='brush' />
          </View>
        </TouchableWithoutFeedback>

        {/* Erase Button */}
        <TouchableWithoutFeedback onPress={this.onEraseButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 1 ? eraseColor : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: selectedTool == 1 ? eraseColor : 'gray'}}>Erase</Text>*/}
            <Icon color={selectedTool == 1 ? eraseColor : 'gray'} size={25} type='ionicon' name='backspace' />
          </View>
        </TouchableWithoutFeedback>

        {/* Undo Button */}
        <TouchableWithoutFeedback onPress={this.undo} >
          <View style={styles.tool} backgroundColor={actionsLen > 0 ? nonSelectColor : undoRedoFadedBackground} borderColor={actionsLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            {/*<Text style={styles.buttonText, {color: actionsLen > 0? workingToolColor : undoRedoFadedText}}>Undo</Text>*/}
            <Icon color={actionsLen > 0 ? workingToolColor : undoRedoFadedText} size={25} type='ionicon' name='arrow-undo' />
          </View>
        </TouchableWithoutFeedback>

        {/* Redo Button */}
        <TouchableWithoutFeedback onPress={this.redo} >
          <View style={styles.tool} backgroundColor={redosLen > 0 ? nonSelectColor : undoRedoFadedBackground} borderColor={redosLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={redosLen > 0 ? workingToolColor : undoRedoFadedText} size={25} type='ionicon' name='arrow-redo' />
          </View>
        </TouchableWithoutFeedback>

        {/* Pallette Button */}
        <TouchableWithoutFeedback onPress={this.onPickerPress} >
          <View style={styles.tool} borderColor={pickerModalVisible ? 'black' : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={pickerModalVisible ? 'black' : 'gray'} size={25} type='ionicon' name='color-palette' />
          </View>
        </TouchableWithoutFeedback>

        {/* Grid Button */}
        <TouchableWithoutFeedback onPress={this.onGridPress} >
          <View style={styles.tool} borderColor={gridShow ? 'black' : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={gridShow ? 'black' : 'gray'} size={25} type='ionicon' name='grid-outline' />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  ColorSelect = props => {
    const [clr, setClr] = useState(props.color)

    onSelectColor = () => {
      setSelectedColor(clr)
    }

    onLongPressColor = () => {
      setPickerModalVisible(true)
    }

    return (
      <TouchableWithoutFeedback onPress={this.onSelectColor} onLongPress={onLongPressColor}>
        <View style={styles.colorSelect} backgroundColor={clr} borderColor={selectedColor == clr ? '#000000' : clr}>

        </View>
      </TouchableWithoutFeedback>
    );
  }

  DrawingCanvas = props => {
    return (
      <View style={styles.drawingCanvas}>
        <View style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: 20, alignItems: 'center' }}>
          {(!selectedDrawing?.name && !name || editName) &&
            <TextInput
              style={[name === null || editName ? {
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 5,
                color: 'gray',
                width: 'auto',
                fontSize: 20,
                padding: 5,
                marginBottom: 17,
                flexGrow: 1
                // width:'100%'
              } : null]}
              // onChangeText={onChangeText}
              onSubmitEditing={(value) => { setName(value.nativeEvent.text); setEditName(false) }}
              placeholder="Name your drawing..."
              placeholderTextColor="gray"
            />
          }
          {((selectedDrawing?.name || name) && !editName) &&
            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <TouchableOpacity
                onPress={() => { setEditName(true) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>

                  <Icon
                    size={30}
                    type="ionicon"
                    name={Platform.OS === "ios" ? "ios-create-outline" : "md-create-outline"}
                  />
                  <Text style={{ alignSelf: 'center', fontSize: 24 }}>{selectedDrawing?.name ?? name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          {selectedFriends &&
            <View style={{ width: 150 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: "row-reverse"}} >
                <View style={{ display: "flex", justifyContent: 'flex-end', flexDirection: "row-reverse", gap: 5 }}>
                  {[...selectedFriends].map(friend =>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: friend })}>
                      <Image style={{ width: 40, height: 40 }} source={images[`${friend}Active`]} />
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </View>
          }
        </View>
        <ViewShot ref={viewShot} style={styles.viewShot}>
          <Row row={0} />
          <Row row={1} />
          <Row row={2} />
          <Row row={3} />
          <Row row={4} />
          <Row row={5} />
          <Row row={6} />
          <Row row={7} />
        </ViewShot>
        <View style={styles.toolbar}>
          <Tools />
        </View>
        <View style={styles.toolbar}>
          <ColorSelect color={'#ffff00'} />
          <ColorSelect color={'#FA9D00'} />
          <ColorSelect color={'#ED3624'} />

          <ColorSelect color={'#a9ff17'} />
          <ColorSelect color={'#60ba46'} />
          <ColorSelect color={'#00733b'} />

          <ColorSelect color={'#969696'} />
        </View>
        <View style={styles.toolbar}>
          <ColorSelect color={'#FF00d4'} />
          <ColorSelect color={'#a400c7'} />
          <ColorSelect color={'#622d90'} />

          <ColorSelect color={'#006fff'} />
          <ColorSelect color={'#1749b3'} />
          <ColorSelect color={'#120377'} />

          <ColorSelect color={'#000000'} />
        </View>
        {/***** Preview screencapture *****/}
        <Button textSize={24} onPress={captureScreen}>Save</Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={previewModalVisible}
        >

          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPreviewModalVisible(false)}
            >
              <Icon size={20} type="ionicon" name="close" />
            </TouchableOpacity>
            <Text>Preview</Text>
            <View style={{ display: 'flex', flexDirection: 'row-reverse', gap: 20, paddingTop: 10, paddingBottom: 40 }}>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 20, height: 200, justifyContent: 'space-between' }}>
                {/* <Button style={{ paddingVertical: 10 }}>Share</Button>
                <Button style={{ paddingVertical: 10 }}>Collaborate</Button>
                <Button style={{ paddingVertical: 10 }}>View in Gallery</Button> */}
                <TouchableOpacity
                  style={{ backgroundColor: "#d9d9d9", borderRadius: 5, padding: 10 }}
                  onPress={() => {
                    navigation.navigate('Share', { showModal: false, selectedDrawing: { uri: uri, name: name ? name : 'Untitiled', pixels: canvasData } });
                    setPreviewModalVisible(false)
                  }}>
                  <Icon
                    size={30}
                    type="ionicon"
                    name={Platform.OS === "ios" ? "ios-share-outline" : "md-share-outline"}
                  />

                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: "#d9d9d9", borderRadius: 5, padding: 10 }}
                  onPress={() => { navigation.navigate('Collaborate', { showModal: false, selectedDrawing: { uri: uri, name: name ? name : 'Untitiled', pixels: canvasData } }); setPreviewModalVisible(false) }}>
                  <Icon
                    size={30}
                    type="ionicon"
                    name={Platform.OS === "ios" ? "ios-person-add-outline" : "md-person-add-outline"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: "#d9d9d9", borderRadius: 5, padding: 10 }}
                  onPress={() => { navigation.navigate('Gallery'); setPreviewModalVisible(false) }}>
                  <Icon
                    size={30}
                    type="ionicon"
                    name={Platform.OS === "ios" ? "ios-apps-outline" : "md-apps-outline"}
                  />
                </TouchableOpacity>
              </View>
              {uri ? (
                <Image
                  source={{ uri: uri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              ) : null}
            </View>
            {/* <Button textSize={36} onPress={() => {
              navigation.navigate('Share', { showModal: false, selectedDrawing: { uri: uri, data: data, name: name ? name : 'Untitiled', pixels: null } });
            }}>Share</Button> */}

          </View>

        </Modal>

        {/***** Preview screencapture *****/}
      </View >
    );
  }

  Picker = () => {
    pickerSelectColor = color => {
      setSelectedColor(color)
      setPickerModalVisible(false)
    }
    return (
      <View style={styles.picker}>
        <TriangleColorPicker
          oldColor={selectedColor}
          onColorSelected={color => pickerSelectColor(color)}
          rotationHackFactor={0}
          style={{ flex: 1 }}
        />
      </View>
    )
  }

  return (
    <View style={[styles.screen, { flex: 1, padding: 10 }]}>
      <DrawingCanvas />
      <Modal
        animationType="slide"
        transparent={true}
        visible={pickerModalVisible}
      >
        <View style={{ height: '50%', marginTop: 'auto', backgroundColor: 'white', borderRadius: 2, borderTopWidth: 2, borderColor: '#d9d9d9', padding: 24, paddingRight: 50 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ fontSize: 16 }}>1. Turn the triangle to change the color</Text>
              <Text style={{ fontSize: 16 }}>2. Drag the circle to select the hue</Text>
              <Text style={{ fontSize: 16 }}>3. Click on the final color on the bottom to select the color</Text>
            </View>
            <TouchableOpacity
              style={[styles.buttonClose, { alignSelf: 'flex-start' }]}
              onPress={() => setPickerModalVisible(!pickerModalVisible)}>
              <Icon size={20} type="ionicon" name="close" />
            </TouchableOpacity>
          </View>
          <Picker />
        </View>
      </Modal>
    </View>
  )
}

/*<View style={styles.screen}>
  <DrawingCanvas/>
</View>*/




const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  menu: {
    width: 44,
    height: 44,
  },
  pixel: {
    width: 44,
    height: 44,
    margin: 0.5,
    marginHorizontal: 0.5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: "row",
  },
  picker: {
    flex: 1,
    padding: 0,
    paddingBottom: 40,
    paddingHorizontal: 50,
    backgroundColor: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  colorSelect: {
    width: 44,
    height: 44,
    margin: 0.5,
    marginHorizontal: 0.5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: "row",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 2,
    borderColor: nonSelectColor,
  },
  tool: {
    height: 44,
    alignItems: 'center',
    backgroundColor: nonSelectColor,
    flexDirection: "row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 2,
    borderColor: nonSelectColor,
  },
  row: {
    alignItems: 'center',
    flexDirection: "row",
  },
  drawingCanvas: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    flexDirection: "row",
    margin: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
  },
  // modal styles
  buttonClose: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-end',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  // screenshot styles
  viewShot: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 400,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 'auto',
    height: '40%',
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
    elevation: 5,
  },
  previewImage: { width: 200, height: 200, backgroundColor: "#fff", borderColor: "black", borderWidth: 2 },
})


