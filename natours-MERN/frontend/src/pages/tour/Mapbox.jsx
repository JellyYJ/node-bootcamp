import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapbox.css";

const Mapbox = ({ locations }) => {
  const mapContainer = useRef(null);
  const bounds = new mapboxgl.LngLatBounds();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieWlqaWEwMSIsImEiOiJjbHNhbGV6dnAwM3VqMmtuemhmMGhndmRnIn0.5znqvxfRGEXcognmqmBP_A";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/yijia01/clujre5tc00q601r5emb79p6e",
      scrollZoom: false,
    });

    map.on("load", () => {
      map.setFog({});
    });

    locations.forEach((loc) => {
      const el = document.createElement("div");
      el.className = "marker";

      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      el.addEventListener("mouseenter", () => {
        new mapboxgl.Popup({
          offset: 30,
        })
          .setLngLat(loc.coordinates)
          .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
          .addTo(map);
      });

      el.addEventListener("mouseleave", () => {
        document
          .querySelectorAll(".mapboxgl-popup")
          .forEach((popup) => popup.remove());
      });

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
    });

    // Clean up
    return () => map.remove();
  }, [locations, bounds]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
        clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
        WebkitClipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
      }}
    />
  );
};

export default Mapbox;
