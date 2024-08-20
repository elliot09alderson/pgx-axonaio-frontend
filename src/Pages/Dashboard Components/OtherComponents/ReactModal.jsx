"use client";

import { Button, Modal } from "flowbite-react";

export default function ReactModal({ openModal, setOpenModal, children }) {
  return (
    <>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
