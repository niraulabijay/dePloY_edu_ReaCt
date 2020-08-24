import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/Auth";
import Axios from "axios";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import BackSyllabus from "./BackSyllabus";
import Skeleton from "react-loading-skeleton";
export default function Syllabus() {
	const { path, url, params } = useRouteMatch();
	const [loading, setLoading] = useState(true);
	const [syllabus, setSyllabus] = useState([]);
	const { Authtoken } = useAuth();
	let getUrl = "https://noname.dotnep.com/api/syllabus/" + Authtoken.class_id;
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
						timeout: 10000,
					},
					{
						cancelToken: source.token
					}
				);
				setSyllabus(response.data.data);
				console.log(response.data.data);
				setLoading(false);
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
	}, [getUrl]);

	return (
		<React.Fragment>
			<div className="user-syllabus">
				<div className="title">Syllabus</div>

				<div className="subject-wrapper">
					<div className="row">
						<div className="col-md-3 subject-list">
							<h2>Class 10 Syllabus</h2>
							<ul className="nav">
								{loading ? (
									<li className="nav-item">
										<Skeleton count={6} />
									</li>
								) : (
									syllabus.map((syllabusClass, index) => (
										<li className="nav-item" key={syllabusClass.slug}>
											<NavLink to={`${url}/${syllabusClass.slug}`}>
												<span>{index + 1}</span> {syllabusClass.name}
											</NavLink>
										</li>
									))
								)}
							</ul>
						</div>
						<div className="col-md-9">
							<div className="syllabusContainer container">
								<Switch>
									<Route exact path={path}>
										<React.Fragment>
											<div className="subtitle">Course Overview</div>
											<p>
												Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Saepe culpa illo vero adipisci maiores
												consequuntur! Nobis tempora saepe ut sint distinctio
												totam laborum quo minima magnam quidem, doloremque,
												culpa facilis! Lorem ipsum dolor sit amet, consectetur
												adipisicing elit. Sequi perferendis veniam, possimus
												distinctio illo iure, amet sed earum unde quae
												voluptatum vel harum porro molestiae natus nam vitae
												neque cum! orem Lorem ipsum dolor sit amet, consectetur
												tempora saepe ut sint distinctio totam laborum quo
												minima magnam quidem, doloremque, saepe ut sint
												distinctio totam laborum quo minima magnam quidem,
												doloremque, culpa facilis! Lorem ipsum dolor sit amet,
												consectetur adipisicing elit. Sequi perferendis veniam,
												possimus distinctio illo iure, amet sed earum unde quae
												voluptatum vel harum porro molestiae natus nam vitae
												neque cum! orem Lorem ipsum dolor sit amet, consectetur
												adipisicing elit. Quos, accusamus rerum tempora porro
												adipisci eveniet quia molestias ad, facilis tenetur
												dolor, ullam iure voluptas eius animi sint odit
												laudantium totam.{" "}
											</p>
										</React.Fragment>
									</Route>
									<Route
										path={`${path}/:subjectSlug`}
										component={BackSyllabus}
									/>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
