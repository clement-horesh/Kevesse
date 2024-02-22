import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"

const CampaignForm = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image for the campaign.");
      return;
    }

    // First, upload the image to Firebase Storage
    const storageRef = ref(storage, `campaign-images/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        // Here you can also implement progress bar functionality
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Error uploading image: ', error);
        alert('Error uploading image. Please try again.');
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Image is uploaded successfully and now we have the download URL
          const newCampaign = {
            Title: title,
            Description: description,
            Target: Number(target),
            AmountCollected: 0,
            CampaignStatus: 1,
            Image: downloadURL, // Store the download URL in the campaign object
          };

          try {
            // Now, add the new campaign to Firestore
            await addDoc(collection(db, "Campaign"), newCampaign);
            alert("Campaign added successfully!");

            // Clear all fields including image
            setTitle("");
            setDescription("");
            setTarget("");
            setImage(null);
            setUploadProgress(0);
          } catch (error) {
            console.error("Error adding campaign: ", error);
            alert("Error adding campaign. Please try again.");
          }
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="text-white mt-[100px]">
      <h2>Create New Campaign</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="target">Target:</label>
        <input
          type="number"
          id="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="imageUpload">Campaign Image:</label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          required
        />
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      </div>
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CampaignForm;
