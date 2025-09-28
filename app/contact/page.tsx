"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can integrate an API endpoint to send messages
    console.log("Message submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-midnightblue mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-midnightblue mb-2">Address</h2>
              <p className="text-gray-600">123 Main Street, Addis Ababa, Ethiopia</p>
            </div>
            <div className="bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-midnightblue mb-2">Email</h2>
              <p className="text-gray-600">info@example.com</p>
            </div>
            <div className="bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-midnightblue mb-2">Phone</h2>
              <p className="text-gray-600">+251 912 345 678</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            {submitted && (
              <p className="mb-4 text-green-600 font-semibold">
                Thank you! Your message has been submitted.
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
              <button
                type="submit"
                className="bg-midnightblue cursor-pointer text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
