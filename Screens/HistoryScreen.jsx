import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Button, ActivityIndicator } from 'react-native';

export const { height, width } = Dimensions.get('window');

// const URL = process.env.DEV_URL;
const URL = process.env.HOST_URL;

const HistoryScreen = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        fetch(URL + '/predictions')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    const deleteDocument = async (documentId) => {
        try {
            const response = await fetch(URL + `/delete/${documentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setData((prevData) => prevData.filter((item) => item._id !== documentId));
            } else {
                console.error('Error deleting document:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const selectItem = (item) => {
        setSelectedItem(item);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => selectItem(item)} style={styles.itemContainer}>
            <Image source={{ uri: item.file_url }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.filename}>{item.filename}</Text>
                <Text style={styles.predictedClass}>Disease: {item.predicted_class}</Text>
                <Text style={styles.confidence}>Confidence: {item.confidence.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteDocument(item._id)} style={styles.deleteButton}>
                <Image source={require('../assets/recyclebin.png')} style={styles.deleteImage} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const closeCardView = () => {
        setSelectedItem(null);
    };

    return (
        <ImageBackground
            blurRadius={10}
            source={require('../assets/background.jpeg')}
            style={styles.background}
        >
            <View style={styles.container}>
                {loading ? ( // Show loading spinner if loading is true
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                )}

                {selectedItem && (
                    <View style={styles.cardView}>
                        <Text style={styles.cardTitle}>{selectedItem.filename}</Text>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: selectedItem.file_url }} style={styles.cardImage} />
                        </View>
                        <Text style={styles.cardText}>Disease: {selectedItem.predicted_class}</Text>
                        <Text style={styles.cardText}>Confidence: {selectedItem.confidence.toFixed(2)}</Text>
                        <Text style={styles.cardText}>Solution: {selectedItem.solution}</Text>
                        <Button title="Close" onPress={closeCardView} color="#00FA9A" style={styles.closeButton} />
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    filename: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    predictedClass: {
        marginTop: 4,
        fontSize: 14,
    },
    confidence: {
        marginTop: 4,
        fontSize: 14,
        color: 'grey',
    },
    solution: {
        marginTop: 4,
        fontSize: 14,
    },
    deleteButton: {
        padding: 8,
    },
    deleteImage: {
        height: 25,
        width: 25,
        tintColor: 'black',
    },
    cardView: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        right: '10%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    cardImage: {
        width: 150,
        height: 150,
        marginBottom: 8,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 14,
        marginBottom: 4,
        color: 'black'
    },
});

export default HistoryScreen;
