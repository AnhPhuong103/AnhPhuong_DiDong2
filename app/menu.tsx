import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      const transformedData = data.map((category: string) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
      }));

      setCategories(transformedData);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh mục.");
      setLoading(false);
    }
  };

  const handleCategoryPress = (category: string) => {
    navigation.navigate("ProductCategoryScreen", { category });
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
    <View style={styles.container}>
      <View style={styles.row}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(item.name)}
            style={styles.categoryButton}
          >
            <Text style={styles.menuTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#AFDAE8", // Light blue background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#AFDAE8", // Light blue background
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#AFDAE8", // Light blue background
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#02008F", // Dark blue background for buttons
    borderRadius: 15, // Rounded corners
    borderWidth: 1, // Add border width
    borderColor: "#FFFFFF", // White border color
    paddingVertical: 10, // Adjust padding
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // White text color for better contrast
    textAlign: "center",
  },
});

export default Menu;
