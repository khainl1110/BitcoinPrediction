import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
function RefreshButton({ navigation, label}) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.titleFont}>{label}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    titleFont: {
        fontSize: 24,
        textAlign: 'center',
    },
    button:{
        borderWidth: 1,
        height: '80%', 
        width:'25%',
        backgroundColor: '#DBDBDB', 
        alignSelf: 'center',
        alignItems: 'center',

        right: 10,
    }
});

export default RefreshButton;