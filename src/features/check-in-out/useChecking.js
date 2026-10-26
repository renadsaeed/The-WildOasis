import {useMutation, useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
export function Checkin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:checkin , isLoading:isChecking , error} = useMutation({
        mutationFn:({bookingId , breakfast})=>updateBooking(bookingId , {
        status: 'checked-in',
        isPaid: true,
         ...breakfast
        }),
        onSuccess:(data)=>{
            toast.success(`booking with id ${data.id} Checked in` );
            queryClient.invalidateQueries({queryKey:['Booking']});
            navigate('/');
             
        },
        onError:()=>toast.error(`error happend while checking in`)


    }); 
    return {checkin , isChecking , error};

    
}