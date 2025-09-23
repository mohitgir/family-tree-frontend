import React from "react";
// import '../index.css'
const Home = () => {
  return (
    <div>
      <div className="p-4">
      {/* Hero (Glass card in main content) */}
      <section
        className="p-5 mb-5 text-center  rounded-4 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
            background:"linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url('./assets/images/panaromicimage.jpg') center/cover no-repeat",
            // backgroundImage:"url('./assets/images/panaromicimage.jpg')",
            backgroundPosition:'center',
            backgroundSize:'contain'
            
        }}
      >
        <h1 className="fw-bold display-5 text-light">Family Tree</h1>
        <p className="lead text-light-50">
          Visualize and explore your family across generations.
        </p>
        <a href="#features" className="btn btn-light fw-bold px-4 mt-3">
          Get Started
        </a>
      </section>

      {/* Features */}
      <section id="features" className="mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div
              className="p-4 rounded-4 shadow h-100"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(8px)",
              
              }}
            >
              <h3 className="fw-bold text-light">👨‍👩‍👧 Build</h3>
              <p className="text-light-50">
                Create your family tree easily with parents, children, and siblings.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="p-4 rounded-4 shadow h-100"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3 className="fw-bold text-light">🔗 Connect</h3>
              <p className="text-light-50">
                Add relationships like spouse, parent, child, and see them come alive.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="p-4 rounded-4 shadow h-100"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3 className="fw-bold text-light">🌳 Explore</h3>
              <p className="text-light-50">
                Navigate through generations and discover your family’s legacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="p-5 rounded-4 shadow-lg text-center"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="fw-bold text-light">Start Your Family Journey Today</h2>
        <p className="text-light-50 mb-4">
          Sign up and begin building your interactive family tree.
        </p>
        <a href="/signup" className="btn btn-outline-light btn-lg fw-bold">
          Sign Up Now
        </a>
      </section>
    </div>
    </div>
  );
};

export default Home;
