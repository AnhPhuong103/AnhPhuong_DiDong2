import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window");
const CART_KEY = 'cartItems';

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleProductPress = () => {
    navigation.navigate("productdetail", { productId: item.id });
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return; // Prevent multiple clicks
    
    setIsAddingToCart(true);
    try {
      const existingCart = await AsyncStorage.getItem(CART_KEY);
      const cartItems = existingCart ? JSON.parse(existingCart) : [];

      // Check if the product already exists in the cart
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.productId === item.id);
      if (existingItemIndex > -1) {
        // Update quantity if the item exists
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item if it doesn't exist
        cartItems.push({ 
          productId: item.id, 
          quantity: 1 
        });
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      
      Toast.show({
        text1: 'Sản phẩm đã được thêm vào giỏ hàng!',
        type: 'success',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Toast.show({
        text1: 'Có lỗi xảy ra khi thêm vào giỏ hàng',
        type: 'error',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={handleProductPress}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>
      <Text style={styles.productName} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.discountedPrice}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.category}>{item.category}</Text>
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          isAddingToCart && styles.addToCartButtonDisabled
        ]}
        onPress={handleAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Feather name="shopping-cart" size={18} color="white" />
            <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 15,
    backgroundColor: "#F5F5F5",
  },
  productItem: {
    width: (width - 40) / 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    height: 40,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#02008F",
    marginRight: 5,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: "#02008F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  addToCartButtonDisabled: {
    backgroundColor: "#666",
  },
  addToCartText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProductList;