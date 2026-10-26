import{getBookings} from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "../../utils/Constance";
export function useBookings(){
    const [searchParams ] = useSearchParams();
    const filtervalue = searchParams.get('status') ;
    const sortvalue =  searchParams.get('sort') || "" ;

    const [filed , direction] = sortvalue.split('-');
    const filter = !filtervalue || filtervalue === 'all' ? null : {filterFiled:"status" , value: filtervalue , method:"eq" };
    const sort = !filed ||filed === "" ? null : { filed: filed ,direction:direction };
      //pagenation 
     const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    
    const {data:{data: bookings , error , count} ={} ,isLoading  } = useQuery({
        queryKey:['bookings' , filter , sort , page],
        queryFn: ()=>getBookings({filter , sort , page}),
    });
    console.log("fecthed from usebooking" , bookings ); 
    //preFetch
    const queryClient = useQueryClient();
     const pageCount = Math.ceil(count / PageSize);
    if(page < pageCount)
    {
        queryClient.prefetchQuery({
             queryKey:['bookings' , filter , sort , page +1],
        queryFn: ()=>getBookings({filter , sort , page: page + 1}),
        });
    }




     if(page > 1)
    {
        queryClient.prefetchQuery({
             queryKey:['bookings' , filter , sort , page - 1],
        queryFn: ()=>getBookings({filter , sort , page: page - 1}),
        });
    }
      console.log(bookings);
        console.log('count', count);
    
      return { isLoading, bookings , error , count };
}