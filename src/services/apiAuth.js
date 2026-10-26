import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function signup({fullName , email , password}) {
    
const { data, error } = await supabase.auth.signUp({
  email,
  password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  
});
if(error){
 throw new Error(error.message); 
}
console.log('returnd' , data);
return data;
    
}



export async function login ({email , password}){
    const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
if(error){
   
    throw new Error(error.message);
    
}
return data?.user ;


};
export async function getCurrentUser(){
    const {data:Session}= await supabase.auth.getSession();
    if(!Session.session) return null ;
    const {data , error}= await supabase.auth.getUser();
    console.log(data);
    if(error){
        throw new Error(error.message);

    }
    return data?.user ;
}

export async function updateUserdata({password , fullName , avatar}){
 
  let updatedata ;
  if(password) updatedata={password};
  if(fullName) updatedata = {data:{fullName}};
  
const { data, error } = await supabase.auth.updateUser(updatedata);
 if(error){
 throw new Error(error.message); }
 if(!avatar) return data ;
 //upload avatar image 
  const fileName = `avatar-${Math.random()}`;
const { error: storageError } = await supabase.storage
  .from("avatars")
  .upload(fileName, avatar);

if (storageError) {
  throw new Error(storageError.message);
}
 //3 upadate avatar in user 
    const { data:updated, error:uploadingerror } = await supabase.auth.updateUser({
      data:{
        avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
      }
    });
        if( uploadingerror ){
 throw new Error(uploadingerror.message); }
 return updated ;

    
}



export async function logout(){
    
const { error } = await supabase.auth.signOut();
 if(error){
        throw new Error(error.message);
    }
    
}