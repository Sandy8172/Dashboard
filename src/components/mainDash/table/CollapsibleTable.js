import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandableTable from "./ExpandableTable";


export default function CollapsibleTable(props) {
  const { row, column } = props;

  function createData(
    Index_Num,
    Strategy_Name,
    MtM,
    Net_Qty,
    Sell_Qty,
    Buy_Qty
  ) {
    return {
      Index_Num,
      Strategy_Name,
      MtM,
      Net_Qty,
      Sell_Qty,
      Buy_Qty,
    };
  }

  const rows = props.row.map((ele) =>
    createData(
      ele.Index_Num,
      ele.Strategy_Name,
      ele.MtM,
      ele.Net_Qty,
      ele.Sell_Qty,
      ele.Buy_Qty
    )
  );

  return (
    <TableContainer component={Paper} sx={{ width: "100%", height: "70vh" }}>
      <Table
        sx={{ width: "100%", height: "max-content" }}
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="center">Index_Num</TableCell>
            <TableCell align="center">Strategy_Name</TableCell>
            <TableCell align="center">PnL</TableCell>
            <TableCell align="center">Net_Qty</TableCell>
            <TableCell align="center">Sell_Qty</TableCell>
            <TableCell align="center">Buy_Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((details, ind) => (
            <ExpandableTable key={ind} row={details} rowData={row} headData={column} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
