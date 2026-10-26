import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useCreateCabin(reset) {
  const queryClient = useQueryClient();
  const { mutate: createNewCabin, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { createNewCabin, isLoading };
}
