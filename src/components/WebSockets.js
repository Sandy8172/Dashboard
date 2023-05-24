import React, { useEffect, useState } from "react";

function WebSockets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Create a new WebSocket instance
    const ws = new WebSocket(
      "ws://103.168.211.34:3000/apimarketdata/socket.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJYMjAxXzM1ZDdlZDVhZTgwZjJhOWJkNjM2MzQiLCJwdWJsaWNLZXkiOiIzNWQ3ZWQ1YWU4MGYyYTliZDYzNjM0IiwiaWF0IjoxNjg0OTEwMDYxLCJleHAiOjE2ODQ5OTY0NjF9.Iakrd-J23iWX8eMGYNLC7Coe_QBsOKyWDrMD6uOyWoY&userID=X201&publishFormat=JSON&broadcastMode=Full&transport=websocket&EIO=3"
    );

    // WebSocket event handlers
    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      //   console.log("Received message:", event.data);
      try {
        const keyValuePairs = event.data.match(/"([^"]+)":([^,"{}[\]]+)/g);
        const receivedData = {};
        keyValuePairs.forEach((pair) => {
          const [key, value] = pair.split(":");
          const cleanedKey = key.slice(1, -1).replace(/\\/g, "");
          receivedData[cleanedKey] = value;
          // console.log(ReceivedData);
          //   let transformedData = [];
          //   let arrayData = transformedData.push(ReceivedData);
          //   console.log(arrayData);
        });
        setData([receivedData]);
        
      } catch (error) {
        console.log(error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

    // console.log(data);

  const sortedData = {};

  data.forEach((item) => {
    const exchangeInstrumentId = item.ExchangeInstrumentID;

    if (!sortedData.hasOwnProperty(exchangeInstrumentId)) {
      sortedData[exchangeInstrumentId] = [];
    }

    sortedData[exchangeInstrumentId].push(item);
  });

  const specificData = sortedData["73690"];
  const lastTradedPrice = specificData ? specificData[0].LastTradedPrice : null;
  console.log(lastTradedPrice);

  return <div>Last Traded Price: {lastTradedPrice}</div>;
}

export default WebSockets;
