import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPixel, heightPixel } from '../../utils/fonts'
import AppStyles from '../../styles/AppStyles'
import SpecialRows from '../../components/SpecialRows'
import { _getVerticalPadding } from '../../utils/Helper'
import Ripple from 'react-native-material-ripple'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Snackbar from 'react-native-snackbar'

const Home = () => {
    const AppStyle = AppStyles.getAllStyles()
    const navigation = useNavigation()
    const bottomSheetRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState("1")
    const [productState, setProductState] = useState({})
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)

    const openBottomSheet = (category) => {
        setSelectedCategory(category)
        bottomSheetRef.current.open()
    }

    const handleAddToCart = async (productData) => {
        await dispatch(addToCart(productData))
        Snackbar.show({
            text: "Product added to cart",
            duration: Snackbar.LENGTH_SHORT,
        });
        bottomSheetRef.current.close()
        setProductState((prevState) => {
            const newState = { ...prevState }
            const productId = productData.item.id
            if (newState[productId]) {
                newState[productId].quantity = 0
            }
            return newState
        })
    }

    const handleDecrement = (id) => {
        setProductState((prevState) => {
            const newState = { ...prevState }
            if (newState[id]?.quantity > 1) {
                newState[id].quantity -= 1
            } else if (newState[id]?.quantity === 1) {
                newState[id].quantity = 0
            }
            return { ...prevState, [id]: { ...newState[id] } }
        })
    }

    const handleIncrement = (id) => {
        setProductState((prevState) => {
            const newState = { ...prevState }
            if (newState[id]) {
                newState[id].quantity += 1
            } else {
                newState[id] = { quantity: 1 }
            }
            return { ...newState }
        })
    }

    const navigateToDetailPage = (navigation, item, products, selectedCategory) => {
        bottomSheetRef.current.close()
        const topProducts = (products[selectedCategory] || []).slice(0, 10)
        navigation.navigate("DetailPage", {
            product: item,
            topProducts: topProducts,
        })
    }

    useEffect(() => {
        setProductState({})
    }, [selectedCategory])

    const categories = [
        { id: '1', title: 'Tea, Coffee', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/12_1670926444151.png" },
        { id: '2', title: 'Sauces & Spreads', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/972_1678176421554.png" },
        { id: '3', title: 'Munchies', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png" },
        { id: '4', title: 'Chicken, Meat & Fish', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/4_1670925897047.png" },
        { id: '5', title: 'Baby Care', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/7_1688712826553.png" },
        { id: '6', title: 'Home & Office', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1379_1670927201924.png" },
        { id: '7', title: 'Bakery & Biscuits', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/888_1688712847171.png" },
        { id: '8', title: 'Sweet Tooth', image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/9_1693202755712.png" },
    ]

    const data = [...categories, ...categories]

    const products = {
        "1": [
            {
                id: "101",
                name: "Lay's West Indies",
                price: 20,
                image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
                description: "Lay’s West Indies Hot & Sweet Chips are the perfect blend of spicy and sweet flavors, inspired by the Caribbean. These crispy potato chips are made with high-quality potatoes, fried to perfection, and seasoned with a unique blend of spices. Whether you're enjoying them as a snack while watching a movie or sharing with friends at a party, Lay’s West Indies chips offer an irresistible taste experience."
            },
            {
                id: "102",
                name: "Uncle Chips Spicy",
                price: 20,
                image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/assets/products/sliding_images/jpeg/28e2bfb3-ca64-432f-916e-32cac6ede709.jpg?ts=1726832118",
                description: "Uncle Chips Spicy Treat brings the classic nostalgia of childhood snacks with a fiery twist. These crunchy chips are infused with bold, spicy masala, giving your taste buds an explosion of flavors in every bite. Perfect for those who love a bit of heat in their snacks!"
            },
            {
                id: "103",
                name: "Kurkure Masala Munch",
                price: 15,
                image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/assets/products/sliding_images/jpeg/80393334-436d-4090-b7b0-bcbeb2ce54e6.jpg?ts=1726837541",
                description: "Kurkure Masala Munch is a crunchy, delicious snack that combines Indian spices with an irresistible crunch. Made from high-quality corn and gram flour, this spicy, tangy snack is perfect for satisfying hunger cravings at any time of the day."
            }
        ],
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Delivery to Your Location</Text>
                <Ionicons name="person-circle-outline" size={30} color="#333" />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput placeholder="Search groceries" style={styles.searchInput} />
            </View>

            {_getVerticalPadding(16)}

            <Text style={AppStyle.text_16_Bold_black}>Shop by category</Text>
            {_getVerticalPadding(10)}
            <View style={styles.categoryContainer}>
                {data.map((item) => (
                    <Ripple key={item.id} onPress={() => openBottomSheet(item.id)} style={styles.categoryItem}>
                        <View style={styles.categoryImageContainer}>
                            <Image style={styles.categoryImage} source={{ uri: item.image }} />
                        </View>
                        <Text numberOfLines={2} style={styles.categoryText}>{item.title}</Text>
                    </Ripple>
                ))}
            </View>

            <RBSheet
                ref={bottomSheetRef}
                height={heightPixel(650)}
                openDuration={350}
                closeDuration={400}
                customStyles={styles.bottomSheet}>
                <View style={styles.bottomSheetContent}>
                    <View>
                        <ScrollView style={styles.categoryList}>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => setSelectedCategory(cat.id)}
                                    style={[styles.categoryListItem, selectedCategory === cat.id && styles.selectedCategory]}>
                                    <Image source={{ uri: cat.image }} style={styles.categoryListItemImage} />
                                    <Text style={styles.categoryListItemText}>{cat.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.productListContainer}>
                        <FlatList
                            data={products["1"] || []}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => {
                                const productId = item.id
                                const productStateData = productState[productId] || { quantity: 0, isAdded: false }

                                return (
                                    <TouchableOpacity
                                        onPress={() => navigateToDetailPage(navigation, item, products, selectedCategory)}
                                        style={styles.productItem}>
                                        <View>
                                            <Image source={{ uri: item.image }} style={styles.productImage} />
                                            <Text style={styles.productName}>{item.name}</Text>
                                            <Text style={styles.productPrice}>₹{item.price}</Text>
                                        </View>
                                        {_getVerticalPadding(10)}
                                        <View>
                                            <View style={styles.quantitySelector}>
                                                <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(productId)}>
                                                    <Entypo name="minus" size={18} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.quantityNumber}>{productStateData.quantity}</Text>
                                                <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(productId)}>
                                                    <Entypo name="plus" size={18} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                            {_getVerticalPadding(10)}
                                            <TouchableOpacity onPress={() => {
                                                const productData = {
                                                    item,
                                                    productStateData
                                                }
                                                if (productData.productStateData.quantity === 0) {
                                                    Snackbar.show({
                                                        text: "Please increase the product quantity",
                                                        duration: Snackbar.LENGTH_SHORT,
                                                    })
                                                    return
                                                } else {
                                                    handleAddToCart(productData)
                                                }
                                            }} style={styles.addToCartButton}>
                                                <Text style={styles.addToCartText}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: widthPixel(16), backgroundColor: "white" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: heightPixel(16) },
    headerText: { fontSize: widthPixel(16), fontWeight: "bold", color: "black" },
    searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f0f0f0", borderRadius: widthPixel(8), padding: widthPixel(10), height: heightPixel(40) },
    searchIcon: { marginRight: widthPixel(8) },
    searchInput: { flex: 1 },
    categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    categoryItem: { width: widthPixel(80), alignItems: "center", marginBottom: heightPixel(10) },
    categoryImageContainer: { height: heightPixel(85), width: widthPixel(80), backgroundColor: "#E4F2F2", borderRadius: widthPixel(8), justifyContent: "center", alignItems: "center" },
    categoryImage: { width: "90%", height: "80%" },
    categoryText: { color: "black", alignSelf: "center", fontSize: widthPixel(12), fontWeight: '500', textAlign: "center" },
    bottomSheet: { container: { padding: widthPixel(10), borderTopLeftRadius: widthPixel(24), borderTopRightRadius: widthPixel(24), backgroundColor: "#eeeef0" } },
    bottomSheetContent: { flexDirection: 'row', height: '100%' },
    categoryList: { width: widthPixel(90), borderRightWidth: 1, borderColor: "#ddd" },
    categoryListItem: { padding: widthPixel(10), borderRadius: widthPixel(12), marginRight: widthPixel(10), backgroundColor: "#eeeef0", justifyContent: "center", alignItems: "center" },
    selectedCategory: { backgroundColor: "white" },
    categoryListItemImage: { width: widthPixel(40), height: widthPixel(40) },
    categoryListItemText: { textAlign: "center", fontSize: widthPixel(12), color: "black" },
    productListContainer: { flex: 1, paddingHorizontal: widthPixel(10) },
    productItem: { width: '48%', margin: '1%', padding: widthPixel(5), borderRadius: widthPixel(5), backgroundColor: "white", justifyContent: "space-between" },
    productImage: { width: '100%', height: heightPixel(80) },
    productName: { color: "black", fontSize: widthPixel(12) },
    productPrice: { color: "black", fontSize: widthPixel(12) },
    quantitySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: "rgb(49 134 22)", borderRadius: widthPixel(6), justifyContent: 'center' },
    quantityButton: { backgroundColor: 'rgb(49 134 22)', padding: widthPixel(5), borderRadius: widthPixel(5) },
    quantityNumber: { marginHorizontal: widthPixel(20), fontSize: widthPixel(18), color: 'white' },
    addToCartButton: { height: heightPixel(28), backgroundColor: 'rgb(49 134 22)', width: "auto", justifyContent: "center", alignItems: "center", borderRadius: widthPixel(5) },
    addToCartText: { color: "white" },
})

export default Home
