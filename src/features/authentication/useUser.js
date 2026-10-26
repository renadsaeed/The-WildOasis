import { useQuery } from "@tanstack/react-query";
import { getCurrentUser} from "../../services/apiAuth";
import React from 'react'

export const useUser = () => {
const {data:user , isLoading }=useQuery({
       queryKey:['user'],
    queryFn: getCurrentUser,
 
});
return {user , isLoading , isAuthanticated:user?.role === "authenticated" }
}


