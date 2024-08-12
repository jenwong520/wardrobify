import React, { useEffect, useState } from 'react';

function ShoesForm() {
    const [bin, setBins] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          setBins(data.bins)
        }
    }

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a shoe</h1>
            <form id="create-shoe-form">
              <div className="form-floating mb-3">
                <input placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                <label htmlFor="model_name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="mb-3">
                <select required name="bin" id="bin" className="form-select">
                  <option value="">Choose a bin</option>
                  {bin.map(bin => {
                        return (
                            <option key={bin.id} value={bin.import_href}>
                                {bin.closet_name} - Bin {bin.bin_number}, Size {bin.bin_size}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ShoesForm;
