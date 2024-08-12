import React, { useEffect, useState } from 'react';

function HatsList() {
    const [hats, setHats] = useState([]);

    const fetchHats = async () => {
        const url = 'http://localhost:8090/api/hats/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setHats(data.hats);
        }
    };

    const deleteHat = async (hatId) => {
        const url = `http://localhost:8090/api/hats/${hatId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setHats(hats.filter(hat => hat.id !== hatId));
        }
    };

    useEffect(() => {
        fetchHats();
    }, []);

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Hat Style</th>
                    <th>Fabric</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Closet Name</th>
                    <th>Section Number</th>
                    <th>Shelf Number</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hats => {
                    return (
                        <tr key={hats.id}>
                            <td>{hats.style_name} </td>
                            <td>{hats.fabric}</td>
                            <td>{hats.color}</td>
                            <td>{hats.picture_url}</td>
                            <td>{hats.closet_name}</td>
                            <td>{hats.section_number}</td>
                            <td>{hats.shelf_number}</td>
                            <td>
                                <button onClick={() => deleteHat(hats.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
