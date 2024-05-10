import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, } from 'react-native';

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
                <Button title="Submit" onPress={handleSubmit} />

                {/* Contact Details */}
                <View style={styles.contactDetails}>
                    <Text style={styles.contactTitle}>Contact Us:</Text>
                    <Text>Email: paddycaresentinal@proton.com</Text>
                    <Text>Phone: +94112345876</Text>
                    <Text>Address: 200/3,Pitipna North,Homagama</Text>
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
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    messageInput: {
        height: 120,
    },
    contactDetails: {
        marginTop: 20,

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
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    blackColor: {
        color: 'black',
    },
    largeText: {
        fontSize: 16,
    },
});

export default ContactUsScreen;
