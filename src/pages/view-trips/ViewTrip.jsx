import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);

  const getTripData = async () => {
    try {
      const docRef = doc(db, "trips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);
      } else {
        toast("No Trip Found");
      }
    } catch (error) {
      toast("Failed to fetch trip.");
    }
  };

  useEffect(() => {
    getTripData();
  }, [tripId]);

  return (
    <div>
      <Navbar />
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {tripData ? (
          <>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                An adventure in {tripData?.userSelection?.city}
              </h2>
              <p className="text-gray-600 mb-2">
                😆 Mood: {tripData?.userSelection?.mood}
              </p>
              <p className="text-gray-600 mb-2">
                🧳 Outing Type: {tripData?.userSelection?.type_of_people} 
              </p>
              <p className="text-gray-600 mb-2">
                📅 Duration: {tripData?.userSelection?.hours_available} hours
              </p>
              <p className="text-gray-600 mb-6">
                💰 Budget: {tripData?.userSelection?.budget}
              </p>
            </div>

            <div className="my-10">
  <h2 className="text-xl font-bold mb-5">My micro-itinerary🎒</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {tripData?.tripData?.map((hotel, idx) => (
      <div
        key={idx}
        className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
      >
        {/* New semi-bold vibe title */}
        <h4 className="text-md font-semibold text-pink-600 mb-1">{hotel.vibe}</h4>

        {/* Existing hotel name */}
        <h3 className="text-lg font-semibold">{hotel.name}</h3>

        {/* Address and rating */}
        <p className="text-sm text-gray-500 mb-2">📍 {hotel.address}</p>
        <p className="text-sm">⭐ {hotel.rating}</p>
      </div>
    ))}
  </div>
</div>

          </>
        ) : (
          <p className="text-center mt-10 text-gray-500">Loading Trip...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
