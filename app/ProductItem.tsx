import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  const handleAddToCart = () => {
    alert(`${item.title} đã được thêm vào giỏ hàng!`);
  };

  const handleImagePress = () => {
    // Navigate to ProductDetail and pass the product item as a parameter
    navigation.navigate("ProductDetail", { product: item });
  };

  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>
      <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Feather name="shopping-cart" size={18} color="white" />
        <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  productImage: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#E91E63",
    textAlign: "center",
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addToCartText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default ProductItem;
