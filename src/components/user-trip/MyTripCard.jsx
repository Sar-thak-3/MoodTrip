import { getPlaceDetails, PHOTO_REF_URL } from "@/service/globalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MyTripCard = ({ item, index }) => {
  const photoName = item?.tripData[0]?.photo_ref;

  console.log(photoName)

  const photoUrl = photoName
    ? PHOTO_REF_URL.replace("{NAME}", photoName)
    : "https://via.placeholder.com/300x200?text=No+Image";

  const selection = item?.userSelection || {};

  return (
    <Link to={`/view-trip/${item.id}`}>
      <div className="border rounded-lg hover:scale-105 transition-all hover:shadow-md overflow-hidden w-[300px]">
        <img
          src={photoUrl}
          className="rounded-t-md object-cover w-full h-[150px]"
          alt={selection?.location?.label}
        />
        <div className="p-3 space-y-1">
          <h2 className="font-bold text-lg">{selection?.location?.label}</h2>
          <p className="text-sm text-gray-600">
            {selection?.hours_available} hrs trip • {selection?.budget} budget
          </p>

          <div className="mt-2 text-xs text-gray-500 space-y-0.5">
            <p>City: {selection?.city || 'N/A'}</p>
            <p>Mood: {selection?.mood || 'N/A'}</p>
            <p>Purpose: {selection?.purpose || 'N/A'}</p>
            <p>Time of Day: {selection?.time_of_day || 'N/A'}</p>
            <p>People: {selection?.number_of_people} ({selection?.type_of_people})</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
