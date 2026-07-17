import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

const CLOUDINARY_UPLOAD_PRESET = 'flyggo_images';
const CLOUDINARY_CLOUD_NAME = 'ac3bmvd4';

const GalleryManager = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    setUploading(true);
    setStatus('Uploading to Cloudinary...');

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.secure_url) {
        setStatus('Saving to Database...');
        // 2. Save URL to Firebase
        await addDoc(collection(db, 'gallery'), {
          title: title,
          url: data.secure_url,
          createdAt: serverTimestamp()
        });
        setStatus('Success! Image added to gallery.');
        setTitle('');
        setFile(null);
        document.getElementById('fileUpload').value = '';
      } else {
        setStatus('Cloudinary Upload Failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('An error occurred.');
    }
    setUploading(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gallery Manager</h1>
        <p className="text-slate-500 text-sm">Upload new high-quality images to the public travel gallery.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Image Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="e.g., Paris at Twilight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Image</label>
            <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                  <label htmlFor="fileUpload" className="relative cursor-pointer rounded-md font-semibold text-sky-600 focus-within:outline-none hover:text-sky-500">
                    <span>Upload a file</span>
                    <input 
                      id="fileUpload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-slate-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
                {file && <p className="mt-4 text-sm font-bold text-emerald-600 flex items-center justify-center gap-2"><ImageIcon size={16}/> {file.name}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="submit" 
              disabled={uploading}
              className="px-8 py-3 rounded-xl text-white font-medium shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(to right, #0284c7, #0369a1)' }}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {status && <span className={`text-sm font-semibold ${status.includes('Success') ? 'text-emerald-600' : 'text-slate-600'}`}>{status}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryManager;
