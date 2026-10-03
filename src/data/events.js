import watchImg from '../assets/watch.png';
import giftImg from '../assets/gift.png';
import houseDetailImg from '../assets/housedetail.png';
import houseImg from '../assets/house.png';

// popular: true wala event Home ke "Popular Event" mein aata hai
export const events = [
  {
    id: 101,
    slug: 'biggest-sale',
    category: 'Events',
    vendor: 'Pak MultiVendor Store',
    title: 'Biggest sale',
    description:
      'Apple Watch Series 11. The default choice for most people, featuring an upgraded LTPO3 wide-angle OLED display that is up to 40% brighter when viewed at an angle. Packs new advanced wellness capabilities like a daily Sleep Score and trends related to Hypertension (high blood pressure). Built with an aluminum display that offers 2x better scratch resistance over previous generations and has a 24-hour battery life.',
    rating: 0,
    oldPrice: null,
    price: 89,
    sold: 0,
    endDate: '2026-10-16T00:00:00', // aage ki date rakhein to countdown chalega
    image: watchImg,
  },
  {
    id: 102,
    slug: 'big-sale',
    category: 'Events',
    vendor: 'Pak MultiVendor Store',
    title: 'Big Sale',
    description: 'A jao mela loot lo',
    rating: 0,
    oldPrice: 900,
    price: 300,
    sold: 15,
    endDate: '2026-09-01T00:00:00',
    image: giftImg,
    popular: true,
  },
  {
    id: 103,
    slug: 'sale',
    category: 'Events',
    vendor: 'Pak MultiVendor Store',
    title: 'Sale',
    description: 'Big Sale',
    rating: 0,
    oldPrice: 95,
    price: 81,
    sold: 7,
    endDate: '2026-09-10T00:00:00',
    image: houseDetailImg,
  },
  {
    id: 104,
    slug: 'new-product-launch-discount',
    category: 'Events',
    vendor: 'Pak MultiVendor Store',
    title: 'New Product launch discount',
    description: 'Very good product',
    rating: 0,
    oldPrice: 999,
    price: 700,
    sold: 0,
    endDate: '2026-09-20T00:00:00',
    image: houseImg,
  },
];