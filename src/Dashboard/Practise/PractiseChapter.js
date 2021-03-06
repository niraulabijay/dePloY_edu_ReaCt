import React, { useState, useEffect } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	useHistory,
	useParams,
	useLocation
} from "react-router-dom";
import axios from "axios";
import PractiseQuiz from "./PractiseQuiz";
import { useAuth } from "../../Context/Auth";

export default function PractiseSubject() {
	let { path, url, params } = useRouteMatch();
	console.log(url);
	let { chapterId } = useParams();
	const [PractiseChapter, setPractiseChapter] = useState([]);
	let { Authtoken } = useAuth();
	//    console.log(params)
	useEffect(() => {
		axios({
			method: "get",
			url: "http://noname.hellonep.com/api/chapters/" + params.subjectId
		}).then(response => {
			setPractiseChapter(response.data.chapters);
		});
	}, []);
	let History = useHistory();
	const startTest = slug => {
		// console.log(slug)
		History.replace("/" + Authtoken.class_id + "/" + slug + "/practise");
	};
	return (
		<React.Fragment>
			<Switch>
				<Route exact path={path}>
					<div className="main-subject-containter">
						<div className="subject-navbar d-flex justify-content-between">
							<a onClick={History.goBack} className="back">
								<i className="fa fa-arrow-left"></i>
							</a>
							<div className="top-subject-navbar">
								<div className="icon-box">
									<i className="fa fa-atom"></i>
								</div>
								<div className="title-box">
									<h2>Maths</h2>
									<div className="chapter-number">10 Chapters</div>
								</div>
							</div>
						</div>
						<div className="practiseSubject">
							{PractiseChapter.map((practise, index) => (
								<div className="practiseSubjectWrapper" key={index}>
									<div className="row">
										<div className="col-md-6">
											<div className="chapter-name">
												<span>1</span> {practise.name}
											</div>
											<div className="p   rogress">
												<div
													className="progress-bar"
													style={{ width: "70%" }}
												></div>
											</div>
											<div className="progress-percent">70%</div>
											<div className="level">
												Level <span> 1/10</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="button-container">
												<Link onClick={() => startTest(practise.slug)}>
													Take a Test
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</Route>
				{/* <Route path={`${path}/:chapterId`} component={PractiseQuiz} /> */}
			</Switch>
		</React.Fragment>
	);
}
