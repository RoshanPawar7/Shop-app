import { useState, useEffect, use } from "react";
import "./oil.css";

const Oil = () => {
  const [add, setAdd] = useState([]);
  // const[filteroil,setFilteroil]=([ ])
  const [serach, setSerach] = useState("");
  
  const [create ,setCreate] = useState([])

  const getdata = async () => {
    const test = await fetch("http://localhost:9000/oil");
    const data = await test.json();
    console.log("test", data);
    setAdd(data);
    console.log("parts data", setAdd);
  };
  const handelSell = async (id) => {
    const url = `http://localhost:9000/oil/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE", // Correct method syntax (lowercase)
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log("response", response);

      if (response.ok) {
        alert("Record deleted successfully!" );

        const updateRecord = add.filter((item) => item.id !== id);
        setAdd(updateRecord);
      } else {
        console.error("Failed to delete the record.");
        alert("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while deleting the record.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSerach(query);

    if (query.length > 0) {
      const findRecord = add.filter(
        (item) =>
          item?.name?.toLowerCase().includes(query) ||
          item?.id?.toString().includes(query)
      );
      setAdd(findRecord);
    } else {
      console.log("getData callec");
      getdata();
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="tabel">
      <input
        type="text"
        value={serach}
        placeholder="search oil"
        onChange={handleSearch}
      />
      <input type="text" 
      value={create} placeholder="Add parts" onChange={handlecreate} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Liter</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {add.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.liter}</td>
                <td>
                  <button onClick={() => handelSell(item.id)}>Sell</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default Oil;
