
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ProductList(){
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/masters/get-products").then((res)=>{
        setProducts(res.data.data);
    }).catch(()=>{
        console.log("Error:");
    });
    },[]);

    return(
    <>
        <h1 style={{ textAlign: "center" }}>Product List</h1>

        <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "20px", 
            justifyContent: "center",
            marginTop: "20px"
        }}>

            {products.map((item) => (
                <div 
                    key={item._id}
                    style={{
                        width: "250px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "15px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        backgroundColor: "#fff"
                    }}
                >
                    {/* Product Image */}
                    <img 
                        src={item.product_thambnail || "https://via.placeholder.com/200"} 
                        alt={item.product_name}
                        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                    />

                    <h3 style={{ marginTop: "10px" }}>{item.product_name}</h3>
                    <p style={{ fontWeight: "bold", color: "green" }}>₹ {item.selling_price}</p>

                    <p style={{ fontSize: "14px", color: "#555", minHeight: "40px" }}>
                        {item.short_descp?.substring(0, 50) || "No description available"}...
                    </p>

                    {/* Buttons */}
                    <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>

                        <button 
                            style={{
                                padding: "8px 12px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#007bff",
                                color: "white",
                                cursor: "pointer",
                                width: "48%"
                            }}
                            onClick={() =>  navigate(`/details/${item._id}`)}
                        >
                            Details
                        </button>

                        <button 
                            style={{
                                padding: "8px 12px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#28a745",
                                color: "white",
                                cursor: "pointer",
                                width: "48%"
                            }}
                            onClick={() => console.log("Add to Cart Clicked:", item._id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </>
);

}

export default ProductList;