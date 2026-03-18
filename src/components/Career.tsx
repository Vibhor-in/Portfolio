import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">

          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* CS INFOTECH */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>CS Infotech Soft Solutions</h5>
              </div>
              <h5>Jan 2025 - Jun 2025</h5>
            </div>
            <p>
              Developed backend APIs using ASP.NET Core and worked on frontend
              using ASP.NET MVC and React.js. Gained hands-on experience with
              SQL Server and MongoDB while building real-world applications.
            </p>
          </div>

          {/* EMBTEL */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Embtel Web Solutions Pvt Ltd</h5>
              </div>
              <h5>Sep 2025 - Feb 2026</h5>
            </div>
            <p>
              Built and maintained full-stack applications using Node.js,
              React.js, and Next.js. Developed REST APIs, authentication systems,
              and admin panels while working on production-level projects.
            </p>
          </div>

          {/* STARAGILE */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer Intern</h4>
                <h5>StarAgile</h5>
              </div>
              <h5>Dec 2025 - Present</h5>
            </div>
            <p>
              Working with AWS and DevOps practices to deploy and manage
              applications. Learning cloud infrastructure, CI/CD pipelines,
              Docker, and monitoring tools to improve scalability and reliability.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;