"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import GiftConfirmation from "../../components/GiftConfirmation";

const properties = [
  { id: "1", name: "Luxury Villa", image: "/villa.jpg", price: "$500/night" },
  { id: "2", name: "Beach House", image: "/beach.jpg", price: "$700/night" },
];

export default function GiftPage() {
  const { id } = useParams(); // Extract ID from the URL
  const property = properties.find((p) => p.id === id);

  const [recipient, setRecipient] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = 1;

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/gifts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: userId, recipient }),
      });
      
      if (!response.ok) {
        const text = await response.text(); // Read the response as text
        console.error("Server Response:", text); // Log the actual response (helps debug)
        throw new Error("Failed to send gift");
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      alert("Gift sent successfully!");

      if (!response.ok) throw new Error(data.message || "Failed to send gift");

      alert("Gift sent successfully!");
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error sending gift:", error);
      alert(error.message || "An error occurred");
    }
  };

  if (!property) return <p className="text-red-500 text-center mt-10">Property not found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gift {property.name}</h2>

        {!showConfirmation ? (
          <>
            <img src={property.image} alt={property.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <input
              type="text"
              placeholder="Enter recipient's email or username"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <button
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Proceed to Confirmation
            </button>
          </>
        ) : (
          <GiftConfirmation 
            userId={userId} 
            property={property.name} 
            recipient={recipient} 
            onConfirm={handleConfirm} 
          />
        )}
      </div>
    </div>
  );
}