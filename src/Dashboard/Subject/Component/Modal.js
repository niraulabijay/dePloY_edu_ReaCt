import React, { useState, useEffect } from "react";
import Axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuth } from "../../../Context/Auth";

const Modal = ({ id }) => {
	const [FlashResponse, setFlashResponse] = useState({});
	console.log(id + "modalid");
<<<<<<< HEAD
	let getUrl = "http://noname.dotnep.com/api/flashcard/" + id;
	const { Authtoken } = useAuth();
	const [FlashError, setFlashError] = useState();
=======
	let getUrl = "https://noname.dotnep.com/api/flashcard/" + id;
	const {Authtoken} = useAuth();
	const [FlashError, setFlashError] = useState()

>>>>>>> 16e9bf58ca1daeea8f617df40b123ce6c726cc7f

	useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(
					getUrl,
					{
						headers: {
							Authorization: "bearer" + Authtoken.token,
						},
						// timeout: 10000,
					},
					{
						cancelToken: source.token,
					}
				);
				setFlashResponse(response.data.data);
			} catch (error) {
				if (Axios.isCancel(error)) {
					console.log(error);
				} else {
					// setFlashError(()=>{
					// 	throw error;
					// })
					console.log(error);
				}
			}
		};
		loadData();
		return () => {
			source.cancel();
			setFlashResponse(null);
		};
	}, [getUrl]);

	return (
		<div className="modal" id="flash-modal">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="close" data-dismiss="modal">
							<i className="fa fa-times"></i>
						</button>
						{FlashResponse ? (
							<div>
								<strong>{FlashResponse.title}</strong>
								<p
									style={{ fontWeight: "lighter" }}
									dangerouslySetInnerHTML={{
										__html: FlashResponse.description,
									}}
								></p>
							</div>
						) : (
							<React.Fragment>
								<Skeleton height={20} width={200} />

								<p>
									<Skeleton count={5} />
								</p>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Modal;
