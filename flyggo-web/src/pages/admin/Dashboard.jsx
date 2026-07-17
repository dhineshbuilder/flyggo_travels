import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';

// REPLACE THIS WITH YOUR UPLOAD PRESET ONCE YOU HAVE IT
const CLOUDINARY_UPLOAD_PRESET = 'flyggo_images';
const CLOUDINARY_CLOUD_NAME = 'ac3bmvd4';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('enquiries');
  
  // Data state
  const [enquiries, setEnquiries] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageTitle, setImageTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Enquiries
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select an image first.');
    if (CLOUDINARY_UPLOAD_PRESET === 'YOUR_UPLOAD_PRESET_HERE') {
      return alert('You need to add your Cloudinary Upload Preset in Dashboard.jsx first!');
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      // Upload to Cloudinary
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.secure_url) {
        // Save URL to Firestore
        await addDoc(collection(db, 'gallery'), {
          url: data.secure_url,
          title: imageTitle,
          createdAt: serverTimestamp()
        });
        alert('Image uploaded successfully to the gallery!');
        setImageTitle('');
        setSelectedFile(null);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          <input 
            type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
          />
          <input 
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#ef4444', color: 'white', border: 'none' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('enquiries')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: activeTab === 'enquiries' ? 'var(--text-primary)' : '#e2e8f0', color: activeTab === 'enquiries' ? 'white' : 'black' }}
        >
          View Enquiries
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: activeTab === 'gallery' ? 'var(--text-primary)' : '#e2e8f0', color: activeTab === 'gallery' ? 'white' : 'black' }}
        >
          Manage Gallery
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
        {activeTab === 'enquiries' && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Enquiries ({enquiries.length})</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem' }}>Date</th>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Email</th>
                    <th style={{ padding: '1rem' }}>Destination</th>
                    <th style={{ padding: '1rem' }}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map(enq => (
                    <tr key={enq.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem' }}>{enq.createdAt?.toDate().toLocaleDateString() || 'Just now'}</td>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{enq.name}</td>
                      <td style={{ padding: '1rem' }}>{enq.email}</td>
                      <td style={{ padding: '1rem' }}>{enq.destination}</td>
                      <td style={{ padding: '1rem', maxWidth: '300px' }}>{enq.message}</td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No enquiries found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Upload New Image to Gallery</h3>
            <form onSubmit={handleImageUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image Title (Optional)</label>
                <input 
                  type="text" value={imageTitle} onChange={e => setImageTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                  placeholder="e.g., Sunset in Bali"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Image</label>
                <input 
                  type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: 'white' }}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={uploading || !selectedFile} style={{ opacity: uploading ? 0.7 : 1 }}>
                {uploading ? 'Uploading to Cloudinary...' : 'Upload Image'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
