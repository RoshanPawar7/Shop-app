import React, { useState, useEffect } from "react";
import "./oil.css";

const Oil = () => {
  const [oildata, setOildata] = useState([]);
  const [search, setSearch] = useState("");

  // Separate states for add and edit form visibility
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editId, setEditId] = useState(null);

  // Separate form data states
  const [addFormData, setAddFormData] = useState({
    //   name: "",
    //   brand: "",
    //   price: "",
    //   stock: "",
    //   liter: ""
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    liter: "",
  });

  const [editName, setEditName] = useState("");

  const [editLiter, setEditLiter] = useState("");

  
const [updateRecordID,setUpdateRecordID] = useState([])

  // Fetch oil data from API
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


  

  // const handelSetEditName = (e) =>{
  //   setEditName(e.target.value)
  //   console.log("pint value",e.target.value )
  // }

  // const handelSetEdit=(e)=>{
  //   setEditRecord (e.target.value)
  //   console.log("pint second value".e.target.value)
  // }

  // Search handler
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

  // Toggle add form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setAddFormData({
      name: "",
      brand: "",
      price: "",
      stock: "0",
      liter: "0",
    });
  };

  // Toggle edit form
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);

  };

  // const calculateStock = (liter) => Math.floor(Math.liter / 10); //one 1 bkt 10 lit

  // Handle form input changes for add form
  const handleAddChange = (e) => {
    debugger;
    const { name, value } = e.target;
    //     const updatedValue = name === "liter" ? parseInt(value) || 0 : value;
    //     console.log(updatedValue);

    //     const calculateStock = Math.floor(value*10); //one 1 bkt 10 lit
    // console.log(calculateStock)
    // setAddFormData({
    //   ...addFormData,
    //   [name]:value,
    //   stock: name === "liter" ? calculateStock(updatedValue) : addFormData.stock,
    // });
  };

  // Handle form input changes for edit form
  const handelSetEditLiter = (e) => {
    // const { name, value } = e.target;

    debugger;
    console.log(editName.value);

    const calculateStock = Math.floor(editName.value * 10); //one 1 bkt 10 lit
    console.log(calculateStock);
    // setEditFormData({
    //   ...editFormData,
    //   [name]: value,

    // });
  };

  // Submit new part
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPart = {
        id: Math.floor(Math.random() * 100), // Temporary ID
        ...addFormData,
        // total_liter:addFormData.stock * addFormData.liter_per_bkt,
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
        getData();
        toggleAddForm();
      } else {
        console.error("Failed to add part.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Edit existing part
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const editData = oildata.find((item) => item.id === editId);
    const calculateLiter = Math.floor(editLiter * 10);
    const updatedPart = {
      ...editData,
      liter: calculateLiter,
    }
    try {
      const response = await fetch(`http://localhost:9000/oil/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPart),
      });

      if (response.ok) {
        alert("Part updated successfully!");
        
        getData();
        toggleEditForm();
      } else {
        console.error("Failed to update part.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle edit button click (pre-fill edit form)
  const handleEdit = (id) => {
    const partToEdit = oildata.find((item) => item.id === id);
    if (partToEdit) {
      setEditId(id);
      setEditFormData(partToEdit);
      setShowEditForm(true);
    }
  };
  //  new by roshan..
  const editRecord = (recordId)=>{
    setEditId(recordId)
    setShowEditForm(!showEditForm);
    setUpdateRecordID(recordId);
  };
  
  
  //   const newRecord =(id)=>{
  //     const fildID = updateRecordID.filter((item)=>item.id === id);
  //     console.log("fil",fildID);
  //   } ;
  
  // setUpdateRecordID(newRecord);



  // Handle delete
  const handleDelete = async (id) => {
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
      <div className="header">
        <input
          type="text"
          value={search}
          placeholder="Search oil..."
          onChange={handleSearch}
        />
        <button onClick={toggleAddForm}>Add New Part</button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="form-overlay">
          <form className="form" onSubmit={handleAddSubmit}>
            <h2>Add New Part</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={addFormData.name}
              onChange={handleAddChange}
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={addFormData.brand}
              onChange={handleAddChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={addFormData.price}
              onChange={handleAddChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={addFormData.stock}
              onChange={handleAddChange}
              required
            />
            <input
              type="text"
              name="liter"
              placeholder="Liter"
              value={addFormData.liter}
              onChange={handleAddChange}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleAddForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {showEditForm && (
        <div className="form-overlay">
          <form className="form" onSubmit={handleEditSubmit}>
            <h2>Edit Part</h2>
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              disabled
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editLiter}
              onChange={(e) => setEditLiter(e.target.value)}
              required
            />

            <button type="submit" onClick={handleEditSubmit}>
              Submit
            </button>
            <button type="button" onClick={toggleEditForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="oil-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>stock</th>
            <th>liter</th>
            <th>Actions</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {oildata.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>{item.liter}</td>
              <td>
                <button onClick={() => editRecord(item.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Oil;
