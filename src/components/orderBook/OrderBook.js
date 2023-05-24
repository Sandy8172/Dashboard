import React from "react";
import PendingOrder from "./PendingOrder";
import CompleteOrder from "./CompleteOrder";

function OrderBook() {
  return (
    <>
      <PendingOrder />
      <CompleteOrder />
    </>
  );
}

export default OrderBook;
