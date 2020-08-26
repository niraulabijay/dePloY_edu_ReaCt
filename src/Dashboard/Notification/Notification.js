import React from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

export default function Notification() {
	let History = useHistory();
	return (
		<React.Fragment>
			<div className="main-subject-containter">
				<div className="subject-navbar d-flex justify-content-between">
					<a onClick={History.goBack} className="back">
						<i className="fa fa-arrow-left"></i>
					</a>
					<div className="top-subject-navbar">
						<div className="icon-box">
							<i className="fa fa-bell"></i>
						</div>
						<div className="title-box">
							<h2>Notification</h2>
							<div className="chapter-number">Be Updated</div>
						</div>
					</div>
				</div>
                <Alert message={'Notification Received'} />
				<div className="subject-content">
					<div className="notificationWrapper">
						<div className="notification-item">
							<div className="close-item">
								<span><i className="fa fa-window-close"></i></span>
							</div>
                            <p>

							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Obcaecati, unde culpa? Totam earum reiciendis quae itaque,
							possimus magni asperiores, dignissimos voluptas adipisci eveniet
							unde! Veniam deleniti illo quis quisquam quod?
                            </p>
                            <div className="date">Feb 22, 4:00 PM</div>
						</div>
                        <div className="notification-item">
						<div className="close-item">
								<span><i className="fa fa-window-close"></i></span>
							</div>
                            <p>

							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Obcaecati, unde culpa? Totam earum reiciendis quae itaque,
							possimus magni asperiores, dignissimos voluptas adipisci eveniet
							unde! Veniam deleniti illo quis quisquam quod?
                            </p>
                            <div className="date">Feb 22, 4:00 PM</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
