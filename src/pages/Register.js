import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import OTPModal from "../components/Register/OTPModal";
import {Link} from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import $ from "jquery";

export default function Register() {
	const { register, handleSubmit, errors } = useForm();
	const [RegisterResponse, setResponse] = useState("");
	const [buttonDisable, setButtonDisable] = useState();
	const [registerError, setRegisterError] = useState();

    const onSubmit = data => {
		setButtonDisable(true)
		document.getElementById("joinLoader").style.display = "block";
		axios({
			method: "post",
			url: "http://noname.hellonep.com/api/register",
			data: data
		}).then(response => {
			if (response.data.status === "success") {
                setResponse(response.data);
                $("#otp").modal("show");
				console.log(RegisterResponse);
				setButtonDisable()
			}else{
				document.getElementById("joinLoader").style.display = "none";
				setRegisterError("Your number is already registered")
				setButtonDisable()
			}
		}).catch(error => {
			console.log(error)
		});
	};


	return (
		<React.Fragment>
			
			<div className="login-container">
			<div className="home-button d-md-block d-none" >
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
					<div className="title">Join Now</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
								<div className="form-group">
									<input
										type="tel"
										className="form-control no-spinner"
										placeholder="Phone Number"
										name="phone"
										maxLength="10"
										aria-invalid={errors.phone ? "true" : "false"}
										aria-describedby="error-name-maxLength error-name-pattern error-name-required"
										ref={register({
											minLength: 10,
											pattern: { value: /^[0-9]*$/ },
											required: true
										})}
									/>
									{errors.phone && errors.phone.type === "minLength" && (
										<span style={{ color: "red",display:'block',textAlign: "center" }} id="error-name-maxLength">
											*The length must be 10
										</span>
									)}
									{errors.phone && errors.phone.type === "pattern" && (
										<span style={{ color: "red", display:'block',textAlign: "center" }} id="error-name-pattern">
											*The value must be number
										</span>
									)}
									{errors.phone && errors.phone.type === "required" && (
										<span style={{ color: "red", display:'block',textAlign: "center" }} id="error-name-required">
											*The field is empty
										</span>
									)}
								</div>
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										maxLength="23"
										placeholder="Your Name"
										name="name"
										aria-invalid={errors.name ? "true" : "false"}
										aria-describedby="error-name-pattern error-name-required"
										ref={register({
											pattern: { value: /[A-za-z]/ },
											required: true
										})}
									/>
									{errors.name && errors.name.type === "pattern" && (
										<span
											style={{
												color: "red",
												textAlign: "center", display:'block'
											}}
											id="error-name-pattern"
										>
											*The name should be alphabetic
										</span>
									)}
									{errors.name && errors.name.type === "required" && (
										<span
											style={{
												color: "red",
												textAlign: "center"
												, display:'block'
											}}
											id="error-name-required"
										>
											*The field is empty
											<br />
										</span>
									)}
								</div>
								{/* <div className="text-center my-2">
                                <div href="" id="invite_code" onClick={displayCode}>I HAVE INVITE CODE</div>
                                <div id="invite_code_collapse" style={{ display: 'none', textAlign: 'center' }}>
                                    <input name="text" type="tel" value="" placeholder="Invite Code" className="form-control" />
                                </div>
                            </div> */}
								{registerError &&  <span style={{ color:'red', fontWeight:'bold', textAlign:'center', display:'block' }}>{registerError}</span>}
								<div id="joinLoader">
									<SkeletonTheme color="#89f3a1" highlightColor="#fbfbfb">
										<Skeleton />
									</SkeletonTheme>
								</div>
								<div className="button-container">
									<button
										className="btn btn-success"
											
										type="submit"
										disabled={ buttonDisable ? 'true' : '' }
									>
										Join Now
									</button>
									<br />
									<Link
										to="/login"
										
									>
										I ALREADY HAVE ACCOUNT
									</Link>
								</div>
							</form>
						
            	</div>
				
			</div>
            <OTPModal RegisterResponse={RegisterResponse} />
		</React.Fragment>
	);
}
