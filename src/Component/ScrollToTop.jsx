import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  // pathname ke saath search bhi: category badalne par bhi upar jaye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;