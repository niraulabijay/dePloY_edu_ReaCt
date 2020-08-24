import React, { useState, useEffect } from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
	useHistory,
	useRouteMatch
} from "react-router-dom";
import axios from "axios";
import $ from "jquery";

import ViewAsset from "./ViewAsset";
import { useAuth } from "../../../Context/Auth";

export default function ViewNote() {
	const { url, params } = useRouteMatch();
	const [chapterNote, setChapterNote] = useState();
	const { Authtoken } = useAuth();
	const [getid, setid] = useState(params.id);

	console.log(getid);
	useEffect(() => {
		axios({
			method: "get",

			headers: {
				Authorization: "bearer" + Authtoken.token
			},

			url:
				"https://noname.dotnep.com/api/notes/" +
				Authtoken.user_id +
				"/" +
				params.subjectSlug
		}).then(response => {
			setChapterNote(response.data.subjects);
			console.log(response.data.subjects, 'note');
			console.log('hello');
		});
	}, []);

	function closeNav() {
		function myFunction(x) {
			if (x.matches) {
				document.getElementById("viewerSideNav").style.width = "0";
			} else {
				document.getElementById("viewerSideNav").style.width = "0px";
				document.getElementById("main").style.marginLeft = "0px";
				document.getElementById("view").style.display = "block";
				document.getElementsByClassName("company-container")[0].style.width =
					"0px";
				document.getElementsByClassName("viewerNavbar")[0].style.width = "100%";
				document.getElementById("hide").style.display = "none";
				var elems = document.getElementsByClassName("sideTab");
				for (var i = 0; i < elems.length; i++) {
					elems[i].style.display = "none";
				}
			}
		}
		var x = window.matchMedia("(max-width: 756px)");
		myFunction(x); // Call listener function at run time
		x.addListener(myFunction);
	}
	function openNav() {
		function myFunction(x) {
			if (x.matches) {
				document.getElementById("viewerSideNav").style.width = "250px";
				document.getElementById("main").style.marginLeft = "0px";
			} else {
				document.getElementById("hide").style.display = "block";
				var elems = document.getElementsByClassName("sideTab");
				for (var i = 0; i < elems.length; i++) {
					elems[i].style.display = "inline-block";
				}
				document.getElementById("viewerSideNav").style.width = "250px";
				document.getElementById("main").style.marginLeft = "250px";
				document.getElementById("view").style.display = "none";
				document.getElementsByClassName("viewerNavbar")[0].style.width =
					"calc(100% - 250px)";
				document.getElementsByClassName("company-container")[0].style.width =
					"250px";

				// document.getElementsByClassName("title-name")[1].style.display =
				// 	"block";
			}
		}
		var x = window.matchMedia("(max-width: 700px)");
		myFunction(x); // Call listener function at run time
		x.addListener(myFunction);
	}
	const handleActive = event => {
		$("#userSideNav a").removeClass("active");
		event.target.classList.add("active");
	};

	return (
		<React.Fragment>
			<div id="viewerSideNav" className="viewerSidenav">
				<div className="company-container">
					<div className="img-container">
						<img
							src={require("../../assets/images/logo1.png")}
							alt=""
							className="img-fluid"
						/>
					</div>
					<div className="title-name sideTab">
						Educate Nepal
						<span onClick={closeNav}>
							<i className="fa fa-times"></i>
						</span>
					</div>
				</div>
				{chapterNote &&
					chapterNote.map(
						(note, index) =>
							note.notes &&
							note.notes[0] && (
								<NavLink
									onClick={() => setid(params.id)}
									to={
										`/viewer/` +
										params.subjectSlug +
										"/" +
										(note.notes[0] && note.notes[0].id)
									}
								>
									<i className="fa fa-book"> </i>
									<span className="sideTab"> {note.name}</span>
								</NavLink>
							)
					)}
			</div>

			<div id="main">
				<div className="viewerNavbar d-flex justify-content-between">
					<div className="bars">
						<span onClick={openNav} id="view">
							<i className="fa fa-bars"></i>
						</span>
						<span onClick={closeNav} id="hide">
							<i className="fa fa-bars"></i>
						</span>
					</div>
					<div className="d-flex justify-content-end">
						<div className="close">
							<a href="">
								<i className="fa fa-times"></i> <span></span>
							</a>
						</div>
					</div>
				</div>
				<div className="main-content viewer">
					<ViewAsset id={params.id} />
				</div>
			</div>
		</React.Fragment>
	);
}
