import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';
import FilterButton from '../components/FilterButton';
import Result from '../components/Result';
import Header from '../components/Header';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import RefreshButton from '../components/RefreshButton';
import { create } from 'apisauce';

function PredictorScreen({ navigation }) {

    const [data, setData] = useState([]);
    const [allActualPrice, setAllActualPrice] = useState(null);
    const [allFeatures, setDataAllFeatures] = useState(null);
    const [allPredictedPrice, setAllPredictedPrice] = useState(null);
    const [setPredictedPrice, predictedPrice] = useState(null);
    const [loading, setLoading] = useState(true); // State variable to track loading state


    const currentDate = new Date();
    // Add one day to the current date
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const tomorrowYear = tomorrowDate.getFullYear();
    // Format the date as "YYYY-MM-DD"
    const tomorrowFormatted = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;


    console.log(tomorrowFormatted)



    useEffect(() => {
        // Create an Apisauce client
        const api = create({
            baseURL: 'http://localhost/', // Replace with your API base URL
        });

        // Define a function to fetch data
        const fetchData = async () => {
            setLoading(true); // Set loading to true before making the request
            try {
                // Make a GET request using Apisauce
                const response = await api.get(`predict/${tomorrowFormatted}`);

                // Check if response is successful
                if (response.ok) {
                    // Extract the data from the response
                    const { jsonAllActualPrice, allFeatures, allPredictedPrice, predictedPrice } = response.data;

                    // Extract data from the JSON object and convert to array of objects
                    const allActualPrice = Object.entries(jsonAllActualPrice.allActualPrice).map(([index, value]) => ({
                        id: index,
                        value: value,
                    }));
                    // Update state variables with the extracted data
                    setAllActualPrice(allActualPrice);
                    setDataAllFeatures(allFeatures);
                    setAllPredictedPrice(allPredictedPrice);
                    setPredictedPrice(predictedPrice)
                } else {
                    // Handle unsuccessful response
                    console.error('Failed to fetch data:', response.problem);
                }
            } catch (error) {
                // Handle any errors that occur during the request
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchData(); // Call the fetchData function

    }, []); // Empty dependency array means this effect runs only once, on mount

    /*const displayArrayAsRows = (allPredictedPrice) => {
        return allPredictedPrice.map((item, index) => (
            <Table key={index} label="Apr 1" predictedPrice={item} actualPrice={"$13,123"} difference="$3212" accuracy="80%" /?
        ));
    };*/

    const renderItem = ({ item }) => (
        <View style={{ padding: 10 }}>
            <Text>Index: {item.id}, Value: {item.value}</Text>
        </View>
    );

    console.log(allFeatures)
    console.log(allPredictedPrice)
    console.log(allActualPrice)
    console.log(predictedPrice)

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
                        <Header label="Predictasdasdasdion" caption="Predictasdasdasdion" image="Prediction" />
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
                            <FlatList
                                data={allActualPrice}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                            />
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