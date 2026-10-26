import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {subDays} from "date-fns"
import{getStaysAfterDate} from "../../services/apiBookings";
const useStaysBooking = () => {
const [searchParams]= useSearchParams();
const numOfDays = searchParams.get('last')? Number(searchParams.get('last')): 7;
const querydate = subDays(new Date() , numOfDays).toISOString();
console.log('querydate ', querydate );
    const {data:stays ,  isLoading , error}= useQuery({
        queryFn:()=> getStaysAfterDate( querydate),
        queryKey:['stays' ,  numOfDays ],
    });

    const confiremdStays = stays?.filter(stay=>stay.status === 'checked-in' || stay.status === 'checked-out' );
    console.log('confiremdStays ', confiremdStays );

    return{stays , isLoading , confiremdStays};
}

export default useStaysBooking
