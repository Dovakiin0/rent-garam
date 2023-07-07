import {
  TextInput,
  FileInput,
  Text,
  NumberInput,
  Select,
  Modal,
} from "@mantine/core";
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
import { useEffect } from "react";
import LeafletMap from "./LeafletMap";

function ListingModal({ open, setOpen, listing }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    washroom: "",
    bedroom: "",
    address: "",
    type: "",
  });

  useEffect(() => {
    setForm({ ...listing });
    setCenter({
      lat: parseFloat(listing?.latitude),
      lng: parseFloat(listing?.longitude),
    });
    setMarker({
      lat: parseFloat(listing?.latitude),
      lng: parseFloat(listing?.longitude),
    });
  }, [listing]);

  const [center, setCenter] = useState({
    lat: 27.708317,
    lng: 85.3205817,
  });

  const [marker, setMarker] = useState(null);

  const onMarkerChange = (pos) => {
    setMarker(pos);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    if (image) {
      formData.append("image", image);
    }
    formData.append("owner_id", auth?.currentUser?.id);
    try {
      const { data, status } = await axios.put(
        "http://localhost:3000/api/v1/estate/" + form?.id,
        formData,
        { onUploadProgress: setLoading(true) }
      );
      if (status === 200) {
        setLoading(false);
        SuccessNotification({
          message: "Your listing has been Updated successfully",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      ErrorNotification({ message: "Something went wrong" });
      console.log(err);
    }
  };

  const onUpdateSold = async () => {
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/estate/update/" + listing?.id
      );
      if (status === 200) {
        SuccessNotification({
          message: "Your listing has been marked as sold",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      ErrorNotification({ message: "Something went wrong" });
      console.log(err);
    }
  };

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={"xl"}>
      <div className="bg-white shadow-md rounded-md p-5">
        <div className="flex justify-between items-center">
          <p className="text-3xl">Edit Property Listing</p>
          {!listing?.sold ? (
            <button
              className="bg-primary p-2 rounded-md text-light"
              onClick={() => onUpdateSold()}
            >
              Mark as Sold
            </button>
          ) : (
            <p className="text-primary text-2xl">Sold</p>
          )}
        </div>
        <form
          className="flex flex-col space-y-10 mt-10"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Name"
            required
            value={form?.name}
            placeholder="Enter name of property"
            icon={<FaHome color="black" />}
            onChange={handleChange}
            name="name"
          />
          <TextInput
            label="Address"
            required
            value={form?.address}
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
              placeholder={form?.image_url}
              name="image"
              onChange={(file) => setImage(file)}
            />
            <Select
              className="w-full"
              required
              name="type"
              label="Select type of property"
              value={form?.type}
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
              value={form?.description}
              onChange={(val) => setForm({ ...form, description: val })}
              name="description"
            />
          </div>
          <div className="flex space-x-5">
            <NumberInput
              value={form?.bedroom}
              required
              className="w-full"
              label="Number of Bedrooms"
              placeholder="Enter nomber of bedrooms"
              icon={<FaBed color="black" />}
              onChange={(val) => setForm({ ...form, bedroom: val })}
              name="bedroom"
            />
            <NumberInput
              value={form?.washroom}
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
          <LeafletMap cb={onMarkerChange} mode={"CREATE"} moveTo={center} />
          <NumberInput
            value={form?.price}
            label="Price"
            placeholder="Enter price of property"
            name="price"
            required
            onChange={(val) => setForm({ ...form, price: val })}
            icon={<FaRupeeSign color="black" />}
          />
          <button className="h-10 bg-primary text-light w-full" type="submit">
            Edit
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ListingModal;
