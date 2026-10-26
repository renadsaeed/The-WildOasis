import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import {useBooking} from "../bookings/useBooking";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import {useState , useEffect} from "react"
import { formatCurrency } from "../../utils/helpers";
import { Checkin } from "./useChecking";
import { useUpdateSettings } from "../settings/useUpdateSettings";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confiremPaid , setConfiremPaid]= useState(false);
  const [addBreakFast , setAddBreakFast] = useState(false);

 
  const {booking ,  isLoading , error} = useBooking();
 const {data:settings , error:settingsError , isLoading:loadingSettings} = useSettings();
  const {checkin , isChecking , error:checkinError} =  Checkin();
    const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
     Guests,

  } = booking ||  {};

useEffect(()=>{
  setConfiremPaid(isPaid || false);
},[isPaid])
     if(isLoading || loadingSettings){
      return <Spinner /> ;
     }
    
  const optionalTotalPrice = settings[0].breakFastPrice *  numNights* numGuests ;

  function handleCheckin() {
 
    if(addBreakFast){
      checkin({bookingId , breakfast:{
        totalPrice: totalPrice + optionalTotalPrice ,
        extrasPrice:optionalTotalPrice,
        hasBreakfast:true

      }});
    }
    else{
      checkin({bookingId , breakfast:{} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
         <Checkbox checked={addBreakFast } onChange={()=>setAddBreakFast(prev=> !prev)} disabled ={isChecking} id="addBreakFast" >
        I confirem that { Guests.fullName} has paid the total amount of Breakfast  {formatCurrency(optionalTotalPrice)}
        </Checkbox >
      </Box>}
    <Box>
        <Checkbox checked={confiremPaid } onChange={()=>setConfiremPaid(prev=> !prev)} disabled ={confiremPaid || isChecking} id="confirem" >
       {addBreakFast ? ` I confirem that { Guests.fullName} has paid the total amount of  ${formatCurrency(totalPrice + optionalTotalPrice)} (${totalPrice} + ${optionalTotalPrice})` : ` I confirem that ${ Guests.fullName} has paid the total amount of  ${formatCurrency(totalPrice)}`}
        </Checkbox >
    </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confiremPaid || isChecking }>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
