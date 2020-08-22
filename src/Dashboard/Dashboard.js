import React, { useEffect, useState } from "react";
import "./assets/css/userStyle.css";
import Practise from "./Practise/Practise";
import Test from "./MockTest/Test";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	Redirect,
	NavLink,
	useHistory
} from "react-router-dom";
import Bookmark from "./Bookmark/Bookmark";
import Doubts from "./Doubts/Doubts";
import Profile from "./Profile/Profile";
import PageNotFound from "../pages/PageNotFound";
import Learn from "./Subject/Learn";
import Syllabus from "./Profile/Syllabus";
import { SubjectProvider } from "../Context/SubjectContext";
import { useAuth } from "../Context/Auth";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Logout from "./Logout";

import Notification from "./Notification/Notification";

const routes = [
	{
		path: "/learn",
		main: () => <Learn />
	},
	{
		path: "/practise",
		main: () => <Practise />
	},
	{
		path: "/test",
		main: () => <Test />
	},
	{
		path: "/syllabus",
		main: () => <Syllabus />
	},
	{
		path: "/doubts",
		main: () => <Doubts />
	},
	{
		path: "/notification",
		main: () => <Notification />
	},
	{
		path: "/bookmark",
		main: () => <Bookmark />
	},
	{
		path: "/profile",
		main: () => <Profile />
	},
	{
		path: "*",
		main: () => <PageNotFound />
	}
];

const Dashboard = () => {
	// const { StorageToken, Authtoken } = useAuth();
	const { handleClose } = Logout();

	
		function hideSide(){
			if(window.matchMedia("(max-width: 768px)").matches){
						document.getElementById("main").style.marginLeft = "0";
						document.getElementById("userSideNav").style.width = "0";
			}
			}
			
			function closeNav() {
				function myFunction(x) {
					let userSideNav = document.getElementById("userSideNav");
					let main = document.getElementById("main");
					if (x.matches) {
						document.getElementById("main").style.marginLeft = "0";
						document.getElementById("userSideNav").style.width = "0";
					} else {
						userSideNav.style.width = "80px";
						userSideNav.style.left = "-170px";
						userSideNav.style.marginLeft = "170px";
						document.querySelectorAll(".title-name")[1].style.height = "0";
						main.style.marginLeft = "80px";
						document.getElementById("view").style.display = "block";
						document.getElementsByClassName("company-container")[0].style.width =
							"80px";
						document.getElementsByClassName("navbar")[0].style.width =
							"calc(100% - 80px)";
						document.getElementById("hide").style.display = "none";
		
						var elems = document.getElementsByClassName("sideTab");
		
						for (var i = 0; i < elems.length; i++) {
							// elems[i].style.display = "none";
							elems[i].style.visibility = "hidden";
							elems[i].style.opacity = "0";
						}
					}
				}
				var x = window.matchMedia("(max-width: 768px)");
				myFunction(x); // Call listener function at run time
				x.addListener(myFunction);
			}
			window.onclick = function() {
				var userSideNav = document.getElementById("userSideNav");
				if (userSideNav != null) {
					document.onclick = function(e) {
						var x = window.matchMedia("(max-width: 768px)");
						if (x.matches) {
							if (userSideNav.offsetWidth != 0) {
								if (e.target.parentNode.id !== "userSideNav") {
									closeNav();
								}
							}
						}
					};
				}
			};
			
			function openNav() {
				
					let main = document.getElementById("main");
					let userSideNav = document.getElementById("userSideNav");
		
					if (window.matchMedia("(max-width: 768px)").matches) {
						userSideNav.style.width = "240px";
						main.style.marginLeft = "240px";
					} else {
						userSideNav.style.left = "0px";
						userSideNav.style.width = "250px";
						userSideNav.style.marginLeft = "0px";
						document.querySelectorAll(".title-name")[1].style.height = "50px";
						main.style.marginLeft = "250px";
						document.getElementById("view").style.display = "none";
						document.getElementsByClassName("navbar")[0].style.width =
							"calc(100% - 250px)";
						document.getElementsByClassName("company-container")[0].style.width =
							"250px";
						document.getElementById("hide").style.display = "block";
						var elems = document.getElementsByClassName("sideTab");
		
						// document.getElementsByClassName("title-name")[1].style.display =
						//     "block";
		
						setTimeout(function() {
							for (let i = 0; i < elems.length; i++) {
								// elems[i].style.display = "inline-block";
								elems[i].style.opacity = "1";
								elems[i].style.visibility = "visible";
							}
						}, 350);
					}		
				
			}
	
		
			function facebook() {
				window.open(
					"https://www.facebook.com/sharer/sharer.php?u=" +
						encodeURIComponent("edu.hellonep.com"),
					"facebook-share-dialog",
					"width=626,height=436"
				);
			}
			let scrollPoint = document.getElementById("main");
			if (scrollPoint) {
				scrollPoint.scrollIntoView();
			}
		
		return (
		<SubjectProvider>
			<React.Fragment>
				<div id="userSideNav" className="userSidenav">
					<div className="company-container">
						<div className="img-container">
							<img
								src={require("./assets/images/logo1.png")}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div className="title-name sideTab">
							Educate Nepal
							
						</div>
					</div>
					<div className="profile-container">
						<div className="img-container">
							<img
								src={require("./assets/images/testimonial-1.jpg")}
								alt=""
								className="img-fluid"
							/>
						</div>
					</div>
					<div className="title-name sideTab" style={{ width: "100%" }}>
						Hot Babe
						<div className="grade">| Class 10</div>
						<NavLink to="/class-select">Change </NavLink>
					</div>
					<div className="d-sm-block d-none">
						<NavLink to="/learn" className="test-class" >
							<i className="fa fa-graduation-cap"></i>{" "}
							<span className="sideTab"> Learn</span>
						</NavLink>
						<NavLink to="/practise" className="test-class">
							<i className="fa fa-user-md"></i>{" "}
							<span className="sideTab"> Practise</span>
						</NavLink>
						<NavLink to="/test" className="test-class">
							<i className="fa fa-file-alt"></i>
							<span className="sideTab"> Test</span>
						</NavLink>
						<NavLink to="/doubts" className="test-class">
							<i className="fa fa-comment"></i>{" "}
							<span className="sideTab"> Doubts</span>
						</NavLink>
						<NavLink to="/bookmark" className="test-class">
							<i className="fa fa-bookmark"></i>{" "}
							<span className="sideTab"> Bookmarks</span>
						</NavLink>

						<hr />
					</div>
					<NavLink to="/profile" onClick={hideSide}>
						<i className="fa fa-user"></i>
						<span className="sideTab"> Profile</span>
					</NavLink>
					<NavLink to="/syllabus" onClick={hideSide}>
						<i className="fa fa-folder-open"></i>{" "}
						<span className="sideTab"> Syllabus</span>
					</NavLink>
					<a onClick={facebook}>
						<i className="fab fa-facebook"></i>
						<span className="sideTab"> Share on Facebook</span>
					</a>
					<a data-toggle="modal" data-target="#logoutModal">
						<i className="fa fa-power-off"></i> <span>Logout</span>
					</a>

					
					<hr />
					
					<div className="copywrite text-center mt-2">
						&copy; Copywrite EduNepal
					</div>
				</div>
				<div className="footer-nav">
					<div className="inner-footer">
						<NavLink to="/learn">
							<i className="fa fa-graduation-cap"></i>{" "}
							<span className="sideTab"> Learn</span>
						</NavLink>
						<NavLink to="/practise">
							<i className="fa fa-user-md"></i>{" "}
							<span className="sideTab"> Practise</span>
						</NavLink>
						<NavLink to="/test">
							<i className="fa fa-file-alt"></i>
							<span> Test</span>
						</NavLink>
						<NavLink to="doubts">
							<i className="fa fa-comment"></i> <span> Doubts</span>
						</NavLink>
						<NavLink to="/bookmark">
							<i className="fa fa-bookmark"></i> <span> Bookmarks</span>
						</NavLink>
					</div>
				</div>
				<div id="main">
					<div className="navbar d-flex ">
						<div className="bars">
							<span onClick={openNav} id="view">
								<i className="fa fa-bars"></i>
							</span>
							<span onClick={closeNav} id="hide">
								<i className="fa fa-bars"></i>
							</span>
						</div>
						<div className="d-flex justify-content-end">
							{/* <div className="invite">
                            <a href="">
                                <i className="fa fa-gift"></i>{" "}
                                <span>Invite & Earn</span>
                            </a>
                        </div> */}
							<div className="logout">
								<NavLink to="/notification">
									<i className="fa fa-bell"></i><span className="badge">1</span> 
								</NavLink>
							</div>
						</div>
					</div>
					<div className="modal" id="logoutModal">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-body">
									<button type="button" className="close" data-dismiss="modal">
										&times;
									</button>
									<div className="title">Really, wanna Logout?</div>
								
								
									<div className="button-container">
										<a
											href=""
											data-dismiss="modal"
											onClick={handleClose}
											className="yes"
										>
											Yes
										</a>
										<a href="" className="no" data-dismiss="modal">
											No{" "}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					<div className="main-content">
						<Switch>
							<Route exact path="/">
								<Redirect to="/learn" />
							</Route>
							{routes.map((route, index) => (
								<Route key={index} path={route.path}>
									<ErrorBoundary>
										<route.main />
									</ErrorBoundary>
								</Route>
							))}
						</Switch>
					</div>
				</div>
			</React.Fragment>
		</SubjectProvider>
	);
};

export default Dashboard;
