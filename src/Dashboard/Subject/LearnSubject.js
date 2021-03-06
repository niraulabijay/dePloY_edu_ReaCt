import React, { useState, useEffect } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	useHistory
} from "react-router-dom";
import Note from "./Component/Note";
import FlashCards from "./Component/FlashCards";
import PastQuestions from "./Component/PastQuestions";
import axios from "axios";
import { useAuth } from "../../Context/Auth";

export default function LearnSubject() {
	const { Authtoken } = useAuth();
	const { url, params } = useRouteMatch();
	const [chapter, setChapterResponse] = useState([]);
	const [getUrl, setUrl] = useState("notes/" + Authtoken.user_id);
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const handleSubmit = data => {
		setUrl(data);
	};

	useEffect(() => {
		axios({
			method: "get",
			url: "http://noname.hellonep.com/api/" + getUrl + "/" + params.subjectId
		}).then(response => {
			setChapterResponse(response.data);
			console.log(response.data);
		});
	}, [getUrl,loading]);

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
					<Note chapterResponse={chapter} setLoading={setLoading} />
					<FlashCards FlashcardResponse={chapter} />
					<PastQuestions QuestionResponse={chapter} />
				</div>
			</div>
		</React.Fragment>
	);
}
