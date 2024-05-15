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

        //User filling data section you want contact us
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);


        setName('');
        setEmail('');
        setMessage('');

        Alert.alert('Success', 'Your message has been sent!');
    };
    //Fill section and Contact US details
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
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    placeholder="Message"
                    placeholderTextColor="gray"
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


                <View style={styles.contactDetails}>
                    <Text style={styles.contactTitle}>Contact Us:</Text>
                    <Text style={styles.contactText}>Email: paddycaresentinal@proton.com</Text>
                    <Text style={styles.contactText}>Phone: +94112345876</Text>
                    <Text style={styles.contactText}>Address: 200/3,Pitipna North,Homagama.</Text>
                </View>
            </View>
        </ImageBackground>
    );
};
//styles
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
        borderColor: 'black',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',


    },
    messageInput: {
        height: 120,

        borderColor: 'black',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    contactDetails: {
        marginTop: 20,
        backgroundColor: '#BAFE5C',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    contactText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',

    },
    blackColor: {
        color: 'black',
    },
    largeText: {
        fontSize: 16,
    },
});

export default ContactUsScreen;
