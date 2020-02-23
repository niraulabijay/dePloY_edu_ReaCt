import React from 'react'
import { useAuth } from "../Context/Auth";
import { useHistory } from "react-router-dom";



const Logout = () => {
    const { StorageToken } = useAuth()
    const history = useHistory();
    
    const handleClose = () => {
        // e.preventDefault();
        localStorage.clear();
        StorageToken(false)
        history.push({
            pathname:'/'
        })
    }
    

   return(
    {handleClose}
   );
}
export default Logout;
