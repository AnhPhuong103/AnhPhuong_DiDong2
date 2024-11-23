import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Linking,
  Platform,
} from "react-native";
import {
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const animatedHeight = useState(new Animated.Value(0))[0];

  const toggleSection = (section) => {
    if (expandedSection === section) {
      // Đóng section
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedSection(null);
    } else {
      // Mở section mới
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedSection(section);
    }
  };

  const handleContact = (type) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:+84915221752');
        break;
      case 'email':
        Linking.openURL('mailto:phuongxt113@gmail.com');
        break;
      case 'facebook':
        Linking.openURL('https://www.facebook.com/profile.php?id=100047002821221');
        break;
      case 'instagram':
        Linking.openURL('https://www.instagram.com/_ah.phwg/');
        break;
      case 'youtube':
        Linking.openURL('https://www.youtube.com/@Ph%C6%B0%C6%A1ngAnh-b3p');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Wave Background */}
      <View style={styles.waveContainer}>
        <View style={styles.wave} />
        <View style={[styles.wave, styles.wave2]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo & Slogan */}
        <View style={styles.headerSection}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.brandName}>Beauty Space</Text>
          <Text style={styles.slogan}>
            Khám phá vẻ đẹp thuần khiết của bạn
          </Text>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinks}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => toggleSection("store")}
          >
            <View style={styles.linkContent}>
              <MapPin size={24} color="#FFF" style={styles.linkIcon} />
              <View>
                <Text style={styles.linkTitle}>Hệ Thống Cửa Hàng</Text>
                <Text style={styles.linkSubtitle}>
                  Tìm cửa hàng gần bạn nhất
                </Text>
              </View>
              <ChevronRight size={20} color="#FFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => toggleSection("hours")}
          >
            <View style={styles.linkContent}>
              <Clock size={24} color="#FFF" style={styles.linkIcon} />
              <View>
                <Text style={styles.linkTitle}>Giờ Mở Cửa</Text>
                <Text style={styles.linkSubtitle}>
                  T2-CN: 9:00 - 22:00
                </Text>
              </View>
              <ChevronRight size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Liên Hệ Với Chúng Tôi</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContact('phone')}
            >
              <Phone size={24} color="#02008F" />
              <Text style={styles.contactText}>Hotline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContact('email')}
            >
              <Mail size={24} color="#02008F" />
              <Text style={styles.contactText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContact('message')}
            >
              <MessageCircle size={24} color="#02008F" />
              <Text style={styles.contactText}>Tư Vấn</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Kết Nối</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleContact('facebook')}
            >
              <Facebook size={24} color="#02008F" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleContact('instagram')}
            >
              <Instagram size={24} color="#02008F" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleContact('youtube')}
            >
              <Youtube size={24} color="#02008F" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Text style={styles.noteText}>
            "Sứ mệnh của chúng tôi là mang đến những sản phẩm chăm sóc sắc đẹp
            chất lượng cao, an toàn và hiệu quả cho mọi làn da."
          </Text>
        </View>

        {/* Copyright */}
        <Text style={styles.copyright}>
          © 2024 Beauty Space. Bản quyền thuộc về công ty TNHH Beauty Space
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#AFDAE8",
    overflow: "hidden",
  },
  waveContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  wave: {
    position: "absolute",
    width: "100%",
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 1000,
    transform: [{ scaleX: 2 }, { translateY: -50 }],
  },
  wave2: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transform: [{ scaleX: 2 }, { translateY: -30 }],
  },
  content: {
    padding: 20,
    zIndex: 1,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#02008F",
    marginBottom: 5,
  },
  slogan: {
    fontSize: 16,
    color: "#02008F",
    textAlign: "center",
    fontStyle: "italic",
  },
  quickLinks: {
    marginBottom: 30,
  },
  linkButton: {
    backgroundColor: "rgba(2, 0, 143, 0.8)",
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkIcon: {
    marginRight: 15,
  },
  linkTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkSubtitle: {
    color: "#FFF",
    fontSize: 12,
    opacity: 0.8,
  },
  contactSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#02008F",
    marginBottom: 15,
    textAlign: "center",
  },
  contactGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  contactItem: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 12,
    width: width / 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contactText: {
    marginTop: 5,
    color: "#02008F",
    fontSize: 12,
    fontWeight: "500",
  },
  socialSection: {
    marginBottom: 30,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  footerNote: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  noteText: {
    color: "#02008F",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
  },
  copyright: {
    textAlign: "center",
    color: "#02008F",
    fontSize: 12,
    opacity: 0.8,
  },
});

export default Footer;  