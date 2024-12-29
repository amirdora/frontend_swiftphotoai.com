import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  const email = "support@swiftphotoai.com";

  return (
    <Container className="py-5">
      <Card className="mb-5 border-0">
        <Card.Body>
          <h1 className="display-5 text-center mb-4">Privacy Policy</h1>
          <p className="text-muted text-center">Effective Date: December 29, 2024</p>
        </Card.Body>
      </Card>

      {/* Introduction and Scope */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Introduction & Scope</h2>
          <p>
            At SwiftPhotoAI, we prioritize the privacy of our users. This Privacy Policy
            explains how we collect, use, store, and protect your data when you use our
            applications and services: <strong>FaceMax</strong> and{" "}
            <strong>SwiftPhoto Ai Studio</strong>. By using these services, you agree to
            the terms of this policy.
          </p>
          <p>
            <strong>FaceMax:</strong> Helps users enhance attractiveness by capturing a
            selfie and utilizing advanced AI tools to provide personalized analysis and
            advice on various aspects such as facial features, skin quality, hair, and
            more. Users can track their overall attractiveness score, receive detailed
            trait ratings (Face, Masculinity, Skin, Jawline, Hair, and Eyes), and explore
            in-depth breakdowns with improvement suggestions.
          </p>
          <p>
            <strong>SwiftPhoto Ai Studio:</strong> Combines advanced face-swapping
            technology with powerful image editing tools. Whether you’re looking to swap
            faces, edit photos like a pro, or have fun with creative filters, SwiftPhoto
            Ai Studio provides the ultimate creative playground.
          </p>
        </Card.Body>
      </Card>

      {/* What Face Data We Collect */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">What Face Data We Collect</h2>
          <p>
            To provide our AI-powered features in both <strong>FaceMax</strong> and{" "}
            <strong>SwiftPhoto Ai Studio</strong>, we collect specific types of face
            data, including:
          </p>
          <ul>
            <li>
              <strong>Facial landmarks and geometry:</strong> Points on the face
              used to identify, analyze, or swap facial features.
            </li>
            <li>
              <strong>Facial feature descriptors:</strong> Encoded representations
              of certain facial attributes needed to perform edits (e.g., face
              swapping, attractiveness scoring, or enhancement analysis).
            </li>
            <li>
              <strong>Processing metadata:</strong> Timestamps, image resolution,
              and other technical details necessary to deliver your edited images
              or analyses.
            </li>
          </ul>
          <p>
            <em>
              <strong>Note:</strong> We do not collect face data for personal
              identification, advertising, or profiling beyond what is necessary
              to provide these requested AI-driven features.
            </em>
          </p>
        </Card.Body>
      </Card>

      {/* How We Use Collected Data */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">How We Use Collected Data</h2>
          <p>
            We use your face data <strong>exclusively</strong> to:
          </p>
          <ul>
            <li>
              Provide AI-driven functionality, including face swapping, photo
              editing, facial attribute analysis, and personalized attractiveness
              scoring.
            </li>
            <li>
              Generate analytical or visual outputs (e.g., attractiveness ratings,
              trait breakdowns, or image edits) essential to the core features of
              both FaceMax and SwiftPhoto Ai Studio.
            </li>
          </ul>
          <p>
            Your face data is <strong>not</strong> used for advertising, user
            profiling unrelated to the core functionality, or any other purpose
            beyond what these apps need to deliver services you request.
          </p>
        </Card.Body>
      </Card>

      {/* Third-Party Sharing and Storage */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Third-Party Sharing & Storage</h2>
          <p>
            <strong>FaceMax</strong> and <strong>SwiftPhoto Ai Studio</strong>{" "}
            process data on our secure servers. We do not sell, rent, or otherwise
            share your face data with third parties except if required by law or
            legal processes.
          </p>
          <p>
            These data centers comply with industry standards to ensure a high
            level of security.
          </p>
        </Card.Body>
      </Card>

      {/* Data Retention */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Data Retention</h2>
          <p>
            We retain face data <strong>only</strong> for as long as is necessary
            to provide the requested features:
          </p>
          <ul>
            <li>
              <strong>Uploaded Photos:</strong> Deleted within 30 minutes of
              processing completion (or sooner, if technically feasible).
            </li>
            <li>
              <strong>Error Logs:</strong> Retained for 7 days and contain no raw
              face data (only timestamps or technical info).
            </li>
            {/* <li>
              <strong>Session Data:</strong> Cleared upon logout or session
              expiration, whichever comes first.
            </li> */}
          </ul>
          <p>
            After the applicable retention period, your data is permanently
            deleted from our servers.
          </p>
        </Card.Body>
      </Card>

      {/* Your Rights */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the data we hold about
              you.
            </li>
            <li>
              <strong>Rectification:</strong> Request corrections to any
              inaccuracies in your data.
            </li>
            <li>
              <strong>Deletion:</strong> Request the removal of your data from
              our servers.
            </li>
            <li>
              <strong>Restriction/Objection:</strong> Restrict or object to the
              processing of your data.
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Withdraw your consent at any
              time, without affecting the lawfulness of processing based on
              consent before its withdrawal.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <strong>{email}</strong>.
          </p>
        </Card.Body>
      </Card>

      {/* Relevant Sections & Policy Updates */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Where to Find This Information</h2>
          <p>
            <strong>Collection of Face Data:</strong> “What Face Data We Collect”
          </p>
          <p>
            <strong>Use of Face Data:</strong> “How We Use Collected Data”
          </p>
          <p>
            <strong>Third-Party Sharing:</strong> “Third-Party Sharing & Storage”
          </p>
          <p>
            <strong>Data Retention:</strong> “Data Retention”
          </p>
          <p>
            <strong>User Rights:</strong> “Your Rights”
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Quotes from This Privacy Policy Concerning Face Data</h2>
          <p>
            <em>
              “<strong>What Face Data We Collect:</strong> [...] We collect limited face
              data, including facial landmarks, feature descriptors, and processing
              metadata to perform AI-driven photo editing and provide attractiveness
              analysis.”
            </em>
          </p>
          <p>
            <em>
              “<strong>How We Use Collected Data:</strong> [...] We use your face data
              exclusively to provide AI-powered features, including face swapping,
              attractiveness scoring, and photo editing. Your face data is not used for
              advertising or unrelated profiling.”
            </em>
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Policy Updates</h2>
          <p>
            We may update this Privacy Policy to reflect changes in regulations or
            services. Significant changes will be communicated to users via in-app
            notifications or email. The most recent version of this policy is always
            available on our website.
          </p>
        </Card.Body>
      </Card>

      {/* Contact Us */}
      <Card className="mb-4 border-0">
        <Card.Body>
          <h2 className="h4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how
            your data is handled within FaceMax or SwiftPhoto Ai Studio, please contact
            us at:
          </p>
          <p>Email: <strong>{email}</strong></p>
        </Card.Body>
      </Card>

      <footer className="text-center mt-5 text-muted">
        <p>© 2024 SwiftPhotoAI. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default PrivacyPolicy;