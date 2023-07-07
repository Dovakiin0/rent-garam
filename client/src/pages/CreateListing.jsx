import { TextInput, FileInput, Text, NumberInput, Select } from "@mantine/core";
import React, { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import {
  FaBath,
  FaBed,
  FaAddressBook,
  FaImage,
  FaHome,
  FaRupeeSign,
} from "react-icons/fa";
import {
  ErrorNotification,
  SuccessNotification,
} from "../components/Notifications";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeafletMap from "../components/LeafletMap";

function CreateListing() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [marker, setMarker] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    washroom: "",
    bedroom: "",
    address: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onMarkerChange = (pos) => {
    setMarker(pos);
    console.log(pos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("washroom", form.washroom);
    formData.append("bedroom", form.bedroom);
    formData.append("address", form.address);
    formData.append("latitude", marker.lat);
    formData.append("longitude", marker.lng);
    formData.append("type", form.type);
    formData.append("image", image);
    formData.append("owner_id", auth?.currentUser?.id);
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/estate/add",
        formData
      );
      if (status === 201) {
        SuccessNotification({
          message: "Your listing has been created successfully",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      ErrorNotification({ message: "Something went wrong" });
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-5">
      <p className="text-3xl">Create Estate Listing</p>
      <form className="flex flex-col space-y-10 mt-10" onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          required
          placeholder="Enter name of property"
          icon={<FaHome color="black" />}
          onChange={handleChange}
          name="name"
        />
        <TextInput
          label="Address"
          required
          placeholder="Enter address of property"
          icon={<FaAddressBook color="black" />}
          onChange={handleChange}
          name="address"
        />
        <div className="flex space-x-5">
          <FileInput
            className="w-full"
            icon={<FaImage color="black" />}
            required
            label="Upload Clear Image"
            placeholder="Select Image of property"
            name="image"
            onChange={(file) => setImage(file)}
          />
          <Select
            className="w-full"
            required
            name="type"
            label="Select type of property"
            placeholder="Pick one"
            data={[
              { value: "For Sale", label: "For Sale" },
              { value: "For Rent", label: "For Rent" },
            ]}
            onChange={(val) => setForm({ ...form, type: val })}
          />
        </div>
        <div>
          <Text weight={"bold"} size="sm">
            Description
          </Text>
          <RichTextEditor
            controls={[
              ["bold", "italic", "h1", "h2", "underline"],
              ["orderedList", "unorderedList"],
            ]}
            value={form.description}
            onChange={(val) => setForm({ ...form, description: val })}
            name="description"
          />
        </div>
        <div className="flex space-x-5">
          <NumberInput
            required
            className="w-full"
            label="Number of Bedrooms"
            placeholder="Enter nomber of bedrooms"
            icon={<FaBed color="black" />}
            onChange={(val) => setForm({ ...form, bedroom: val })}
            name="bedroom"
          />
          <NumberInput
            required
            className="w-full"
            label="Number of Bathrooms"
            placeholder="Enter nomber of bathrooms"
            icon={<FaBath color="black" />}
            onChange={(val) => setForm({ ...form, washroom: val })}
            name="washroom"
          />
        </div>

        <Text weight={"bold"} size="sm">
          Place a Marker to the location of the property
        </Text>
        <LeafletMap cb={onMarkerChange} mode={"CREATE"} />

        <NumberInput
          label="Price"
          placeholder="Enter price of property"
          name="price"
          required
          onChange={(val) => setForm({ ...form, price: val })}
          icon={<FaRupeeSign color="black" />}
        />
        <button className="h-10 bg-primary text-light w-full" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
// apiKey={"AIzaSyDbZyb_p4Z_cPZHkqAy97S6jahjFhfbp80"}
