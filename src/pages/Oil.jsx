
import React, { useState, useEffect } from "react";
import "./oil.css";

const Oil = () => {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    liter: "",
  });
  const [editform, setEditform] = useState(false);
  const [showEditForm, setShowEditForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    liter: "",
  });
// const [editLiter,setEditLiter]=useState("")

  // Fetch data
  const getData = async () => {
    const response = await fetch("http://localhost:9000/oil");
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    debugger;
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query) {
      const filteredRecords = post.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toString().includes(query)
      );
      setPost(filteredRecords);
    } else {
      getData();
    }
  };

  // Show form when "Add" is clicked
  const handleAddClick = () => {
    debugger;
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setFormData({ name: "", brand: "", price: "", stock: "", liter: "" });
    }
  };

  // edit button code
  const handeleditbtn = (item) => {
    debugger;
    setEditform(true);
    setShowEditForm({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      stock: item.stock,
      liter: item.liter,
    });
  };
  // handel edit inpute form
  const handeleditchange = (e) => {
    let editFormData = showEditForm
    if (e.target.name === 'stock') {
      editFormData.liter = e.target.value * 10
    }
    setShowEditForm({ ...editFormData, [e.target.name]: e.target.value  });
  };

  // handel edit submit record
  const handleeditSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const update = await fetch(`http://localhost:9000/oil/${showEditForm.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showEditForm),
    });
    if (update) {
      alert("record update succesfully");
      setEditform(false);
      getData();
    } else {
      alert("faild to update");
    }
  };

  // Handle input addchanges in form
  const handleaddChangeData = (e) => {
    let addFormData = formData
    if (e.target.name === 'stock') {
      addFormData.liter = e.target.value * 10
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    // new data post i table
    const newInput = {
      id: Math.floor(Math.random() * 100),
      ...formData,
    };
    const response = await fetch("http://localhost:9000/oil", {
      method: "POST",
      headers: {
        "Content-Type": "appliction/json",
      },
      body: JSON.stringify(newInput),
    });
    if (response.ok) {
      alert("New data updated successfully!");
      await getData();
    } else {
      console.log("Failed to update!");
    }

    setShowAddForm(false);
    setFormData({ name: "", brand: "", price: "", stock: "", liter: "" });
  };

  // Handle cancel button
  const handleCanceladd = () => {
    debugger;
    setShowAddForm(false);
    setFormData({ name: "", brand: "", price: "", stock: "", liter: "" });
  };

  const handleCanceledit = () => {
    debugger;
    setEditform(false);
    setShowEditForm({ name: "", brand: "", stock: "", liter: "" });
  };
  // DELETE
  const handeldelete = async (id) => {
    debugger;
    const response = await fetch(`http://localhost:9000/oil/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updaterecord = post.filter((item) => item.id !== id);
    if (response.ok) {
      alert("Record delete");
      getData();
    }
    setPost(updaterecord);
  };

  return (
    <div className="container-oil">
      <h1>Oil Inventory</h1>
      <div className="header">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
      <button onClick={handleAddClick}>ADD</button>
      {/* add form */}
      {showAddForm && (
        <div className="form-container">
          <div className="form-overlay">
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleaddChangeData}
                required
              />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                placeholder="Brand"
                onChange={handleaddChangeData}
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                onChange={handleaddChangeData}
                required
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                placeholder="Stock"
                onChange={handleaddChangeData}
                required
              />
              <input
                type="number"
                name="liter"
                value={formData.liter}
                placeholder="Liter"
                onChange={handleaddChangeData}
                required
              />

              <button type="submit">Submit</button>
              <button type="button" onClick={handleCanceladd}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {editform && (
        <div className="form-container-edit">
          <div className="form-overlay-edit">
            <form className="form-edit" onSubmit={handleeditSubmit}>
              <input
                type="text"
                name="brand"
                value={showEditForm.brand}
                placeholder="brand"
                onChange={handeleditchange}
                required
                disabled
              />
              <input
                type="text"
                name="name"
                value={showEditForm.name}
                placeholder="name"
                onChange={handeleditchange}
                required
              />
              <input
                type="number"
                name="stock"
                value={showEditForm.stock}
                placeholder="Stock"
                onChange={handeleditchange}
                required
              />
              <input
                type="number"
                name="liter"
                value={showEditForm.liter}
                placeholder="liter"
                onChange={handeleditchange}
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCanceledit}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Liter</th>
            <th>update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {post.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>{item.liter}</td>
              <td>
                <button onClick={() => handeleditbtn(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handeldelete(item.id)}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Oil;

