import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

async function loadData() {
	try {
		const [shoesResponse, hatsResponse] = await Promise.all([
			fetch('http://localhost:8080/api/shoes/'),
			fetch('http://localhost:8090/api/hats/')
		]);

		if (shoesResponse.ok && hatsResponse.ok) {
			const shoesData = await shoesResponse.json();
			const hatsData = await hatsResponse.json();

			ReactDOM.createRoot(document.getElementById('root')).render(
				<React.StrictMode>
					<App shoes={shoesData.shoes} hats={hatsData.hats} />
				</React.StrictMode>
			);
		} else {
			console.error('Failed to load data', { shoesResponse, hatsResponse });
		}
	} catch (error) {
		console.error('An error occurred while loading data:', error);
	}
}

loadData();

// async function loadShoes() {
//     const response = await fetch('http://localhost:8080/api/shoes/');
//     if (response.ok) {
//         const data = await response.json();
// 		ReactDOM.createRoot(document.getElementById("root")).render(
// 			<React.StrictMode>
// 			  <App shoes={data.shoes} />
// 			</React.StrictMode>
// 		  );
//       } else {
//         console.error(response);
//       }
//     }
//   loadShoes();
// async function loadHats() {
// 	const response = await fetch('http://localhost:8090/api/hats/');
// 	if (response.ok) {
// 		const data = await response.json();
// 		// console.log(data);
// 		ReactDOM.createRoot(document.getElementById('root')).render(
// 			<React.StrictMode>
// 				<App hats={data.hats}/>
// 			</React.StrictMode>
// 		);
// 	  } else {
// 		console.error(response);
// 	  }
// 	}
//   loadHats();
