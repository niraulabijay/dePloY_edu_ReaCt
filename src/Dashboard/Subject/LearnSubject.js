import React, { useState, useEffect } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	useHistory,
} from "react-router-dom";
import Note from "./Component/Note";
import FlashCards from "./Component/FlashCards";
import PastQuestions from "./Component/PastQuestions";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

const LearnSubject = () => {
	const { Authtoken } = useAuth();
	const { params } = useRouteMatch();
	const [chapter, setChapterResponse] = useState([]);
	const [getUrl, setUrl] = useState("notes/" + Authtoken.user_id);
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [chapterError, setChapterError] = useState();
	const handleSubmit = (data) => {
		setUrl(data);
	};

	useEffect(() => {
		axios({
			method: "get",
			headers: {
				Authorization:
					"bearer" + JSON.parse(localStorage.getItem("tokens")).token,
			},
			url: "https://noname.dotnep.com/api/" + getUrl + "/" + params.subjectId,
			timeout: 10000,
		})
			.then((response) => {
				if (
					response.data.status === "Token is Expired" ||
					response.data.status === "Token is Invalid"
				) {
					throw new Error("Token Problem");
				} else {
					console.log(response);
					setChapterResponse(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
				// setChapterError(()=>{
				// 	throw error;
				// })
			});
	}, [getUrl, loading]);

	return (
		<React.Fragment>
			<div className="main-subject-containter">
				<div className="subject-navbar d-flex justify-content-between">
					<a onClick={history.goBack} className="back">
						<i className="fa fa-arrow-left"></i>
					</a>
					<div className="top-subject-navbar">
						<div className="icon-box">
							<i className="fa fa-atom"></i>
						</div>
						<div className="title-box">
							<h2>Physics</h2>
							<div className="chapter-number">10 Chapters</div>
						</div>
					</div>
					<ul className="nav nav-pills">
						<li className="nav-item">
							<a
								className="nav-link active"
								data-toggle="pill"
								href="#note"
								onClick={() => handleSubmit("notes/" + Authtoken.user_id)}
							>
								Notes
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								data-toggle="pill"
								href="#flash"
								onClick={() => handleSubmit("flashcards")}
							>
								Flash Cards
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								data-toggle="pill"
								href="#past-question"
								onClick={() => handleSubmit("questionsets")}
							>
								Question Set
							</a>
						</li>
					</ul>
				</div>
				<div className="tab-content">
					{/* <ErrorBoundary> */}
					<Note
						chapterResponse={chapter}
						setLoading={setLoading}
						subjectId={params.subjectId}
					/>
					<FlashCards FlashcardResponse={chapter} />
					<PastQuestions QuestionResponse={chapter} />
					{/* </ErrorBoundary> */}
				</div>
			</div>
		</React.Fragment>
	);
};

export default LearnSubject;
