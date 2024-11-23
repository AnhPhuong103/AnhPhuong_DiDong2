import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
  Image, // Import Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate("register");
  };

  const handleLoginPress = () => {
    navigation.navigate("home");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          {/* Logo Section */}
          <Image
            source={require('@/assets/images/logo.png')} // Use the same logo as RegisterScreen
            style={styles.logo}
          />

          <Text style={styles.heading}>Đăng Nhập</Text>

          {/* Username Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên đăng nhập:</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person"
                size={24}
                color="#333"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập hoặc email"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu:</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#333"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="#999"
                secureTextEntry={true}
              />
            </View>
          </View>

          {/* Remember me and forgot password */}
          <View style={styles.options}>
            <Pressable
              style={styles.rememberMe}
              onPress={() => setIsChecked(!isChecked)}
            >
              <View style={styles.customCheckbox}>
                {isChecked && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.rememberText}>Nhớ mật khẩu</Text>
            </Pressable>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.loginButtonText}>Đăng Nhập</Text>
          </TouchableOpacity>

          {/* Section for third-party login options */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#fff" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={24} color="#fff" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign up Link */}
          <TouchableOpacity
            style={styles.signupLinkContainer}
            onPress={handleRegisterPress}
          >
            <Text style={styles.signupLink}>Đăng ký tài khoản mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFDAE8", // Light blue background
    padding: 20,
  },
  loginBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    width: "100%",
    maxWidth: 350,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: "center",
  },
  logo: {
    width: 100, // Set your desired width
    height: 100, // Set your desired height
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#02008F", // Dark blue text
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#02008F",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#02008F",
    borderRadius: 2,
  },
  rememberText: {
    marginLeft: 8,
    color: "#333",
  },
  forgotPassword: {
    color: "#02008F",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#02008F",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#02008F",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#333",
    fontWeight: "500",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    backgroundColor: "#02008F", // Use the dark blue for buttons
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  socialButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  signupLinkContainer: {
    marginTop: 10,
  },
  signupLink: {
    color: "#02008F",
    fontWeight: "600",
    fontSize: 16,
  },
});
