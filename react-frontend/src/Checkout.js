import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Checkout() {
  const { items, totalAmount } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.address) {
      alert('Please fill all details');
      return;
    }
    if (!items || items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setPlacing(true);
    try {
      // Demo: normally call backend to create order
      console.log('Placing order', { customer: form, items, totalAmount });
      await new Promise((r) => setTimeout(r, 800));
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '1rem' }}>
      <h2>Checkout</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem' }}>
          <h3>Shipping Details</h3>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.5rem' }}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #ddd' }} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #ddd' }} />
            <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} rows={4} style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #ddd', resize: 'vertical' }} />
          </div>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem' }}>
          <h3>Order Summary</h3>
          <div style={{ maxHeight: 260, overflowY: 'auto', marginTop: '0.5rem' }}>
            {items && items.map((i) => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px dashed #eee' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{i.name}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>Qty: {i.quantity}</div>
                </div>
                <div style={{ fontWeight: 600 }}>₹ {new Intl.NumberFormat('en-IN').format((Number(i.price) || 0) * i.quantity)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span>Subtotal</span>
            <strong>₹ {new Intl.NumberFormat('en-IN').format(totalAmount)}</strong>
          </div>
          <button disabled={placing} onClick={handlePlaceOrder} style={{ width: '100%', marginTop: '1rem', background: '#28a745', color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: 6, cursor: 'pointer' }}>
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

