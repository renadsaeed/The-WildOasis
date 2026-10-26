import {useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup as signupApi} from "../../services/apiAuth";
export function useSignUp(){
    console.log("sign");
    const navigate = useNavigate();
    const {mutate:signUp , isLoading:isSigingUp , error}=useMutation({
        mutationFn: ({email , password ,fullName})=>signupApi({email , password ,fullName}),
        onSuccess:(user)=>{
          console.log("sign", user);
            toast.success('user added successfuly');
        },
        onError:(err)=>toast.error(err.message),
    });
    return{signUp , isSigingUp};

}