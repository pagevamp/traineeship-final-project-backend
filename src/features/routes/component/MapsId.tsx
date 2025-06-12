"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

const MapsId = () => {
  const [selectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [position, setPosition] = useState("");
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const mapRef = useRef<google.maps.Map | null>(null);
  const router = useRouter();

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
  }, [selectedDate, orders]);

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

  const handleHourChange = (value: number) => {
    let newValue = value;
    if (newValue > 12) newValue = 12;
    if (newValue < 1) newValue = 1;
    setHours(newValue);
  };

  const handleMinuteChange = (value: number) => {
    let newValue = value;
    if (newValue > 59) newValue = 59;
    if (newValue < 0) newValue = 0;
    setMinutes(newValue);
  };

  const togglePeriod = () => {
    setPeriod(period === "AM" ? "PM" : "AM");
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative">
      <div className="flex justify-between font-primary">
        <span>Setup A Route</span>

        <div className="date-picker pr-16">
          <label htmlFor="order-date">Select Date: </label>
          <input
            type="date"
            id="order-date"
            className="bg-transparent text-[14px]"
          />
        </div>
      </div>

      <div
        className="map-container relative"
        style={{ width: "100%", height: "500px" }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
          }}
          onLoad={onMapLoad}
        >
          {filteredOrders.map((order) => (
            <Marker
              key={order.orderId}
              position={{ lat: order.lat, lng: order.lng }}
            />
          ))}
          <Marker position={depotLocation} />
          <Polyline
            path={generateRoutePath()}
            options={{
              strokeColor: "#FF6502",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
        </GoogleMap>

        <div className="absolute inset-0 bg-[#00000091] rounded-[10px] flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center bg-gradient-to-r from-[#FF6502] to-[#FF8826] text-white px-4 py-2 rounded-md"
            >
              Set Position
              <svg
                className="w-4 h-4 ml-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10 p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter position"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border rounded">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={hours}
                        onChange={(e) =>
                          handleHourChange(parseInt(e.target.value))
                        }
                        className="w-12 px-2 py-1 text-center border-0 focus:ring-0"
                      />
                    </div>

                    <button
                      onClick={togglePeriod}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      {period}
                    </button>
                  </div>
                </div>
                <div>
                  <Button
                    className="bg-gradient-to-r from-[#FF6502] to-[#E3802A] font-primary font-light text-white h-full w-full p-2 my-2"
                    onClick={() => router.push("/routes")}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsId;
