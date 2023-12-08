import Home from '../screens/Home'
import Canvas from '../screens/Canvas'
import Lessons from '../screens/Lessons'
import Share from '../screens/Share'
import Collaborate from '../screens/Collaborate'
import Gallery from '../screens/Gallery'
import Friends from '../screens/Friends'
import Messages from '../screens/Messages'
import Chat from '../screens/Chat'
import { View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import images from '../Variables/Images'
import { useFonts, Mina_400Regular, Mina_700Bold } from '@expo-google-fonts/mina';
import { NovaSquare_400Regular } from '@expo-google-fonts/nova-square';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default Navigation = ({ drawings, addDrawing, removeDrawing, editDrawing }) => {
    let [fontsLoaded, fontError] = useFonts({
        Mina_400Regular,
        Mina_700Bold,
        NovaSquare_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            backBehavior="history"
            screenOptions={({ navigation }) => ({
                drawerStyle: {
                    backgroundColor: 'white',
                    width: 300,
                },
                drawerPosition: "right",
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ paddingLeft: 24 }}><Image style={{ width: 35, height: 35 }} source={images['LogoCircle']}></Image></TouchableOpacity>
                ),

                headerRight: (props) => (<View style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
                        <Icon
                            size={34}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-chatbubble-ellipses-outline" : "md-chatbubble-ellipses-outline"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 24 }} onPress={navigation.toggleDrawer}>
                        <Icon
                            size={44}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-menu-outline" : "md-cmenu-outline"}
                        />
                    </TouchableOpacity></View>),
                headerTitleAlign: "left",
                headerTitleStyle: {
                    fontSize: 24, fontFamily: 'NovaSquare_400Regular'
                },
            })}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    headerTitle: '',
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-home-outline" : "md-home-outline"}
                        />
                    ),

                }}
            // component={({ navigation }) => <Home navigation={navigation} drawings={drawings} />} 
            >
                {({ navigation }) => <Home navigation={navigation} drawings={drawings} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Canvas"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Canvas',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-easel-outline" : "md-easel-outline"}
                        />
                    ),
                }}
            // component={({ route }) => <Canvas route={route} addDrawing={addDrawing} />} 
            >
                {({ route, navigation }) => <Canvas navigation={navigation} route={route} addDrawing={addDrawing} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Friends"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Friends',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-people-outline" : "md-people-outline"}
                        />
                    ),
                }}
                component={Friends}
            />
            <Drawer.Screen
                name="Messages"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Messages',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-chatbubble-ellipses-outline" : "md-chatbubble-ellipses-outline"}
                        />
                    ),
                }}
            >
                {({ navigation }) => <Messages navigation={navigation} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Chat"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Chat',
                    drawerItemStyle: { display: 'none' },
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-chatbubble-ellipses-outline" : "md-chatbubble-ellipses-outline"}
                        />
                    ),
                }}
            >
                {({ route }) => <Chat route={route} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Gallery"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Gallery',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-apps-outline" : "md-apps-outline"}
                        />
                    ),
                }}
            // component={({ navigation }) => <Gallery navigation={navigation} drawings={drawings} />} 
            >
                {({ navigation }) => <Gallery removeDrawing={removeDrawing} navigation={navigation} drawings={drawings} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Lessons"
                options={{
                    drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular' },
                    drawerLabel: 'Lessons',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            style={{ paddingRight: 10 }}
                            size={36}
                            type="ionicon"
                            name={Platform.OS === "ios" ? "ios-book-outline" : "md-book-outline"}
                        />
                    ),
                }}
                component={Lessons} />
            <Drawer.Screen
                name="Collaborate"
                initialParams={{ fromGallery: false }}
                options={{
                    // drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular', display: 'none' },
                    drawerItemStyle: { display: 'none' },
                    drawerLabel: 'Collaborate',
                    // drawerIcon: ({ focused, size }) => (
                    //     <Icon
                    //         style={{ paddingRight: 10 }}
                    //         size={36}
                    //         type="ionicon"
                    //         name={Platform.OS === "ios" ? "ios-people-outline" : "md-people-outline"}
                    //     />
                    // ),
                }}
            // component={({ route, navigation }) => <Collaborate showModal={true} navigation={navigation} route={route} drawings={drawings} />} 
            >
                {({ route, navigation }) => <Collaborate navigation={navigation} route={route} drawings={drawings} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Share"
                initialParams={{ fromGallery: false }}
                options={{
                    // drawerLabelStyle: { fontSize: 24, fontFamily: 'Mina_400Regular', display: 'none' },
                    drawerItemStyle: { display: 'none' },
                    drawerLabel: 'Share',
                    // drawerIcon: ({ focused, size }) => (
                    //     <Icon
                    //         style={{ paddingRight: 10 }}
                    //         size={36}
                    //         type="ionicon"
                    //         name={Platform.OS === "ios" ? "ios-share-outline" : "md-share-outline"}
                    //     />
                    // ),
                }}
            // component={({ navigation, route }) => <Share showModal={true} route={route} navigation={navigation} buttonText="Next" drawings={drawings} />}
            >
                {({ navigation, route }) => <Share route={route} navigation={navigation} buttonText="Next" drawings={drawings} />}
            </Drawer.Screen>
        </Drawer.Navigator >
    );
}