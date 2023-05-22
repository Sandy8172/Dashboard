import React, { useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandableTable from "./ExpandableTable";

export default function CollapsibleTable(props) {
  const { row, column } = props;

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

  return (
    <TableContainer component={Paper} sx={{ color:"white",  backgroundColor: "#141e2f",width: "100%", height: "60vh",mt:"5rem" }}>
      <Table
        sx={{color:"white", width: "100%", height: "max-content" }}
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow sx={{color:"white",borderBottom:"2px solid #7b7b7b"}}>
            <TableCell />
            <TableCell />
            <TableCell  sx={{color:"white"}} align="center">Index_Num</TableCell>
            <TableCell  sx={{color:"white"}} align="center">Strategy_Name</TableCell>
            <TableCell  sx={{color:"white"}} align="center">PnL</TableCell>
            <TableCell  sx={{color:"white"}} align="center">Net_Qty</TableCell>
            <TableCell  sx={{color:"white"}} align="center">Sell_Qty</TableCell>
            <TableCell  sx={{color:"white"}} align="center">Buy_Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((details, ind) => (
            <ExpandableTable
              key={ind}
              row={details}
              rowData={row}
              headData={column}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
