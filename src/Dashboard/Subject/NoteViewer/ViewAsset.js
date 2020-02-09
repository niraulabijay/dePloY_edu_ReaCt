import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFView";
import Axios from "axios";
// import { useAuth } from "../../Context/Auth";
import PDFJSBackend from "./PDFJS";

const ViewAsset = ({ id }) => {
	console.log(id);
	const [NoteResponse, setNoteResponse] = useState([]);
	let getUrl = "http://noname.hellonep.com/api/note/"+id;
	console.log(NoteResponse.file);
	useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(getUrl, {
					cancelToken: source.token
				});
				setNoteResponse(response.data.data);
				console.log(response.data.data);
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
