import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
} from "react-native-paper";

import Login from "./Login";
import Register from "./Register";
import Layout from "../Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const MessageModal: React.FC<Props> = ({}) => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>Register attempt failed</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const Auth: React.FC<Props> = ({ navigation }) => {
  const [currentDisplay, setCurrentDisplay] = useState(0);

  return (
    <Layout>
      <View>
        <MessageModal navigation={navigation} />
      </View>
      <Surface>
        {currentDisplay === 0 ? (
          <Login navigation={navigation} />
        ) : (
          <Register />
        )}
        <Button
          onPress={() => {
            setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
          }}
        >
          <Text>
            {currentDisplay === 0
              ? "Don't have an account?\nRegister here"
              : "Already have an account? Login"}
          </Text>
        </Button>
      </Surface>
    </Layout>
  );
};

export default Auth;
