import { Navbar } from "@/components/common/Navbar";
import { MyTripCard } from "@/components/user-trip/MyTripCard";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  const getUserTripsFromFirestore = async (userEmail) => {
    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    return trips;
  };

  const getUserTripsFromLocalStorage = () => {
    const trips = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("trip_")) {
        const tripData = JSON.parse(localStorage.getItem(key));
        trips.push(tripData);
      }
    }
    return trips;
  };

  const loadTrips = async () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (!user) {
    //   navigate("/");
    //   return;
    // }

    let trips = [];

    // try {
    //   const firestoreTrips = await getUserTripsFromFirestore(user.email);
    //   trips = [...firestoreTrips];
    // } catch (error) {
    //   console.error("Error loading trips from Firestore:", error);
    // }

    const localTrips = getUserTripsFromLocalStorage();
    trips = [...trips, ...localTrips];

    setUserTrips(trips);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-2xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {userTrips?.length > 0
            ? userTrips.map((item, index) => (
                <MyTripCard key={index} item={item} index={index} />
              ))
            : [1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-[250px] w-full bg-slate-200 animate-pulse rounded-md"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};
