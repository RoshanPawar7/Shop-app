import { useState, useEffect } from "react";
import "./light.css";

const Light = () => {
  const [lightData, setLightData] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    liter: "",
  });

  // Fetch oil data from API
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:9000/light");
      const data = await response.json();
     setLightData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle Search Functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query) {
      const filtered = lightData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          item.id.toString().includes(query)
      );
      setLightData(filtered);
    } else {
      getData();
    }
  };

  // Toggle Form Visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPart = {
      id: Math.floor(Math.random() * 100), // Temporary ID for frontend
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:9000/light", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPart),
      });

      if (response.ok) {
        alert("New part added successfully!");
        getData();
        setShowForm(false);
      } else {
        console.error("Failed to add new part.");
      }
    } catch (error) {
      console.error("Error adding part:", error);
    }
  };

  // handel Delete
  const handelRemove = async (id) => {
    const response =await fetch(`http://localhost:9000/light/${id}`,{
      method : "DELETE",
    });

    const updateRecord=lightData.filter((item)=>item.id !== id);
    setLightData(updateRecord)
    if(response.ok){
      alert("recoed Deletec Sccessfully")
    }else{
      getData();
    }
  }



  return (
    <div className="container">
      {/* Search Box Outside Table */}
      <div className="header">
        <input
          type="text"
          value={search}
          placeholder="Search oil..."
          onChange={handleSearch}
        />
        <button className="add-btn" onClick={toggleForm}>
          Add +
        </button>
      </div>

      {/* Form for adding new part */}
      {showForm && (
        <div className="form-overlay">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Add New Part</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="cancel-btn" onClick={toggleForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <table className="oil-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Action</th>
            <th>Update</th>

          </tr>
        </thead>
        <tbody>
          {lightData.length > 0 ? (
            lightData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                <button onClick={()=>handelRemove(item.id)}>Sell</button>
                </td>
              </tr>
              
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Light;
