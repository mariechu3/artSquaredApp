import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigation/Navigation.js'
import { Image } from 'react-native-elements'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import Dinosaur from './assets/dinosaur.png'
// import toad from './assets/toad.PNG'
import flower from './assets/flower.jpg'
import toad from './assets/toad.jpg'
import whale from './assets/whale.jpg'
import frog from './assets/frog.jpg'
import sun from './assets/sun.jpg'

const DinosaurUri = Image.resolveAssetSource(Dinosaur).uri;
const toadUri = Image.resolveAssetSource(toad).uri;
const flowerUri = Image.resolveAssetSource(flower).uri;
const frogUri = Image.resolveAssetSource(frog).uri;
const sunUri = Image.resolveAssetSource(sun).uri;
const whaleUri = Image.resolveAssetSource(whale).uri;

export default function App() {
  // each item in here is of type {uri, name, pixels}
  const [drawings, setDrawings] = useState(
    [
      // { uri: DinosaurUri, name: 'Dinosaur1', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur2', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur3', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur4', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur5', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur6', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur7', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur8', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur9', pixels: null },
      // { uri: DinosaurUri, name: 'Dinosawur10', pixels: null },
      { uri: frogUri, name: 'frog', pixels: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#60ba46", "#ffffff", "#ffffff", "#60ba46", "#000000", "#ffffff", "#ffffff", "#60ba46", "#60ba46", "#ffffff", "#ffffff", "#60ba46", "#60ba46", "#ffffff", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#ffffff", "#60ba46", "#f8d1d1", "#f8d1d1", "#f8d1d1", "#f8d1d1", "#60ba46", "#ffffff", "#ffffff", "#ffffff", "#60ba46", "#60ba46", "#60ba46", "#60ba46", "#ffffff", "#ffffff"] },
      { uri: toadUri, name: 'toad', pixels: ["#ffffff", "#ffffff", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ffffff", "#ffffff", "#ffffff", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ffffff", "#ED3624", "#ED3624", "#ED3624", "#ffffff", "#ffffff", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ffffff", "#ffffff", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ED3624", "#ffffff", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#ffffff", "#ffffff", "#f5bb95", "#000000", "#f5bb95", "#f5bb95", "#000000", "#f5bb95", "#ffffff", "#ffffff", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#f5bb95", "#ffffff"] },
      { uri: whaleUri, name: 'whale', pixels: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#006fff", "#006fff", "#ffffff", "#ffffff", "#006fff", "#006fff", "#ffffff", "#006fff", "#006fff", "#006fff", "#006fff", "#ffffff", "#006fff", "#ffffff", "#006fff", "#006fff", "#000000", "#006fff", "#006fff", "#006fff", "#006fff", "#ffffff", "#006fff", "#006fff", "#006fff", "#006fff", "#006fff", "#006fff", "#006fff", "#ffffff", "#ffffff", "#006fff", "#006fff", "#006fff", "#006fff", "#006fff", "#ffffff", "#ffffff"] },
      { uri: flowerUri, name: 'flower', pixels: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#622d90", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#622d90", "#ffff00", "#622d90", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#622d90", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#60ba46", "#60ba46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#60ba46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#60ba46", "#60ba46", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#60ba46", "#ffffff", "#ffffff", "#ffffff", "#ffffff"] },
      { uri: sunUri, name: 'sun', pixels: ["#ffffff", "#ffffff", "#FA9D00", "#ffffff", "#ffffff", "#FA9D00", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#FA9D00", "#FA9D00", "#FA9D00", "#FA9D00", "#ffffff", "#ffffff", "#FA9D00", "#FA9D00", "#FA9D00", "#fad900", "#fad900", "#FA9D00", "#FA9D00", "#FA9D00", "#ffffff", "#FA9D00", "#fad900", "#fad900", "#fad900", "#fad900", "#FA9D00", "#ffffff", "#ffffff", "#FA9D00", "#fad900", "#fad900", "#fad900", "#fad900", "#FA9D00", "#ffffff", "#FA9D00", "#FA9D00", "#FA9D00", "#fad900", "#fad900", "#FA9D00", "#FA9D00", "#FA9D00", "#ffffff", "#ffffff", "#FA9D00", "#FA9D00", "#FA9D00", "#FA9D00", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#FA9D00", "#ffffff", "#ffffff", "#FA9D00", "#ffffff", "#ffffff"] },

    ])
  const addDrawing = (drawing) => {
    setDrawings(drawings => [...drawings, { ...drawing }])
  }
  const removeDrawing = (drawing) => {
    setDrawings(drawings => drawings.filter(x => x.uri != drawing.uri))
  }

  const editDrawing = (drawing) => {
    let newDrawings = [...drawings];
    let index = drawings.findIndex(x => x.uri == drawing.uri)
    newDrawings[index] = drawing
    setDrawings(newDrawings)
  }
  return (
    <NavigationContainer>
      <Navigation drawings={drawings} addDrawing={addDrawing} removeDrawing={removeDrawing} editDrawing={editDrawing} />
    </NavigationContainer>

  )
}
