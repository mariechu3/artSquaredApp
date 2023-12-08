import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Mina_400Regular, Mina_700Bold } from '@expo-google-fonts/mina';

export default function CustomText({ bold, ...props }) {
    let [fontsLoaded, fontError] = useFonts({
        Mina_400Regular,
        Mina_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Text style={[bold ? { fontFamily: 'Mina_700Bold' } : { fontFamily: 'Mina_400Regular' }, { fontSize: 24 }, props.style]}>
            {props.children}
        </Text>
    );
}
