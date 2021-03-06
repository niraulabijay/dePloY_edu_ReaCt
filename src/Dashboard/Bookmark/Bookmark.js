import React, { useEffect, useState } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	useHistory
} from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../../Context/Auth";

export default function Bookmark() {
	let { path, url } = useRouteMatch();
	let History = useHistory();
	const { Authtoken } = useAuth();

    const [BookmarkResponse, setBookmarkResponse] = useState([]);
    const [loading, setLoading] = useState(false);

	let getUrl =
		"http://noname.hellonep.com/api/bookmarks/note/" + Authtoken.user_id;

	useEffect(() => {
		let source = Axios.CancelToken.source();
		const loadData = async () => {
			try {
				const response = await Axios.get(getUrl, {
					cancelToken: source.token
				});
				setBookmarkResponse(response.data);
				
			} catch (error) {
				if (Axios.isCancel(error)) {
					console.log(error);
				} else {
					throw error;
				}
			}
		};
		loadData();
		return () => {
			source.cancel();
		};
	}, [getUrl , loading]);
	console.log(BookmarkResponse + "hi");
    const HandleBookmark = data => {
        setLoading(true);
		console.log(data + "hii");
		Axios({
			method: "post",
			url: "http://noname.hellonep.com/api/bookmark/store",
			data: {
				note_id: data,
				class_id: Authtoken.class_id,
				user_id: Authtoken.user_id,
				type: "note",
				auth_token: Authtoken.token
			}
		}).then(response => {
            setLoading(false);
			console.log(response);
		});
	};
	console.log(BookmarkResponse);
	return (
		<React.Fragment>
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
							<h2>Bookmark</h2>
							<div className="chapter-number">
								Quick access 
							</div>
						</div>
					</div>
				</div>
				<div className="subject-content">
					{BookmarkResponse.data &&
						BookmarkResponse.data.map((bookmark, index) => (
							<div
								className="chapter-wrapper d-flex justify-content-between"
								key={index}
							>
								<div className="chapter-title">
									<span>{index + 1}</span>
									{bookmark.name}
								</div>
								<div className="option">
									<a href="#">
										<i className="fa fa-download"></i>
									</a>
									<Link to={`/viewer/measure`}>
										<i className="fa fa-eye"></i>
									</Link>
									{bookmark.notes && (
										<a
											href="#"
											onClick={() => HandleBookmark(bookmark.notes[0].id)}
											className="set"
										>
											<i className="fa fa-bookmark"></i>
										</a>
									)}
								</div>
							</div>
						))}
				</div>
			</div>
		</React.Fragment>
	);
}
