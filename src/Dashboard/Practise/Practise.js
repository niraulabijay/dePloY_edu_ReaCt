import React, { useState, useEffect, useContext } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import PractiseSubject from "./PractiseChapter";
import Axios from "axios";
import { useAuth } from "../../Context/Auth";
import Skeleton from "react-loading-skeleton";
import { SubjectContext } from "../../Context/SubjectContext";
import PractiseWeeklyReport from "./PractiseWeeklyReport";

export default function Practise() {
	const { Authtoken } = useAuth();
	const { PractiseResponse, loading , practiseReport, practiseSubject, PractisePercentage} = useContext(SubjectContext);
	let { path, url } = useRouteMatch();
	console.log(PractisePercentage)
	return (
		<React.Fragment>
			<Switch>
				<Route exact path={path}>
					<div className="main-title">What do you want to practise today?</div>
					<div className="practise-subject">
						{loading ? (
							<div className="row">
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-12">
									<div className="practise-wrapper">
										<div className="row">
											<div className="col-md-3 col-3">
												<Skeleton height="50px" width="50px" />
											</div>
											<div className="col-md-9 col-9">
												<div className="subject-name">
													<Skeleton />
												</div>
												<div
													className="progress"
													style={{
														marginBottom: "5px"
													}}
												>
													<Skeleton />
												</div>
												<div className="progress-percent">
													<Skeleton />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<React.Fragment>
								<div className="row">
									{PractiseResponse.map((practise, index) => (
										<div className="col-md-3 col-lg-3 col-12" key={index}>
											<div className="practise-wrapper">
												<Link to={`${url}/` + practise.slug}>
													<div className="row">
														<div className="col-md-3 col-3">
															<div className="icon-box">
																<i className={practise.icon}></i>
															</div>
														</div>
														<div className="col-md-9 col-9">
															<div className="subject-name">
																{practise.name}{" "}
																<i className="fa fa-caret-right"></i>
															</div>
															<div className="progress">
																<div
																	className="progress-bar"
																	style={{
																		width: (practise.percentage)+"%"
																	}}
																></div>
															</div>
															<div className="progress-percent">{practise.percentage}%</div>
														</div>
													</div>
												</Link>
											</div>
										</div>
									))}
								</div>
							</React.Fragment>
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
										{PractisePercentage}%
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
							{practiseReport.length > 0 &&
								<PractiseWeeklyReport  practiseReport={practiseReport} loading={loading} practiseSubject={practiseSubject}/>
							}
							</div>
							{/* <div className="col-md-4 col-lg-4 col-12">
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
							</div> */}
						</div>
					</div>
				</Route>
				<Route path={`${path}/:subjectId`}>
					<PractiseSubject />
				</Route>
			</Switch>
		</React.Fragment>
	);
}
