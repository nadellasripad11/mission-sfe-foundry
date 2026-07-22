import Footer from '../../../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="page">
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <h1 className="ph-title">COOKIE POLICY</h1>
        <p className="ph-lede">Last updated: July 22, 2026</p>
      </section>

      <section className="band legal-body">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help sites remember
          your preferences, keep you logged in, and understand how you use the site.
        </p>

        <h2>2. Cookies We Use</h2>

        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the Site to function. They cannot be disabled.
        </p>
        <table className="legal-table">
          <thead>
            <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>sb-auth-token</td><td>Keeps you signed in to your SFE Foundry account</td><td>Session</td></tr>
            <tr><td>cookie-consent</td><td>Remembers your cookie consent choice</td><td>1 year</td></tr>
            <tr><td>sfe-sid</td><td>Anonymous session identifier for analytics</td><td>Session</td></tr>
          </tbody>
        </table>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors use the Site so we can improve it. They collect
          anonymized data — no personally identifiable information is stored.
        </p>
        <table className="legal-table">
          <thead>
            <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>sfe-sid (sessionStorage)</td><td>Tracks page views within a single session</td><td>Session</td></tr>
          </tbody>
        </table>

        <h2>3. Third-Party Cookies</h2>
        <p>
          If you use "Sign in with Google," Google may set its own cookies governed by{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
        </p>

        <h2>4. Managing Cookies</h2>
        <p>You can control cookies in several ways:</p>
        <ul>
          <li>
            <strong>Cookie consent banner:</strong> Use the banner on your first visit to accept or decline
            non-essential cookies. You can reset this by clearing your browser&apos;s local storage.
          </li>
          <li>
            <strong>Browser settings:</strong> Most browsers let you block or delete cookies. Note that
            blocking essential cookies may prevent you from signing in.
          </li>
          <li>
            <strong>Private browsing:</strong> Cookies set during a private/incognito session are automatically
            deleted when you close the window.
          </li>
        </ul>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Changes will be posted on this page with
          an updated date. Continued use of the Site constitutes acceptance of the updated policy.
        </p>

        <h2>6. Contact</h2>
        <p>
          Questions about cookies? Email us:{' '}
          <a href="mailto:sfefoundryteam@gmail.com">sfefoundryteam@gmail.com</a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
