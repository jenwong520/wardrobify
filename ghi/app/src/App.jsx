import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

function App(props) {
	if (props.shoes === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
				</Routes>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th>Shoe Brand</th>
							<th>Model Name</th>
							<th>Color</th>
							<th>Picture</th>
							<th>Closet Name</th>
							<th>Bin Number</th>
							<th>Bin Size</th>
						</tr>
					</thead>
					<tbody>
						{props.shoes.map(shoes => {
							return (
							<tr key={shoes.id}>
								<td>{ shoes.manufacturer }</td>
								<td>{ shoes.model_name }</td>
								<td>{ shoes.color }</td>
								<td>{ shoes.picture_url}</td>
								<td>{ shoes.closet_name }</td>
								<td>{ shoes.bin_number }</td>
								<td>{ shoes.bin_size }</td>
							</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</BrowserRouter>
	);
}

export default App;
