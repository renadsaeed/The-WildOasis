import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import AddNewCabin from "../features/cabins/AddNewCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row type="vertical">
        <CabinTable />
       <AddNewCabin />
      </Row>
    </>
  );
}

export default Cabins;
