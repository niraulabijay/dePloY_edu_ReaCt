import React, { useState, useEffect } from "react";
import Axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Modal = ({ id }) => {
	const [FlashResponse, setFlashResponse] = useState({});
	console.log(id + 'modalid');
	let getUrl = "http://noname.hellonep.com/api/flashcard/" + id;

	useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(getUrl, {
					cancelToken: source.token
				});
				setFlashResponse(response.data.data);
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
			setFlashResponse(null);
		};
	}, [getUrl]);

	return (
		<div className="modal" id="flash-modal">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="close" data-dismiss="modal">
							&times;
						</button>
						{FlashResponse ? (
							<div>
								<strong>{FlashResponse.title}</strong>
								<p style={{ fontWeight: "lighter" }}>
									{FlashResponse.description}
								</p>
							</div>
						) : (
							<React.Fragment>
								
									<Skeleton height={20} width={200}/>
								
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
