import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'
import Text from './Text'
import images from "../Variables/Images";


export default Post = ({ name, drawing, caption }) => {
    const [liked, setLiked] = useState(false)
    return (
        <View style={{ width: '100%', alignItems: "center" }}>
            <View style={{ display: 'flex', flexDirection: "column", alignItems: "left", gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image style={{ width: 44, height: 44, borderRadius: 25 }} source={images[name]} />
                    <Text bold style={{ fontSize: 20 }}>{name}</Text>
                </View>
                <Image style={{ width: 300, height: 300 }} source={images[drawing]} />
                <View style={{ display: 'flex', flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", width: 300 }}>
                    <Text style={{ fontSize: 18 }}>{caption}</Text>
                    <TouchableOpacity onPress={() => setLiked(!liked)}>
                        <Icon
                            style={[{ paddingRight: 10 }]}
                            color={liked ? "red" : "black"}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? (liked ? "ios-heart" : "ios-heart-outline") : (liked ? "md-heart" : "md-heart-outline")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}