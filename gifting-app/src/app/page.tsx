"use client";
import Link from "next/link";

const properties = [
  { id: "1", name: "Luxury Villa", image: "/villa.jpg", price: "$500/night" },
  { id: "2", name: "Beach House", image: "/beach.jpg", price: "$700/night" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose a Property to Gift</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{property.name}</h2>
              <p className="text-gray-600">{property.price}</p>
              <Link href={`/gift/${property.id}`}>
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">
                  Gift this Property
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}