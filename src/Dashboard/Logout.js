import React from "react";
import { useAuth } from "../Context/Auth";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Logout = () => {
	const { Authtoken } = useAuth();

	const { StorageToken } = useAuth();
	const history = useHistory();

	const handleClose = () => {
		Axios({
			method: "post",
			url: "https://noname.dotnep.com/api/logout",
			headers: { Authorization: "Bearer" + Authtoken.token },
			data: {
				auth_token: Authtoken.token,
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});

		localStorage.clear();
		StorageToken(false);
		history.push({
			pathname: "/login",
		});
	};

	return { handleClose };
};
export default Logout;
