import React, { useEffect, useState } from "react";

function WebSockets() {
  const [data, setData] = useState({});

  let dataObject = {
    ApplicationType: "",
    AverageTradedPrice: "",
    BookType: "",
    BuyBackMarketMaker: "",
    BuyBackTotalBuy: "",
    BuyBackTotalSell: "",
    Close: "",
    ExchangeInstrumentID: "",
    ExchangeSegment: "",
    ExchangeTimeStamp: "",
    High: "",
    LastTradedPrice: "",
    LastTradedQunatity: "",
    LastTradedTime: "",
    LastUpdateTime: "",
    Low: "",
    MessageCode: "",
    MessageVersion: "",
    Open: "7.",
    PercentChange: "",
    Price: "",
    Size: "",
    TokenID: "",
    TotalBuyQuantity: "",
    TotalOrders: "",
    TotalSellQuantity: "",
    TotalTradedQuantity: "",
    TotalValueTraded: "",
    XMarketType: "",
  };
  useEffect(() => {
    let ws = null;
    let heartbeatInterval = null;

    const connectWebSocket = () => {
      ws = new WebSocket(
        "ws://14.99.241.31:3000/apimarketdata/socket.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJYNTAxXzIwYzgxOTBlM2YxOGU3NzFkYjEzMzMiLCJwdWJsaWNLZXkiOiIyMGM4MTkwZTNmMThlNzcxZGIxMzMzIiwiaWF0IjoxNjg1OTM5MDU5LCJleHAiOjE2ODYwMjU0NTl9.Mtiofn9zOM_ytYkfsyvZKPzE6ucx2Gf7ysEfpjIS_F0&userID=X501&publishFormat=JSON&broadcastMode=Full&transport=websocket&EIO=3"
      );

      ws.addEventListener("open", () => {
        console.log("WebSocket connection established");
        startHeartbeat();
      });

      ws.onmessage = (event) => {
        const receivedData = event.data;
        const regex = /^42\["1501-json-full",(.+)\]$/;
        const match = receivedData.match(regex);

        if (match) {
          try {
            const keyValuePairs = event.data.match(/"([^"]+)":([^,"{}[\]]+)/g);
            const receivedData = {};
            keyValuePairs?.forEach((pair) => {
              const [key, value] = pair.split(":");
              const cleanedKey = key.slice(1, -1).replace(/\\/g, "");
              receivedData[cleanedKey] = value;
              setData(receivedData);
            });
          } catch (error) {
            console.log("Error parsing extracted data:", error);
          }
        }
      };

      ws.addEventListener("close", (event) => {
        const { code, reason } = event;
        console.log(`WebSocket connection closed with code ${code}: ${reason}`);
        stopHeartbeat();
        reconnect();
      });

      ws.addEventListener("error", (error) => {
        console.log("WebSocket error:", error);
      });
    };

    const startHeartbeat = () => {
      ws.send("ping");
      heartbeatInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send("ping");
        }
      }, 10);
    };

    const stopHeartbeat = () => {
      clearInterval(heartbeatInterval);
    };

    const reconnect = () => {
      // Reconnect after a delay
      setTimeout(connectWebSocket, 10);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      stopHeartbeat();
    };
  }, []);

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Check if the key exists in dataObject
      if (dataObject.hasOwnProperty(key)) {
        // Update the value of the corresponding key in dataObject
        dataObject[key] = data[key];
      }
    }
  }

  let dataArray = [];
  const exchangeInstrumentID = dataObject.ExchangeInstrumentID;
  const existingObject = dataArray.find(
    (obj) => obj.ExchangeInstrumentID === exchangeInstrumentID
  );

  if (existingObject) {
    // If the object already exists, update its corresponding values
    Object.assign(existingObject, dataObject);
  } else {
    // If the object doesn't exist, add a new object to the dataArray
    dataArray.push(dataObject);
  }
  console.log(dataArray);

  return (
    <div>
      {Object.entries(dataObject).map(([key, value]) => (
        <div key={key}>
          <strong>{key} :</strong> {value}
        </div>
      ))}
    </div>
  );
}

export default WebSockets;
