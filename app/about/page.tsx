"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-midnightblue mb-4">
            About Us
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            We are committed to delivering high-quality products and an exceptional shopping experience. Our mission is to provide customers with reliable, enjoyable, and seamless service.
          </p>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1305&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About us"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Team / Info Section */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-midnightblue mb-6 text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Eyobed Demissie", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Jane Doe", role: "Product Manager", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "John Smith", role: "Lead Developer", img: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center rounded-2xl p-4 hover:shadow-lg transition">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-midnightblue">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-midnightblue text-white py-12 px-6 rounded-2xl max-w-4xl mx-auto text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Join us on our journey!
        </h2>
        <p className="mb-6 text-gray-200">
          Explore our products and experience the best in quality and service.
        </p>
        <button
          onClick={() => window.location.href = "/categories"}
          className="px-6 py-3 cursor-pointer bg-white text-midnightblue font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Go to Products
        </button>
      </div>
    </div>
  );
}
