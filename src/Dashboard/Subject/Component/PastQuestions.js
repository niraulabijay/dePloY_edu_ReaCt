import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const PastQuestions = ({ QuestionResponse }) => {
	return (
		<div className="tab-pane  fade" id="past-question">
			<div className="subject-content">
				{QuestionResponse.data &&
					QuestionResponse.data.map((question, index) => (
						<div
							className="chapter-wrapper d-flex justify-content-between"
							key={index}
						>
							<div className="chapter-title">
								{index + 1 + " " }
								{question.title ? question.title : <Skeleton width={150} />}
							</div>
							<div className="option">
								<a href="#">
								{question.title ?<i className="fa fa-download"></i> : ""}
								</a>
								<Link to={"/viewer/OEQ2063"}>
								{question.title ?<i className="fa fa-eye"></i> : <Skeleton width={150} />}
									
								</Link>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
export default PastQuestions;
