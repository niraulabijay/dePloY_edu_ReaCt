import React, { Children } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import Homepage from "./Homepage";
import ClassSelect from "../Dashboard/Profile/ClassSelect";
import ViewNote from "../Dashboard/Subject/NoteViewer/ViewNote";
import ChapterQuiz from "../Dashboard/Practise/ChapterQuiz";
import SubjectQuiz from "../Dashboard/Quiz/subjectQuiz";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Dashboard from "../Dashboard/Dashboard";
import SubjectResult from "../Dashboard/Quiz/SubjectResult";
import LoginMobile from "./Login";
import Register from "./Register";
import { ProfileProvider } from "../Context/ProfileContext";

const PrivateRoute = ({ children, ...rest }) => {
	const { Authtoken } = useAuth();

	return (
		<ErrorBoundary>
			<Route
				{...rest}
				render={({ location }) =>
					Authtoken ? (
						Authtoken.class_id == null ? (
							<Switch>
								<Route path="/class-select" component={ClassSelect} />
								<Redirect to="/class-select" />
							</Switch>
						) : (
							<Switch>
								<Route path="/viewer/:subjectSlug/:id" component={ViewNote} />
								<Route path="/class-select" component={ClassSelect} />
								<Route
									path="/:class_id/:chapterId/practise"
									component={ChapterQuiz}
								/>
								<Route
									path="/:class_id/:subjectId/test"
									component={SubjectQuiz}
								/>
								<ProfileProvider>
								<Dashboard />
								</ProfileProvider>
							</Switch>
						)
					) : (
						<Switch>
							<Route exact path="/login">
								<LoginMobile />
							</Route>
							<Route exact path="/register">
								<Register/>
							</Route>
							<Route path="/" component={Homepage} />
						</Switch>
					)
				}
			/>
		</ErrorBoundary>
	);
};

export default PrivateRoute;
