// src/seller/pages/SellerInventory.tsx
import { useEffect, useState } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp
} from "firebase/firestore";
import { db } from "../../firebase";
import ImageUploader from "../components/ImageUploader";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
  scentType: string;
  fragranceFamily: string;
  onSale: boolean;
  rating: number;
}

const emptyForm = {
  name: "",
  price: "",
  description: "",
  stock: "",
  category: "",
  image: "",
  scentType: "",
  fragranceFamily: "",
};

const SellerInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [productImage, setProductImage] = useState("");

  // Fetch products from Firestore
  const fetchProducts = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "products"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setProductImage("");
    setShowForm(true);
    setSuccessMessage("");
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      stock: String(product.stock),
      category: product.category || "",
      image: product.image || "",
      scentType: product.scentType || "",
      fragranceFamily: product.fragranceFamily || "",
    });
    setProductImage(product.image || "");
    setShowForm(true);
    setSuccessMessage("");
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.stock) {
      alert("Please fill in at least the name, price and stock fields.");
      return;
    }

    setSaving(true);
    try {
      const productData = {
          name: form.name.trim(),
          price: Number(form.price),
          description: form.description.trim(),
          stock: Number(form.stock),
          category: form.category.trim(),
          image: productImage,
          scentType: form.scentType.trim(),
          fragranceFamily: form.fragranceFamily.trim(),
          onSale: false,
          rating: 5,
        };

      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, "products", editingProduct.id), productData);
        setSuccessMessage(`✅ "${form.name}" updated successfully!`);
      } else {
        // Add new product
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp(),
        });
        setSuccessMessage(`✅ "${form.name}" added to catalog!`);
      }

      await fetchProducts(); // refresh the list
      handleCloseForm();

    } catch (error) {
      console.error("Error saving product:", error);
      setSuccessMessage("❌ Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteDoc(doc(db, "products", product.id));
      setSuccessMessage(`✅ "${product.name}" removed from catalog.`);
      setDeleteConfirmId(null);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setSuccessMessage("❌ Failed to delete product. Please try again.");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading inventory...</p>;

  return (
    <div style={{ padding: "2rem" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <div>
          <h2 style={{ margin: 0 }}>Inventory</h2>
          <p style={{ color: "#888", margin: "0.25rem 0 0", fontSize: "0.88rem" }}>
            {products.length} product{products.length !== 1 ? "s" : ""} in catalog
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            padding: "0.65rem 1.25rem", backgroundColor: "#1a1a1a",
            color: "white", border: "none", borderRadius: "8px",
            cursor: "pointer", fontSize: "0.9rem", fontWeight: 600,
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={{
          padding: "0.85rem 1rem", borderRadius: "8px", margin: "1rem 0",
          backgroundColor: successMessage.startsWith("✅") ? "#f0fdf4" : "#fef2f2",
          color: successMessage.startsWith("✅") ? "#16a34a" : "#ef4444",
          fontSize: "0.9rem",
        }}>
          {successMessage}
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <div style={{
          backgroundColor: "white", borderRadius: "12px", padding: "1.75rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "2rem",
          border: "1px solid #eee",
        }}>
          <h3 style={{ margin: "0 0 1.5rem", fontSize: "1rem" }}>
            {editingProduct ? `Editing: ${editingProduct.name}` : "Add New Product"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <FormField label="Product Name *" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Midnight Rose" />
            <FormField label="Price (KES) *" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 2500" type="number" />
            <FormField label="Stock Quantity *" name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 20" type="number" />
            <FormField label="Category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Floral, Oud, Fresh" />
            <div>
              <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 500 }}>
                Scent Type
              </label>
              <select
                name="scentType"
                value={form.scentType}
                onChange={handleChange}
                style={{
                  width: "100%", padding: "0.65rem", border: "1px solid #ddd",
                  borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box",
                  backgroundColor: "white", cursor: "pointer",
                }}
              >
                <option value="">-- Select Scent Type --</option>
                <option value="Masculine">Masculine</option>
                <option value="Feminine">Feminine</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <ImageUploader
                currentImage={productImage}
                onUploadComplete={(url) => setProductImage(url)}
              />
            </div>
            <FormField label="Fragrance Family" name="fragranceFamily" value={form.fragranceFamily} onChange={handleChange} placeholder="e.g. Floral, Woody, Aromatic" />
          </div>

          {/* Description - full width */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 500 }}>
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the fragrance..."
              rows={3}
              style={{
                width: "100%", padding: "0.65rem", border: "1px solid #ddd",
                borderRadius: "8px", fontSize: "0.9rem",
                boxSizing: "border-box", resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "0.65rem 1.5rem", backgroundColor: "#1a1a1a",
                color: "white", border: "none", borderRadius: "8px",
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: "0.9rem", opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : editingProduct ? "Save Changes" : "Add Product"}
            </button>
            <button
              onClick={handleCloseForm}
              style={{
                padding: "0.65rem 1.5rem", backgroundColor: "white",
                color: "#555", border: "1px solid #ddd", borderRadius: "8px",
                cursor: "pointer", fontSize: "0.9rem",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                <th key={h} style={{
                  padding: "0.85rem 1rem", textAlign: "left",
                  color: "#444", fontWeight: 600, borderBottom: "1px solid #eee",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={{ borderBottom: "1px solid #f5f5f5" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td style={{ padding: "0.85rem 1rem" }}>
                  <div style={{ fontWeight: 500 }}>{product.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#aaa", marginTop: "0.2rem" }}>
                    {product.description?.slice(0, 50)}{product.description?.length > 50 ? "..." : ""}
                  </div>
                </td>
                <td style={{ padding: "0.85rem 1rem", color: "#666", textTransform: "capitalize" }}>
                  {product.category || "—"}
                </td>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                  KES {product.price?.toLocaleString()}
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  <span style={{
                    padding: "0.2rem 0.65rem", borderRadius: "999px", fontSize: "0.8rem",
                    backgroundColor: product.stock === 0 ? "#fef2f2" : product.stock < 5 ? "#fff8e1" : "#f0fdf4",
                    color: product.stock === 0 ? "#ef4444" : product.stock < 5 ? "#f59e0b" : "#16a34a",
                    fontWeight: 600,
                  }}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                  </span>
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  {deleteConfirmId === product.id ? (
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#ef4444" }}>Sure?</span>
                      <button
                        onClick={() => handleDelete(product)}
                        style={{
                          padding: "0.3rem 0.75rem", backgroundColor: "#ef4444",
                          color: "white", border: "none", borderRadius: "6px",
                          cursor: "pointer", fontSize: "0.8rem",
                        }}
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        style={{
                          padding: "0.3rem 0.75rem", backgroundColor: "white",
                          color: "#555", border: "1px solid #ddd", borderRadius: "6px",
                          cursor: "pointer", fontSize: "0.8rem",
                        }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleOpenEdit(product)}
                        style={{
                          padding: "0.35rem 0.85rem", backgroundColor: "white",
                          color: "#333", border: "1px solid #ddd", borderRadius: "6px",
                          cursor: "pointer", fontSize: "0.82rem",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        style={{
                          padding: "0.35rem 0.85rem", backgroundColor: "white",
                          color: "#ef4444", border: "1px solid #ef4444", borderRadius: "6px",
                          cursor: "pointer", fontSize: "0.82rem",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
            No products yet. Click "Add Product" to get started.
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable form field component
const FormField = ({
  label, name, value, onChange, placeholder, type = "text"
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string;
}) => (
  <div>
    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 500 }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "0.65rem", border: "1px solid #ddd",
        borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box",
      }}
    />
  </div>
);

export default SellerInventory;