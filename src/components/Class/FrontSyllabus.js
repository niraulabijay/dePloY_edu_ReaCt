import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function FrontSyllabus() {
	const { params } = useRouteMatch();
	const [loading, setLoading] = useState(false);
	console.log(params);
	const getUrl =
		"/api/front/syllabus/" + params.subjectSlug;
	const [getSyllabus, setSyllabus] = useState({});
	useEffect(() => {
		Axios.get(getUrl).then(Response => {
			setSyllabus(Response.data.data);
			setLoading(true);
			console.log(Response.data.data);
		});
		return()=>{
			setLoading(false);
		}
	}, [getUrl]);

	return (
		<React.Fragment>
			<div className="container">
				{loading?(
					<React.Fragment>
<div className="subtitle">{getSyllabus.title}</div>
				<p dangerouslySetInnerHTML={{ __html: getSyllabus.description }}></p>
					</React.Fragment>
				):(
					<React.Fragment>
						<div className="subtitle"><Skeleton/></div>
				<p ><Skeleton/></p>
					</React.Fragment>
				)

				}
				
			</div>
		</React.Fragment>
	);
}
