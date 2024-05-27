import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () =>{
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        "user_name": "",
        "password": ""
    })

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendData = async (e)=>{
        e.preventDefault()
        const result = await actions.login(user)
        if(result){
            navigate('/')
        }
    }

    return(
        <div className="container">
            <div className="body text-center m-5">
                <h1>Sign in da Super blog</h1>
                    <form className="m-auto" style={{width: "26rem"}}>
                        <div className="mb-3">
                            <label htmlFor="user_name" className="form-label">Username</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="user_name" onChange={handleChange} value={user.user_name}/>                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password"
                                onChange={handleChange} value={user.password}/>
                        </div>                    
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={ (e)=>sendData(e) }
                            >Login
                        </button>
                    </form>
            </div>
        </div>
    )
}