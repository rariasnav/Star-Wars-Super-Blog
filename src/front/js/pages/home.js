import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div className="Container my-5">
			<div className="Container-body my-5">
				<div className="album py-5 bg-background-light-color">
					<div className="container">
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							<div className="col" >
								<div className="card shadow-sm">
									<img
										src={`https://via.placeholder.com/150`}
										className="bd-placeholder-img card-img-top"
										alt="..."
									/>
									<div className="card-body">
										<h3 className="card-text">Name</h3>
										<div className="d-flex justify-content-between align-items-center">
											<div className="btn-group">
												<button 
													type="button" 
													className="btn btn-sm btn-outline-secondary"
													>More details
												</button>
												<button 
													type="button" 
													className="btn btn-sm btn-outline-secondary"
													><i className="fa-regular fa-heart"></i>
												</button>												
											</div>								
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};
