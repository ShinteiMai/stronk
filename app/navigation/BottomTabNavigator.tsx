import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useContext, useEffect } from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

/* Screens */
import Home from "./screens/Home";
import Routines from "./screens/Routines";
import Exercises from "./screens/Exercises";

/* Screen Prop Types */
import {
  BottomTabParamList,
  HomeParamList,
  RoutinesParamList,
  ExercisesParamList,
} from "../types";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "../features/userSlice";
import { RootScreenProp } from ".";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

type Prop = {
  navigation: RootScreenProp;
};

const BottomTabNavigator: React.FC<Prop> = ({ navigation }) => {
  const user = useSelector(selectUser);

  if (user.id && user.email) {
    navigation.navigate("Root");
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Routines"
        component={Routines}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: 0 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const RoutinesStack = createStackNavigator<RoutinesParamList>();
function RoutinesNavigator() {
  return (
    <RoutinesStack.Navigator>
      <RoutinesStack.Screen
        name="RoutinesScreen"
        component={Routines}
        options={{ headerTitle: "Routines" }}
      />
    </RoutinesStack.Navigator>
  );
}

const ExercisesStack = createStackNavigator<ExercisesParamList>();

function ExercisesNavigator() {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen
        name="ExercisesScreen"
        component={Exercises}
        options={{ headerTitle: "Exercises" }}
      />
    </ExercisesStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

export default BottomTabNavigator;
