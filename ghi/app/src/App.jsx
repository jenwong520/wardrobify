import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import HatsList from './HatsList';
import HatsForm from './HatsForm';

function App(props) {
	if (props.hats === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/hats" element={<HatsList hats={props.hats}/>} />
					<Route path="/hats/create" element={<HatsForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
