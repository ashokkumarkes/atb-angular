import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useDispatch } from 'react-redux';
import { addToCart } from './slices/cartSlice';

// Default image URL
const DEFAULT_IMAGE = "https://via.placeholder.com/500x500/667eea/ffffff?text=No+Image";

// Demo images for testing thumbnail gallery
const DEMO_IMAGES = [
    "https://via.placeholder.com/500x500/667eea/ffffff?text=Image+1",
    "https://via.placeholder.com/500x500/764ba2/ffffff?text=Image+2",
    "https://via.placeholder.com/500x500/f093fb/ffffff?text=Image+3",
    "https://via.placeholder.com/500x500/4facfe/ffffff?text=Image+4",
    "https://via.placeholder.com/500x500/00f2fe/ffffff?text=Image+5"
];

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5000/api/masters/get-products/${id}`)
            .then((res) => {
                if (res.data && res.data.data && res.data.data[0]) {
                    const productData = res.data.data[0];
                    setProduct(productData);
                    // Set initial selected image (thumbnail or first image from array)
                    // This will be updated after getAllImages processes demo images
                    if (productData.product_thambnail) {
                        setSelectedImage(productData.product_thambnail);
                    } else if (productData.product_images && productData.product_images.length > 0) {
                        setSelectedImage(productData.product_images[0]);
                    } else {
                        // If no image, use first demo image
                        setSelectedImage(DEMO_IMAGES[0]);
                    }
                } else {
                    setError("Product not found");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading product:", err);
                setError("Failed to load product. Please try again later.");
                setLoading(false);
            });
    }, [id]);

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

    // Get all product images (thumbnail + product_images array)
    const getAllImages = () => {
        if (!product) return [];
        const images = [];
        
        // Add thumbnail if exists
        if (product.product_thambnail) {
            images.push(product.product_thambnail);
        }
        
        // Add product_images array if exists
        if (product.product_images && Array.isArray(product.product_images)) {
            product.product_images.forEach((img) => {
                if (img && !images.includes(img)) {
                    images.push(img);
                }
            });
        }
        
        // If less than 2 images, add demo images for testing
        if (images.length < 2) {
            // Use existing image as first, or use first demo image
            const baseImage = images.length > 0 ? images[0] : DEMO_IMAGES[0];
            images.length = 0; // Clear existing
            images.push(baseImage);
            
            // Add demo images (excluding the one already used)
            DEMO_IMAGES.slice(1, 4).forEach((demoImg) => {
                images.push(demoImg);
            });
        }
        
        return images;
    };

    const productImages = getAllImages();

    // Update selected image if it's not in the productImages array (for demo images)
    useEffect(() => {
        if (productImages.length > 0 && !productImages.includes(selectedImage)) {
            setSelectedImage(productImages[0]);
        }
    }, [productImages]);

    // Handle thumbnail click
    const handleThumbnailClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="product-detail-loading">
                    <div className="loading-spinner"></div>
                    <span>Loading product details...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-container">
                <div className="product-detail-error">
                    <h2>⚠️ Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate("/")}>Go Back to Products</button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-container">
                <div className="product-detail-error">
                    <h2>Product Not Found</h2>
                    <p>The product you're looking for doesn't exist.</p>
                    <button onClick={() => navigate("/")}>Go Back to Products</button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Products</Link>
                <span className="breadcrumb-separator">/</span>
                <span>{product.product_name || "Product Details"}</span>
            </div>

            <div className="product-detail-wrapper">
                {/* Product Image Section */}
                <div className="product-image-section">
                    <div className="product-image-container">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt={product.product_name || "Product"}
                                className="product-detail-image"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="product-image-placeholder">
                                <span className="product-image-placeholder-icon">📦</span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {productImages.length > 1 && (
                        <div className="product-thumbnail-gallery">
                            {productImages.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className={`product-thumbnail ${selectedImage === imageUrl ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(imageUrl)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`${product.product_name || "Product"} - View ${index + 1}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = DEFAULT_IMAGE;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="product-info-section">
                    <h1 className="product-title">
                        {product.product_name || "Unnamed Product"}
                    </h1>

                    <div className="product-price-container">
                        <span className="product-price-label">Price:</span>
                        <span className="product-price">₹ {formatPrice(product.selling_price)}</span>
                    </div>

                    {/* Product Description */}
                    <div className={`product-description ${!product.short_descp ? 'product-description-empty' : ''}`}>
                        {product.short_descp || "No description available for this product."}
                    </div>

                    {/* Additional Product Details */}
                    {(product.product_slug || product.discount_price || product.product_code) && (
                        <div className="product-details-grid">
                            {product.product_code && (
                                <div className="product-detail-item">
                                    <span className="product-detail-label">Product Code</span>
                                    <span className="product-detail-value">{product.product_code}</span>
                                </div>
                            )}
                            {product.discount_price && (
                                <div className="product-detail-item">
                                    <span className="product-detail-label">Discount Price</span>
                                    <span className="product-detail-value">₹ {formatPrice(product.discount_price)}</span>
                                </div>
                            )}
                            {product.product_slug && (
                                <div className="product-detail-item">
                                    <span className="product-detail-label">Slug</span>
                                    <span className="product-detail-value">{product.product_slug}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="product-actions">
                        <button
                            className="product-button product-button-cart"
                            onClick={() => {
                                dispatch(addToCart({
                                    id: product._id,
                                    name: product.product_name || 'Product',
                                    price: product.selling_price || 0,
                                    image: selectedImage || product.product_thambnail,
                                    quantity: 1,
                                }));
                            }}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="product-button product-button-back"
                            onClick={() => navigate("/")}
                        >
                            ← Back to Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;