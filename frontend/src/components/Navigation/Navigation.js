import React, { useState } from 'react';
import { Navbar, Button, Modal, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navigation.scss'; // Add your styling if needed

function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handlePricingClick = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
  
  const handleFaceSwapClick = () => {
    navigate(`/form`);
  };

  const handleObjectRemovalClick = () => {
    navigate(`/form/object_removal`);
  };


  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Navbar.Brand onClick={handleLogoClick} className="navbar-brand-custom">
          SwiftPhotoAI
        </Navbar.Brand>
        <Navbar.Toggle />

        {/* Right-aligned Sign Up button */}
        <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <NavDropdown title="Tools" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleFaceSwapClick}>
                  {/* <img src="path/to/face-swap-icon.png" alt="Face Swap" style={{ width: '20px', marginRight: '10px' }} /> */}
                  Face Swap
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleObjectRemovalClick}>
                  {/* <img src="path/to/object-removal-icon.png" alt="Object Removal" style={{ width: '20px', marginRight: '10px' }} /> */}
                  Object Removal
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          <Button
            variant="outline-primary"
            className="btn-custom"
            onClick={handlePricingClick}
          >
            Pricing
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal for Free Access message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>SwiftPhotoAI is currently free to use!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Subscriptions will be introduced soon, but for now, feel free to explore and create amazing photos!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navigation;
