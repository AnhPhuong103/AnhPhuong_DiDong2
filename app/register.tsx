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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function RegisterScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.registerBox}>
          {/* Thêm logo ở đây */}
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.heading}>Đăng Ký</Text>

          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              placeholderTextColor="#AFDAE8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#AFDAE8"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              placeholderTextColor="#AFDAE8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="#AFDAE8"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor="#AFDAE8"
              secureTextEntry={true}
            />
          </View>

          <Pressable
            style={styles.termsContainer}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View style={styles.customCheckbox}>
              {isChecked && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.termsText}>
              Tôi đồng ý với{" "}
              <Text style={styles.termsLink}>Điều khoản</Text> và{" "}
              <Text style={styles.termsLink}>Chính sách bảo mật</Text>
            </Text>
          </Pressable>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Đăng Ký</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('index')}>
              <Text style={styles.loginLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFDAE8",
    padding: 20,
  },
  registerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 40,
    width: "100%",
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logo: {
    width: 100, // Kích thước chiều rộng logo
    height: 100, // Kích thước chiều cao logo
    alignSelf: "center", // Căn giữa logo
    marginBottom: 20, // Khoảng cách dưới logo
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#02008F",
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#AFDAE8",
  },
  icon: {
    fontSize: 24,
    color: "#02008F",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#02008F",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  customCheckbox: {
    width: 24,
    height: 24,
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
  },
  termsText: {
    marginLeft: 8,
    color: "#333",
    flex: 1,
  },
  termsLink: {
    color: "#02008F",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#02008F",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
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
  registerButtonText: {
    color: "#AFDAE8",
    fontSize: 16,
    fontWeight: "700",
  },
  loginLinkContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#333",
  },
  loginLink: {
    color: "#02008F",
    fontWeight: "600",
  },
});
