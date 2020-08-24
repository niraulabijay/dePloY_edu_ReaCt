import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { Redirect, useHistory } from "react-router-dom";

export default function Password({ user_id, history }) {
	const [isLogged, setisLogged] = useState(false);
	const [Err, setErr] = useState();
	const { register, handleSubmit, errors, watch } = useForm();

	//  let history = useHistory();
	const { StorageToken, Authtoken } = useAuth();

	const onSubmit = (data) => {
		console.log(data);
		axios({
			method: "post",
			url: "https://noname.dotnep.com/api/savepassword",
			data: data,
		})
			.then((response) => {
				console.log(response);
				if (response.data.status === "success") {
					StorageToken({
						name: response.data.name,
						user_id: response.data.user_id,
						// class_id: response.data.class_id,
						token: response.data.auth_token,
					});
					setisLogged(true);
				}
			})
			.catch((e) => {
				console.log(e);
				setErr(true);
			});
	};

	useEffect(() => {
		if (isLogged) {
			history.push({
				pathname: "/class-select",
			});
		}
	}, [Authtoken, isLogged]);

	return (
		<div className="resetPassword-wrapper">
			<div className="row">
				<div className="col-md-6 col-12">
					<div className="logo-box">
						<img
							src={require("../../Dashboard/assets/images/logo1.png")}
							className="img-fluid"
						/>
					</div>
					<h1>Educate Nepal</h1>
					<div className="address">Sankhamul, Kathmandu</div>
				</div>
				<div className="col-md-6 col-12">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<label>New Password</label>
							<input
								className="form-control"
								name="password"
								type="password"
								ref={register}
							/>
						</div>
						<div className="form-group">
							<label>Confirm Password</label>
							<input
								className="form-control"
								name="confirm_password"
								type="password"
								ref={register({
									validate: (value) => value === watch("password"),
								})}
							/>
						</div>
						<input
							type="hidden"
							name="user_id"
							value={user_id}
							ref={register}
						/>
						{errors.confirm_password &&
							errors.confirm_password.type === "validate" && (
								<span style={{ color: "Red" }}>Password Don't Match</span>
							)}
						<div className="button-container">
							<button className="btn btn-success" type="submit">
								Add Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
