import React, { useEffect, useState } from 'react';

function HatsForm() {
    const [location, setLocations] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations);
        }
    };

      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create A New Hat</h1>
              <form id="create-hat-form">
                <div className="form-floating mb-3">
                  <input placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control"/>
                  <label htmlFor="style_name">Style Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                  <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="mb-3">
                  <select required name="location" id="location" className="form-select">
                    <option value="">Choose A Location</option>
                    {location.map(location => {
                        return (
                            <option key={location.id} value={location.import_href}>
                                {location.closet_name} - Section {location.section_number}, Shelf {location.shelf_number}
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
export default HatsForm;
