import styled from "styled-components";
import useRecentBooking from "./useRecentBooking.js";
import useStaysBooking from "./useStaysBooking.js";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import {useCabins} from "../cabins/useCabins"
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
import React from 'react'
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const DashboardLayout = () => {
  const {bookings , isLoading ,  numOfDays}=useRecentBooking();
  const {stays , isLoading:staysLoading , confiremdStays } = useStaysBooking();
  const {isLoading:isloadingcabins, cabins}=useCabins();
  if(isLoading || staysLoading || isloadingcabins) return <Spinner />;
  console.log("booooo", bookings);
  console.log("booooo",  numOfDays);
  
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confiremdStays={confiremdStays}  numofdays={numOfDays} numofcabins={cabins.length} />
         <TodayActivity />
       <DurationChart  confiremdStays={confiremdStays} />
      <SalesChart numOfDays={numOfDays} bookings={bookings}  />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
