import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../config';

import EventStatus from '../Component/EventStatus';
import { useShop } from '../context/ShopContext';

const EventCard = ({ event }) => {
  const { addToCart } = useShop();
  const eId = event._id || event.slug;
  const eImg = event.images?.[0] || event.image;
  const eTitle = event.name || event.title;
  const eOldPrice = event.originalPrice || event.oldPrice;
  const ePrice = event.discountPrice || event.price;
  const eSold = event.sold_out || event.sold || 0;

  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg md:grid-cols-2 md:p-5">
      {/* Left: image */}
      <Link to={`/product/${eId}`} className="flex items-center justify-center">
        <img src={eImg} alt={eTitle} className="h-40 w-auto max-w-full object-contain md:h-48" />
      </Link>

      {/* Right: details */}
      <div className="flex flex-col gap-2">
        <Link to={`/product/${eId}`}>
          <h2 className="text-base font-bold text-[#1e40af] md:text-lg">{eTitle}</h2>
        </Link>
        <p className="text-xs leading-relaxed text-gray-500 md:text-[13px]">{event.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {eOldPrice && <span className="text-sm text-red-500 line-through">\${eOldPrice}</span>}
            <span className="text-lg font-bold text-gray-900">\${ePrice}</span>
          </div>
          <span className="text-xs font-medium text-indigo-600">{eSold} sold</span>
        </div>

        <EventStatus endDate={event.endDate || '2026-12-31T00:00:00'} />

        <div className="flex gap-3 pt-1">
          <Link
            to={`/product/${eId}`}
            className="rounded-md bg-black px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 cursor-pointer"
          >
            See Details
          </Link>
          <button
            type="button"
            onClick={() => addToCart(event, 1)}
            className="rounded-md bg-black px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${server}/event/get-all-events`);
        if (data.success && data.events) {
          setEventsList(data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-6 md:px-12">
      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">Loading events...</p>
        </div>
      ) : eventsList.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">No active events found!</p>
        </div>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          {eventsList.map((event) => (
            <EventCard key={event._id || event.slug} event={event} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Events;