import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "School For Training",
    category: "Training Platform (Client Project)",
    tools:
      "Node.js, REST APIs, Admin Panel, Manager Panel, Authentication",
    link: "https://schoolfortraining.com",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
  },
  {
    title: "Datricle",
    category: "Business Website",
    tools:
      "React.js, Node.js, Full Stack Development, API Integration",
    link: "https://datricle.com/",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    title: "Lonestar Innovation AI",
    category: "AI Company Platform",
    tools:
      "Node.js, Backend Development, Admin Panel, Database Management",
    link: "https://lonestarinnovation-ai.com/",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop",
  },
  {
    title: "E-Commerce Developer Store",
    category: "Personal Project (In Progress)",
    tools:
      "Next.js, Node.js, MongoDB, Authentication, Admin Panel",
    link: "",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    title: "CRM for MLM Companies",
    category: "Personal Project (In Progress)",
    tools:
      "Node.js, React.js, MongoDB, Role-Based Access, Dashboard",
    link: "",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const openProject = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div
                  className="carousel-slide"
                  key={index}
                  onClick={() => openProject(project.link)}
                  style={{ cursor: project.link ? "pointer" : "default" }}
                >
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>

                      <div className="carousel-details">
                        <h4>{project.title}</h4>

                        <p className="carousel-category">
                          {project.category}
                        </p>

                        <div className="carousel-tools">
                          <span className="tools-label">
                            Tools & Features
                          </span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;