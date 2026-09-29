import { ImageResponse } from 'next/og';

export const alt = 'Eraya Experience | Digital Marketing Agency Goa & Pan India';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0c0d0e',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1f2024 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18191b 2%, transparent 0%)',
          backgroundSize: '80px 80px',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header with Monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c0d0e',
              fontSize: '32px',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            ER
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Eraya Experience
            </span>
            <span
              style={{
                fontSize: '14px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a1a1aa',
                marginTop: '4px',
              }}
            >
              Creative & Performance Agency • Goa, India
            </span>
          </div>
        </div>

        {/* Hero Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
          <h1
            style={{
              fontSize: '58px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Crafting Human-First Brand Narratives & High-ROI Marketing.
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#a1a1aa',
              margin: 0,
            }}
          >
            Social Media • Influencer Campaigns • Performance Ads • Brand Strategy
          </p>
        </div>

        {/* Footer Metrics & Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '28px',
            borderTop: '1px solid #27272a',
            fontSize: '18px',
            color: '#a1a1aa',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <span>6+ Years Experience</span>
            <span>•</span>
            <span>4.8x Avg ROI</span>
            <span>•</span>
            <span>Pan-India Reach</span>
          </div>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>erayaexperience.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
