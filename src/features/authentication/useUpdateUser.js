import {useMutation, useQueryClient } from "@tanstack/react-query";
import {updateUserdata} from "../../services/apiAuth"
import React from 'react'
import toast from "react-hot-toast";
const useUpdateUser = () => {
    const queryClient = useQueryClient();
const {mutate:updateUser , isLoading:isUpdateing , error}= useMutation({
    mutationFn:({password , fullName , avatar})=>updateUserdata({password , fullName , avatar}),
    onSuccess:()=>{
     toast.success('user data updated sucessfuly');
     queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
     onError:(err)=>toast.error(err.message),
});
return {updateUser , isUpdateing};
}

export default useUpdateUser
