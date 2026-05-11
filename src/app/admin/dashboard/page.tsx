"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  Package, Plus, Trash2, LogOut, LayoutGrid, Tag, 
  ShoppingBag, Link as LinkIcon, Image as ImageIcon, AlignLeft, ExternalLink, Edit3, XCircle
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  
  // Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Form Submit: Add or Update Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !affiliateUrl) return;
    
    setLoading(true);
    try {
      if (isEditing && currentProductId) {
        // UPDATE Logic
        const productRef = doc(db, "products", currentProductId);
        await updateDoc(productRef, {
          name, description, price, imageUrl, affiliateUrl
        });
        alert("Product updated successfully!");
      } else {
        // ADD Logic
        await addDoc(collection(db, "products"), { 
          name, description, price, imageUrl, affiliateUrl 
        });
      }
      
      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit Button Trigger
  const handleEditClick = (product: Product) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setAffiliateUrl(product.affiliateUrl);
    
    // Scroll to top to show form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setAffiliateUrl("");
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm("Delete this product permanently?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-12 px-4 md:px-8 font-sans relative z-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00a63e]/5 to-transparent -z-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#00a63e]/10 text-[#00a63e] rounded-2xl flex items-center justify-center shadow-inner"><Package size={28} /></div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Affiliate Hub</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Manage listings & Amazon links.</p>
              </div>
            </div>
            <button onClick={handleLogout} className="mt-4 sm:mb-0 flex items-center gap-2 text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 px-5 py-3 rounded-xl transition-all border border-red-100 shadow-sm"><LogOut size={18} /> Logout</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- FORM SECTION --- */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-fit sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={18} className="text-slate-400" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {isEditing ? "Update Product" : "Add Affiliate Product"}
                  </h2>
                </div>
                {isEditing && (
                  <button onClick={resetForm} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs Same as before... */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Product Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00a63e] font-medium text-slate-800" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Price *</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00a63e] font-medium text-slate-800" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00a63e] font-medium text-slate-800 min-h-[80px]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Image URL</label>
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00a63e] font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Affiliate Link *</label>
                  <input type="url" value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00a63e] font-medium text-slate-800" required />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full mt-4 ${isEditing ? 'bg-indigo-600' : 'bg-[#00a63e]'} text-white py-4 rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : (isEditing ? <><Edit3 size={20} /> Update Now</> : <><Plus size={20} /> Publish Product</>)}
                </button>
              </form>
            </div>

            {/* --- LIST SECTION --- */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Live Products ({products.length})</h2>
              
              <div className="space-y-4">
                {products.map((item) => (
                  <div key={item.id} className="group flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border overflow-hidden">
                        <img src={item.imageUrl || ""} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-800 text-sm truncate">{item.name}</h3>
                        <p className="text-xs font-black text-[#00a63e]">{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button onClick={() => handleEditClick(item)} className="flex-1 sm:flex-none p-2.5 text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center justify-center gap-2 sm:gap-0">
                        <Edit3 size={18} /> <span className="sm:hidden font-bold text-xs">Edit</span>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="flex-1 sm:flex-none p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2 sm:gap-0">
                        <Trash2 size={18} /> <span className="sm:hidden font-bold text-xs">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}