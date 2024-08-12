import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';
import HatsList from './HatsList';
import HatsForm from './HatsForm';

function App(props) {
	if (props.shoes === undefined && props.hats === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/shoes" element={<ShoesList shoes={props.shoes} />} />
					<Route path="/shoes/create" element={<ShoesForm />} />
					<Route path="/hats" element={<HatsList hats={props.hats} />} />
					<Route path="/hats/create" element={<HatsForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
