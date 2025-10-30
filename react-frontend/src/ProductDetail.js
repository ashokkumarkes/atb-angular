
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductDetail(){
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/masters/get-products/${id}`)
        .then((res) => setProduct(res.data.data[0]))
        .catch(() => console.log("Error loading product"));
    }, [id]);

    if(!product){
        return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>
    }
    return(
        <>
            <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px"
            }}>
            <div style={{
                width: "80%",
                maxWidth: "900px",
                display: "flex",
                gap: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 0 12px rgba(0,0,0,0.1)"
            }}>

            {/* Product Image */}
            <img 
            src={product.product_thambnail || "https://via.placeholder.com/300"}
            style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px"
            }}
            />

            {/* Product Info */}
            <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: "10px" }}>{product.product_name}</h1>
            <p style={{ fontWeight: "bold", fontSize: "20px", color: "green" }}>₹ {product.selling_price}</p>

            <p style={{ marginTop: "20px", fontSize: "15px", color: "#555" }}>
                {product.short_descp || "No description available"}
            </p>

            <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>

                <button 
                style={{
                    padding: "10px 18px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#28a745",
                    color: "white",
                    fontSize: "15px"
                }}
                onClick={() => console.log("Add to Cart")}
                >
                Add to Cart
                </button>

                <button 
                style={{
                    padding: "10px 18px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "white",
                    fontSize: "15px"
                }}
                onClick={() => window.history.back()}
                >
                Go Back
                </button>

            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default ProductDetail;