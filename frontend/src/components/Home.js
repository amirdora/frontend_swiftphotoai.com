import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

function Home() {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate(`/form`);
  };

  const handleFaceSwapClick = () => {
    navigate(`/form/faceswap`);
  };

  const handleObjectRemovalClick = () => {
    navigate(`/form/object_removal`);
  };

  const currentYear = new Date().getFullYear(); // Get current year for the footer

  return (
    <>

      <Container>

        {/* Face Swap Section */}
        <section className="face-swap-section my-5 text-center">
          <Row className="align-items-center bg-light rounded shadow-sm">
            <Col md={6} className="text-center p-4">
              <img
                src="https://art-global.yimeta.ai/aifaceswap/image/media/ai-face-swap-online-2-480x480.webp" // Placeholder image, replace with actual if available
                alt="Face Swap Feature"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6} className="p-4">
              <h2 className="fw-semibold">Swap Faces with Ease</h2>
              <p className="text-muted">
                Easily swap faces in any image for fun or professional use. Our AI-driven tool seamlessly integrates
                faces with natural blending, providing high-quality results with just a few clicks.
              </p>
              <Button variant="outline-primary" className="btn-custom"  onClick={handleTryNowClick}>
                Try Face Swap
              </Button>
            </Col>
          </Row>
        </section>

        {/* Remove Unwanted Objects Instantly Section */}
        <section className="remove-objects-section my-5 text-center">
          <Row className="align-items-center bg-light rounded shadow-sm">
            <Col md={6} className="p-4">
              <h2 className="fw-semibold">Remove Unwanted Objects Instantly</h2>
              <p className="text-muted">
                Manually editing or cropping images yourself can waste valuable time, and often the quality suffers.
                Our free AI Object Remover automates the process to remove objects from photos instantly in just a few
                clicks! Whether you need to cleanup pictures for personal or professional use, our tool ensures seamless
                results without compromising quality.
              </p>
              <Button variant="outline-primary" className="btn-custom" onClick={handleObjectRemovalClick}>
                Remove Object Now
              </Button>
            </Col>
            <Col md={6} className="text-center p-4">
              <img
                src="https://strapi-wasabi-bucket.apyhi.com/Final_Focus_on_What_Matters_bc04c6b1af.webp"
                alt="Remove Unwanted Objects Instantly"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </section>
      </Container>


      <footer className="text-center mt-5 custom-footer">
        <p>© {currentYear} Magic Studio. All rights reserved. | <a href="/privacy_policy">Privacy Policy</a></p>
      </footer>
    </>
  );
}

export default Home;
