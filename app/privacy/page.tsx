export default function PrivacyPage() {
  return (
    <div style={{
      padding: '60px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 300px)'
    }}>
      <h1 style={{
        color: '#00d9ff',
        fontSize: '42px',
        marginBottom: '30px',
        fontWeight: '700'
      }}>
        Privacy Policy
      </h1>

      <div style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '16px',
        lineHeight: '1.8'
      }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            1. Introduction
          </h2>
          <p>
            AEO-Rex Limited ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AEO-Rex Scanner application.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            2. Information We Collect
          </h2>
          <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '22px', marginTop: '20px', marginBottom: '10px' }}>
            Personal Information
          </h3>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Name and email address (for account creation)</li>
            <li>Business name and website URL</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Communications with our support team</li>
          </ul>

          <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '22px', marginTop: '20px', marginBottom: '10px' }}>
            Usage Data
          </h3>
          <p>We automatically collect certain information when you use our service:</p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Scan history and results</li>
            <li>Usage patterns and preferences</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            3. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions and manage subscriptions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            4. Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li><strong>Service Providers:</strong> We share data with trusted third parties who help us operate our service (e.g., payment processors, hosting providers)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            5. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information, including:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure payment processing through PCI-compliant providers</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            6. Data Retention
          </h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you close your account, we will delete or anonymize your data within 90 days, unless we are required to retain it for legal purposes.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            7. Your Rights (GDPR & UK GDPR)
          </h2>
          <p>
            If you are located in the European Economic Area or the United Kingdom, you have the following rights:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li><strong>Access:</strong> Request access to your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Restriction:</strong> Request restriction of processing</li>
            <li><strong>Objection:</strong> Object to certain types of processing</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@aeo-rex.com" style={{ color: '#00d9ff', textDecoration: 'underline' }}>
              privacy@aeo-rex.com
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            8. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar tracking technologies to:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Maintain your session and preferences</li>
            <li>Understand how you use our service</li>
            <li>Improve our service and user experience</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            9. Third-Party Services
          </h2>
          <p>
            Our service integrates with third-party AI platforms (ChatGPT, Claude, Perplexity, etc.) to provide visibility analysis. When we scan these platforms on your behalf, we do not share your personal information with them beyond what is necessary to perform the scan.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            10. Children's Privacy
          </h2>
          <p>
            Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            11. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            13. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px', listStyle: 'none' }}>
            <li><strong>Email:</strong>{' '}
              <a href="mailto:privacy@aeo-rex.com" style={{ color: '#00d9ff', textDecoration: 'underline' }}>
                privacy@aeo-rex.com
              </a>
            </li>
            <li style={{ marginTop: '10px' }}><strong>Data Protection Officer:</strong>{' '}
              <a href="mailto:dpo@aeo-rex.com" style={{ color: '#00d9ff', textDecoration: 'underline' }}>
                dpo@aeo-rex.com
              </a>
            </li>
            <li style={{ marginTop: '10px' }}><strong>Address:</strong> AEO-Rex Limited, Birmingham, United Kingdom</li>
          </ul>
        </section>

        <p style={{ marginTop: '50px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
          Last updated: January 8, 2025
        </p>
      </div>
    </div>
  );
}
