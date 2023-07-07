import React from "react";
import { Table, ActionIcon, Popover, Text } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SuccessNotification } from "./Notifications";
import axios from "axios";

function Listings({ listing, setSelected, setOpen, setRefresher }) {
  const onDelete = async (l) => {
    try {
      const { status } = await axios.delete(
        "http://localhost:3000/api/v1/estate/" + l.id
      );
      if (status === 200) {
        SuccessNotification({ message: "Listing deleted successfully" });
        setRefresher(Math.random());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Address</th>
            <th>Type</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Phone</th>
            <th>By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listing.map((l, i) => (
            <tr key={i}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.address}</td>
              <td>{l.type}</td>
              <td>{l.bedroom}</td>
              <td>{l.washroom}</td>
              <td>{l.phone_no}</td>
              <td>{l.fullname}</td>
              <td className="flex items-center">
                <ActionIcon
                  onClick={(e) => {
                    setSelected(l);
                    setOpen(true);
                  }}
                >
                  <FaEdit color="blue" />
                </ActionIcon>
                |
                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ActionIcon>
                      <FaTrash color="red" />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text size="sm">
                      Are you sure you wish to delete this listing?
                    </Text>
                    <button
                      className="bg-primary p-2 rounded-md text-light"
                      onClick={() => onDelete(l)}
                    >
                      Confirm
                    </button>
                  </Popover.Dropdown>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Listings;
