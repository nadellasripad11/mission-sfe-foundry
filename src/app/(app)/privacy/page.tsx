import Footer from '../../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="page">
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <h1 className="ph-title">PRIVACY POLICY</h1>
        <p className="ph-lede">Last updated: July 22, 2026</p>
      </section>

      <section className="band legal-body">
        <h2>1. Who We Are</h2>
        <p>
          SFE Foundry is a student-led entrepreneurship and technology organization at Alpharetta High School.
          This Privacy Policy explains how we collect, use, and protect information you provide when using sfefoundry.com (the "Site").
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li><strong>Account information:</strong> When you create an account, we collect your name, email address, and password.</li>
          <li><strong>Usage data:</strong> We collect information about pages you visit, how long you stay, and what you click.</li>
          <li><strong>Device data:</strong> Browser type, operating system, and IP address for security and analytics purposes.</li>
          <li><strong>Communications:</strong> Any messages or feedback you send us via contact forms or email.</li>
          <li><strong>Shop requests:</strong> When you request a product, we collect the item name and your contact info.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve the Site</li>
          <li>To send you updates about SFE Foundry events, announcements, and newsletters (you can opt out anytime)</li>
          <li>To analyze usage patterns and improve our content</li>
          <li>To respond to your requests, questions, or feedback</li>
          <li>To protect the security and integrity of our platform</li>
        </ul>

        <h2>4. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to track your preferences and site usage. You can control cookies
          through your browser settings or by using our cookie consent banner. See our{' '}
          <a href="/cookies">Cookie Policy</a> for full details.
        </p>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share your data with:
        </p>
        <ul>
          <li><strong>Supabase:</strong> Our database provider, which stores your account and usage data securely.</li>
          <li><strong>Google:</strong> If you use "Sign in with Google," Google processes your authentication.</li>
          <li><strong>Law enforcement:</strong> If required by law or to protect the rights and safety of our users.</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          We retain your account information as long as your account is active. You may request deletion of your
          data at any time by emailing us at sfefoundryteam@gmail.com. Usage analytics data may be retained in
          anonymized form for up to 2 years.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your personal data</li>
          <li>Opt out of marketing communications</li>
          <li>Withdraw consent for data processing at any time</li>
        </ul>

        <h2>8. Security</h2>
        <p>
          We use industry-standard security practices including encrypted connections (HTTPS), hashed passwords,
          and access controls. However, no system is 100% secure — please use a strong, unique password.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          SFE Foundry is a high school organization. While our members may be under 18, we do not knowingly
          collect data from children under 13. If you believe we have inadvertently collected such data,
          please contact us immediately.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify users of significant changes via email
          or a notice on the Site. Continued use of the Site constitutes acceptance of the updated policy.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:{' '}
          <a href="mailto:sfefoundryteam@gmail.com">sfefoundryteam@gmail.com</a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
