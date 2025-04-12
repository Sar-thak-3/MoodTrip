import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { Loading } from "@/components/common/Loading";
import { useNavigate } from "react-router-dom";

import GooglePlacesAutocomplete from "@/components/common/googleautocompletor";

export const CreateTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateTrip = async () => {
    const {
      city,
      budget,
      mood,
      purpose,
      time_of_day,
      number_of_people,
      type_of_people,
      hours_available,
      lat,
      lon,
      transport_mode,
    } = formData;
  
    // Ensure required fields are provided
    if (!mood || !purpose || !hours_available || !budget || !type_of_people) {
      toast("Please fill all required fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Prepare request payload
      const requestPayload = {
        mood,
        purpose,
        time_of_day: time_of_day || "Evening", // default fallback
        number_of_people: number_of_people || 2, // default fallback
        type_of_people,
        hours_available: parseInt(hours_available),
        // max_travel_time: 20, // you can make this dynamic later
        // transport_mode: transport_mode || "Car",
        budget: budget,
        city, // Use city as fallback if coordinates aren't provided
      };
  
      // Optionally add lat and lon if they exist
      if (lat && lon) {
        requestPayload.lat = parseFloat(lat);
        requestPayload.lon = parseFloat(lon);
      }

      console.log("Request payload", requestPayload)
  
      // Make the API request
      const response = await axios.post(
        "https://flask-hello-world-w9kv.onrender.com/api/data",
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = response.data.data;
      console.log("Here is the response: ", result);
      saveTrip(result);
    } catch (error) {
      console.error("Error calling trip generation API:", error);
      toast("An error occurred while generating the trip.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const saveTrip = async (tripData) => {
    setLoading(true);
    const docId = Date.now().toString();
  
    let parsedTripData;
    try {
      // If tripData is a JSON string, parse it
      // Otherwise if it's already an array (axios handles that), skip parsing
      parsedTripData = Array.isArray(tripData)
        ? tripData
        : JSON.parse(tripData);
    } catch (error) {
      console.error("Error parsing tripData:", error);
      toast("An error occurred while parsing the trip data.");
      setLoading(false);
      return;
    }
  
    try {
      await setDoc(doc(db, "trips", docId), {
        userSelection: formData,
        tripData: parsedTripData, // just hotel array now
        id: docId,
      });
      setLoading(false);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("An error occurred while saving the trip.");
      setLoading(false);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">Plan your Mini Adventure⚡</h2>
        <p className="mt-3 text-gray-500 text-xl">
        Got a sec? Tell us your mood, your group & your window of time - we'll suggest an outing that's nearby, realistic and just right fot the moment. </p>

        <div className="mt-10 flex flex-col gap-10">

        <div>
  <h2 className="text-xl my-3 font-medium">Where are you right now?</h2>
  <input
    type="text"
    onChange={(e) => handleInputChange("city", e.target.value)}
    value={formData?.city || ""}
    placeholder="Enter your current city"
    className="w-full p-3 border rounded-lg bg-white text-gray-800"
  />
</div>
        
                  {/* Mood of Visit */}
                  <div>
  <h2 className="text-xl my-3 font-medium">What's your vibe today?</h2>
  <input
    type="text"
    onChange={(e) => handleInputChange("mood", e.target.value)}
    value={formData?.mood || ""}
    placeholder="Pick a mood: Happy, Chill, Bored, Curious, etc"
    className="w-full p-3 border rounded-lg bg-white text-gray-800"
  />
</div>

        
                  {/* Purpose */}
                  <div>
  <h2 className="text-xl my-3 font-medium">What's the reason for stepping out?</h2>
  <input
    type="text"
    onChange={(e) => handleInputChange("purpose", e.target.value)}
    value={formData?.purpose || ""}
    placeholder="e.g., Catching up with friends - want to party, Just broke up - need a break"
    className="w-full p-3 border rounded-lg bg-white text-gray-800"
  />
</div>



          <div>
            <h2 className="text-xl my-3 font-medium">How much time do you have? (in hours)</h2>
            <Input
              placeholder="e.g. 3"
              type="number"
              onChange={(e) => handleInputChange("hours_available", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelsList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.type_of_people === item.title && "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("type_of_people", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Number of People (Conditional) */}
          {["Family", "Friends"].includes(formData?.type_of_people) && (
            <div>
              <h2 className="text-xl my-3 font-medium">How many people are in your group?</h2>
              <Input
                placeholder="e.g. 4"
                type="number"
                onChange={(e) => handleInputChange("number_of_people", e.target.value)}
              />
            </div>
          )}


          <div>
            <h2 className="text-xl my-3 font-medium">Have a budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.budget === item.title && "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          
          {/* Location Coordinates */}
<div>
  <h2 className="text-xl my-3 font-medium">Where exactly are you?</h2>
  <div className="flex gap-5">
    <input
      type="number"
      step="any"
      onChange={(e) => handleInputChange("lat", e.target.value)}
      value={formData?.lat || ""}
      placeholder="Latitude"
      className="w-1/2 p-3 border rounded-lg bg-white text-gray-800"
    />
    <input
      type="number"
      step="any"
      onChange={(e) => handleInputChange("lon", e.target.value)}
      value={formData?.lon || ""}
      placeholder="Longitude"
      className="w-1/2 p-3 border rounded-lg bg-white text-gray-800"
    />
  </div>
</div>


     
          <div className="my-10 flex justify-center">
            <Button onClick={generateTrip} disabled={loading}>
              Generate my adventure {loading && <Loading />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
