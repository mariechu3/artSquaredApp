import React from 'react';
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    content: {
        marginTop: 24,
        marginRight: 24,
        marginBottom: 80,
        marginLeft: 24
    }
})

export default Content = ({ children, ...rest }) => {
    return (
        <View style={[styles.content, rest.style]}>
            {children}
        </View>
    )
}

