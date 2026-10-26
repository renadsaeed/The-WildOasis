import {createContext ,  useContext} from "react"
import {useLocalStorageState} from "../hooks/useLocalStorageState";
import {useEffect} from "react";
const DarkModeContext = createContext();

 function DarkModeProvider({children}){
    const [darkMode , setIsDarkMode] = useLocalStorageState(false , 'isDarkMode');
    function toggleDarkMode(){
     setIsDarkMode(prev => !prev);
    }
    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        }else{
              document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    },[darkMode])
    return(
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}> 
            {children}
        </DarkModeContext.Provider>
    )
};

function useDarkMode(){
    const context = useContext(DarkModeContext);
    if(context === undefined)
    {
        throw new Error("DarkMode context used outside of DarkModeProvider "); 
    }
    return context ;
}
export {useDarkMode , DarkModeProvider}