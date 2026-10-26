import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: DeleteCabin,
    isLoading: isDeleteing,
    error,
  } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
      toast.success("sucessfullydeleted");
    },
    onError: (err) => toast.error(err.message),
  });
  return { DeleteCabin, isDeleteing, error };
}
