import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPixel, widthPixel } from '../../utils/fonts';
import { _getVerticalPadding } from '../../utils/Helper';
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';

const ProductDetails = ({ route, navigation }) => {
    const { product, topProducts } = route.params;
    const [quantity, setQuantity] = useState(3);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Delivery in 8 minutes</Text>
                        <Text style={styles.subHeaderText}>Mumbai, Maharashtra, India</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>

                <View style={styles.productInfo}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                        <View>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.deliveryTime}>⏳ 8 MINS</Text>
                        </View>
                        <View style={{ height: widthPixel(30), width: widthPixel(30), borderWidth: 0.5, borderColor: "grey", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >

                            <MaterialCommunityIcons name="share-outline" size={18} color="grey" />

                        </View>
                    </View>

                    <View style={styles.brandSection}>
                        <Text style={styles.exploreText}>Explore all products</Text>
                    </View>

                    {_getVerticalPadding(20)}

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                        <View>

                            <Text style={styles.productPrice}>₹{product.price}</Text>
                            <Text style={styles.taxInfo}>(Inclusive of all taxes)</Text>

                        </View>


                        <View style={styles.quantitySelector}>
                            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                                <Text style={styles.quantityText}> - </Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityNumber}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                                <Text style={styles.quantityText}> + </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

                {/* <Text style={styles.sectionTitle}>Top 10 products in this category</Text>
                <FlatList
                    horizontal
                    data={topProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <Image source={{ uri: item.image }} style={styles.topProductImage} />
                            <Text style={styles.productCardName}>{item.name}</Text>
                            <Text style={styles.productPrice}>₹{item.price}</Text>
                        </View>
                    )}
                /> */}

                <Text style={styles.sectionTitle}>Product Details</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
            </ScrollView >

            <View style={styles.cartBar} >
                <Text style={styles.cartText}>{quantity} items</Text>
                <Text style={styles.cartText}>₹{quantity * product.price}</Text>
                <TouchableOpacity onPress={() => {
                    var options = {
                        description: 'Credits towards consultation',
                        image: 'https://i.imgur.com/3g7nmJC.jpg',
                        currency: 'INR',
                        key: 'rzp_test_CDjR18X92n1AdY',
                        amount: '5000',
                        name: ' ',
                        order_id: '',
                        prefill: {
                            email: 'Test123@gmail.com',
                            contact: '9191919191',
                            name: 'Gaurav Kumar'
                        },
                        theme: { color: '#53a20e' }
                    }
                    RazorpayCheckout.open(options).then((data) => {
                        Snackbar.show({
                            text: "Order placed successfully",
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green"
                        });
                    }).catch((error) => {
                    })
                }} style={styles.cartButton}>
                    <Text style={styles.cartButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' },
    headerTextContainer: { flex: 1, alignItems: 'center' },
    headerText: { fontWeight: 'bold', color: 'black' },
    subHeaderText: { fontSize: 12, color: 'gray' },
    productImage: { width: 200, height: 250, resizeMode: 'contain' },
    productInfo: { paddingHorizontal: 12 },
    productName: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    deliveryTime: { color: 'black', marginTop: 5, fontSize: 10, },
    brandSection: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    brandLogo: { width: 30, height: 30 },
    exploreText: { color: 'green', fontWeight: 'bold' },
    productWeight: { fontSize: 16, marginTop: 10, color: 'black' },
    productPrice: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    taxInfo: { color: 'gray', fontSize: 10 },
    quantitySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: "rgb(49 134 22)", borderRadius: widthPixel(6), justifyContent: 'center', marginVertical: 10 },
    quantityButton: { backgroundColor: 'rgb(49 134 22)', padding: 10, borderRadius: 5 },
    quantityText: { color: 'white', fontSize: 18 },
    quantityNumber: { marginHorizontal: 20, fontSize: 18, color: 'white' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: 'black', paddingHorizontal: 15, marginTop: 15 },
    productCard: { width: 120, margin: 10, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    topProductImage: { width: 100, height: 100, resizeMode: 'contain' },
    productCardName: { fontSize: 14, color: 'black', marginTop: 5 },
    productDescription: { color: 'black', paddingHorizontal: 15, marginVertical: 10 },
    cartBar: { flexDirection: 'row', width: "90%", borderRadius: widthPixel(6), position: "absolute", bottom: heightPixel(10), alignSelf: "center", alignItems: 'center', padding: 10, backgroundColor: 'green', justifyContent: 'space-between' },
    cartText: { color: 'white', fontSize: 16 },
    cartButton: { backgroundColor: 'white', padding: 8, borderRadius: 5 },
    cartButtonText: { color: 'green', fontWeight: 'bold' }
});

export default ProductDetails;