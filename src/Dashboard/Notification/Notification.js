import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Axios from "axios"
import { useAuth } from "../../Context/Auth";

export default function Notification() {
	let History = useHistory();
	const {Authtoken} = useAuth()
	const [seenNotification, setSeenNotification] = useState([])
	const [unseenNotification, setUnseenNotification] = useState([])
	const getUrl = "https://noname.dotnep.com/api/notifications"
	const [err, setErr] = useState()

	useEffect(() => {
		let source = Axios.CancelToken.source();
		const loadData = async () => {
			try {
				const response = await Axios.get(
					getUrl, 
					{
						headers: {
							Authorization: "bearer" + Authtoken.token
						},
						timeout: 10000
					},
					{
						cancelToken: source.token
					}
				);
				setSeenNotification(response.data.seen_notifications);
				setUnseenNotification(response.data.unseen_notifications);
				if(response.data.unseen_notifications.length > 0){
					const unseen_id = []
					response.data.unseen_notifications.map((noti,index)=>{return(
						unseen_id.push(noti.id)
					)})
					console.log(unseen_id)
					// const formData = new FormData();
					// formData.append("unseen_ids", JSON.stringify(unseen_id));
					// console.log(...formData)
					Axios({
						method: "post",
						headers: { Authorization: "bearer" + Authtoken.token },
						url: "https://noname.dotnep.com/api/notifications/seen",
						data: {
							unseen_id: JSON.stringify(unseen_id)
						}
						}).then(response => {
						console.log(response)
					});
				}
			}catch (error) {
				if (Axios.isCancel(error)) {
					console.log(error);
				} else {
					setErr(()=>{
						throw error;
					})
				}
			}
		};
		loadData();
		return () => {
			source.cancel();
		};
	}, [getUrl]);

	
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
				<Alert message={"Notification Received"} />
				<div className="subject-content">
					<div className="notificationWrapper">
						
						{unseenNotification.length > 0 && unseenNotification.map((notification, index)=>{return(
						<div className="notification-item ">
							<div className="close-item">
								<span>
									<i className="fa fa-window-close"></i>
								</span>
							</div>
							<h4>{notification.title}</h4>
							<p dangerouslySetInnerHTML={{
														__html:
															notification.notifications
													}}>
							</p>
							<div className="date">{notification.date} <span className="seen-identify"> <i className="fa fa-eye"></i>  </span> <span className="new-identify"> new  </span></div>
						</div>
						)})}
						{seenNotification.length > 0 && seenNotification.map((notification, index)=>{return(
						<div className="notification-item seen">
							<div className="close-item">
								<span>
									<i className="fa fa-window-close"></i>
								</span>
							</div>
							<h4>{notification.title}</h4>
							<p dangerouslySetInnerHTML={{
														__html:
															notification.notifications
													}}>
							</p>
							<div className="date">{notification.date} <span className="seen-identify"> <i className="fa fa-eye"></i>  </span> <span className="new-identify"> new  </span></div>
												
						</div>
						)})}
						
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
