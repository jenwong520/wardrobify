import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

async function loadShoes() {
    const response = await fetch('http://localhost:8080/api/shoes/');
    if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error(response);
      }
    }
  loadShoes();
