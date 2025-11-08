export default function ContactPage() {
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
        Contact Us
      </h1>

      <div style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '16px',
        lineHeight: '1.8'
      }}>
        <p style={{ fontSize: '18px', marginBottom: '40px' }}>
          Have questions about AEO-Rex Scanner? We're here to help. Get in touch with our team.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {/* General Support */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              💬 General Support
            </h2>
            <p style={{ marginBottom: '10px' }}>
              For general inquiries, technical support, or help with your account.
            </p>
            <a
              href="mailto:support@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              support@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Response time: Within 24 hours
            </p>
          </div>

          {/* Sales Inquiries */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              💼 Sales & Business
            </h2>
            <p style={{ marginBottom: '10px' }}>
              Interested in enterprise plans or custom solutions?
            </p>
            <a
              href="mailto:sales@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              sales@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Response time: Within 12 hours
            </p>
          </div>

          {/* Privacy & Legal */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              🔒 Privacy & Legal
            </h2>
            <p style={{ marginBottom: '10px' }}>
              Data protection, privacy concerns, or legal matters.
            </p>
            <a
              href="mailto:privacy@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              privacy@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Response time: Within 48 hours
            </p>
          </div>

          {/* Partnerships */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              🤝 Partnerships
            </h2>
            <p style={{ marginBottom: '10px' }}>
              Interested in partnering or reselling AEO-Rex services?
            </p>
            <a
              href="mailto:partnerships@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              partnerships@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Response time: Within 48 hours
            </p>
          </div>

          {/* Feedback & Suggestions */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              💡 Feedback
            </h2>
            <p style={{ marginBottom: '10px' }}>
              Share your ideas, suggestions, or feature requests.
            </p>
            <a
              href="mailto:feedback@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              feedback@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              We read every message!
            </p>
          </div>

          {/* Technical Issues */}
          <div style={{
            background: 'rgba(0,217,255,0.05)',
            border: '2px solid rgba(0,217,255,0.2)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#00d9ff',
              fontSize: '24px',
              marginBottom: '15px'
            }}>
              🐛 Bug Reports
            </h2>
            <p style={{ marginBottom: '10px' }}>
              Found a bug or experiencing technical issues?
            </p>
            <a
              href="mailto:bugs@aeo-rex.com"
              style={{
                color: '#00d9ff',
                fontSize: '18px',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              bugs@aeo-rex.com
            </a>
            <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Priority response for critical issues
            </p>
          </div>
        </div>

        {/* Company Information */}
        <section style={{
          background: 'rgba(0,217,255,0.03)',
          border: '2px solid rgba(0,217,255,0.1)',
          borderRadius: '12px',
          padding: '40px',
          marginTop: '50px'
        }}>
          <h2 style={{
            color: '#00d9ff',
            fontSize: '28px',
            marginBottom: '20px'
          }}>
            📍 Company Information
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '18px', marginBottom: '8px' }}>
                Legal Entity
              </h3>
              <p>AEO-Rex Limited</p>
            </div>

            <div>
              <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '18px', marginBottom: '8px' }}>
                Registered Office
              </h3>
              <p>Birmingham, United Kingdom 🇬🇧</p>
            </div>

            <div>
              <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '18px', marginBottom: '8px' }}>
                Website
              </h3>
              <a
                href="https://www.aeo-rex.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00d9ff',
                  textDecoration: 'underline'
                }}
              >
                www.aeo-rex.com
              </a>
            </div>

            <div>
              <h3 style={{ color: 'rgba(0,217,255,0.8)', fontSize: '18px', marginBottom: '8px' }}>
                Business Hours
              </h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM GMT</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>
                Email support available 24/7
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section style={{ marginTop: '50px' }}>
          <h2 style={{
            color: '#00d9ff',
            fontSize: '28px',
            marginBottom: '20px'
          }}>
            📚 Quick Links
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <a
              href="/pricing"
              style={{
                color: '#00d9ff',
                textDecoration: 'none',
                padding: '15px',
                background: 'rgba(0,217,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,217,255,0.2)',
                transition: 'all 0.2s'
              }}
            >
              💰 View Pricing Plans
            </a>

            <a
              href="/dashboard"
              style={{
                color: '#00d9ff',
                textDecoration: 'none',
                padding: '15px',
                background: 'rgba(0,217,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,217,255,0.2)',
                transition: 'all 0.2s'
              }}
            >
              📊 Go to Dashboard
            </a>

            <a
              href="/terms"
              style={{
                color: '#00d9ff',
                textDecoration: 'none',
                padding: '15px',
                background: 'rgba(0,217,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,217,255,0.2)',
                transition: 'all 0.2s'
              }}
            >
              📜 Terms of Service
            </a>

            <a
              href="/privacy"
              style={{
                color: '#00d9ff',
                textDecoration: 'none',
                padding: '15px',
                background: 'rgba(0,217,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,217,255,0.2)',
                transition: 'all 0.2s'
              }}
            >
              🔒 Privacy Policy
            </a>
          </div>
        </section>

        {/* Footer Note */}
        <div style={{
          marginTop: '60px',
          padding: '30px',
          background: 'rgba(0,217,255,0.05)',
          borderLeft: '4px solid #00d9ff',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#00d9ff', fontSize: '20px', marginBottom: '12px' }}>
            💬 Need Immediate Help?
          </h3>
          <p>
            For urgent technical issues with active scans or billing problems, please email{' '}
            <a href="mailto:urgent@aeo-rex.com" style={{ color: '#00d9ff', textDecoration: 'underline', fontWeight: '600' }}>
              urgent@aeo-rex.com
            </a>{' '}
            with "URGENT" in the subject line. We prioritize these requests and typically respond within 2 hours during business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
