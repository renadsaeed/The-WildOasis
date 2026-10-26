
import { useEffect, useRef } from "react";



export const useOutsideClicking = (onClose , capturing =true) => {

 
     const ref = useRef();
      useEffect(()=>{
        function handelEvent(e){
          if(ref.current && !ref.current.contains(e.target))
          {
            onClose();
          }
    
        }
        document.addEventListener('click' , handelEvent , capturing);
        return()=> document.removeEventListener('click' , handelEvent , capturing);
      } , [onClose])
  return {ref }
}


