import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
const queryClient = useQueryClient();
const {mutate , isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess:()=>{
        toast.success("sucessfuly updated");
        queryClient.invalidateQueries({
            queryKey:["Settings"]
        });

    },
    onError:(err)=>toast.error("settings not updated"),

});
return{mutate , isLoading};

}