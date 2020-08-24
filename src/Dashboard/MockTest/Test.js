import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	Redirect,
	useHistory,
} from "react-router-dom";
import TestSubject from "./TestSubject";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../../Context/Auth";
import { SubjectContext } from "../../Context/SubjectContext";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

export default function Test() {
	let { path } = useRouteMatch();
	const { testSub, loading } = useContext(SubjectContext);
	const [modalData, setModalData] = useState();
	// const [returnTest, setReturnTest] = useState([]);
	const { Authtoken } = useAuth();
	const history = useHistory();

	const handleTest = (slug) => {
		console.log(slug);
		// axios({
		//     method: "get",
		//     url: "http://noname.dotnep.com/api/test/"+slug+'/'+Authtoken.user_id,
		//     data: returnTest
		// }).then(res => {
		//     console.log(res);
		// });
		localStorage.removeItem("initialValue");
		localStorage.removeItem("active");
		history.replace("/" + Authtoken.class_id + "/" + slug + "/test");
	};

	// if(onGoing.innerHTML == "Ongoing"){
	//     console.log('hi');
	// }
	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	const data = [
		{ name: "First Week", Math: 400, Science: 700, amt: 2400 },
		{ name: "Second Week", Math: 150, Science: 200, amt: 2400 },
		{ name: "Third Week", Math: 200, Science: 450, amt: 2400 },
		{ name: "Fourth Week", Math: 250, Science: 400, amt: 2400 },
	];
	return (
		<React.Fragment>
			<Switch>
				<Route exact path={path}>
					<div className="main-title">Are you Ready for Exam?</div>
					<div className="test-subject">
						{loading ? (
							<div className="row">
								<div className="col-md-6 col-lg-3 col-12">
									<div className="test-wrapper">
										<div className="subWrap">
											<div className="icon-box">
												<Skeleton circle="true" width="50px" height="50px" />
											</div>
											<div className="subject-name pt-2">
												<Skeleton />
											</div>
										</div>
										<div className="contentWrap">
											<div className="time">
												<Skeleton />
											</div>
											<div className="attempt-container">
												<div className="attempt">
													<Skeleton />
												</div>
												<div className="remaining">
													<Skeleton />
												</div>
											</div>
											<div className="button-container">
												<Skeleton />
											</div>
											<div className="progress">
												<Skeleton />
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6 col-lg-3 col-12">
									<div className="test-wrapper">
										<div className="subWrap">
											<div className="icon-box">
												<Skeleton circle="true" width="50px" height="50px" />
											</div>
											<div className="subject-name pt-2">
												<Skeleton />
											</div>
										</div>
										<div className="contentWrap">
											<div className="time">
												<Skeleton />
											</div>
											<div className="attempt-container">
												<div className="attempt">
													<Skeleton />
												</div>
												<div className="remaining">
													<Skeleton />
												</div>
											</div>
											<div className="button-container">
												<Skeleton />
											</div>
											<div className="progress">
												<Skeleton />
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6 col-lg-3 col-12">
									<div className="test-wrapper">
										<div className="subWrap">
											<div className="icon-box">
												<Skeleton circle="true" width="50px" height="50px" />
											</div>
											<div className="subject-name pt-2">
												<Skeleton />
											</div>
										</div>
										<div className="contentWrap">
											<div className="time">
												<Skeleton />
											</div>
											<div className="attempt-container">
												<div className="attempt">
													<Skeleton />
												</div>
												<div className="remaining">
													<Skeleton />
												</div>
											</div>
											<div className="button-container">
												<Skeleton />
											</div>
											<div className="progress">
												<Skeleton />
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6 col-lg-3 col-12">
									<div className="test-wrapper">
										<div className="subWrap">
											<div className="icon-box">
												<Skeleton circle="true" width="50px" height="50px" />
											</div>
											<div className="subject-name pt-2">
												<Skeleton />
											</div>
										</div>
										<div className="contentWrap">
											<div className="time">
												<Skeleton />
											</div>
											<div className="attempt-container">
												<div className="attempt">
													<Skeleton />
												</div>
												<div className="remaining">
													<Skeleton />
												</div>
											</div>
											<div className="button-container">
												<Skeleton />
											</div>
											<div className="progress">
												<Skeleton />
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="row">
								{testSub.map((data, index) => {
									return (
										<div className="col-md-6 col-lg-3 testrow" key={index}>
											<div className="test-wrapper">
												<div className="subWrap">
													<div className="icon-box">
														<i className={data.icon}></i>
													</div>
													<div className="subject-name pt-2">{data.name}</div>
												</div>
												<div className="contentWrap">
													<div className="time">
														Time frame: <span> {data.time / 60} minutes</span>
													</div>
													<div className="attempt-container">
														<div className="attempt">
															Attempt: {data.attempt}
														</div>
														<div className="remaining">Remaining: {data.remaining}</div>
													</div>

													<div className="button-container">
														{data.ongoing == 1 ? (
															<Link
																data-toggle="modal"
																data-target="#startModal"
																onClick={() => setModalData(data.slug)}
																style={{ background: "#4bf769" }}
															>
																<span>Ongoing</span>
															</Link>
														) : (
															<Link
																data-toggle="modal"
																data-target="#startModal"
																onClick={() => setModalData(data.slug)}
															>
																<span>Take a Test</span>
															</Link>
														)}
													</div>
													<div className="progress">
														<div
															className="progress-bar"
															style={{
																width: "70%",
															}}
														></div>
													</div>
													<div className="progress-percent">70%</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="modal" id="startModal">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-body">
									<button type="button" className="close" data-dismiss="modal">
										&times;
									</button>
									<div className="title">Really, wanna Start Test?</div>
									<div className="subtitle">Instruction to follow</div>
									<ol className="test-instruction">
										<li>
											Please ensure that you have reliable internet and power
											for the whole duration of the test.
										</li>
										<li>You cannot pause the test.</li>
										<li>
											Evaluate all options carefully. Only one option is
											correct.
										</li>
									</ol>
									<div className="button-container text-center">
										<a
											href=""
											data-dismiss="modal"
											onClick={() => handleTest(modalData)}
											className="yes"
										>
											Take a Test
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="sub-title">Your practise Report</div>
					<div className="practise-report">
						<div className="row">
							<div className="col-md-4 col-lg-4 col-12">
								<div className="report-wrapper ">
									<div className="title d-flex justify-content-center">
										<div className="title-wrapper">
											<strong>Overall Report</strong>
										</div>
									</div>
									<div className="content-wrapper">
										<div className="overall-report">
											92%
											<div className="title">Course Completion</div>
										</div>
									</div>
									<div className="footer-wrapper">
										<div className="title-wrapper d-flex justify-content-between">
											<div className="title">
												<small>Time</small>
												<strong>1 hrs</strong>
												<i
													className="fa fa-long-arrow-alt-up"
													style={{ color: "green" }}
												></i>
											</div>
											<div className="title">
												<small>Goals</small>
												<strong>1 </strong>
												<i
													className="fa fa-long-arrow-alt-down"
													style={{ color: "red" }}
												></i>
											</div>
											<div className="title">
												<small>Accuracy</small>
												<strong>90%</strong>
												<i
													className="fa fa-long-arrow-alt-down"
													style={{ color: "red" }}
												></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8 col-lg-8 col-12">
								<div className="title-wrapper text-center">
									<strong>Weekly Report</strong>
									<br />
									<small>Month Jan</small>
								</div>
								<div className="report-wrapper ">
									<ResponsiveContainer width="100%" height={300}>
										<BarChart width={730} height={250} data={data}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip />
											<Legend />
											<Bar dataKey="Math" fill={getRandomColor()} />
											<Bar dataKey="Science" fill={getRandomColor()} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>
					</div>
				</Route>
				<Route path={`${path}/physics`}>
					<TestSubject />
				</Route>
				<Route path="*">
					<Redirect to="/500error" />
				</Route>
			</Switch>
		</React.Fragment>
	);
}
