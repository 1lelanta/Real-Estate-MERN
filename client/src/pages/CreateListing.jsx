import React, { useState } from "react";
import { supabase } from "../supabase.js";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type: 'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  })
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Upload image to Supabase
  const storeImage = async (file) => {
    try {
      const filePath = `uploads/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("image")
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("image")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      throw err;
    }
  };

  // Handle upload
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one image.");
    if (files.length > 6)
      return alert("You can only upload up to 6 images.");

    setUploading(true);
    try {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      const imageUrls = await Promise.all(promises);
      setUploadedImages((prev) => [...prev, ...imageUrls]);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Handle delete
  const handleDeleteImage = async (url) => {
    const path = url.split("/storage/v1/object/public/image/")[1];
    try {
      const { error } = await supabase.storage.from("image").remove([path]);
      if (error) throw error;
      setUploadedImages((prev) => prev.filter((img) => img !== url));
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete image.");
    }
  };

  const handleChange = (e)=>{
    if(e.target.id ==='sale' || e.target.id==='rent'){
        setFormData({
            ...formData,
            type:e.target.id
        })
    }
    if(e.target.id==='furnished'||e.target.id==='offer'||e.target.id==='parking'){
        setFormData({
            ...formData,
            [e.target.id]:e.target.checked
        })
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto gap-4">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          {/* ✅ Your checkboxes restored */}
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5"
              onChange={handleChange} checked={formData.type==='sale'} />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" 
              onChange={handleChange}
              checked={formData.type==='rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"
              onChange={handleChange}
              checked={formData.parking} />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" 
              onChange={handleChange}
              checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"
              onChange={handleChange} 
              checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>

          {/* ✅Numeric fields */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-500 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Bed</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-500 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bath</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                required
                className="p-3 border border-gray-500 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                required
                className="p-3 border border-gray-500 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              the first image will be the cover (max 6)
            </span>
          </p>

          {/* File input */}
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/*  Uploaded Images Display */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {uploadedImages.map((url, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`uploaded-${index}`}
                    className="h-40 w-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(url)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase font-bold hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
