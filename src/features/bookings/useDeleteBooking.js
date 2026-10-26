
import React from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
export const useDeleteBooking = (id) => {
    const queryClient = useQueryClient();
 const {mutate:deletebooking , isLoading:isDeleteingBooking , error}=useMutation({
    mutationFn:(id)=>deleteBooking(id) ,
    onSuccess:()=>{
        toast.success(`Deleting booking  successfly`);
        queryClient.invalidateQueries({
            active: true
        });

    },
    onError:(err)=>toast.error("Deleting booking failed"),
 });
 return{deletebooking , isDeleteingBooking  };
}


