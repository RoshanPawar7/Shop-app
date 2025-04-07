import { useState, useEffect } from "react";

const Brake = () => {
  const [newdata, setNewdata] = useState([]);
  const [search, setSearch] = useState("");
  const[newform,setNewform]=useState(false)
  const [addform,setAddform]=useState({
    id:"",
    name:"",
    brand:"",
    Price:"",
    stock:"",
  })

  const getData = async () => {
    const temp = await fetch("http://localhost:9000/brake");
    const test = await temp.json();
    setNewdata(test);
  };
  useEffect(() => {
    getData();
  }, []);

  const handelsearchbrake = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (query) {
      const updateSearch = newdata.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toString().includes(query)
      );
      setNewdata(updateSearch);
    } else {
      getData();
    }
  };
  // add btn
  const handeladd =()=>{

  }

  return (
    <div className="container-brake">
      <h1>Hello Brake</h1>

      <input
        type="text"
        value={search}
        placeholder="Enter Search Data"
        onChange={handelsearchbrake}
      />
      <button onClick={()=>handeladd}>Add</button>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>price</th>
          <th>Stock</th>
          <th>Update</th>
          <th>Action</th>
        </tr>
        {newdata.map((item) => {
          return (
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
                <button>Sell</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Brake;
