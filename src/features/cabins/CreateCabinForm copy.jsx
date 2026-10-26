import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
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
  function onSubmit(data) {
    console.log('*****data******' , data);
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow id="name" label="CabinName" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this filed is required",
          })}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        error={errors?.maxCapacity?.message}
        label="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this filed is required",
            min: {
              value: 1,
              message: "the maxCapacity should be at least on",
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        error={errors?.regularPrice?.message}
        label="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this filed is required",
              valueAsNumber: true,
            min: {
              value: 1,
              message: "the regularPrice should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow id="discount" error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this filed is required",
              valueAsNumber: true,
            validate: (value)=> {
  console.log("discount:", value);
  console.log("regularPrice:", getValues("regularPrice"));

  return (
    value <= Number(getValues("regularPrice")) ||
    "discount should be less than regularPrice"
  );
          }})}
        />
      </FormRow>

      <FormRow
        id="description"
        error={errors?.description?.message}
        label="Description"
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" id="image">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading} >Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
