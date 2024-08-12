import React, { useEffect, useState } from 'react';

function ShoesList() {
	const [shoes, setShoes] = useState([]);

	const fetchShoes = async () => {
		const url = 'http://localhost:8080/api/shoes';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setShoes(data.shoes);
		}
	};

    const deleteShoes = async (shoesId) => {
        const url = `http://localhost:8080/api/shoes/${shoesId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setShoes(shoes.filter(shoes => shoes.id !== shoesId));
        }
    };

	useEffect(() => {
		fetchShoes();
	}, []);

	return (
		<>
			<table className="table table-striped">
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
					{shoes.map(shoe => {
						return (
							<tr key={shoe.id}>
								<td>{shoe.manufacturer}</td>
								<td>{shoe.model_name}</td>
								<td>{shoe.color}</td>
								<td>{shoe.picture_url}</td>
								<td>{shoe.closet_name}</td>
								<td>{shoe.bin_number}</td>
								<td>{shoe.bin_size}</td>
								<td>
									<button onClick={() => deleteShoes(shoe.id)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default ShoesList;
