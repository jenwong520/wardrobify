function HatsList(props) {

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
                {props.hats.map(hats => {
                    return (
                        <tr key={hats.id}>
                            <td>{hats.style_name}</td>
                            <td>{hats.fabric}</td>
                            <td>{hats.color}</td>
                            <td>{hats.picture_url}</td>
                            <td>{hats.closet_name}</td>
                            <td>{hats.section_number}</td>
                            <td>{hats.shelf_number}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default HatsList;
