import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import {useBooking} from "./useBooking"
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner  from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import {useCheckOut} from "../check-in-out/useCheckOut";
import {useDeleteBooking} from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { MdDeleteForever } from "react-icons/md";
import Empty from "../../ui/Empty";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


function BookingDetail() {

 
 const {Checkingout , isChecking } = useCheckOut();
 const{deletebooking , isDeleteingBooking}=useDeleteBooking();
  const moveBack = useMoveBack();
const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
     const {booking ,  isLoading , error} = useBooking();
     if(isLoading){
      return <Spinner /> ;
     }
     if(!booking) return <Empty resourceName='booking'/>;
      const {status , id:bookingid} = booking;

  return (
 
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingid}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      
      <ButtonGroup>
         {status === "unconfirmed" && <Button  onClick={()=>navigate(`/Checkin/${bookingid}`)}variation="secondary">Checked in</Button>}
          {status === "checked-in" && <Button  onClick={()=>Checkingout(bookingid)} disabled={ isChecking} variation="primary">Checke out</Button>}
       
        <Modal>
           <Modal.Open  openModalName="delete">
       <Button  icon={<MdDeleteForever />}  variation="danger" >Delete</Button>
         </Modal.Open>
      
          <Modal.Window modalType="delete">
            <ConfirmDelete  resourceName='booking' onConfirm={()=>deletebooking(bookingid , {
              onSettled:()=>navigate(-1),
            })} disabled={isDeleteingBooking}  />
          </Modal.Window>
        
      </Modal>
        
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
