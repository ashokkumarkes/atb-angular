import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import { useDispatch } from 'react-redux';
import { addToCart } from './slices/cartSlice';

// Default image URL
const DEFAULT_IMAGE = "https://via.placeholder.com/300x200/667eea/ffffff?text=No+Image";

function ProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        axios.get("http://localhost:5000/api/masters/get-products")
            .then((res) => {
                setProducts(res.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            });
    }, []);

    // Handle image load error
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = DEFAULT_IMAGE;
    };

    // Format price with commas
    const formatPrice = (price) => {
        if (!price) return "0";
        return new Intl.NumberFormat('en-IN').format(price);
    };

    if (loading) {
        return (
            <div className="product-list-container">
                <div className="product-list-loading">
                    <div className="loading-spinner"></div>
                    <span>Loading products...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-container">
                <div className="product-list-error">
                    <h3>⚠️ Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="product-list-container">
                <div className="product-list-empty">
                    <div className="product-list-empty-icon">📦</div>
                    <h3>No products found</h3>
                    <p>There are no products available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Product List</h1>

            <div className="product-list-grid">
                {products.map((item) => (
                    <div key={item._id} className="product-card">
                        {/* Product Image with error handling */}
                        <div className="product-image-container">
                            {item.product_thambnail ? (
                                <img
                                    src={item.product_thambnail}
                                    alt={item.product_name || "Product"}
                                    className="product-image"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="product-image-placeholder">
                                    <span className="product-image-placeholder-icon">📦</span>
                                </div>
                            )}
                        </div>

                        {/* Product Name */}
                        <h3 className="product-name">
                            {item.product_name || "Unnamed Product"}
                        </h3>

                        {/* Product Price */}
                        <p className="product-price">
                            ₹ {formatPrice(item.selling_price)}
                        </p>

                        {/* Product Description */}
                        <p className="product-description">
                            {item.short_descp 
                                ? (item.short_descp.length > 80 
                                    ? `${item.short_descp.substring(0, 80)}...` 
                                    : item.short_descp)
                                : "No description available"}
                        </p>

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button 
                                className="product-button product-button-details"
                                onClick={() => navigate(`/details/${item._id}`)}
                            >
                                Details
                            </button>
                            <button
                                className="product-button product-button-cart"
                                onClick={() => dispatch(addToCart({
                                    id: item._id,
                                    name: item.product_name || 'Product',
                                    price: item.selling_price || 0,
                                    image: item.product_thambnail,
                                    quantity: 1,
                                }))}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default ProductList;