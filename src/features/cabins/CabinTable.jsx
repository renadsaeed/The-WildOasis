import styled from "styled-components";
import Table from "../../ui/Table"
import Menus from "../../ui/Menus"
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   width: 100%;
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
import React from "react";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();


  if (isLoading) return <Spinner />;
    if(!cabins.length) return <Empty resourceName="Cabins" />
  console.log(cabins[0]);
  //filter
  const filterValue = searchParams.get('discount') || 'all';
  let filterdCabins ;
  if(filterValue === 'all'){
    filterdCabins = cabins;
  }
   if(filterValue === 'with-discount'){
    filterdCabins = cabins.filter(cabin => cabin.discount > 0);
    console.log('filted with' , filterdCabins);
  }
   if(filterValue === 'no-discount'){
    filterdCabins = cabins.filter(cabin => cabin.discount === 0);
  }
  //sort by
  const sortedBy = searchParams.get("sort") || 'startDate-asc';
  const [filed , direction] = sortedBy.split('-');
  let sortedCabins;
  if( direction === 'asc'){
     sortedCabins = filterdCabins.sort((a,b)=> a[filed] - b[filed]);
  }else{
     sortedCabins = filterdCabins.sort((a,b)=> b[filed] - a[filed]);
  }


  



  return (
    <Menus>
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={filterdCabins} render={(cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      )} />
     
    </Table>
    </Menus>
  );
};

export default CabinTable;
