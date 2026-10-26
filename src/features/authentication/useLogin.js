import React from 'react'
import {useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {login}from "../../services/apiAuth";
export  const useLogin = () => {
   const queryClient = useQueryClient();
    const navigate =useNavigate();
 const {mutate:loginUser , isLoading:islogin , error}= useMutation({
    mutationFn:({email , password})=>login({email , password}),
    onSuccess: (user)=>{
      queryClient.setQueryData(["user"], user);
        console.log("user", user);
      navigate("/Dashboard" , {replace: true});

    },
    onError:(err)=>toast.error(err.message),

 });
 return{loginUser , islogin };
}


