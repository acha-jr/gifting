import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

export default function GiftConfirmation({
  userId,
  property,
  recipient,
  onConfirm,
}: {
  userId: number;
  property: string;
  recipient: string;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!userId) {
      console.error("Error: userId is undefined");
      return;
    }

    socket.emit("joinRoom", userId);

    const handleNotification = (data: { message: string }) => {
      alert(`Notification: ${data.message}`);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Confirm Your Gift</h2>
      <p className="text-gray-600 mb-2">
        Property: <span className="font-semibold">{property}</span>
      </p>
      <p className="text-gray-600 mb-4">
        Recipient: <span className="font-semibold">{recipient}</span>
      </p>
      <button
        onClick={onConfirm}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
      >
        Confirm & Send Gift
      </button>
    </div>
  );
}