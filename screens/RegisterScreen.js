import {
    Alert,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState  , useEffect} from "react";
  import { useNavigation } from "@react-navigation/native";
//   import axios from "axios";
  
  const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
  
    const navigation = useNavigation()

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
  
          if (token) {
            navigation.replace("Home");
          } else {
            // token not found , show the login screen itself
          }
        } catch (error) {
          console.log("error", error);
        }
      };
  
      checkLoginStatus();
    }, []);

    const handleRegister = () => {
        const User = {
          name,
          email,
          password,
          image,
        };
    
        fetch('http://192.168.29.153:8000/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Register Error");
            }
          })
          .then((data) => {
            Alert.alert("Register successful");
            console.log("Response", data);
            setName("");
            setEmail("");
            setPassword("");
            setImage("");
          })
          .catch((error) => {
            Alert.alert("Register Error", error.message);
            console.log("Error", error);
          });
      };
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 10,
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>
              Register
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 10 }}>
              Register To Your Account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ color: "gray", fontSize: 18, fontWeight: "600" }}>
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  fontSize: name ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
                placeholderTextColor={"black"}
                placeholder="Enter your Name"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "gray", fontSize: 18, fontWeight: "600" }}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
                placeholderTextColor={"black"}
                placeholder="Enter the email id"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "gray", fontSize: 18, fontWeight: "600" }}>
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
                secureTextEntry={true}
                placeholderTextColor={"black"}
                placeholder="Password"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "gray", fontSize: 18, fontWeight: "600" }}>
                Image
              </Text>
              <TextInput
                value={image}
                onChangeText={(text) => setImage(text)}
                style={{
                  fontSize: image ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300,
                }}
                secureTextEntry={true}
                placeholderTextColor={"black"}
                placeholder="Image"
              />
            </View>
          
            <Pressable
              style={{
                backgroundColor: "#4A55A2",
                width: 200,
                padding: 15,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 6,
              }}
              onPress={handleRegister}
            >
              <Text style={{color:'white' , fontSize:16 , fontWeight:'bold',textAlign:'center'}}>Register</Text>
            </Pressable>
            <Pressable
            onPress={()=> navigation.goBack()}
              style={{
            
                marginTop: 15,
        
              }}
            >
              <Text style={{color:'gray' , fontSize:16 , textAlign:'center'}}>Already Have an account? Sign In</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({});
  