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
import Skeleton from "react-loading-skeleton";

export default function Bookmark() {
	let { path, url } = useRouteMatch();
	let History = useHistory();
	const { Authtoken } = useAuth();

    const [BookmarkResponse, setBookmarkResponse] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState();

	let getUrl =
		"https://noname.dotnep.com/api/bookmarks/note/" + Authtoken.user_id;

	useEffect(() => {
		let source = Axios.CancelToken.source();
		const loadData = async () => {
			try {
				const response = await Axios.get(
					getUrl, 
					{
						headers: {
							Authorization: "bearer" + Authtoken.token
						},
						timeout: 10000
					},
					{
						cancelToken: source.token
					}
				);
				setBookmarkResponse(response.data);
				
			} catch (error) {
				if (Axios.isCancel(error)) {
					console.log(error);
				} else {
					setErr(()=>{
						throw error;
					})
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
			url: "https://noname.dotnep.com/api/bookmark/store",
			
				headers: {
					Authorization: "bearer" + Authtoken.token
				},
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
				<div className="subject-content container">
					{BookmarkResponse.data ?
					 (BookmarkResponse.data.map((bookmark, index) => (
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
											
											onClick={() => HandleBookmark(bookmark.notes[0].id)}
											className="set"
										>
											<i className="fa fa-bookmark"></i>
										</a>
									)}
								</div>
							</div>)
						)):
						(
						<div className="chapter-wrapper d-flex justify-content-between"
								
							>
								<div className="chapter-title">
									<Skeleton width={150}/>
								</div>
								<div className="option">
									<Skeleton width={150} />
								</div>
							</div>
						)
						}
				</div>
			</div>
		</React.Fragment>
	);
}
