export default function TermsPage() {
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
        Terms of Service
      </h1>

      <div style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '16px',
        lineHeight: '1.8'
      }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the AEO-Rex Scanner application, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            2. Use License
          </h2>
          <p>
            AEO-Rex grants you a limited, non-exclusive, non-transferable license to use the AEO-Rex Scanner for business purposes in accordance with these Terms of Service.
          </p>
          <p style={{ marginTop: '15px' }}>
            You may not:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose without authorization</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            3. Service Description
          </h2>
          <p>
            AEO-Rex Scanner is an AI visibility analysis tool that helps businesses understand how they appear in AI-powered search engines and chatbots including ChatGPT, Claude, Perplexity, and others.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            4. Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            5. Pricing and Payments
          </h2>
          <p>
            Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as explicitly stated in our refund policy.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            6. Disclaimer
          </h2>
          <p>
            The materials on AEO-Rex Scanner are provided on an 'as is' basis. AEO-Rex makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            7. Limitations
          </h2>
          <p>
            In no event shall AEO-Rex or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AEO-Rex Scanner.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            8. Data Accuracy
          </h2>
          <p>
            While we strive for accuracy, AEO-Rex Scanner results are for informational purposes. AI platform results may vary based on numerous factors. We do not guarantee specific outcomes from using our service.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            9. Modifications
          </h2>
          <p>
            AEO-Rex may revise these terms of service at any time without notice. By using this application, you agree to be bound by the current version of these terms.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            10. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of England and Wales, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#00d9ff', fontSize: '28px', marginBottom: '15px' }}>
            Contact Information
          </h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:legal@aeo-rex.com" style={{ color: '#00d9ff', textDecoration: 'underline' }}>
              legal@aeo-rex.com
            </a>
          </p>
        </section>

        <p style={{ marginTop: '50px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
          Last updated: January 8, 2025
        </p>
      </div>
    </div>
  );
}
