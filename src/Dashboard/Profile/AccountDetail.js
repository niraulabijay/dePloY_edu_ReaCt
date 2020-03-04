import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useAuth } from '../../Context/Auth';

const AccountDetail = ({ UserResponse }) => {
    const { register, handleSubmit, errors, watch } = useForm();
    const [ changeResponse, setChangeResponse ] = useState();
    const {Authtoken} = useAuth();

    const onSubmit = (data) => {
        axios({
            method: 'post',
            url: 'http://noname.hellonep.com/api/changepassword',
            data: data,
            headers: {Authorization: "bearer" + Authtoken.token},

        }).then(response => {
            if(response.data.status === "success"){
                setChangeResponse('Password Succesfully Changed')
            }else{
                setChangeResponse(response.data.message)
            }
        })
    }
    console.log(changeResponse)
    return (
        <div className="account-details">
            <div className="title">Account Details</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        className="form-control"
                        type="number"
                        placeholder={UserResponse.phone}
                        disabled
                        name="phone"
                    />
                </div>
                <div className="form-group">
                    <label>email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder={UserResponse.email}
                        disabled
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        ref={register({ required: true})}
                    />
                </div>
               
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="confirm_password"
                        ref={register({ validate: (value) => value === watch('password'), required: true })}
                    />
                </div>
                <div className="form-group">
                    <label>Old Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="old_password"
                        ref={register({ validate: (value) => value !== watch('password'), required: true })}
                    />
                </div>
                {
                    errors.confirm_password && errors.confirm_password.type === "validate" &&
                    <span style={{
										color: "red",
										display: "block",
										textAlign: "center"
									}}>*Password do not match</span>

                }
                {errors.password && errors.password.type === "required" && 
                <span
                style={{
										color: "red",
										display: "block",
										textAlign: "center"
									}}
				>
									*The field is empty
								</span>
                }
                {
                    errors.old_password && errors.old_password.type === "validate" &&
                    <span style={{
										color: "red",
										display: "block",
										textAlign: "center"
									}}>*Please use a new password</span>

                }
                <div className="button-container">
                    <input type="submit" className="btn btn-success" />
                </div>
            </form>
        </div>
    )
}

export default AccountDetail;