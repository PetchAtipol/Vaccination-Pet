import React, { useState, useEffect } from "react";
import axios from "axios";

const OwnersCrud = () => {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    Owner_Name: "",
    Address: "",
    Phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch owners
  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get("http://localhost:3002/owners");
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add new owner
  const addOwner = async () => {
    try {
      await axios.post("http://localhost:3002/owners", null, {
        params: form,
      });
      fetchOwners();
      setForm({ Owner_Name: "", Address: "", Phone: "" });
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  };

  // Update owner
  const updateOwner = async () => {
    try {
      await axios.put(`http://localhost:3002/owners/${editingId}`, form);
      fetchOwners();
      setForm({ Owner_Name: "", Address: "", Phone: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating owner:", error);
    }
  };

  // Delete owner
  const deleteOwner = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/owners/${id}`);
      fetchOwners();
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  // Start editing
  const startEditing = (owner) => {
    setEditingId(owner.Owner_ID);
    setForm({
      Owner_Name: owner.Owner_Name,
      Address: owner.Address,
      Phone: owner.Phone,
    });
  };

  return (
    <div>
      <h1>Owner CRUD</h1>
      <div>
        <input
          type="text"
          name="Owner_Name"
          placeholder="Owner Name"
          value={form.Owner_Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={form.Address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Phone"
          placeholder="Phone"
          value={form.Phone}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={updateOwner}>Update Owner</button>
        ) : (
          <button onClick={addOwner}>Add Owner</button>
        )}
      </div>
      <h2>Owners List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.Owner_ID}>
              <td>{owner.Owner_ID}</td>
              <td>{owner.Owner_Name}</td>
              <td>{owner.Address}</td>
              <td>{owner.Phone}</td>
              <td>
                <button onClick={() => startEditing(owner)}>Edit</button>
                <button onClick={() => deleteOwner(owner.Owner_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnersCrud;
