import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import LoginModal from "../Login/LoginModal"

function Banner() {
	useEffect(() => {
		const objects = document.querySelector(".asyncBanner");
		console.log(objects);

		// Start loading image
		console.log("hello img");
		const img = new Image();
		img.src = objects.dataset.src;
		// Once image is loaded replace the src of the HTML element
		img.onload = () => {
			objects.classList.remove("asyncBanner");
			return objects.nodeName === "IMG"
				? (objects.src = objects.dataset.src)
				: (objects.style.backgroundImage = `url(${objects.dataset.src})`);
		};
	}, []);

	return (
		<div>
			<div className="banner">
				<div className="banner-img">
					<picture>
						<source
							media="(max-width: 768px)"
							srcset={require("../../pages/images/mobileBanner.jpg")}
							className="img-fluid"
						/>
						<img
							src={require("../../pages/images/banner-min.jpg")}
							data-src={require("../../pages/images/banner.jpg")}
							style={{ width: "auto" }}
							className="img-fluid asyncBanner"
						/>
					</picture>
				</div>
				<div className="title">Better Education For a Better World</div>

				<div className="join-now-form container-fluid">
					<div className="row">
						<div className="col-md-3 col-lg-3 col-3">
							<div className="country-code">+977</div>
						</div>
						<div className="col-md-5 col-lg-5 col-5">
							<div className="phone-number">
								<input type="phone" name="phone number" maxLength="10" />
							</div>
						</div>
						<div className="col-md-4 col-lg-4 col-4">
							<div className="submit">
								<a
									href=""
									className="button"
									data-toggle="modal"
									data-target="#join"
									name=""
								>
									Join
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="app-download ">
					<div className="play-store">
						<a href="">
							<img
								src={require("../../pages/images/play-store.png")}
								className="img-fluid"
							/>
						</a>
					</div>
					<div className="app-store">
						<a href="">
							<img
								src={require("../../pages/images/brand-apple.png")}
								className="img-fluid"
							/>
						</a>
					</div>
				</div>

				<div className="banner-wave">
					<img
						className="wave-img"
						src={require("../../pages/images/banner-wave.png")}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}

export default Banner;
