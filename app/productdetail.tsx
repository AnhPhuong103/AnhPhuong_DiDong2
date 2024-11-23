import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Header from "./header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const CART_KEY = "cartItems";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      fetchRelatedProducts(data.category); // Fetch related products based on the category
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      const related = data.filter((item) => item.id !== productId);
      setRelatedProducts(related);
    } catch (err) {
      console.error("Failed to fetch related products:", err);
    }
  };

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  const handleAddToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem(CART_KEY);
      const cartItems = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = cartItems.findIndex((item) => item.productId === product.id);
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({ productId: product.id, quantity });
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      setIsAddedToCart(true);
      Toast.show({
        text1: "Sản phẩm đã được thêm vào giỏ hàng!",
        type: "success",
        position: "bottom",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleBuyNow = () => {
    navigation.navigate("checkout", { product, quantity });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#02008F" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header navigation={navigation} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          {/* Category placed directly below the image */}
          <Text style={styles.category}>{product.category}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.title}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Số lượng:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                <Text style={styles.cartButtonText}>
                  {isAddedToCart ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                <Text style={styles.buyButtonText}>Mua ngay</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedProducts.map((relatedProduct) => (
                <TouchableOpacity
                  key={relatedProduct.id}
                  style={styles.relatedProductItem}
                  onPress={() => navigation.navigate("ProductDetail", { productId: relatedProduct.id })}
                >
                  <Image
                    source={{ uri: relatedProduct.image }}
                    style={styles.relatedProductImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.relatedProductName} numberOfLines={1}>
                    {relatedProduct.title}
                  </Text>
                  <Text style={styles.relatedProductPrice}>
                    ${relatedProduct.price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDAE8',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: width,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: width * 0.8,
    height: "100%",
  },
  category: {
    fontSize: 14,
    color: "#02008F",
    textAlign: "center",
    marginVertical: 10,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  productName: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#02008F",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#FF6600",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#02008F",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  quantityButtonText: {
    color: "#02008F",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: "#FFCC99",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  buyButton: {
    backgroundColor: "#02008F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  cartButtonText: {
    color: "#02008F",
    fontWeight: "bold",
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  relatedProductItem: {
    marginRight: 10,
    width: width * 0.4,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 2,
  },
  relatedProductImage: {
    width: "100%",
    height: 150,
  },
  relatedProductName: {
    fontSize: 14,
    padding: 5,
    color: "#02008F",
  },
  relatedProductPrice: {
    fontSize: 14,
    padding: 5,
    color: "#FF6600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#AFDAE8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#AFDAE8',
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default ProductDetail;
