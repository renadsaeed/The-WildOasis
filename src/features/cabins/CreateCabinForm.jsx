import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ editCabin = {} , onClose}) {
  const { id: editId, ...editingValues } = editCabin;
  const isEditingMood = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingMood ? editingValues : {},
  });

  const { errors } = formState;
  const { createNewCabin, isLoading } = useCreateCabin(reset);
  const { isediting, editCabindata } = useEditCabin();

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log("image", data.image[0]);
    if (isEditingMood) {
      editCabindata(
        { newcabindata: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            console.log("edited", data);
            reset();
            onClose?.();
          },
        },
      );
    } else {
      createNewCabin({ ...data, image: image });
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
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
        error={errors?.name?.message}
        label="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this filed is required",
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
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than regularPrice ",
          })}
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
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: !isEditingMood && "this filed is requird",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isLoading}  variation="primary">
          {isEditingMood ? "EditCabin" : "Add New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
