import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const {Checkingout , isChecking ,  error } = useCheckOut();
  return (
    <Button variation="primary" size="small" onClick={()=>Checkingout(bookingId)} disabled={isChecking}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
