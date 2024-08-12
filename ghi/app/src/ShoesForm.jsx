import React, { useEffect, useState } from 'react';

function ShoesForm() {
  const [bins, setBins] = useState([]);
  const [manufacturer, setManufacturer] = useState('');
  const [modelName, setModelName] = useState('');
  const [color, setColor] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [bin, setBin] = useState('');

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  const handleModelNameChange = (event) => {
    const value = event.target.value;
    setModelName(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handlePictureUrlChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleBinChange = (event) => {
    const value = event.target.value;
    setBin(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      manufacturer,
      model_name: modelName,
      color,
      picture_url: pictureUrl,
      bin,
    };

    const shoesUrl = 'http://localhost:8080/api/shoes/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(shoesUrl, fetchConfig);
      if (response.ok) {
        const newShoe = await response.json();
        console.log(newShoe);

        setManufacturer('');
        setModelName('');
        setColor('');
        setPictureUrl('');
        setBin('');

      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create shoes</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
              <input value={manufacturer} onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className="form-floating mb-3">
              <input value={modelName} onChange={handleModelNameChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control" />
              <label htmlFor="model_name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture</label>
            </div>
            <div className="mb-3">
              <select value={bin} onChange={handleBinChange} required name="bin" id="bin" className="form-select">
                <option value="">Choose a bin</option>
                {bins.map(bin => {
                  return (
                    <option key={bin.id} value={bin.id}>
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
