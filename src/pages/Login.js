import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/Auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function LoginMobile() {
	const { register, handleSubmit, errors } = useForm();
	const { StorageToken } = useAuth();
	const [LoginError, setLoginError] = useState();
	const [buttonDisable, setButtonDisable] = useState();

	const onSubmit = (data) => {
		setButtonDisable(true);
		document.getElementById("loginLoader").style.display = "block";
		axios({
			method: "post",
			url: "https://noname.dotnep.com/api/login",
			data: data,
		})
			.then((response) => {
				if (response.data.status === "success") {
					console.log('success')
					setButtonDisable();
					// document.querySelector(".modal-backdrop").style.display = "none";
					// document.querySelector("body").classList.remove("modal-open");
					StorageToken({
						name: response.data.name,
						user_id: response.data.user_id,
						class_id: response.data.class_id,
						token: response.data.auth_token,
					});

					history.replace({
						pathname: "/learn", 
					});
				} else {
					setButtonDisable();
					document.getElementById("loginLoader").style.display = "none";
					setLoginError("User is Not Valid");
				}
			})
			.catch((error) => {
				setButtonDisable();
				setLoginError("Check your Login Credential or Internet Connection.");
				document.getElementById("loginLoader").style.display = "none";
			});
	};

	const history = useHistory();
	return (
		<React.Fragment>
			<div className="login-container">
				<div className="home-button d-md-block d-none">
					<Link to="/" className="home-button-wrapper">
						<i className="fa fa-home"></i> Home
					</Link>
				</div>
				<div className="login-wrapper">
					<div className="logo-box">
						<img
							src={require("../pages/images/logo1.png")}
							className="img-fluid"
						/>
					</div>
					<div className="title">Login</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<input
								type="tel"
								className="form-control"
								name="phone"
								maxLength="10"
								placeholder="Phone Number"
								ref={register({
									minLength: 10,
									pattern: { value: /^[0-9]*$/ },
									required: true,
								})}
							/>
						</div>
						{errors.phone && errors.phone.type === "minLength" && (
							<span
								style={{
									color: "red",
									display: "block",
									textAlign: "center",
								}}
								id="error-name-maxLength"
							>
								*The length must be 10
							</span>
						)}
						{errors.phone && errors.phone.type === "pattern" && (
							<span
								style={{
									color: "red",
									display: "block",
									textAlign: "center",
								}}
								id="error-name-pattern"
							>
								*The value must be number
							</span>
						)}
						{errors.phone && errors.phone.type === "required" && (
							<span
								style={{
									color: "red",
									display: "block",
									textAlign: "center",
								}}
								id="error-name-required"
							>
								*The field is empty
							</span>
						)}

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								name="password"
								ref={register({ required: true })}
							/>
						</div>
						{errors.password && errors.password.type === "required" && (
							<span
								style={{
									color: "red",
									display: "block",
									textAlign: "center",
								}}
								id="error-name-required"
							>
								*The field is empty
								<br />
							</span>
						)}

						{LoginError && (
							<>
								<span
									style={{
										color: "red",
										textAlign: "center",
										fontWeight: "bold",
										display: "block",
									}}
								>
									{LoginError}
								</span>
								<br />
							</>
						)}
						<div id="loginLoader">
							<SkeletonTheme color="#89f3a1" highlightColor="#fbfbfb">
								<Skeleton />
							</SkeletonTheme>
						</div>
						<div className="button-container">
							<button
								className="btn btn-success"
								type="submit"
								disabled={buttonDisable ? "true" : ""}
							>
								Login
							</button>
							<br />
							<Link to="/register">I DON'T HAVE ACCOUNT</Link>
						</div>
					</form>
				</div>
				<div className="login-container-overlay">
					<div className="login-overlay-content">
						<div className="login-logo-container">
							<img
								src={require("../pages/images/logo1.png")}
								className="img-fluid"
							/>
						</div>
						<div className="company-name">Vedhayu</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
