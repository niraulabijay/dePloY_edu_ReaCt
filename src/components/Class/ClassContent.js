import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useRouteMatch, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";
import FrontSyllabus from "./FrontSyllabus";

export default function Classcontent() {
    
	const {path, url, params } = useRouteMatch();
	console.log(params);
	const getUrl = "http://noname.hellonep.com/api/overview/" + params.classSlug;
	console.log(getUrl);
	const [subjectCollection, setSubjectCollection] = useState();
	useEffect(() => {
		axios.get(getUrl).then(response => {
			setSubjectCollection(response.data.data);
			console.log(response.data.data);
		});
	}, [getUrl]);
	return (
		<div className="class-section">
			<div className="syllabus-section">
				<div className="container">
					<div className="title">Syllabus For {params.classSlug}</div>
					<div className="content">
						<div className="row">
                            <div className="col-md-3 col-12">
                                <div className="row">
                            {subjectCollection &&
								subjectCollection.map((subject) => (
									<div className="col-md-12 col-6" key={subject.slug}>
										<NavLink to={`${url}/syllabus/${subject.slug}`}>
											<div className="subject">
												<div className="subject-name">
													<i className={subject.icon}></i>
													{' ' +subject.name}
												</div>
											</div>
										</NavLink>
									</div>
								))}
                                </div>
                            </div>

							<div className="col-md-9">
                            
                                <div className="syllabusContainer">  
                                <Switch>
                                    <Route exact path={path}>
                                    <React.Fragment>
				<div className="subtitle">Course Overview</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe culpa
					illo vero adipisci maiores consequuntur! Nobis tempora saepe ut sint
					distinctio totam laborum quo minima magnam quidem, doloremque, culpa
					facilis! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Sequi perferendis veniam, possimus distinctio illo iure, amet sed
					earum unde quae voluptatum vel harum porro molestiae natus nam vitae
					neque cum! orem Lorem ipsum dolor sit amet, consectetur tempora saepe
					ut sint distinctio totam laborum quo minima magnam quidem, doloremque,
					saepe ut sint distinctio totam laborum quo minima magnam quidem,
					doloremque, culpa facilis! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Sequi perferendis veniam, possimus distinctio illo
					iure, amet sed earum unde quae voluptatum vel harum porro molestiae
					natus nam vitae neque cum! orem Lorem ipsum dolor sit amet,
					consectetur adipisicing elit. Quos, accusamus rerum tempora porro
					adipisci eveniet quia molestias ad, facilis tenetur dolor, ullam iure
					voluptas eius animi sint odit laudantium totam.{" "}
				</p>
                </React.Fragment>
                                    </Route>
                <Route path={`${path}/syllabus/:subjectSlug`} >
					<FrontSyllabus  />
				</Route>
                
                </Switch>

                </div>
                
                            </div>
						</div>
					</div>
				</div>
			</div>
          
			
			
		</div>
	);
}
