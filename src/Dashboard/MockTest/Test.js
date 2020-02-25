import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	Redirect,
	useHistory
} from "react-router-dom";
import TestSubject from "./TestSubject";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../../Context/Auth";
import { SubjectContext } from "../../Context/SubjectContext";

export default function Test() {
	let { path } = useRouteMatch();
	const { testSub, loading } = useContext(SubjectContext);
	// const [returnTest, setReturnTest] = useState([]);
	const { Authtoken } = useAuth();
	const history = useHistory();
   
	const handleTest = slug => {
		console.log(slug);
		// axios({
		//     method: "get",
		//     url: "http://noname.hellonep.com/api/test/"+slug+'/'+Authtoken.user_id,
		//     data: returnTest
		// }).then(res => {
		//     console.log(res);
		// });
		localStorage.removeItem('initialValue')
		localStorage.removeItem('active')
		history.replace("/" + Authtoken.class_id + "/" + slug + "/test");
    };
    

    
   
	
	// if(onGoing.innerHTML == "Ongoing"){
	//     console.log('hi');
	// }

	return (
		<React.Fragment>
			<Switch>
				<Route exact path={path}>
					<div className="main-title">Are you Ready for Exam?</div>
					<div className="test-subject">
						{loading ? (
							<div className="row">
								<div className="col-md-3 col-lg-3 col-12">
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
								<div className="col-md-3 col-lg-3 col-12">
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
								<div className="col-md-3 col-lg-3 col-12">
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
								<div className="col-md-3 col-lg-3 col-12">
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
										<div className="col-md-3 col-lg-3" key={index}>
											<div className="test-wrapper">
												<div className="subWrap">
													<div className="icon-box">
														<i className="fa fa-flask"></i>
													</div>
													<div className="subject-name pt-2">{data.name}</div>
												</div>
												<div className="contentWrap">
													<div className="time">
														Time frame: <span> 30 min</span>
													</div>
													<div className="attempt-container">
														<div className="attempt">
															Attempt 2{/* Attempt: {attempt} */}
														</div>
														<div className="remaining">Remaining 3</div>
													</div>
                                                    
													<div className="button-container">
                                                    {data.ongoing == 1 ? (
														<Link onClick={() => handleTest(data.slug)} style={{background: "#4bf769"}}>
																<span >Ongoing</span>			
														</Link>
													
                                                    ):
                                                    (
                                                    
														<Link onClick={() => handleTest(data.slug)}>
																<span>Take a Test</span>
															
														</Link>
													
                                                    )}
                                                    </div> 
													<div className="progress">
														<div
															className="progress-bar"
															style={{
																width: "70%"
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
							<div className="col-md-4 col-lg-4 col-12">
								<div className="report-wrapper ">
									<div className="title d-flex justify-content-between">
										<span className="prev">
											<i className="fa fa-caret-left"></i>
										</span>
										<div className="title-wrapper">
											<strong>Weekly Report</strong>
											<small>Jan 1 - Feb 1</small>
										</div>

										<span className="next">
											<i className="fa fa-caret-right"></i>
										</span>
									</div>
									<div className="content-wrapper">
										<img
											src={require("../assets/images/graph.jpg")}
											alt=""
											className="img-fluid"
										/>
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
							<div className="col-md-4 col-lg-4 col-12">
								<div className="report-wrapper ">
									<div className="title d-flex justify-content-between">
										<span className="prev">
											<i className="fa fa-caret-left"></i>
										</span>
										<div className="title-wrapper">
											<strong>Yearly Report</strong>
											<small>2019 - 2020</small>
										</div>

										<span className="next">
											<i className="fa fa-caret-right"></i>
										</span>
									</div>
									<div className="content-wrapper">
										<img
											src={require("../assets/images/graph.jpg")}
											alt=""
											className="img-fluid"
										/>
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
