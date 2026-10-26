import { FaBriefcase } from "react-icons/fa";
import {formatCurrency} from "../../utils/helpers.js"
import Stat from "./Stat.jsx"
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdBarChart } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
const Stats = ({bookings , confiremdStays , numofdays , numofcabins}) => {
    console.log("numofcabins",numofdays);
    const numBookings = bookings.length ;
    const sales = bookings.reduce((acc , cur)=> acc + cur.totalPrice , 0);
    const checkins=  confiremdStays.length ;
    const occupation = confiremdStays.reduce((acc , cur)=>acc + cur.numNights , 0);
    const totalNight = numofcabins * numofdays;
    const occupationPercentage = Math.round((occupation / totalNight) * 100) + '%';
  return (
    <>
    <Stat icon={<FaBriefcase />} title='Bookings' value={numBookings} color='blue' />  
    <Stat icon={< HiMiniCurrencyDollar />} title='Sales' value={formatCurrency(sales)} color='green' />  
    <Stat icon={< IoCalendar  />} title='check ins' value={checkins} color='indigo' />  
    <Stat icon={<MdBarChart  />} title='Occupancy Rate' value={occupationPercentage} color='yellow' />  
    
    </>
  )
}

export default Stats
