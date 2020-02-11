import React, { useRef, useEffect } from "react";

export default function PDFViewer(props) {
	const viewerRef = useRef();

	useEffect(() => {
		const element = viewerRef.current;
		const iframe = document.createElement("iframe");
		iframe.src = `/pdf_viewer/web/viewer.html?file=${props.src}`;
		iframe.width = "100%";
		iframe.height = "100%";

		if (element != null) {
			if (element.getElementsByTagName("iframe")[0]) {
				element.removeChild(element.getElementsByTagName("iframe")[0]);
			}

			element.appendChild(iframe);
		}
	}, [props.src]);

	return (
		<div
			ref={viewerRef}
			id="viewer"
			style={{ width: "100%", height: "100%" }}
		></div>
	);
}
// export default class PDFViewer extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.viewerRef = React.createRef();
// 		console.log(this.viewerRef);
// 		// this.backend = new props.backend();
// 	}

// 	componentDidMount() {
// 		const { src } = this.props;
// 		const element = this.viewerRef.current;
// 		console.log(element);
// 		// this.backend(src, element);
// 		const iframe = document.createElement("iframe");
// 		iframe.src = `/pdf_viewer/web/viewer.html?file=${src}`;
// 		iframe.width = "100%";
// 		iframe.height = "100%";

// 		console.log(src);
// 		if (element != null) {
// 			element.appendChild(iframe);
// 		}
// 	}
// 	componentDidUpdate() {
// 		const iframe = document.createElement("iframe");
//         const { src } = this.props;

//         iframe.update(src, this.props);
//     }

// 	render() {
// 		return (
// 			<div
// 				ref={this.viewerRef}
// 				id="viewer"
// 				style={{ width: "100%", height: "100%" }}
// 			></div>
// 		);
// 	}
// }
