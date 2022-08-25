import React from "react";
import { Table } from "@mantine/core";

function Listings({ listing }) {
  return (
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listing.map((l, i) => (
          <tr>
            <td>{l.id}</td>
            <td>{l.name}</td>
            <td>{l.address}</td>
            <td>{l.type}</td>
            <td>{l.bedroom}</td>
            <td>{l.washroom}</td>
            <td>{l.phone_no}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Listings;
