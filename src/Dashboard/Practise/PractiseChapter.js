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
import PractiseQuiz from "./ChapterQuiz";
import { useAuth } from "../../Context/Auth";
import Skeleton from "react-loading-skeleton";

export default function PractiseSubject() {
	let { path, url, params } = useRouteMatch();
	const [loading, setLoading] = useState(false);
	console.log(url);
	let { chapterId } = useParams();
	const [PractiseChapter, setPractiseChapter] = useState([]);
	let { Authtoken } = useAuth();
	const [chapterError, setChapterError] = useState()
	//    console.log(params)
	useEffect(() => {
		axios({
			method: "get",
			url: "http://noname.dotnep.com/api/chapters/" + params.subjectId,
			headers: {
				Authorization: "bearer" + Authtoken.token
			},
			timeout: 10000,	
		}).then(response => {
			setPractiseChapter(response.data.chapters);
			setLoading(true);
		}).catch(error => {
			setChapterError(() => {
				throw new Error(error)
			})
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
							{loading ?
							(PractiseChapter.map((practise, index) => (
								<div className="practiseSubjectWrapper" key={index}>
									<div className="row">
										<div className="col-md-6">
											<div className="chapter-name">
												<span>{index + 1}</span> {practise.name}
											</div>
											<div className="progress">
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
							))):(
								<React.Fragment>
								<div className="practiseSubjectWrapper">
									<div className="row">
										<div className="col-md-6">
											<div className="chapter-name">
												<Skeleton/>
											</div>
											<Skeleton height={8} count={2}/>
											
										</div>
										<div className="col-md-6">
											<div className="button-container">
												<Skeleton height={45} width={80}/>
											</div>
										</div>
									</div>
								</div>
								<div className="practiseSubjectWrapper">
								<div className="row">
									<div className="col-md-6">
										<div className="chapter-name">
											<Skeleton/>
										</div>
										<Skeleton count={2}/>
										
									</div>
									<div className="col-md-6">
										<div className="button-container">
											<Skeleton height={45} width={80}/>
										</div>
									</div>
								</div>
							</div>
							<div className="practiseSubjectWrapper">
							<div className="row">
								<div className="col-md-6">
									<div className="chapter-name">
										<Skeleton/>
									</div>
									<Skeleton count={2}/>
									
								</div>
								<div className="col-md-6">
									<div className="button-container">
										<Skeleton height={45} width={80}/>
									</div>
								</div>
							</div>
						</div>
						</React.Fragment>
							)
}
						</div>
					</div>
				</Route>
				{/* <Route path={`${path}/:chapterId`} component={PractiseQuiz} /> */}
			</Switch>
		</React.Fragment>
	);
}
