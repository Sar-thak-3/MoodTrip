import React, { useRef, useEffect } from "react";

const GooglePlacesAutocomplete = ({ onSelect, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"],
      fields: ["formatted_address", "geometry", "name"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onSelect(place.formatted_address);
      } else if (place.name) {
        onSelect(place.name);
      }
    });
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder={placeholder || "Enter a city"}
      className="w-full p-3 border rounded-lg"
    />
  );
};

export default GooglePlacesAutocomplete;
