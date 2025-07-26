
const About = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>About TalentHuntPro</h1>
        
        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#555" }}>
          <strong>TalentHuntPro</strong> is a leading HR consulting firm specializing in delivering talent intelligence and workforce solutions to multinational corporations.
        </p>

        <p style={{ fontSize: "1rem", lineHeight: "1.6", marginTop: "1rem", color: "#555" }}>
          We provide strategic insights into talent availability, compensation benchmarking, market mapping, and competitor analysis. Our mission is to help MNCs make informed hiring decisions and optimize global workforce planning.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ color: "#444", marginBottom: "0.5rem" }}>Our Services</h3>
          <ul style={{ paddingLeft: "1.5rem", color: "#555" }}>
            <li>Talent Intelligence & Market Research</li>
            <li>Compensation Benchmarking</li>
            <li>Strategic Workforce Planning</li>
            <li>Competitor Hiring Analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
