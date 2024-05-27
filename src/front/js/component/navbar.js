import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {actions, store} = useContext(Context)
	const navigate = useNavigate()

	const handleLogout = () =>{
		actions.logout()
		navigate('/login')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.loggedUser == null && <span>Loading...</span>}	
					{store.loggedUser == false && (
						<div className="navbar-buttons">
							<button 
								className="btn btn-secondary" 
								type="button"
								onClick={ ()=>navigate('/signUp') }>
								Signup
							</button>
							<button 
								className="btn btn-secondary ms-2" 
								type="button"
								onClick={ ()=>navigate('/login') }>
								Login
							</button>
						</div>
						
					)}		
					{store.loggedUser && (
						<div className="navbar-buttons">		
							<div className="dropdown d-inline ms-2">		
								<button 
									className="btn btn-secondary dropdown-toggle" 
									type="button" 
									data-bs-toggle="dropdown" 
									aria-expanded="false">
									Name logged
								</button>
								<ul className="dropdown-menu">
									{store.loggedUser && store.loggedUser.role === "admin" && (
										<li><span className="dropdown-item" onClick={ ()=>navigate('/adminDataLoad') }>Admin data</span></li>
									)}
									<li><span className="dropdown-item">Favorites</span></li>
									<li><span className="dropdown-item" onClick={ ()=>handleLogout() }>Logout</span></li>
								</ul>
							</div>
						</div>
					)}						
				</div>
			</div>
		</nav>
	);
};
