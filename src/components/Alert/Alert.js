import React, {useRef} from "react";
import { useEffect } from "react";


export default function Alert({message}) {

	 
	return (
		<div className="alertContainer">
			<p>{message}</p>
		</div>
	);
}
