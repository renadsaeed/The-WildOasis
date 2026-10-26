import React from 'react'
import styled from "styled-components";
import Tag from "../../ui/Tag";
import{ Flag} from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton"
import Button from "../../ui/Button"
import { Link } from 'react-router-dom';
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 5rem 10rem;
  gap: 1rem;
  align-items: center;
  

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
const ActivityItem = ({activity}) => {

  return (
    <StyledTodayItem>
      {activity.status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {activity.status === 'checked-in' && <Tag type='blue'>Departing</Tag>}
      <Flag src={activity.Guests.countryFlag} al={`flag of ${activity.Guests.nationality}`} />
      <Guest>{activity.Guests.fullName}</Guest>
      <div>{activity.numNights} Nights </div>
       {activity.status === 'unconfirmed' && <Button size='small' variation='primary' as={Link} to={`/Checkin/${activity.id}`}  >Check-in</Button>}
          {activity.status === 'checked-in' && <CheckoutButton bookingId={activity.id} />}
    </StyledTodayItem>
  )
}

export default ActivityItem
