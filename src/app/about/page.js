import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: '60vh', padding: '40px 15px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: 'var(--text-primary)' }}>About Dragon News</h2>
        <div style={{ backgroundColor: 'var(--white)', padding: '30px', borderRadius: '5px', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            Welcome to Dragon News, your number one source for all things news. We're dedicated to providing you the very best of journalism, with an emphasis on truth, speed, and reliability.
          </p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            Founded in 2026, Dragon News has come a long way from its beginnings. When we first started out, our passion for "Journalism Without Fear or Favour" drove us to start our own business.
          </p>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            We hope you enjoy our platform as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </>
  );
}
