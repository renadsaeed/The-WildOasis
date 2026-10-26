import { useQueries, useQuery } from '@tanstack/react-query';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useForm} from "react-hook-form"
import { getSettings } from '../../services/apiSettings';
import { useEffect } from 'react';
import Spinner from "../../ui/Spinner";
import {useUpdateSettings} from "./useUpdateSettings";
import { useSettings } from './useSettings';
import Button from '../../ui/Button';
function UpdateSettingsForm() {
    const {data , error , isLoading} = useSettings();
  
   const {register , handleSubmit , getValues , reset} = useForm( );
   const {minBookingLength ,maxBookingLength, maxGuestsPerBooking , breakFastPrice} = data?.[0] || {};
   const {mutate , isLoading:isUpdateing} = useUpdateSettings();
  if(isLoading) return <Spinner /> ;

   function onSubmit(data){
      mutate(data);
      reset();
   }
 
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='minBookingLength'{...register("minBookingLength")} defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='maxBookingLength' {...register("maxBookingLength")} defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
       <Input
  type="number"
  id="maxGuestsPerBooking"
  {...register("maxGuestsPerBooking")}
  defaultValue={maxGuestsPerBooking}
/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakFastPrice' {...register("breakFastPrice")} defaultValue={breakFastPrice} />
      </FormRow>
      <Button disabled={isUpdateing} variation="primary">Update</Button>
    </Form>
  );
}

export default UpdateSettingsForm;
