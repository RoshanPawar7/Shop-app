
import React, { useState, useEffect } from "react";

const Filter = () => {
  const [oildata, setOildata] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);   // Track if editing
  const [editId, setEditId] = useState(null);          // Store ID of the part being edited
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    liter: "",
  });

  // ✅ Fetch oil data from API
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:9000/oil");
      const data = await response.json();
      setOildata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Handle Search Functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query) {
      const filtered = oildata.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          item.id.toString().includes(query)
      );
      setOildata(filtered);
    } else {
      getData();
    }
  };

  // ✅ Toggle Form Visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setFormData({
      name: "",
      brand: "",
      price: "",
      stock: "",
      liter: "",
    });
  };

  // ✅ Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing record
        const response = await fetch(`http://localhost:9000/oil/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Part updated successfully!");
          setIsEditing(false);
          setEditId(null);
        } else {
          console.error("Failed to update part.");
        }
      } else {
        // Add new record
        const newPart = {
          id: Math.floor(Math.random() * 100), // Temporary ID
          ...formData,
        };

        const response = await fetch("http://localhost:9000/oil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPart),
        });

        if (response.ok) {
          alert("New part added successfully!");
        } else {
          console.error("Failed to add part.");
        }
      }

      getData();
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ✅ Handle Edit (Pre-fill the form with data)
  const handleEdit = (id) => {
    const partToEdit = oildata.find((item) => item.id === id);
    if (partToEdit) {
      setFormData(partToEdit);
      setShowForm(true);
      setIsEditing(true);
      setEditId(id);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this part?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:9000/oil/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Part deleted successfully!");
        getData();
      } else {
        console.error("Failed to delete part.");
      }
    } catch (error) {
      console.error("Error deleting part:", error);
    }
  };

  return (
    <div className="container">
      {/* 🔎 Search and Add Button */}
      <div className="header">
        <input
          type="text"
          value={search}
          placeholder="Search oil..."
          onChange={handleSearch}
        />
        <button className="add-btn" onClick={toggleForm}>
          {isEditing ? "Edit Part" : "Add +" }
        </button>
      </div>

      {/* 📋 Form for Adding/Updating Parts */}
      {showForm && (
        <div className="form-overlay">
          <form className="form" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Part" : "Add New Part"}</h2>
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
            <input
              type="text"
              name="liter"
              placeholder="Liter"
              value={formData.liter}
              onChange={handleChange}
              required
            />

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {isEditing ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={toggleForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 📊 Table */}
      <table className="oil-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Liter</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {oildata.length > 0 ? (
            oildata.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.liter}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  </td>
                  <td>
                  <button onClick={() => handleDelete(item.id)}> Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;
