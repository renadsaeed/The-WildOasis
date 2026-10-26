import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabindata, isLoading: isediting } = useMutation({
    mutationFn: ({ newcabindata, id }) => createCabin(newcabindata, id),
    onSuccess: () => {
      toast.success("Cabin edited successfly");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabindata, isediting };
}
