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
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import Skeleton from "react-loading-skeleton";

const Note = ({ chapterResponse , setLoading, subjectId}) => {
	const { Authtoken } = useAuth();
	const { url, params } = useRouteMatch();
	const [getUrl, setUrl] = useState("notes/" + Authtoken.user_id);

	console.log(chapterResponse);
	const HandleBookmark = data => {
		console.log(data);
		setLoading(true);
		axios({
			method: "post",
			url: "http://noname.hellonep.com/api/bookmark/store",
			// url: "http://192.168.1.71/api/bookmark/store",
			data: {
				note_id: data,
				class_id: Authtoken.class_id,
				user_id: Authtoken.user_id,
				type: "note",
				auth_token: Authtoken.token
			}
		}).then(response => {
			console.log(response);
			setLoading(false);
		});
	};

	return (
		<div className="tab-pane active" id="note">
			<div className="subject-content">
				{chapterResponse.data ? (
					<React.Fragment>
						{chapterResponse.data.map(
							(note, index) =>
								note.notes &&
								note.notes[0] && (
									<div
										className="chapter-wrapper d-flex justify-content-between"
										key={index}
									>
										<Link to="/viewer">
											<div className="chapter-title">
												<span>{index + 1}</span>
												{note.name ? note.name : <Skeleton width={150} />}
											</div>
										</Link>
										<div className="option">
											<a href="#">
												<i className="fa fa-download"></i>
											</a>
											{note.notes && (
												<Link
													to={`/viewer/`+ subjectId+'/'+ (note.notes[0] && note.notes[0].id)}
												>
													<i className="fa fa-eye"></i>
												</Link>
											)}
											{note.notes && (
												<a
													href="#"
													onClick={() => HandleBookmark(note.notes[0].id)}
													className={note.notes[0].bookmark == 1 ? "set" : ""}
												>
													<i className="fa fa-bookmark"></i>
												</a>
											)}
										</div>
									</div>
								)
						)}
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
