import React, { useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';

// true karein to sab jawab hamesha khule rahenge (sab sawal screenshot jaise)
const SHOW_ALL_OPEN = false;

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept visa,mastercard,paypal payment method also we have cash on delivery system.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently, we only offer shipping within the United States.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.',
  },
  {
    question: 'What is your return policy?',
    answer:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
  },
];

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-200">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 pt-4 text-left"
    >
      <span className="text-sm font-semibold text-gray-900 md:text-base">{item.question}</span>

      {isOpen ? (
        <FiX className="flex-shrink-0 text-xl text-gray-600" />
      ) : (
        <FiChevronRight className="flex-shrink-0 text-xl text-gray-600" />
      )}
    </button>

    {/* Jawab: sawal ke neeche chhota grey text */}
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="pb-4 pr-10 pt-3 text-xs leading-relaxed text-gray-500">{item.answer}</p>
      </div>
    </div>

    {/* Band hone par neeche thori jagah, taake line sawal se chipki na rahe */}
    {!isOpen && <div className="h-4" />}
  </div>
);

const FAQ = () => {
  // Pehla sawal shuru mein khula (screenshot ki tarah). Sab band chahiye to null likhein.
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">FAQ</h1>

        <div>
          {faqs.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={SHOW_ALL_OPEN || openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;