import React from "react";
import { Modal } from "@mantine/core";

function ListingModal({ open, setOpen, mode, listing }) {
  return (
    <Modal opened={open} onClose={() => setOpen(false)} title="Listing Details">
      Hello
    </Modal>
  );
}

export default ListingModal;
