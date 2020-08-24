import React, { useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

const SubjectResult = () => {
	const history = useHistory();
	const place = {
		pathname: "/test"
	};

	const location = useLocation()
	const result = location.state
	console.log(result)

	console.log(location)
	console.log(result)
	// useEffect(() => {
		
	// 	window.onpopstate = e => {
	// 		history.replace(place);
	// 	};
	// 	if (history.action === "POP") {
	// 		history.replace(place);
	// 	}

	// }, [history]);

	return (
		<div className="quiz">
			<div className="back-section">
				<Link to="/practise">
					<i className="fa fa-arrow-left"></i> Back
				</Link>
			</div>
			<div className="quiz-header">
				<nav
					className="navbar navbar-expand-sm"
					style={{
						background: "linear-gradient(45deg, #0be788, #09d6af)",
						boxShadow: "0px 2px 4px #a1a4a4"
					}}
				></nav>
				{/* <DisplayMark fullMark={allQuestion} total={myTotal} /> */}
			</div>
			{result.map((question, index) => (
				<div className="container  test-section">
					<div className="question-container">
						<div className="question-title">
							<span className="question-number">{index + 1}.</span>
							<span dangerouslySetInnerHTML={{ __html:question.name }}></span>
						</div>
						{question.selected == null ? (
							<span style={{ color: "red" }}>
								The Question Was Not attempted
							</span>
						) : (
							""
						)}
					</div>
					<div className="answer-container">
						<div className="row">
							{question.questionAnswers.map((answer, index) => (
								<div className="col-md-6 col-sm-6" key={index + 1}>
									<div
										className={
											"answer-wrapper " +
											(answer.correct === 1 ? "active" : " ") +
											" " +
											(answer.id === question.selected && answer.correct === 0
												? "wrong"
												: " ")
										}
									>
										<div className="option-number">{index + 1}</div>
										<div className="option" dangerouslySetInnerHTML={{__html: answer.name}}></div>
										<div className="option-tick">
											<i className="fa fa-check"></i>
										</div>
										<div className="option-wrong">
											<i className="fa fa-times"></i>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SubjectResult;
