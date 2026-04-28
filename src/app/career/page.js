import Navbar from "@/components/Navbar";

export default function Career() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: '60vh', padding: '40px 15px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: 'var(--text-primary)' }}>Careers at Dragon News</h2>
        <div style={{ backgroundColor: 'var(--white)', padding: '30px', borderRadius: '5px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--accent-color)' }}>Join Our Team</h3>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px' }}>
            We are always looking for passionate journalists, editors, and technologists to join our growing team. At Dragon News, we believe in fostering a creative and dynamic environment where talent can thrive.
          </p>

          <h4 style={{ fontSize: '20px', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Open Positions</h4>
          
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '18px', fontWeight: '600' }}>Senior Investigative Reporter</h5>
            <p style={{ color: 'var(--text-secondary)' }}>Full-time | Remote | Experience: 5+ years</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '18px', fontWeight: '600' }}>Frontend Web Developer (Next.js)</h5>
            <p style={{ color: 'var(--text-secondary)' }}>Full-time | On-site | Experience: 3+ years</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '18px', fontWeight: '600' }}>Content Editor</h5>
            <p style={{ color: 'var(--text-secondary)' }}>Part-time | Remote | Experience: 2+ years</p>
          </div>

          <button className="btn-learn-more" style={{ marginTop: '20px' }}>Apply Now</button>
        </div>
      </div>
    </>
  );
}
