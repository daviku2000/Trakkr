import { useState, useEffect } from 'react';
import { getProducts, createProduct, Product, ProductRequest } from '../api/products';



export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductRequest>({
    name: '', sku: '', description: '', price: 0, quantity: 0
  });

  useEffect(() => {
  getProducts().then(res => {
    console.log(res.data); // add this
    setProducts(res.data);
  });
}, []);

  useEffect(() => {
    getProducts().then(res => {
    console.log(res.data); // add this
    setProducts(res.data);
  });
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(form);
    const res = await getProducts();
    setProducts(res.data);
    setForm({ name: '', sku: '', description: '', price: 0, quantity: 0 });
  };

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="SKU" value={form.sku}
          onChange={e => setForm({...form, sku: e.target.value})} />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />
        <input placeholder="Price" type="number" value={form.price}
          onChange={e => setForm({...form, price: parseFloat(e.target.value)})} />
        <input placeholder="Quantity" type="number" value={form.quantity}
          onChange={e => setForm({...form, quantity: parseInt(e.target.value)})} />
        <button type="submit">Add Product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}