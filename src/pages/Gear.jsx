import { useEffect, useState } from "react";

const Gear = () => {
  const [post, setPost] = useState([]);

  const [update, setUpdate] = useState({
    id: 15,
    name: "roshan",
    brand: "abc",
  });

  const getData = async () => {
    const test = await fetch("http://localhost:9000/gear");
    const data = await test.json();
    setPost(data);
  };

  const handelchange = () => {
    
    setUpdate({ ...update, name: "niranjan" });
    console.log(update);
  };

  useEffect(() => {
    getData();
    console.log(update);
  }, [update]);

  return (
    <div>
      <input
        type="text"
        value={update}
        placeholder="data"
        onChange={handelchange}
      />

      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>brand</th>
        </tr>
        {post.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Gear;
