import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    const searchResults = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(searchResults);
    setIsSearching(false);
    setShowResults(true);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length === 0) {
      setShowResults(false);
    }
  };

  const handleProductSelect = (product) => {
    setShowResults(false);
    navigation.navigate("ProductDetail", { product });
  };

  const SearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleProductSelect(item)}
    >
      <Image 
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
        <Text style={styles.resultPrice}>VND {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Row trên cùng với các biểu tượng điều hướng */}
      <View style={styles.navigationRow}>
        {/* Xóa icon category */}
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
          <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isSearching || searchQuery.length === 0}
        >
          {isSearching ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Feather name="search" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Kết quả tìm kiếm trong Modal */}
      <Modal
        visible={showResults}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowResults(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kết quả tìm kiếm ({filteredProducts.length})</Text>
              <TouchableOpacity onPress={() => setShowResults(false)}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {filteredProducts.length > 0 ? (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <SearchResultItem item={item} />}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.noResultsContainer}>
                <Feather name="search" size={50} color="#CCC" />
                <Text style={styles.noResults}>Không tìm thấy sản phẩm phù hợp</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02008F",
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Điều chỉnh lại cho đều
    alignItems: "center",
    paddingVertical: 10,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#AFDAE8",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#FF6B00",
    padding: 8,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultCategory: {
    fontSize: 14,
    color: '#666',
  },
  resultPrice: {
    fontSize: 16,
    color: '#FF6B00',
  },
});

export default Header;
