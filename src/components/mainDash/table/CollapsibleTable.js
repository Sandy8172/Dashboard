import React, { useState, useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ExpandableTable from "./ExpandableTable";
import "./CollapsibleTable.css";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";

export default function CollapsibleTable({tickerArray}) {
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const row = useSelector((state) => state.data.rows);

  const createData = useCallback(
    (Index_Num, Strategy_Name, MtM, Net_Qty, Sell_Qty, Buy_Qty) => {
      return {
        Index_Num,
        Strategy_Name,
        MtM,
        Net_Qty,
        Sell_Qty,
        Buy_Qty,
      };
    },
    []
  );

  const rows = useMemo(() => {
    return row.map((ele) =>
      createData(
        ele.Index_Num,
        ele.Strategy_Name,
        ele.MtM,
        ele.Net_Qty,
        ele.Sell_Qty,
        ele.Buy_Qty
      )
    );
  }, [createData, row]);

  const csvData = useMemo(() => {
    return rows.map((row) => ({
      Index_Num: row.Index_Num,
      Strategy_Name: row.Strategy_Name,
      PnL: row.MtM,
      Net_Qty: row.Net_Qty,
      Sell_Qty: row.Sell_Qty,
      Buy_Qty: row.Buy_Qty,
    }));
  }, [rows]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        color: "white",
        backgroundColor: "#141e2f",
        width: "100%",
        height: "62vh",
        mt: "1rem",
        borderRadius: "1rem",
      }}
    >
      <Table
        sx={{ color: "white", width: "100%", height: "max-content" }}
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow sx={{ color: "white", borderBottom: "2px solid #7b7b7b" }}>
            <TableCell align="left">
              <div className="export-button-container">
                <CSVLink
                  data={csvData}
                  filename={"table_data.csv"}
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <IconButton sx={{ color: "white" }}>
                    <GetAppIcon />
                  </IconButton>
                </CSVLink>
              </div>
            </TableCell>
            <TableCell align="left">
              <div>
                {!indicatorVisible && <div className="error"></div>}
                {indicatorVisible && <div className="success"></div>}
              </div>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Index_Num
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Strategy_Name
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              PnL
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Net_Qty
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Sell_Qty
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Buy_Qty
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((details, ind) => (
            <ExpandableTable key={ind} row={details} tickerArray={tickerArray} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}