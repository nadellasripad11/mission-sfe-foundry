import Footer from '../../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="page">
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <h1 className="ph-title">TERMS OF SERVICE</h1>
        <p className="ph-lede">Last updated: July 22, 2026</p>
      </section>

      <section className="band legal-body">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using sfefoundry.com (the "Site"), you agree to be bound by these Terms of Service.
          If you do not agree, please do not use the Site. These terms apply to all visitors, members, and users.
        </p>

        <h2>2. About SFE Foundry</h2>
        <p>
          SFE Foundry is a student-led entrepreneurship and technology organization at Alpharetta High School.
          The Site provides information about our programs, events, competitions, and community resources.
        </p>

        <h2>3. Accounts</h2>
        <ul>
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You may not share your account or use another person&apos;s account.</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose</li>
          <li>Harass, threaten, or harm other members</li>
          <li>Post spam, offensive, or inappropriate content</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>Scrape, copy, or redistribute content without permission</li>
          <li>Impersonate SFE Foundry, its officers, or other members</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Site — including text, graphics, logos, and software — is the property of SFE Foundry
          or its content creators. You may not reproduce, distribute, or create derivative works without written
          permission, except for personal, non-commercial use.
        </p>

        <h2>6. Shop and Merchandise</h2>
        <p>
          The Shop section is currently in preview mode. Product requests are submitted via email and are not
          binding purchase orders. Prices, availability, and fulfillment are subject to change. SFE Foundry
          reserves the right to decline any request.
        </p>

        <h2>7. Seed Points and Rewards</h2>
        <p>
          Seed Points are virtual credits with no monetary value. They cannot be transferred, sold, or exchanged
          for cash. SFE Foundry reserves the right to adjust, cancel, or modify the points system at any time.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your use of the Site is also governed by our{' '}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          The Site is provided "as is" without warranties of any kind, express or implied. SFE Foundry does not
          warrant that the Site will be uninterrupted, error-free, or free of viruses or harmful components.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, SFE Foundry and its officers shall not be liable for any
          indirect, incidental, special, or consequential damages arising from your use of the Site.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after changes constitutes your
          acceptance of the new Terms. We will notify users of significant changes via the Site or email.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Georgia, United States, without regard to
          its conflict of law provisions.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these Terms? Email us:{' '}
          <a href="mailto:sfefoundryteam@gmail.com">sfefoundryteam@gmail.com</a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
