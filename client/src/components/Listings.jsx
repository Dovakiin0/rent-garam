import React from "react";
import { Table } from "@mantine/core";

function Listings() {
  return (
    <Table>
      <thead>
        <tr>
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
        <tr>
          <td>1</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Listings;
