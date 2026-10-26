import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings(){
      const {data , error , isLoading} = useQuery({
       queryKey: ["Settings"],
       queryFn:getSettings
       });
       console.log('setdata' , data);
       return{data , error , isLoading};
};