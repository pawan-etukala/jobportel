import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">JobConnect</h1>
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Job</h2>
          <p className="text-lg text-gray-600 mb-6">The easiest way to connect with top employers and apply to great opportunities across the world.</p>
          
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose JobConnect?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Smart Matching</h4>
              <p className="text-gray-600">Our AI matches you with jobs based on your skills, experience, and goals.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Easy Application</h4>
              <p className="text-gray-600">Apply to multiple jobs with just one click using your saved resume and profile.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Real-time Updates</h4>
              <p className="text-gray-600">Stay notified of application status and interview calls instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">What Our Users Say</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"I got my dream job within a week! The platform is user-friendly and fast."</p>
              <p className="mt-4 font-semibold text-blue-600">– Aditi Sharma, Software Engineer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"JobConnect helped me switch careers effortlessly. Amazing experience!"</p>
              <p className="mt-4 font-semibold text-blue-600">– Rahul Verma, Data Analyst</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
          <p>Email: support@jobconnect.com</p>
          <p className="mt-2 text-sm text-gray-400">© 2025 JobConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
