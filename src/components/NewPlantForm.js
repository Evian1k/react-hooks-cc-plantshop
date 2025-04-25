import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price)
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then(response => response.json())
      .then(addedPlant => {
        onAddPlant({ ...addedPlant, soldOut: false });
        setFormData({ name: "", image: "", price: "" });
        setImageError(false);
      })
      .catch(error => console.error("Error adding plant:", error));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Plant</button>
        {formData.image && (
          <div className="image-preview">
            {imageError ? (
              <p>Invalid image URL</p>
            ) : (
              <img
                src={formData.image}
                alt="Plant preview"
                onError={handleImageError}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default NewPlantForm;