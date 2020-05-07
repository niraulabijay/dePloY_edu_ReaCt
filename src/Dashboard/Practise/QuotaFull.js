import React from 'react';


export default function QuotaFull(){
    return(
       <div className="errorpage">
           <div className="img-container">
               <img src={require('../../pages/images/404.png')} className="img-fluid" alt=""/>
               <h2>The Quota For This Set For The Day IS COMPLETE</h2>
               <div className="button-container">
                   <a href="">Back</a>
               </div>
           </div>
          
       </div>
    )
}