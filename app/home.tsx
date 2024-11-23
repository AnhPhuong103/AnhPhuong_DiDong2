import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Header from "./header";
import Banner from "./banner";
import Menu from "./menu";
import ProductList from "./productlist";
import Footer from "./footer";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Banner />
          <Menu/>
          <ProductList/>
          <Footer/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});
