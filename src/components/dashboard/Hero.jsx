import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import HeroImage from "../../../public/main_image.png"; // Adjust the path as needed

export const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-10 md:mx-56 gap-9" >
      {/* Image above the heading */}
      <img
        src={HeroImage}
        alt="Travel Adventure"
        className="w-screen h-[250px] object-cover mt-10"
      />

      <h1 className="font-extrabold text-4xl text-center">
        <span className="text-red-500 ">
          MoodTrip:
        </span>{" "}
        Your Mood. Your Map. Your Moment.
      </h1>
      <p className="text-xl text-gray-600 text-center">
        Are you ready to party, post a breakup or just bored? MoodTrip gives you a vibe-matched micro-itinerary based on you mood, purpose and location. No planning, just doing.
      </p>
      <Link to={"/create-trip"}>
        <Button>Let's Vibe 🔥</Button>
      </Link>
    </div>
  );
};
