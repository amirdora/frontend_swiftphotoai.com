import React from 'react';
import { Container } from 'react-bootstrap';
import './privacy_policy.scss'; 

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy-container my-5">
      <h1 className="text-center">Privacy Policy</h1>

      <section className="my-4">
        <h2>Introduction</h2>
        <p>
          SwiftPhotoAI and its suite of applications, including FaceMaxx, respect your privacy and are committed
          to protecting your personal data. This Privacy Policy informs you of our policies regarding the
          collection, use, and disclosure of personal data when you use our services and the choices you have
          associated with that data.
        </p>
      </section>

      <section className="my-4">
        <h2>Information We Collect</h2>
        <p>
          <strong>Photos and Camera Access:</strong> For the purpose of providing FaceMaxx services, we require access to your
          device's camera and photo gallery. We use the photos you provide solely to analyze and provide
          personalized feedback on your facial features. These photos are processed in real-time and are not
          stored by our systems past the duration of processing.
        </p>
      </section>

      <section className="my-4">
        <h2>How We Use Your Information</h2>
        <p>
          <strong>To Provide Services:</strong> The photos you provide are used to analyze your facial features and to generate personalized
          advice and insights into your attractiveness, skin quality, facial symmetry, and other traits.
        </p>
        <p>
          <strong>To Improve Our Services:</strong> We may analyze usage data in aggregate to improve the functionality and user
          experience of our apps. No personal data from your photos is used for this purpose.
        </p>
      </section>

      <section className="my-4">
        <h2>Data Processing and Storage</h2>
        <p>
          <strong>Data Processing:</strong> We process your photos instantly to generate the required analysis. Your photos are
          not saved or stored on our servers.
        </p>
        <p>
          <strong>Data Deletion:</strong> Photos are automatically deleted immediately after the analysis is complete. We do not retain
          copies of your photos nor do we use them for any other purpose.
        </p>
      </section>

      <section className="my-4">
        <h2>Data Security</h2>
        <p>
          We implement robust security measures to ensure the confidentiality and integrity of your data. These
          measures include encryption of data in transit and at rest.
        </p>
      </section>

      <section className="my-4">
        <h2>Your Data Protection Rights</h2>
        <p>
          We provide you with the rights to access, correct, erase, and restrict the processing of your personal
          data, among other rights.
        </p>
      </section>

      <section className="my-4">
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update our Privacy Policy at any time. We will notify you of any changes by
          posting the new Privacy Policy on this page. These changes are effective immediately after they are
          posted on this page.
        </p>
      </section>

      <section className="my-4">
        <h2>Third-Party Services</h2>
        <p>
          Our apps may contain links to third-party websites or services that are not owned or controlled by
          SwiftPhotoAI. SwiftPhotoAI has no control over, and assumes no responsibility for, the content, privacy
          policies, or practices of any third-party websites or services.
        </p>
      </section>

      <section className="my-4">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please feel free to contact us through
          the feedback options provided within our apps.
        </p>
      </section>
    </Container>
  );
};

export default PrivacyPolicy;