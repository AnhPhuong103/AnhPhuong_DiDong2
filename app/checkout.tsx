import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { items } = route.params;

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const shippingOptions = [
    { id: "standard", label: "Tiêu chuẩn", price: 30000 },
    { id: "fast", label: "Nhanh", price: 50000 },
  ];

  const paymentMethods = [
    { id: "cod", label: "Thanh toán khi nhận hàng", icon: "cash-outline" },
    { id: "bank", label: "Chuyển khoản ngân hàng", icon: "card-outline" },
  ];

  const renderCartItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.product.title}</Text>
        <Text style={styles.productDetailsText}>
          {item.quantity} x {item.product.price.toLocaleString()} đ
        </Text>
      </View>
    </View>
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = shippingOptions.find(
    (option) => option.id === selectedShipping
  ).price;
  const total = subtotal + shippingFee;

  const handleOrder = () => {
    if (!address.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập địa chỉ nhận hàng", [
        { text: "Đồng ý" },
      ]);
      return;
    }

    // Tạo mã đơn hàng ngẫu nhiên có định dạng DH + 6 ký tự
    const orderCode = `DH${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const shipping = shippingOptions.find(opt => opt.id === selectedShipping);
    const payment = paymentMethods.find(method => method.id === selectedPayment);

    // Tạo nội dung chi tiết đơn hàng
    const orderDetails = {
      orderCode,
      items: items.map(item => ({
        name: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      })),
      address,
      shipping: {
        method: shipping.label,
        fee: shipping.price,
      },
      payment: payment.label,
      note,
      subtotal,
      total,
    };

    // Lưu đơn hàng vào AsyncStorage (nếu cần)
    // await AsyncStorage.setItem(`order_${orderCode}`, JSON.stringify(orderDetails));

    // Hiển thị thông báo thành công
    Alert.alert(
      "ĐẶT HÀNG THÀNH CÔNG! 🎉",
      `Mã đơn hàng: ${orderCode}\n\n` +
      `📦 Chi tiết đơn hàng:\n${items
        .map(
          item =>
            `• ${item.product.title}\n  Số lượng: ${item.quantity}\n  Giá: ${item.product.price.toLocaleString()}đ`
        )
        .join("\n\n")}\n\n` +
      `📍 Địa chỉ giao hàng:\n${address}\n\n` +
      `🚚 Phương thức vận chuyển:\n${shipping.label} - ${shipping.price.toLocaleString()}đ\n\n` +
      `💳 Phương thức thanh toán:\n${payment.label}\n\n` +
      `💰 Tổng thanh toán:\n` +
      `• Tổng tiền hàng: ${subtotal.toLocaleString()}đ\n` +
      `• Phí vận chuyển: ${shipping.price.toLocaleString()}đ\n` +
      `• Tổng cộng: ${total.toLocaleString()}đ\n\n` +
      `${note ? `📝 Ghi chú:\n${note}\n\n` : ""}` +
      `Cảm ơn quý khách đã mua hàng! 🙏\nChúng tôi sẽ sớm liên hệ để xác nhận đơn hàng của bạn.`,
      [
        {
          text: "Về trang chủ",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>THANH TOÁN</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SẢN PHẨM ĐÃ CHỌN</Text>
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ĐỊA CHỈ NHẬN HÀNG</Text>
        <TextInput
          placeholder="Nhập địa chỉ nhận hàng"
          value={address}
          onChangeText={setAddress}
          multiline
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PHƯƠNG THỨC VẬN CHUYỂN</Text>
        {shippingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.shippingOption,
              selectedShipping === option.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedShipping(option.id)}
          >
            <View style={styles.optionContent}>
              <Ionicons 
                name="bicycle-outline" 
                size={24} 
                color={selectedShipping === option.id ? "#FF6600" : "#666"} 
              />
              <Text style={[
                styles.optionText,
                selectedShipping === option.id && styles.selectedOptionText
              ]}>
                {option.label} - {option.price.toLocaleString()}đ
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GHI CHÚ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú nếu cần"
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PHƯƠNG THỨC THANH TOÁN</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              selectedPayment === method.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <Ionicons 
              name={method.icon} 
              size={24} 
              color={selectedPayment === method.id ? "#FF6600" : "#666"} 
            />
            <Text style={[
              styles.paymentText,
              selectedPayment === method.id && styles.selectedOptionText
            ]}>
              {method.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CHI TIẾT THANH TOÁN</Text>
        <View style={styles.row}>
          <Text style={styles.detailText}>Tổng tiền hàng:</Text>
          <Text style={styles.detailAmount}>{subtotal.toLocaleString()} đ</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailText}>Phí vận chuyển:</Text>
          <Text style={styles.detailAmount}>{shippingFee.toLocaleString()} đ</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalText}>Tổng thanh toán:</Text>
          <Text style={styles.totalAmount}>{total.toLocaleString()} đ</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleOrder}>
        <Text style={styles.checkoutButtonText}>XÁC NHẬN THANH TOÁN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#AFDAE8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#02008F',
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#02008F",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 40,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#02008F',
  },
  productDetailsText: {
    fontSize: 14,
    color: '#666',
  },
  shippingOption: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: "#FF6600",
    backgroundColor: "#FFF3E0",
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  selectedOptionText: {
    color: '#FF6600',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#02008F",
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6600",
  },
  checkoutButton: {
    backgroundColor: "#02008F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Checkout;