import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import FilterButton from '../components/FilterButton';
import Result from '../components/Result';
import Header from '../components/Header';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import RefreshButton from '../components/RefreshButton';
import api from "../api/api";
import endpoints from "../api/endpoints";
import { create } from 'apisauce';

function PredictorScreen({ navigation }) {

    const [data, setData] = useState([]);
    const allActualPrice = ''
    const allFeatures = ''
    const allPredictedPrice = ''
    const predictedPrice = ''

    const [message, setMessage] = useState(null);

    https://api.coindesk.com/v1/bpi/currentprice.json
    useEffect(() => {
        // Create an Apisauce client
        const api = create({
            baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
        });

        // Define a function to fetch data
        const fetchData = async () => {
            try {
                // Make a GET request using Apisauce
                const response = await api.get('greetings');
                // Extract the data from the response
                // Check if response is successful
                if (response.ok) {
                    // Extract the message from the response
                    setMessage(response.data.message);
                } else {
                    // Handle unsuccessful response
                    console.error('Failed to fetch data:', response.problem);
                }
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                // Handle any errors that occur during the request
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])


    return (
        <View style={styles.pageOrganizer}>

            <View style={styles.header}>
                <Text style={styles.titleFont}>Marchine Learning for Bitcoin Price Prediction</Text>
                <RefreshButton label="Refresh" />
            </View>
            <View style={styles.grapOrganizer}>
                {
                    //First Panel
                }
                <View style={styles.predictorView}>
                    <View style={styles.predictorBackground}>
                        <Header label="Predictasdasdasdion" caption={predictedPrice} image="Prediction" />
                        <View style={styles.filter}>
                            <FilterButton label="Monthly" />
                            <FilterButton label="Weekly" />
                            <FilterButton label="Yearly" />
                        </View>
                    </View>
                    <View style={styles.predictionContainer}>
                        {
                            //Analysis 
                        }
                        <Header label="Analysis" caption="Bitcoin price prediction via linear regression" image="Analyis" />
                        {
                            //Prediction Analysis 
                        }
                        <Result label="Predicted Price" caption="Bitcoin price prediction via linear regression" value="$12,345" />
                        <Result label="Market Price" caption="Bitcoin price prediction via linear regression" value="$12,345" />
                        <Result label="Accuracy" caption="Bitcoin price prediction via linear regression" value="$12,345" />
                        <Result label="Difference" caption="Bitcoin price prediction via linear regression" value="$12,345" />

                    </View>
                </View>
                {
                    //Second Panel
                }
                <View style={{ width: '60%', height: '99%', justifyContent: 'space-around' }}>
                    <View style={{ borderWidth: 1, width: '100%', height: '49%', }}>
                        <Header label="History" caption="Correlation Ethereum vs Bitcoin" image="History" />
                        <View style={{ width: '99%', top: 5, alignSelf: 'center' }}>
                            <TableHeader />
                            <ScrollView style={{ height: 250 }}>
                                <Table label="Apr 1" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 2" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 3" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 4" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 5" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 3" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 4" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                                <Table label="Apr 5" predictedPrice="$12,345" actualPrice={"$13,123"} difference="$3212" accuracy="80%" />
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.correlationView}>

                        <View style={{ height: '100%', width: '50%', borderWidth: 1 }}>
                            <View style={styles.correlation}>
                                <Header label="Correlation S&P 500 vs Bitcoin" caption="Correlation S&P 500 vs Bitcoin" image="Correlation" />
                                <View>
                                    <Text>Graph</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: '100%', width: '49%', borderWidth: 1 }}>
                            <View style={styles.correlation}>
                                <Header label="Correlation Ethereum vs Bitcoin" caption="Ethereum vs Bitcoin" image="Correlation" />
                                <View>
                                    <Text>Graph</Text>
                                </View>
                            </View>
                        </View>


                    </View>
                </View>
            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        width: '100%',
        height: '7%',
        backgroundColor: '#FCCB00',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    titleFont: {
        fontSize: 30,
        top: 5
    },
    predictionContainer: {
        alignSelf: 'flex-start',
        width: '100%',
        borderWidth: 1,
        alignSelf: 'center',
    },

    labelFont: {
        fontSize: 18,
    },
    pageOrganizer: {
        height: '100%',
        width: '99%',
        alignItems: 'center',
    },
    correlationView: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    predictorView: {
        height: '99%',
        width: '39%',
        alignItems: 'center',
        borderWidth: 1,
    },
    correlation: {
        width: '100%',
        borderWidth: 1
    },
    grapOrganizer: {
        flexDirection: 'row',
        height: '90%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
    },
    predictorBackground: {
        borderWidth: 1,
        width: '100%',
        height: '55%',
    },
    containerHeader: {
        width: '100%',
        alignItems: 'flex-start',
    },
    filter: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#419BFE"

    }
});

export default PredictorScreen;