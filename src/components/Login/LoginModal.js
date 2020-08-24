import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/Auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function LoginModal() {
	// const [isLogged, setisLogged] = useState(false);
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
					setButtonDisable();
					document.querySelector(".modal-backdrop").style.display = "none";
					document.querySelector("body").classList.remove("modal-open");

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
	console.log(LoginError);

	const history = useHistory();

	return (
		<div
			className="modal join fade"
			id="login"
			data-keyboard="false"
			data-backdrop="static"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<button type="button" className="close" data-dismiss="modal">
						<i className="fa fa-window-close mt-2"></i>
					</button>
					<div className="modal-body">
						<div className="logo-box">
							<img
								src={require("../../pages/images/logo1.png")}
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
								<a
									href=""
									data-dismiss="modal"
									data-toggle="modal"
									data-target="#join"
								>
									I DON'T HAVE ACCOUNT
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default LoginModal;
