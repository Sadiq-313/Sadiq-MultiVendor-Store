import React from 'react';
import { Link } from 'react-router-dom';

import EventStatus from '../Component/EventStatus';
import { events } from '../data/events';
import { useShop } from '../context/ShopContext';

const EventCard = ({ event }) => {
  const { addToCart } = useShop();

  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg md:grid-cols-2 md:p-5">
      {/* Left: image */}
      <Link to={`/product/${event.slug}`} className="flex items-center justify-center">
        <img src={event.image} alt={event.title} className="h-40 w-auto max-w-full object-contain md:h-48" />
      </Link>

      {/* Right: details */}
      <div className="flex flex-col gap-2">
        <Link to={`/product/${event.slug}`}>
          <h2 className="text-base font-bold text-[#1e40af] md:text-lg">{event.title}</h2>
        </Link>
        <p className="text-xs leading-relaxed text-gray-500 md:text-[13px]">{event.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {event.oldPrice && <span className="text-sm text-red-500 line-through">{event.oldPrice}$</span>}
            <span className="text-lg font-bold text-gray-900">{event.price}$</span>
          </div>
          <span className="text-xs font-medium text-indigo-600">{event.sold} sold</span>
        </div>

        <EventStatus endDate={event.endDate} />

        <div className="flex gap-3 pt-1">
          <Link
            to={`/product/${event.slug}`}
            className="rounded-md bg-black px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            See Details
          </Link>
          <button
            type="button"
            onClick={() => addToCart(event, 1)}
            className="rounded-md bg-black px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Events = () => (
  <main className="min-h-screen bg-[#f5f5f4] px-4 py-6 md:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </main>
);

export default Events;