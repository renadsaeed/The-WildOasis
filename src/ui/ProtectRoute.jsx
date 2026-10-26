import React, { useEffect } from 'react'
import {styled} from "styled-components";
import Spinner from "./Spinner"
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';
const CenteredSpinner = styled.div`
height:100vh ,
display:flex ,
justify-content:center ,
align-items:center ,
`

const ProtectRoute = ({children}) => {
    const navigate = useNavigate();
    //1 load authanticated users 
    const {user , isLoading , isAuthanticated} = useUser();
      //3 if no authanticated user , redirect to login 
     useEffect(()=>{
        if(!isAuthanticated && !isLoading)
        {
         navigate(`/Login`);
        }
    } , [isAuthanticated , isLoading , navigate])
    //2 while loading show spinner 
    if(isLoading){
       return(
         <CenteredSpinner>
       <Spinner />
        </CenteredSpinner>
       )

    };
  

    //4 if there is a user render app 

  if(isAuthanticated) return children ;
}

export default ProtectRoute
