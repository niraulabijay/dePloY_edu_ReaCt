import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	useLocation,
	useRouteMatch
} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Note = ({ chapterResponse }) => {
	console.log(chapterResponse.chapters);
	return (
		<div className="tab-pane active" id="note">
			<div className="subject-content">
				{chapterResponse.chapters ? (
					<React.Fragment>
						{chapterResponse.chapters.map((chapter, index) => (
							<div
								className="chapter-wrapper d-flex justify-content-between"
								key={index}
							>
								<Link to="/viewer">
									<div className="chapter-title">
										<span>{index + 1}</span>
										{chapter.name}
									</div>
								</Link>
								<div className="option">
									<a href="#">
										<i className="fa fa-download"></i>
									</a>
									<Link to="/viewer">
										<i className="fa fa-eye"></i>
									</Link>
									<a href="#">
										<i className="fa fa-bookmark"></i>
									</a>
								</div>
							</div>
						))}
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="chapter-wrapper d-flex justify-content-between">
							<div className="chapter-title">
								<span></span>
								<Skeleton width={200} />
							</div>
							<div className="option">
								<a href="#">
									<i className="fa fa-download"></i>
								</a>
								<Link to="/viewer">
									<i className="fa fa-eye"></i>
								</Link>
								<a href="#">
									<i className="fa fa-bookmark"></i>
								</a>
							</div>
						</div>
						<div className="chapter-wrapper d-flex justify-content-between">
							<div className="chapter-title">
								<span></span>
								<Skeleton width={200} />
							</div>
							<div className="option">
								<a href="#">
									<i className="fa fa-download"></i>
								</a>
								<Link to="/viewer">
									<i className="fa fa-eye"></i>
								</Link>
								<a href="#">
									<i className="fa fa-bookmark"></i>
								</a>
							</div>
						</div>
						<div className="chapter-wrapper d-flex justify-content-between">
							<div className="chapter-title">
								<span></span>
								<Skeleton width={200} />
							</div>
							<div className="option">
								<a href="#">
									<i className="fa fa-download"></i>
								</a>
								<Link to="/viewer">
									<i className="fa fa-eye"></i>
								</Link>
								<a href="#">
									<i className="fa fa-bookmark"></i>
								</a>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default Note;
