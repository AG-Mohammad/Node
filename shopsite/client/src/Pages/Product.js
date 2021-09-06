import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../components/Axios";

function Product() {
  const prod = useLocation().state.Type;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getProd() {
       let res = await api.post("/products", { prod: prod });
       setProduct(res.data);
    }
    getProd();
  }, [prod]);

  return (
    <div>
      {product != null ? (
        <>
          Pic:
          <br />
          <img src={product.pic} alt={product.name}></img>
          <hr />
          Name:
          <b>{product.name}</b>
          <hr />
          Description:
          <b>{product.desc}</b>
          <hr />
          Category:
          <b>{product.category}</b>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
