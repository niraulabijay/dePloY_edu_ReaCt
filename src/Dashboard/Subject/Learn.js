import React, {  useContext } from "react";
import {
	Link,
	Switch,
	Route,
	useRouteMatch,
	useParams
} from "react-router-dom";
import LearnSubject from "../Subject/LearnSubject";
import { useAuth } from "../../Context/Auth";
import Skeleton from "react-loading-skeleton";
import "../assets/css/userStyle.css";
import Axios from "axios";
import { SubjectContext } from "../../Context/SubjectContext";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

export default function Learn() {
	let { path, url } = useRouteMatch();
	let { subjectId } = useParams();

	const { Authtoken } = useAuth();

	const {SubjectResponse, loading} = useContext(SubjectContext);
	
	return (
		
		<React.Fragment>
			<Switch>
				<Route exact path={path}>
					<div className="main-title">What do you want to learn today?</div>
					<div className="container learn-subject">
						{loading ? (
							<div className="row">
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
								<div className="col-md-3 col-lg-3 col-6">
									<div className="subject-container">
										<div className="img-container">
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="title">
											<Skeleton />
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="row">
								{SubjectResponse.map((subject, index) => (
									<div className="col-md-3 col-lg-3 col-6" key={index}>
										<Link to={`${url}/` + subject.slug}>
											<div className="subject-container">
												<div className="img-container">
													<i className={subject.icon}></i>
												</div>
												<div className="title">{subject.name}</div>
											</div>
										</Link>
									</div>
								))}
							</div>
						)}
					</div>
				</Route>
				<Route path={`${path}/:subjectId`}>
				{/* <ErrorBoundary> */}
					<LearnSubject />
				{/* </ErrorBoundary>	 */}
				</Route>
			</Switch>
		</React.Fragment>
		
	);
}
