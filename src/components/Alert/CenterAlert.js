import React  from "react";
import Skeleton from "react-loading-skeleton";



export default function CenterAlert({message}) {

	 
	return (
		<div className="centerAlertContainer">
           <div className="icon-box">
               <i className="fa fa-check"></i>
           </div>
			<p>{message}</p>
            <Skeleton height={12} width={250} />
		</div>
	);
}
