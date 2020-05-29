import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button, styles } from "expo-ui-kit";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Dashboard from "./screens/Dashboard";
import Messages from "./screens/Messages";
import Contact from "./screens/Contact";
import { createStackNavigator } from "@react-navigation/stack";
import { Block } from "expo-ui-kit";
import { Feather, AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={[{ flex: 1, overflow: "hidden" }, style]}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button
              title={"MENU"}
              transparent
              padding
              marginHorizontal
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" size={18} />
            </Button>
          ),
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <DrawerItem
            labelStyle={{ marginLeft: -16, color: "white" }}
            label="Dashboard"
            icon={() => <AntDesign color="white" name="dashboard" size={16} />}
            onPress={() => props.navigation.navigate("Dashboard")}
          />
          <DrawerItem
            labelStyle={{ marginLeft: -16, color: "white" }}
            label="Messages"
            icon={() => <AntDesign color="white" name="message1" size={16} />}
            onPress={() => props.navigation.navigate("Messages")}
          />
          <DrawerItem
            label="Contact"
            labelStyle={{ marginLeft: -16, color: "white" }}
            icon={() => <AntDesign color="white" name="phone" size={16} />}
            onPress={() => props.navigation.navigate("Contact")}
          />
        </Block>
      </Block>
      <Block noflex>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: "white", marginLeft: -16 }}
          onPress={() => alert("Are you sure logout ?")}
          icon={() => <AntDesign name="logout" size={16} color="white" />}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const screensStyles = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#434343", "#000000"]}>
      <Drawer.Navigator
        // the drawer ->
        drawerType="slide"
        drawerStyle={{ width: "70%", backgroundColor: "transparent" }}
        overlayColor="transparent"
        //contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "green",
          inactiveTintColor: "green",
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
        initialRouteName="Dashboard"
      >
        <Drawer.Screen name="screens">
          {(props) => <Screens {...props} style={screensStyles} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};
