import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import client from '../../lib/axios';

const ProductManagement = () => {
    const token = localStorage.getItem("authToken");

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await client.get('/admin/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);  // Set fetched products to local state
        } catch (err) {
            console.error('Error fetching products', err);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        uploadImageToCloudinary(file);
    };

    const uploadImageToCloudinary = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'product_photos');

        try {
            const response = await client.post('https://api.cloudinary.com/v1_1/dzeszxnfz/image/upload', formData);
            setImageUrl(response.data.secure_url);  // Get the URL of the uploaded image
            setLoading(false);
        } catch (err) {
            console.error('Image upload failed:', err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { ...product, image: imageUrl };

        try {
            if (editingProductId) {
                // Update existing product
                await client.put(`/admin/products/${editingProductId}`, newProduct, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingProductId(null);  // Reset editing state
            } else {
                // Create new product
                await client.post('/admin/products', newProduct, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            fetchProducts();  // Refetch products after adding/updating
            setProduct({ name: '', price: '', description: '', image: '' });
            setImageUrl('');
        } catch (err) {
            console.error('Error saving product', err);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await client.delete(`/admin/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts(); // Refetch products after deleting
        } catch (err) {
            console.error('Error deleting product', err);
        }
    };

    const handleEdit = (productId) => {
        const productToEdit = products.find((p) => p._id === productId);
        setProduct({
            name: productToEdit.name,
            price: productToEdit.price,
            description: productToEdit.description,
            image: productToEdit.image
        });
        setEditingProductId(productId);  // Set the product ID being edited
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

            {/* Product Form */}
            <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">{editingProductId ? 'Update Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    {/* Image Upload */}
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                    />
                    {loading && <p>Uploading Image...</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
                    >
                        {editingProductId ? 'Update Product' : 'Add Product'}
                    </button>
                </form>
            </div>

            {/* Product List */}
            <h3 className="text-lg font-semibold mb-2">Product List</h3>
            <ul className="space-y-2">
                {products.map((p) => (
                    <li key={p._id} className="flex justify-between items-center p-3 border rounded shadow-sm">
                        <div className="flex items-center">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-20 h-20 object-cover rounded-md mr-4"
                            />
                            <div>
                                <span className="font-semibold">{p.name} - ₹{p.price}</span>
                                <p className="text-sm text-gray-600">{p.description}</p>
                            </div>
                        </div>
                        <div>
                            {/* Edit Button */}
                            <button
                                onClick={() => handleEdit(p._id)}
                                className="text-blue-500 mr-2"
                            >
                                <FaEdit />
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(p._id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
