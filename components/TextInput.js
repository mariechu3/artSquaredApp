import React from 'react';
import { TextInput, } from 'react-native';
import { useFonts, Mina_400Regular, Mina_700Bold } from '@expo-google-fonts/mina';

export default function CustomTextInput({ bold, ...props }) {
    let [fontsLoaded, fontError] = useFonts({
        Mina_400Regular,
        Mina_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <TextInput {...props} style={[bold ? { fontFamily: 'Mina_700Bold' } : { fontFamily: 'Mina_400Regular' }, { fontSize: 16 }, props.style]}>
            {props.children}
        </TextInput>
    );
}
