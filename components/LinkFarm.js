import React from 'react'
import { Button } from 'react-native'

export default LinkFarm = ({navigation, route}) => {
    return (
        <>
            <Button
                title="Art^2"
                onPress={() => navigation.push('Home')
                } />
            <Button
                title="Collaborate"
                onPress={() => navigation.push('Collaborate')
                } />
            <Button
                title="Gallery"
                onPress={() => navigation.push('Gallery')
                } />
            <Button
                title="Share"
                onPress={() => navigation.push('Share')
                } />
            <Button
                title="Lessons"
                onPress={() => navigation.push('Lessons')
                } />
            <Button
                title="Canvas"
                onPress={() => navigation.push('Canvas')
                } />
        </>
    )
}