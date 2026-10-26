import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {subDays} from "date-fns"
import{getBookingsAfterDate} from "../../services/apiBookings";
const useRecentBooking = () => {
const [searchParams]= useSearchParams();
const numOfDays = searchParams.get('last')? Number(searchParams.get('last')) : 7;
console.log("numOfDays",  numOfDays);
const querydate = subDays(new Date() , numOfDays).toISOString();
console.log('querydate ', querydate );
    const {data:bookings ,  isLoading , error}= useQuery({
        queryFn:()=> getBookingsAfterDate( querydate),
        queryKey:['bookings' ,  numOfDays ],
    });
    return{bookings , isLoading , numOfDays};
}

export default useRecentBooking
