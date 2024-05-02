import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
function FilterButton({ navigation, label, onPress}) {
    return (
        <TouchableOpacity style={styles.button}  onPress={onPress}>
            <Text style={styles.titleFont}>{label}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    titleFont: {
        fontSize: 22,
    },
    button:{
        borderWidth: 1,
        height: '90%', 
        width:'30%',
        backgroundColor: '#DBDBDB', 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FilterButton;