import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements'
import Text from './Text'
import images from "../Variables/Images";


export default Message = ({ navigation, name, message }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Chat", { name: name })}>
            <View style={{ width: '100%', alignItems: "center" }}>
                <View style={{ display: 'flex', flexDirection: "row", alignItems: "left", gap: 10, width: "100%" }}>
                    <Image style={{ width: 70, height: 70, borderRadius: 50 }} source={images[name]} />
                    <View style={{ display: 'flex', flexDirection: "column", alignItems: "left", gap: 5 }}>
                        <Text bold style={{ fontSize: 20 }}>{name}</Text>
                        <Text style={{ fontSize: 18 }}>{message}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}