import logo from './logo.svg';
import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { create } from 'apisauce';

function App() {

  // State to store the input value
  const [inputValue, setInputValue] = useState('');
  const [dateSevenDaysAfter, setDateSevenDaysAfter] = useState('');
  const [dateSixDaysAfter, setDateSixDaysAfter] = useState('');
  const [dateFiveDaysAfter, setDateFiveDaysAfter] = useState('');
  const [dateFourDaysAfter, setDateFourDaysAfter] = useState('');
  const [dateThreeDaysAfter, setDateThreeDaysAfter] = useState('');
  const [dateTwoDaysAfter, setDateTwoDaysAfter] = useState('');

  const [data, setData] = useState([]);
  const [featuresDate, setFeaturesDate] = useState([]);
  const [featuresHigh, setFeaturesHigh] = useState([]);
  const [featuresLow, setFeaturesLow] = useState([]);
  const [featuresOpen, setFeaturesOpen] = useState([]);
  const [featuresClose, setFeaturesClose] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state

  const currentDate = new Date();
  // Add one day to the current date
  const tomorrowDate = new Date(currentDate);
  const twoDayDate = new Date(currentDate);
  const threeDayDate = new Date(currentDate);
  const fourthDayDate = new Date(currentDate);
  const fifthDayDate = new Date(currentDate);
  const sixthDayDate = new Date(currentDate);
  const seventhDayDate = new Date(currentDate);

  tomorrowDate.setDate(currentDate.getDate() + 1);
  twoDayDate.setDate(currentDate.getDate() + 2);
  threeDayDate.setDate(currentDate.getDate() + 3);
  fourthDayDate.setDate(currentDate.getDate() + 4);
  fifthDayDate.setDate(currentDate.getDate() + 5);
  sixthDayDate.setDate(currentDate.getDate() + 6);
  seventhDayDate.setDate(currentDate.getDate() + 7);

  const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, '0');
  const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const tomorrowYear = tomorrowDate.getFullYear();

  const twoDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
  const twoDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const twoDayYear = tomorrowDate.getFullYear();

  const threeDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
  const threeDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const threeDayYear = tomorrowDate.getFullYear();

  const fourthDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
  const fourthDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const fourthDayYear = tomorrowDate.getFullYear();

  const fifthDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
  const fifthDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const fifthDayear = tomorrowDate.getFullYear();

  // Format the date as "YYYY-MM-DD"
  const tomorrowFormatted = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
  const towDayFormatted = `${twoDayYear}-${twoDayMonth}-${twoDayDay}`;

  // Event handler to update the input value
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    // Calculate the date 7 days before if the entered value is a valid date
    const enteredDate = new Date(value);
    if (!isNaN(enteredDate.getTime())) {

      const sevenDaysAfter = new Date(enteredDate);
      sevenDaysAfter.setDate(sevenDaysAfter.getDate() + 7);
      setDateSevenDaysAfter(sevenDaysAfter.toISOString().split('T')[0]);

      const dateSixDaysAfter = new Date(enteredDate);
      dateSixDaysAfter.setDate(dateSixDaysAfter.getDate() + 6);
      setDateSixDaysAfter(dateSixDaysAfter.toISOString().split('T')[0]);

      const dateFiveDaysAfter = new Date(enteredDate);
      dateFiveDaysAfter.setDate(dateFiveDaysAfter.getDate() + 5);
      setDateFiveDaysAfter(dateFiveDaysAfter.toISOString().split('T')[0]);

      const dateFourDaysAfter = new Date(enteredDate);
      dateFourDaysAfter.setDate(dateFourDaysAfter.getDate() + 4);
      setDateFourDaysAfter(dateFourDaysAfter.toISOString().split('T')[0]);

      const dateThreeDaysAfter = new Date(enteredDate);
      dateThreeDaysAfter.setDate(dateThreeDaysAfter.getDate() + 3);
      setDateThreeDaysAfter(dateThreeDaysAfter.toISOString().split('T')[0]);

      const dateTwoDaysAfter = new Date(enteredDate);
      dateTwoDaysAfter.setDate(sevenDaysAfter.getDate() + 2);
      setDateTwoDaysAfter(dateTwoDaysAfter.toISOString().split('T')[0]);

    } else {
      // Clear the calculated date if the entered value is not a valid date
      setDateSevenDaysAfter('');
      setDateSixDaysAfter('');
      setDateFiveDaysAfter('');
      setDateFourDaysAfter('');
      setDateThreeDaysAfter('');
      setDateTwoDaysAfter('');
    }
  };


  const fetchData = async () => {
    setLoading(true); // Set loading to true before making the request
    //https://api.coindesk.com/v1/bpi/currentprice.json
    //http://18.116.42.185/predict/${tomorrowFormatted}
    const fetchUrls = [
      fetch(`http://18.116.42.185/predict/${dateTwoDaysAfter}`),
      fetch(`http://18.116.42.185/predict/${dateThreeDaysAfter}`),
      fetch(`http://18.116.42.185/predict/${dateFourDaysAfter}`),
      fetch(`http://18.116.42.185/predict/${dateFiveDaysAfter}`),
      fetch(`http://18.116.42.185/predict/${dateSixDaysAfter}`),
      fetch(`http://18.116.42.185/predict/${dateSevenDaysAfter}`),
    ];

    try {
      const responses = await Promise.all(fetchUrls.map(url => fetch(url))); // Fetch all URLs concurrently

      // Parse JSON responses and process data
      const data = await Promise.all(responses.map(async response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.json(); // Parse JSON response
      }));

      // Set features data
      const featuresDate = data.map(features => features.Date);
      const featuresHigh = data.map(features => features.btcHigh);
      // Set other features data similarly...

      // Update state with features data
      setFeaturesDate(featuresDate);
      setFeaturesHigh(featuresHigh);

      // Fetch all URLs concurrently
      //const data = await Promise.all(responses.map(response => handleResponse(response))); // Parse JSON responses

      // Process data...
      console.log(responses)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await response.json(); // Parse JSON response
    return responseData;
  };

  let dataArrayOpen = [];
  let dataArrayClose = [];
  let dataArrayDate = [];
  let dataArrayHigh = [];
  let dataArrayLow = [];
  let reverseDataArrayOpen = [];
  let reverseDataArrayClose = [];
  let reverseDataArrayDate = [];
  let reverseDataArrayHigh = [];
  let reverseDataArrayLow = [];

  // Check if data has a value
  const hasData = predictions !== null && predictions !== undefined && predictions !== '';

  if (featuresDate.length != 0 && featuresDate != undefined) {
    console.log("============actual price===============")
    if (featuresOpen != null || featuresOpen != undefined) {
      dataArrayOpen = Object.entries(featuresOpen).map(([key, value]) => value);
    }
    if (featuresClose != null || featuresClose != undefined) {
      dataArrayClose = Object.entries(featuresClose).map(([key, value]) => value);
    }
    if (featuresDate != null || featuresDate != undefined) {
      dataArrayDate = Object.entries(featuresDate).map(([key, value]) => value);
    }
    if (featuresHigh != null || featuresHigh != undefined) {
      dataArrayHigh = Object.entries(featuresHigh).map(([key, value]) => value);
    }
    if (featuresLow != null || featuresLow != undefined) {
      dataArrayLow = Object.entries(featuresLow).map(([key, value]) => value);
    }
    dataArrayDate.push(tomorrowFormatted);
    reverseDataArrayOpen = dataArrayOpen.reverse();
    reverseDataArrayClose = dataArrayClose.reverse();
    reverseDataArrayDate = dataArrayDate.reverse();
    reverseDataArrayHigh = dataArrayHigh.reverse();
    reverseDataArrayLow = dataArrayLow.reverse();
    console.log(reverseDataArrayOpen);
    console.log(reverseDataArrayClose);
    console.log(reverseDataArrayDate);
    //DO NOTHING
  } else {
    console.log("============actual price not null===============")
    console.log(dataArrayOpen)
  }
  const renderItem = ({ item }) => (
    <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
      <p>{item}</p>
    </div>
  );
  const renderHeader = (header) => (
    <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid black', backgroundColor: "#DBDBDB" }}>
      <p>{header}</p>
    </div>
  );
  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FCCB00' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <h2>Bitcoin Price Predictor</h2>
          <p>Choose a starting date to predict the price of Bitcoin over the next seven days.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <text>Start Date: </text>
              <input
                type="date"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        <div style={{ alignContent: 'center', }}>
          <button onClick={() => fetchData()}>Predict</button>
        </div>

      </div>

      <div style={{ display: 'flex', border: '1px solid black', justifyContent: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Date')}
          {dataArrayDate.map((item, index) => ( // Include index parameter
            <li key={item.id} style={rowStyle}>
              <span style={{ padding: '10px', fontWeight: 'bold' }}>{index}</span> {/* Display the index count */}
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Open')}
          {dataArrayOpen.map(item => (
            <li key={item.id} style={rowStyle}>
              <span>$</span>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Close')}
          {dataArrayClose.map(item => (
            <li key={item.id} style={rowStyle}>
              <span>$</span>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('High')}
          {dataArrayHigh.map(item => (
            <li key={item.id} style={rowStyle}>
              <span>$</span> {/* Display the item with "$" symbol */}
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Low')}
          {reverseDataArrayLow.map(item => (
            <li key={item.id} style={rowStyle}>
              <span>$</span>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
