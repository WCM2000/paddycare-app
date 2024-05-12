import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, Image } from 'react-native';

const ContactUsScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !message) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        setName('');
        setEmail('');
        setMessage('');

        Alert.alert('Success', 'Your message has been sent!');
    };

    return (
        <ImageBackground
            blurRadius={10}
            source={require('../assets/background.jpeg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    placeholder="Message"
                    value={message}
                    onChangeText={text => setMessage(text)}
                    multiline
                    numberOfLines={4}
                />
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    color="#2CAC00"
                />

                {/* Contact Details */}
                <View style={styles.contactDetails}>
                    <Text style={styles.contactTitle}>Contact Us:</Text>
                    <Text>Email: paddycaresentinal@proton.com</Text>
                    <Text>Phone: +94112345876</Text>
                    <Text>Address: 200/3,Pitipna North,Homagama.</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 0,
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,

        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 6,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    messageInput: {
        height: 120,

        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    contactDetails: {
        marginTop: 20,

        backgroundColor: '#BAFE5C',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    blackColor: {
        color: '#000000',
    },
    largeText: {
        fontSize: 16,
    },
});

export default ContactUsScreen;
