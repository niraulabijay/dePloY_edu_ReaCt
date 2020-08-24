import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFView";
import Axios from "axios";
// import { useAuth } from "../../Context/Auth";
import PDFJSBackend from "./PDFJS";
import { useAuth } from "../../../Context/Auth";
import { Switch } from "react-router-dom";

const ViewAsset = ({ id }) => {
	console.log(id);
	const {Authtoken} = useAuth();
	const [NoteResponse, setNoteResponse] = useState([]);
	let getUrl = "https://noname.dotnep.com/api/note/"+id;
	console.log(NoteResponse.file);
	useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(getUrl,{
					headers:{
						Authorization: 'bearer'+Authtoken.token
					}
				}, {
					cancelToken: source.token
				});
				setNoteResponse(response.data.data);
				console.log(response.data.data);
				console.log('hi from viewset')
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
	}, [getUrl]);
	return (
		<div className="ViewAsset">
			{NoteResponse.file && (

				
				<PDFViewer backend={PDFJSBackend} src={NoteResponse.file} />
				
			)}
		</div>
	);
};

export default ViewAsset;
