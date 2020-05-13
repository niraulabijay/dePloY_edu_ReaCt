import React, {useEffect, useState, createContext} from 'react'
import { useAuth } from './Auth';
import Axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
    const { Authtoken } = useAuth();
    const [UserResponse, setUserResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(1);


    // const [state, dispatch] = useReducer(loginReducer, initialState);

    let getUrl = "http://noname.hellonep.com/api/user/" + Authtoken.user_id;

    useEffect(() => {
        let source = Axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await Axios.get(getUrl,
                    {
						headers: {
							Authorization: "bearer" + Authtoken.token
						}
					}, {
                        cancelToken: source.token
                    }
                );
                setUserResponse(response.data.user);
               
                // console.log(response.data.user);
                setLoading(false);
            } catch (error) {
                if (Axios.isCancel(error)) {
                    // console.log(error);
                } else {
                    throw error;
                }
            }
        };
        loadData();
        return () => {
            source.cancel();
        };
    }, [getUrl, update]);

    
    return (
        <ProfileContext.Provider value={{
            setUserResponse: setUserResponse,
            UserResponse: UserResponse,
            loading: loading,
            setLoading: setLoading,
            setUpdate: setUpdate,
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
