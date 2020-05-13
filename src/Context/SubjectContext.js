import React , {useState, useEffect, createContext} from 'react'
import Axios from 'axios'
import { useAuth } from './Auth';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Logout from '../Dashboard/Logout';


export const SubjectContext = createContext();

export const SubjectProvider = props => {

	const [SubjectResponse, setSubjectResponse] = useState([]);
	const [tokenError, setTokenError] = useState(false);
	const [practiseReport, setPractiseReport] = useState([]);
	const [practiseSubject, setPractiseSubject]= useState([]);
	const [testSub, setTestSubject] = useState([]);
	const [PractiseResponse, setPractiseResponse] = useState([]);
	const [practisePercentage, setPractisePercentage] = useState()
    const [loading, setLoading] = useState(true);
	const {Authtoken} = useAuth();
	const {handleClose} = Logout();
	let getUrl = "/api/subjects/" + Authtoken.class_id;
	

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
						timeout: 10000,
					},
					{ cancelToken: source.token },
				);
				// if(response.data.status === "")
				if(response.data.status === "Token is Expired" || response.data.status === "Token is Invalid"){
					handleClose()
				}else{
					console.log(response.data + "hello")
				setSubjectResponse(response.data.learn_subjects);
				setPractiseResponse(response.data.practice_subjects);
				setTestSubject(response.data.test_subjects);
				setPractiseSubject(response.data.practice_graph_subjects);
				setPractiseReport(response.data.practice_report);
				setPractisePercentage(response.data.practise_percentage)
				setLoading(false);
				}
			}catch(error){
				if (Axios.isCancel(error)) {
					console.log(error);
				}else {
					console.log(error)
					// setTokenError(error)
					// throw new Error(error);	
					setTokenError(()=>{
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
		{/* if({tokenError}){
		 throw new Error('error');
		}		 */}
		<SubjectContext.Provider value={{
				SubjectResponse:SubjectResponse, 
				testSub:testSub, 
				PractiseResponse:PractiseResponse, 
				loading:loading,
				practiseReport:practiseReport,
				practiseSubject:practiseSubject,
				PractisePercentage: practisePercentage
			}}>
            {props.children}
        </SubjectContext.Provider>
		
		</React.Fragment>

    )
}