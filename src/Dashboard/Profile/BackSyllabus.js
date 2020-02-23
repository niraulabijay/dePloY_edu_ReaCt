import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";

export default function BackSyllabus() {
	const { params } = useRouteMatch();
	console.log(params);
	const getUrl =
		"http://noname.hellonep.com/api/front/syllabus/" + params.subjectSlug;
	const [getSyllabus, setSyllabus] = useState({});
	useEffect(() => {
		Axios.get(getUrl).then(Response => {
			setSyllabus(Response.data.data);
			console.log(Response.data.data);
		});
	}, [getUrl]);

	return (
		<React.Fragment>
			<div className="container">
				<div className="subtitle">{getSyllabus.title}</div>

				<p dangerouslySetInnerHTML={{ __html: getSyllabus.description }}></p>
			</div>
		</React.Fragment>
	);
}
