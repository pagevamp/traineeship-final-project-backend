"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Radius } from "lucide-react";

interface Order {
  orderId: string;
  date: string;
  address: string;
  lat: number;
  lng: number;
}

interface Depot {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

const center = {
  lat: 40.76,
  lng: -73.9506,
};

const depotLocation: Depot = {
  lat: 40.73061,
  lng: -73.935242,
};

const Maps = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [mapKey, setMapKey] = useState<number>(0); // Key to force remount
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdm8vsgtOEbxfTfmB56_s2SjSaMhk8g4I",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/orders.json");
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const filtered = orders.filter((order) => order.date === selectedDate);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
    setMapKey((prev) => prev + 1);
  }, [selectedDate, orders]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const generateRoutePath = useCallback(() => {
    if (filteredOrders.length < 2) return [];
    return [
      depotLocation,
      ...filteredOrders.map((order) => ({ lat: order.lat, lng: order.lng })),
      depotLocation,
    ];
  }, [filteredOrders]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      if (filteredOrders.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(depotLocation);
        filteredOrders.forEach((order) => {
          bounds.extend(new window.google.maps.LatLng(order.lat, order.lng));
        });
        map.fitBounds(bounds);
      } else {
        map.setCenter(depotLocation);
        map.setZoom(14);
      }
    },
    [filteredOrders]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="order-map-container relative">
      <div className="flex justify-end font-primary">
        {/* <span className="text-base pb-2">Setup A Route</span> */}

        <div className="date-picker pb-2">
          <label htmlFor="order-date">Select Date: </label>
          <input
            type="date"
            id="order-date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-transparent text-[14px]"
          />
        </div>
      </div>

      <GoogleMap
        key={`map-${mapKey}`}
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={{ streetViewControl: false, mapTypeControl: false }}
        onLoad={onMapLoad}
      >
        <Marker
          position={depotLocation}
          icon={{
            url: "/Depot.svg",
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40), // Center bottom of icon
          }}
          label={{
            text: "End Route",
            className: "depot-marker-label p-2",
            color: "#6707C8",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        />

        {filteredOrders.map((order) => (
          <Marker
            key={order.orderId}
            position={{ lat: order.lat, lng: order.lng }}
            icon={{
              url: "/locations.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 40),
            }}
            label={{
              text: order.orderId,
              className: "map-label",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/routes/1")}
          />
        ))}

        {filteredOrders.length >= 2 && (
          <Polyline
            path={generateRoutePath()}
            options={{
              strokeColor: "#9B49FA",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Maps;
