import React , {useState, useEffect, createContext} from 'react'
import Axios from 'axios'
import { useAuth } from './Auth';
import PractiseSubject from '../Dashboard/Practise/PractiseChapter';

export const SubjectContext = createContext();

export const SubjectProvider = props => {

	const [SubjectResponse, setSubjectResponse] = useState([]);
	const [testSub, setTestSubject] = useState([]);
	const [PractiseResponse, setPractiseResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const {Authtoken} = useAuth();
	let getUrl = "http://noname.hellonep.com/api/subjects/" + Authtoken.class_id;

    useEffect(() => {
		let source = Axios.CancelToken.source();

		const loadData = async () => {
			try {
				const response = await Axios.get(
					getUrl,
					{
						headers: {
							Authorization: "bearer" + Authtoken.token
						}
					},
					{ cancelToken: source.token }
				);
				setSubjectResponse(response.data.learn_subjects);
				setPractiseResponse(response.data.practice_subjects);
				setTestSubject(response.data.test_subjects);
				setLoading(false);
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
        <SubjectContext.Provider value={{
				SubjectResponse:SubjectResponse, 
				testSub:testSub, 
				PractiseResponse:PractiseResponse, 
				loading:loading
			}}>
            {props.children}
        </SubjectContext.Provider>
    )
}