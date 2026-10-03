import logoImg from '../assets/logocard.png';
import ballImg from '../assets/ball.png';
import houseDetailImg from '../assets/housedetail.png';
import batImg from '../assets/bat.png';
import macImg from '../assets/mac.png';
import victusImg from '../assets/uv9woxgz4fm9lf091squ.jpg';
import hpLaptopImg from '../assets/hplaptop.jpg';
import watchImg from '../assets/watch.png';
import iphoneImg from '../assets/iphonemobile.jpg';
import newMacImg from '../assets/newmac.jpg';

// featured: true wale products Home ke "Featured Products" mein aate hain
export const products = [
  { id: 1, slug: 'orange', category: 'Others', vendor: 'WOW SHOP', title: 'orange', description: 'Fresh and good quality product from WOW SHOP.', rating: 0, price: 20, sold: 10, image: logoImg },
  { id: 2, slug: 'leather-ball', category: 'Others', vendor: 'SK Sports', title: 'Leather Ball', description: 'Test Match Red Ball', rating: 0, price: 10, sold: 8, image: ballImg, featured: true },
  { id: 3, slug: 'green-view', category: 'Others', vendor: 'WOW SHOP', title: 'Green View', description: 'Beautiful house with a green view.', rating: 0, price: 12, sold: 5, image: houseDetailImg },
  { id: 4, slug: 'bat', category: 'Others', vendor: 'SK Sports', title: 'Bat', description: 'Hard ball cricket bat, ready to play.', rating: 0, price: 900, sold: 3, image: batImg, featured: true },
  { id: 5, slug: 'macbook-14-pro', category: 'Computers and Laptops', vendor: 'Omair Electronics', title: 'Macbook 14 pro', description: 'Apple Macbook 14 inch Pro, fast and powerful.', rating: 4.5, price: 8000, sold: 1, image: macImg },
  { id: 6, slug: 'hp-victus-16', category: 'Computers and Laptops', vendor: 'Omair Electronics Jhelum', title: 'Hp Victus 16', description: 'HP Victus 16 gaming laptop with 144Hz display.', rating: 0, price: 90, sold: 0, image: victusImg, featured: true },
  { id: 7, slug: 'hp-laptop-15', category: 'Computers and Laptops', vendor: 'Omair Electronics Jhelum', title: 'Hp Laptop 15', description: 'HP Laptop 15 for daily work and study.', rating: 0, price: 800, sold: 0, image: hpLaptopImg },
  { id: 8, slug: 'smart-watch', category: 'Music and Gaming', vendor: 'WOW SHOP', title: 'Smart Watch', description: 'Smart watch with a bright display and sleep tracking.', rating: 4, price: 20, sold: 0, image: watchImg },
  { id: 9, slug: 'iphone-14-pro', category: 'Mobile and Tablets', vendor: 'Omair Electronics Jhelum', title: 'iPhone 14 Pro', description: 'Apple iPhone 14 Pro with a great camera.', rating: 5, price: 800, sold: 0, image: iphoneImg, featured: true },
  { id: 10, slug: 'new-macbook-pro', category: 'Computers and Laptops', vendor: 'Omair Electronics', title: 'New Macbook Pro', description: 'The latest Macbook Pro, brand new.', rating: 5, price: 8500, sold: 0, image: newMacImg, featured: true },
];