import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';


function TableHeader({ navigation, label }) {
    return (
        <View style={styles.tableHeader}>
            <View>
                <Text style={styles.titleFont}>Date</Text>
            </View>
            <View>
                <Text style={styles.titleFont}>Prediction High</Text>
            </View>
            <View>
                <Text style={styles.titleFont}>Open</Text>
            </View>
            <View>
                <Text style={styles.titleFont}>Close</Text>
            </View>
            <View>
                <Text style={styles.titleFont}>High</Text>
            </View>
            <View>
                <Text style={styles.titleFont}>Low</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    titleFont: {
        fontSize: 20,
        textAlign: 'center',
    },
    label: {
        flexDirection: 'row',
    },
    tableHeader: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingLeft: 70,
        paddingRight: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        borderBottomWidth: 1,
        width: '100%',
        backgroundColor: '#DBDBDB',
    },
});

export default TableHeader;