import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CollapsibleTable from "./CollapsibleTable";


function MainTable() {

  const [data, setData] = useState([]);
  const [formetedData, setFormetedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [MtMsum, setMtMsum] = useState(0);

  const dataFechHandling = () => {
    axios
      .get("http://172.16.1.24:5000/")
      .then((res) => {
        const transformedData = Object.entries(res.data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setData(transformedData);
      })
      .catch((err) => console.log(err.message));

    const addMtM = data.reduce((pre, curr) => {
      return pre + curr.MtM;
    }, 0);
    setMtMsum(addMtM);

    const objdata = data.map(
      ({
        Buying_Avg_Price,
        Exchange_InstrumentID,
        Exchange_Segment,
        Index_Num,
        LTP,
        MtM,
        Option_Type,
        Realized,
        Sell_Qty,
        Selling_Avg_Price,
        Stopl_Loss_Price,
        Strategy_Name,
        Strategy_Status,
        Ticker,
        UnRealized,
        Buy_Qty,
        Net_Qty,
      }) => {
        return {
          Index_Num,
          Selling_Avg_Price,
          Buying_Avg_Price,
          Option_Type,
          Net_Qty,
          Sell_Qty,
          Buy_Qty,
          Exchange_InstrumentID,
          Exchange_Segment,
          LTP,
          Stopl_Loss_Price,
          Strategy_Name,
          Strategy_Status,
          Ticker,
          Realized,
          UnRealized,
          MtM,
        };
      }
    );
    setFormetedData(objdata);

    const sort = formetedData.sort((a, b) => a.Index_Num - b.Index_Num);
    setSortedData(sort);
  };
  const headData = [
    "Index_Num",
    "Selling_Avg_Price",
    "Buying_Avg_Price",
    "Option_Type",
    "Net_Qty",
    "Sell_Qty",
    "Buy_Qty",
    "Exchange_InstrumentID",
    "Exchange_Segment",
    "LTP",
    "Stopl_Loss_Price",
    "Strategy_Name",
    "Strategy_Status",
    "Ticker",
    "Realized",
    "UnRealized",
    "MtM",
  ];
  useEffect(() => {
    dataFechHandling();
  }, [data]);
  return (
    <>
    <CollapsibleTable column={headData} row={sortedData} />
    </>
  )
}

export default MainTable