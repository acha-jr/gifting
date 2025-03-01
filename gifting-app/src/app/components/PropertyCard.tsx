"use client";
import { useRouter } from "next/navigation";

type PropertyProps = {
  property: {
    id: string;
    name: string;
    image: string;
    price: string;
  };
};

export default function PropertyCard({ property }: PropertyProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.name}</h2>
        <p className="text-gray-600">{property.price}</p>
        <button
          onClick={() => router.push(`/gift/${property.id}`)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Gift This Property
        </button>
      </div>
    </div>
  );
}