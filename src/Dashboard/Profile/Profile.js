 import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../../Context/Auth";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
	const { Authtoken } = useAuth();
    const  [reload, setReload] = useState(true);
	const [UserResponse, setUserResponse] = useState([]);
	const [loading, setLoading] = useState(true);
	const { register, handleSubmit } = useForm();
	const [ProfileImage, setProfileImage] = useState([]);
	let getUrl = "http://noname.hellonep.com/api/user/" + Authtoken.user_id;

	useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(
					getUrl,
					{
						headers: {
							Authorization: "bearer" + Authtoken.token
						}
					},
					{
						cancelToken: source.token
					}
				);
				setUserResponse(response.data.user);

				
				setLoading(false);
			} catch (error) {
				if (Axios.isCancel(error)) {
					console.log(error);
				} else {
					throw error;
				}
			}
		};
		loadData();
		return () => {
			source.cancel();
		};
	}, [getUrl, reload]);

	const handleUserChange = e =>
		setUserResponse({
			...UserResponse,
			[e.target.name]: [e.target.value]
		});

	const handleImageChange = e => {
		setProfileImage(e.target.files[0]);
	};

	const onSubmit = data => {
		const formData = new FormData();
		formData.append("profile_image", ProfileImage);
		formData.append("user_id", Authtoken.user_id);
		formData.append("class_id", Authtoken.class_id);
		formData.append("name", data.name);
		formData.append("institution", data.institution);
		formData.append("dob", data.dob);
		formData.append("gender", data.gender);
		formData.append("address", data.address);
        console.log(...formData);
        setReload(true);
		Axios({
			method: "post",
			url: "http://noname.hellonep.com/api/user/update",
            headers: { "Content-Type": "multipart/form-data" ,
            Authorization: "bearer" + Authtoken.token},
			data: formData
		})
			.then(res => {
                console.log(res.status + "new");
				if(res.status == 200){
                    setReload(false);
                }
			})
			.catch(err => console.log(err));
	};
	console.log(UserResponse.profile_image);

	return loading ? (
		<React.Fragment>
			<div className="profile-wrapper">
				<div className="top-wrapper">
					<div className="container">
						<div className="profile-pic">
							<Skeleton height={150} width={150} />
						</div>
						<div className="text-container">
							<div className="name">
								<i className="fa fa-user"></i>
								<Skeleton width={100} />
							</div>
							<div className="number">
								<Skeleton width={100} />
							</div>
						</div>
					</div>
				</div>
				<div className="personal-details">
					<div className="title">Personal Details</div>
					<form>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>

						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="button-container">
							<Skeleton  width={100} height={30}/>
						</div>
					</form>
				</div>
				<div className="account-details">
					<div className="title">Account Details</div>
					<form>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="form-group">
							<Skeleton />
						</div>
						<div className="button-container">
							<Skeleton width={100} height={30} />
						</div>
					</form>
				</div>
			</div>
		</React.Fragment>
	) : (
		<React.Fragment>
			<div className="profile-wrapper">
				<div className="top-wrapper">
					<div className="container">
						<div className="profile-pic">
							<img
								src={
									UserResponse.length !== "0"
										? UserResponse.profile_image
										: require("../assets/images/testimonial-1.jpg")
								}
								className="img-fluid"
								alt=""
							/>
						</div>
						<div className="text-container">
							<div className="name">
								<i className="fa fa-user"></i>
								{UserResponse.name}
							</div>
							<div className="number">{UserResponse.phone}</div>
						</div>
					</div>
				</div>
				<div className="personal-details">
					<div className="title">Personal Details</div>
					<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
						<div className="form-group">
							<label>Name</label>
							<input
								className="form-control"
								type="text"
								value={UserResponse.name}
								onChange={handleUserChange}
								ref={register}
								name="name"
							/>
						</div>
						<div className="form-group">
							<label>School/College Name</label>
							<input
								className="form-control"
								type="text"
								value={UserResponse.institution}
								onChange={handleUserChange}
								ref={register}
								name="institution"
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								className="form-control"
								type="text"
								value={UserResponse.address}
								onChange={handleUserChange}
								ref={register}
								name="address"
							/>
						</div>

						<div className="form-group">
							<label>Birthday</label>
							<input
								className="form-control"
								type="date"
								value={UserResponse.dob}
								ref={register}
								onChange={handleUserChange}
								name="dob"
							/>
						</div>
						<div className="form-group">
							<label>Profile</label><br/>
                            <label class="custom-file-upload">
    <input type="file"
								id="image"
								accept="image/png, image/jpeg"
								onChange={handleImageChange}
								name="profile_image"
								ref={register}/>
   </label>
							
						</div>
						<div className="form-group">
							<label>Gender</label>
							<select
								className="form-control"
								value={UserResponse.gender}
								onChange={handleUserChange}
								ref={register}
								name="gender"
							>
								<option value="Female">Female</option>
								<option value="Male">Male</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="button-container">
							<input type="submit" value="Save" />
						</div>
					</form>
				</div>
				<div className="account-details">
					<div className="title">Account Details</div>
					<form>
						<div className="form-group">
							<label>Phone Number</label>
							<input
								className="form-control"
								type="number"
								placeholder={UserResponse.phone}
								disabled
								name="phone"
							/>
						</div>
						<div className="form-group">
							<label>email</label>
							<input
								className="form-control"
								type="email"
								placeholder={UserResponse.email}
								disabled
								name="email"
							/>
						</div>
						<div className="form-group">
							<label>New Password</label>
							<input
								className="form-control"
								type="password"
								name="new-password"
							/>
						</div>
						<div className="form-group">
							<label>Confirm Password</label>
							<input
								className="form-control"
								type="password"
								name="confirm-password"
							/>
						</div>
						<div className="form-group">
							<label>Old Password</label>
							<input
								className="form-control"
								type="password"
								name="old-password"
							/>
						</div>
						<div className="button-container">
							<input type="submit" value="Update" />
						</div>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
}
