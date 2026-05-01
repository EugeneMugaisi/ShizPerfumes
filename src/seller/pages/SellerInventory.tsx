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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [productImage, setProductImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from Firestore
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: String(doc.id),  // 👈 force string conversion
        })) as Product[];
      setProducts(list);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setSuccessMessage(`❌ Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

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
      name: product.name || "",
      price: String(product.price || 0),
      description: product.description || "",
      stock: String(product.stock || 0),
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

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (isNaN(price) || isNaN(stock)) {
      alert("Price and Stock must be valid numbers.");
      return;
    }

    setSaving(true);
    try {
      const productData = {
          name: (form.name || "").trim(),
          price: price,
          description: (form.description || "").trim(),
          stock: stock,
          category: (form.category || "").trim(),
          image: productImage,
          scentType: (form.scentType || "").trim(),
          fragranceFamily: (form.fragranceFamily || "").trim(),
          onSale: editingProduct ? (editingProduct.onSale ?? false) : false,
          rating: editingProduct ? (editingProduct.rating ?? 5) : 5,
        };

      if (editingProduct) {
      await updateDoc(doc(db, "products", String(editingProduct.id)), productData);  // 👈 String()
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

    } catch (error: any) {
      console.error("Error saving product:", error);
      setSuccessMessage(`❌ Error: ${error.message || "Failed to save product."}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
  console.log("Deleting product with ID:", product.id, typeof product.id);
  try {
    await deleteDoc(doc(db, "products", String(product.id)));  // 👈 String()
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
            {searchQuery 
              ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${searchQuery}"`
              : `${products.length} product${products.length !== 1 ? "s" : ""} in catalog`
            }
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

      {/* Search Bar */}
      <div style={{ 
        margin: "1.25rem 0", 
        display: "flex", 
        gap: "0.5rem",
        backgroundColor: "#f9fafb",
        padding: "0.75rem",
        borderRadius: "10px",
        border: "1px solid #eee"
      }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: "0.75rem", color: "#888", fontSize: "0.9rem" }}>🔍</span>
          <input
            type="text"
            placeholder="Search products by name, category or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              width: "100%",
              padding: "0.6rem 0.75rem 0.6rem 2.2rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "0.88rem",
              outline: "none"
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          style={{
            padding: "0.6rem 1.25rem",
            backgroundColor: "#ffffff",
            color: "#374151",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.88rem",
            fontWeight: 500
          }}
        >
          Search
        </button>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSearchQuery("");
            }}
            style={{
              padding: "0.6rem 1rem",
              backgroundColor: "transparent",
              color: "#6b7280",
              border: "none",
              cursor: "pointer",
              fontSize: "0.88rem",
              textDecoration: "underline"
            }}
          >
            Clear
          </button>
        )}
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
            {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
            {searchQuery ? (
              <>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No results found for "{searchQuery}"</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSearchQuery(""); }}
                  style={{ color: "#1a1a1a", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}
                >
                  Clear search and show all products
                </button>
              </>
            ) : (
              <p>No products yet. Click "Add Product" to get started.</p>
            )}
          </div>
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