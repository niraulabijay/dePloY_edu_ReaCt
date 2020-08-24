import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";
import PageNotFound from "../../pages/PageNotFound";
import axios from "axios";
import {Link, NavLink} from 'react-router-dom';

export default function Navbar() {
	const [classResponse, setClassResponse] = useState();
	const [preparationResponse, setPreparationResponse] = useState();
	useEffect(() => {
		axios.get("https://noname.dotnep.com/api/nav/classes").then(response => {
			setClassResponse(response.data.grades);
			setPreparationResponse(response.data.preparations);
			console.log(response.data.preparations);
		});
	}, []);

	function openNav() {
		document.getElementById("myNav").style.height = "100%";
		document.getElementById("myNav").style.width = "100%";
	}

	/* Close */
	function closeNav() {
		document.getElementById("myNav").style.height = "0%";
	}

	window.onscroll = function() {
		let navbar = document.getElementById("navbar");
		if(navbar != null){
			if (
				document.body.scrollTop > 80 ||
					document.documentElement.scrollTop > 80
			) {
				navbar.style.background = "#f6f6ff";
			} else {
				navbar.style.background = "transparent";
			}
		}
		
	};

	return (
		<React.Fragment>
			<div id="navbar" className="d-flex justify-content-between sticky  ">
				<div className="logo-container">
					<img
						src={require("../../pages/images/logo1.png")}
						className="img-fluid"
					/>
				</div>
				<div className="nav d-none d-sm-block">
					<NavLink to="/" className="active">
						Home
					</NavLink>

					<div className="dropdown">
						<a className=" dropdown-toggle" data-toggle="dropdown">
							Class
						</a>
						<div className="dropdown-menu">
							{classResponse && classResponse.map(classItem=>(
								<NavLink to={`/class/${classItem.slug}`} key={classItem.slug}>
								<li className="dropdown-item" >
								{classItem.name}
							</li>
							</NavLink>
							))}
							
						</div>
					</div>
					<div className="dropdown">
						<a className=" dropdown-toggle" data-toggle="dropdown">
							Prepartion
						</a>
						<div className="dropdown-menu">
							{
								preparationResponse && preparationResponse.map((prepItem)=>(
									<NavLink to={`/class/${prepItem.slug}`} key={prepItem.slug}>
									<li className="dropdown-item"  >
									{prepItem.name}
								</li>
								</NavLink>
								))
							}
					
						</div>
					</div>

					<NavLink to="#features">Features</NavLink>
					<NavLink to="#blog">Blogs</NavLink>
				</div>
				<div className="button-container">
					<div className="join-now">
						<a href="" data-toggle="modal" data-target="#join">
							Join Now
						</a>
					</div>
					<div className="login">
						<a href="" data-toggle="modal" data-target="#login">
							Login
						</a>
					</div>
				</div>
				<span className="d-block d-sm-none" onClick={openNav}>
					<i className="fa fa-bars"></i>
				</span>
			</div>

			<div id="myNav" className="overlay">
				<span className="closebtn" onClick={closeNav}>
					&times;
				</span>

				<div className="overlay-content">
				<NavLink to="/" className="active" onClick={closeNav}>
						Home
					</NavLink>
					<div className="dropdown">
						<a className=" dropdown-toggle" data-toggle="dropdown">
							Class
						</a>
						<div className="dropdown-menu">
						{classResponse && classResponse.map(classItem=>(
								<NavLink to={`/class/${classItem.slug}`} key={classItem.slug} onClick={closeNav}>
								<li className="dropdown-item" >
								{classItem.name}
							</li>
							</NavLink>
							))}
						</div>
					</div>
					<div className="dropdown">
						<a className=" dropdown-toggle" data-toggle="dropdown">
							Preparation
						</a>
						<div className="dropdown-menu">
						{
								preparationResponse && preparationResponse.map((prepItem)=>(
									<NavLink to={`/class/${prepItem.slug}`} key={prepItem.slug} onClick={closeNav}>
									<li className="dropdown-item"  >
									{prepItem.name}
								</li>
								</NavLink>
								))
							}
						</div>
					</div>
					<a href="dashboard.html" onClick={closeNav}>Features</a>
					<a href="quiz.html" onClick={closeNav}>Blog</a>
				</div>
			</div>
			<LoginModal />
			<RegisterModal />
		</React.Fragment>
	);
}
