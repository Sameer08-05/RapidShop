import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { heightPixel, widthPixel } from '../../utils/fonts';

const AllOrders = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>

            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.itemRow}>
                                <Image source={{ uri: item.item.image }} style={styles.image} />
                                <View>
                                    <Text style={styles.itemText} numberOfLines={1}>{item.item.name}</Text>
                                    <Text style={styles.itemText}>₹{item.item.price}</Text>
                                    <Text style={styles.itemText}>Qty {item.productStateData.quantity}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(item.item.id)}>
                                <Text style={styles.removeButtonText}>REMOVE</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'black',
    },
    itemContainer: {
        padding: widthPixel(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemRow: {
        flexDirection: 'row',
    },
    image: {
        width: widthPixel(90),
        height: heightPixel(60),
    },
    itemText: {
        color: 'black',
        fontSize: 14,
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 5,
        marginTop: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AllOrders;
