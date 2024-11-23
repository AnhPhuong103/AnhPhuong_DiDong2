import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductItem from "./ProductItem"; // Ensure you import ProductItem or your desired display component

const ProductCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category.toLowerCase()}`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải sản phẩm.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
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
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem item={item} />}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#E0F7FA", // Soft light cyan background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA", // Soft light cyan background
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#FF6F61", // Coral color for loading text
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#E0F7FA", // Soft light cyan background
  },
  errorText: {
    color: "#D32F2F", // Red color for error text
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00796B", // Dark teal color for the category title
    textAlign: "center",
    marginBottom: 15,
  },
  productList: {
    paddingBottom: 10,
  },
});

export default ProductCategoryScreen;
