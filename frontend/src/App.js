import React, { useState, useContext, useEffect } from 'react';
import './App.css';

function App() {

  // const api = 'https://cors-anywhere.herokuapp.com/http://3.137.166.30';
  const api = "http://3.137.166.30"

  // State to store the input value
  const [inputValue, setInputValue] = useState('');
  const [dateSevenDaysAfter, setDateSevenDaysAfter] = useState('');
  const [dateSixDaysAfter, setDateSixDaysAfter] = useState('');
  const [dateFiveDaysAfter, setDateFiveDaysAfter] = useState('');
  const [dateFourDaysAfter, setDateFourDaysAfter] = useState('');
  const [dateThreeDaysAfter, setDateThreeDaysAfter] = useState('');
  const [dateTwoDaysAfter, setDateTwoDaysAfter] = useState('');
  const [dateOneDaysAfter, setDateOneDaysAfter] = useState('');
  const [dateToday, setDateToday] = useState('');

  const [data, setData] = useState([]);
  const [featuresDate, setFeaturesDate] = useState([]);
  const [featuresHigh, setFeaturesHigh] = useState([]);
  const [featuresLow, setFeaturesLow] = useState([]);
  const [featuresOpen, setFeaturesOpen] = useState([]);
  const [featuresClose, setFeaturesClose] = useState([]);
  const [insight, setInsight] = useState("");
  const [insight2, setInsight2] = useState("");
  const [highestPrice, setHighestPrice] = useState('');
  const [lowestPrice, setLowestPrice] = useState('');
  const [averageClosingPrice, setAverageClosingPrice] = useState('');

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const [loadingMessage, setLoadingMessage] = useState("Please select a date then click Predict. ");


  const [todaysDate, setTodaysDate] = useState('');

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString('en-US');
    setTodaysDate(formattedDate);
  }, []);

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
      sevenDaysAfter.setDate(sevenDaysAfter.getDate() + 6);
      setDateSevenDaysAfter(sevenDaysAfter.toISOString().split('T')[0]);

      const dateSixDaysAfter = new Date(enteredDate);
      dateSixDaysAfter.setDate(dateSixDaysAfter.getDate() + 5);
      setDateSixDaysAfter(dateSixDaysAfter.toISOString().split('T')[0]);

      const dateFiveDaysAfter = new Date(enteredDate);
      dateFiveDaysAfter.setDate(dateFiveDaysAfter.getDate() + 4);
      setDateFiveDaysAfter(dateFiveDaysAfter.toISOString().split('T')[0]);

      const dateFourDaysAfter = new Date(enteredDate);
      dateFourDaysAfter.setDate(dateFourDaysAfter.getDate() + 3);
      setDateFourDaysAfter(dateFourDaysAfter.toISOString().split('T')[0]);

      const dateThreeDaysAfter = new Date(enteredDate);
      dateThreeDaysAfter.setDate(dateThreeDaysAfter.getDate() + 2);
      setDateThreeDaysAfter(dateThreeDaysAfter.toISOString().split('T')[0]);

      const dateTwoDaysAfter = new Date(enteredDate);
      dateTwoDaysAfter.setDate(dateTwoDaysAfter.getDate() + 1);
      setDateTwoDaysAfter(dateTwoDaysAfter.toISOString().split('T')[0]);

      const dateOneDaysAfter = new Date(enteredDate);
      dateOneDaysAfter.setDate(dateOneDaysAfter.getDate() + 0);
      setDateOneDaysAfter(dateOneDaysAfter.toISOString().split('T')[0]);

      const dateToday = new Date(enteredDate);
      setDateToday(dateToday.toISOString().split('T')[0]);


    } else {
      // Clear the calculated date if the entered value is not a valid date
      setDateSevenDaysAfter('');
      setDateSixDaysAfter('');
      setDateFiveDaysAfter('');
      setDateFourDaysAfter('');
      setDateThreeDaysAfter('');
      setDateTwoDaysAfter('');
      setDateOneDaysAfter('');
    }
  };

  const fetchData = async () => {
    setLoading(true); // Set loading to true before making the request
    setLoadingMessage("Calculating Predictions...");
    try {
      const response = await fetch(`${api}/predict/${dateOneDaysAfter}/${dateTwoDaysAfter}/${dateThreeDaysAfter}/${dateFourDaysAfter}/${dateFiveDaysAfter}/${dateSixDaysAfter}/${dateSevenDaysAfter}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json(); // Parse JSON response
        })
        .then(data => {
          setFeaturesDate(data.predictions.Date)
          setFeaturesHigh(data.predictions.btcHigh)
          setFeaturesLow(data.predictions.btcLow)
          setFeaturesOpen(data.predictions.btcOpen)
          setFeaturesClose(data.predictions.btcClose)
          setInsight(data.insight1)
          setInsight2(data.insight2)
          setHighestPrice(data.highestPrice)
          setLowestPrice(data.lowestPrice)
          setAverageClosingPrice(data.avg);
          setData(data); // Set the data in state
        })
      setLoading(false)
      setLoadingMessage("Please select a date then click Predict. ");
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }

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
    <div className="App" style={{fontSize: '13px'}}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FCCB00' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2>BitSmart</h2>
          <p>Choose a starting date to predict the price of Bitcoin over the next seven days.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

      <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div>
          {
            loading !== true ? (
              <>
                <div>
                  <h3>Predicted Open, Close, High, Low</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
                    {renderHeader('Date')}
                    {dataArrayDate.map((item, index) => (
                      <li key={item.id} style={rowStyle}>
                        <span style={{ padding: '10px', fontWeight: 'bold' }}>{index}</span>
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
                        <span>$</span>
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
              </>
            ) : (
              <h2>{loadingMessage}</h2>
            )
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '30px'}}>
          <div>
            <text>You have selected today as {dateToday}. </text>
           
          </div>
          <text>BitSmart has made the following predictions</text>

          <div style={{ display: 'flex', flexDirection: 'column', }}>
            <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
              <b>Predicted Prices (in USD) for the next seven days are: </b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
              <b>Highest Open Price: </b>
              {
                loading !== true ?
                  <text>{highestPrice}</text>
                  : <text style={{ color: 'red' }}>Loading</text>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
              <b>Lowest Open Price: </b>
              {
                loading !== true ?
                  <text>{lowestPrice}</text>
                  : <text style={{ color: 'red' }}>Loading</text>
              }

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
              <b>Average Closing Price: </b>
              {
                loading !== true ?
                  <text>{averageClosingPrice}</text>
                  : <text style={{ color: 'red' }}>Loading</text>
              }

            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
              <b>Recommended swing strategy </b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
              <b>Sell All: </b>
              {
                loading !== true ?
                  <text>{insight}</text>
                  : <text style={{ color: 'red' }}>Loading</text>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
              <b>All In: </b>
              {
                loading !== true ?
                  <text>{insight2}</text>
                  : <text style={{ color: 'red' }}>Loading</text>
              }
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '30px', width: '25%', top: 0 }}>
          <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
            <text>As our current backend operates on HTTP, Chrome might encounter issues accessing the app due to HTTP blocking. If you're experiencing difficulties, follow these steps in Chrome:</text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
            <text>1. Look for the padlock icon 🔒 or "Not secure" label next to the URL.</text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
            <text>2. Click on the icon or label to open the site settings.</text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
            <text>3. Scroll down to "Insecure content" and select "Allow" to enable HTTP requests.</text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderBottom: '1px solid black' }}>
            <text>4. You should now be able to use the app without any issues.</text>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
