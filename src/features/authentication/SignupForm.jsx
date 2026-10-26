import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useSignUp} from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register , reset , formState , getValues , handleSubmit}=useForm();
  const {signUp , isSigingUp} = useSignUp();
  const {errors} = formState;
  function onSubmit ({email , password ,fullName}){
    
    signUp({email , password ,fullName} , {
      onSettled: reset,
    });

   
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name"  error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName",{
          required:'this filed is required',
         minLength :{
          value:3,
           message: "Full name must be at least 3 characters", 
         },
        //  pattern:{
        //   value:/^[A-Za-z\u0600-\u06FF]+(?:\s+[A-Za-z\u0600-\u06FF]+)+$/,
        //   message:"Please enter your full name",
        //  }
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email"{...register("email" , {
          required:"this filed is required",
         pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}  >
        <Input type="password" id="password" {...register('password' , {
          required:"this filed is required" ,
          minLength:{
          value:8 ,
           message: "Full name must be at least 8 characters", 
          },
           pattern: {
     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/ ,
      message:
        "Password must contain uppercase, lowercase, and a number",
    },
        })} />
      </FormRow>

      <FormRow label="Repeat password"  error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm',{
          required:"this filed is required",
          validate:(value)=>{
            return value === getValues("password") || 'Passwords do not match'
          }
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button  variation="primary" disabled={ isSigingUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
