const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			baseURL: "https://curly-barnacle-wr777q7vv5q7h5gwj-3001.app.github.dev/api",
			dataURL: "https://swapi.dev/api",
			people: null,
			planets: null,
			starships: null,
			loggedUser: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup:async (user) =>{		
				const store = getStore()		
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type' : 'application/json' },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/signup`, requestOptions)
					if(response.ok){
						return 201
					} else {
						console.log("Signup failed with status: ", response.status)
					}
				} catch (error) {
					console.log("Signup error", error)
				}
			},
			login: async (user) =>{
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/login`, requestOptions)
					const data = await response.json()

					if(response.ok){
						localStorage.setItem('token', data.access_token)
						setStore({ loggedUser: data.user})
						return true
					}
					actions.logout()
					return false
				} catch (error) {
					actions.logout()
					return false
				}
			},
			logout: async () =>{
				setStore({ loggedUser: false })
				localStorage.removeItem('token')
			},
			getPeopleData: async () =>{
				const store = getStore()
				try {
					const response = await fetch(`${store.dataURL}/people`)
					const data = await response.json()
					
					if(response.ok){
						setStore({people: data.results})
					}
					return false
				} catch (error) {
					console.log("Error loading people data", error)
				}
			},
			getPlanetsData: async () =>{
				const store = getStore()
				try {
					const response = await fetch(`${store.dataURL}/planets`)
					const data = await response.json()

					if(response.ok){
						setStore({ planets: data.results})
					}
				} catch (error) {
					console.log("Error loading planet data", error)
				}
			},
			getStarshipsData: async () =>{
				const store = getStore()
				try {
					const response = await fetch(`${store.dataURL}/starships`)
					const data = await response.json()

					if(response.ok){
						setStore({ starships: data.results})
					}
				} catch (error) {
					console.log("Error loading starships data", error)
				}
			},
			setPeopleData: async (data) =>{
				const store = getStore()
				for(let person of data){
					try {
						const requestOptions = {
							method: 'POST',
							headers: { 
								'Authorization': `Bearer ${localStorage.getItem('token')}`, 
								'Content-Type': 'application/JSON' 
							},
							body: JSON.stringify(person)
						}
						const response = await fetch(`${store.baseURL}/people`, requestOptions)
						if(!response.ok){
							throw new Error('Failed to set people data')
						}
					} catch (error) {
						console.log("Error setting people data", error)	
						return false
					}				
				}
				return true
			},
			setPlanetsData: async (data) =>{
				const store = getStore()
				for(let planet of data){
					try {
						const requestOptions = {
							method: 'POST',
							headers: { 
								'Authorization': `Bearer ${localStorage.getItem('token')}`, 
								'Content-Type': 'application/JSON' 
							},
							body: JSON.stringify(planet)
						}
						const response = await fetch(`${store.baseURL}/planets`, requestOptions)
						if(!response.ok){
							throw new Error('Failed to set planet data')
						}
					} catch (error) {
						console.log("Error setting people data", error)	
						return false
					}
				}
				return true
			},
			setStarshipsData: async (data) =>{
				const store = getStore()
				for(let starship of data){
					try {
						const requestOptions = {
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${localStorage.getItem('token')}`,
								'Content-Type': 'application/JSON'
							},
							body: JSON.stringify(starship)
						}
						const response = await fetch(`${store.baseURL}/starships`, requestOptions)
						if(!response.ok){
							throw new Error('Failed to set planet data')
						}
					} catch (error) {
						console.log("Error setting people data", error)	
						return false
					}
				}
				return true
			}
		}
	};
};

export default getState;
