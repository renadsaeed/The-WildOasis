import {useMutation, useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

import React from 'react'

export const useCheckOut = () => {

   
    const queryClient = useQueryClient();
    const {mutate:Checkingout , isLoading:isChecking, error}=useMutation({
        mutationFn:(id)=>updateBooking(id , {
            status:"checked-out"
        }),
        onSuccess:(data)=>{
            toast.success(`Client Num ${data.id} Checked out `);
             queryClient.invalidateQueries({
               active : true 
             });
        
       
        },
        onError:(err)=>toast.error(err.message),
    });
    return{Checkingout , isChecking ,  error };
}


