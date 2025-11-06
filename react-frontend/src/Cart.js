import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementItem, removeFromCart, clearCart } from './slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = 'https://via.placeholder.com/200x200/667eea/ffffff?text=No+Image';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector((s) => s.cart);

  if (!items || items.length === 0) {
    return (
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Your Cart</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        <div>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: 8, marginBottom: '1rem' }}>
              <img
                src={item.image || DEFAULT_IMAGE}
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ color: '#28a745', fontWeight: 700 }}>₹ {new Intl.NumberFormat('en-IN').format(Number(item.price) || 0)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => dispatch(decrementItem(item.id))} style={{ padding: '0.35rem 0.75rem' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} style={{ padding: '0.35rem 0.75rem' }}>+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: '1rem', color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '0.35rem 0.75rem', borderRadius: 4 }}>Remove</button>
                </div>
              </div>
              <div style={{ fontWeight: 600 }}>₹ {new Intl.NumberFormat('en-IN').format((Number(item.price) || 0) * item.quantity)}</div>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem', height: 'fit-content' }}>
          <h3>Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span>Total Items</span>
            <strong>{totalQuantity}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span>Subtotal</span>
            <strong>₹ {new Intl.NumberFormat('en-IN').format(totalAmount)}</strong>
          </div>
          <button onClick={() => dispatch(clearCart())} style={{ width: '100%', marginTop: '1rem', background: '#dc3545', color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: 6, cursor: 'pointer' }}>Clear Cart</button>
          <button onClick={() => navigate('/checkout')} style={{ width: '100%', marginTop: '0.5rem', background: '#28a745', color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: 6, cursor: 'pointer' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

