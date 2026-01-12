import { useCallback, useRef } from 'react';

const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Custom hook that provides a scroll function which temporarily disables
 * scroll-snap during programmatic scrolling to work around Safari bugs.
 * Uses manual animation with requestAnimationFrame for Safari compatibility.
 *
 * @param {string} containerId - The ID of the scroll container
 * @returns {function} scrollToElement - Function to scroll to a named element
 */
const useSnapScroll = (containerId) => {
  const isScrollingRef = useRef(false);

  const scrollToElement = useCallback((elementName, duration = 500) => {
    if (isScrollingRef.current) return;

    const container = document.getElementById(containerId);
    const targetElement = document.getElementById(elementName);

    if (!container || !targetElement) return;

    isScrollingRef.current = true;

    // Store and disable scroll-snap
    const originalSnapType = container.style.scrollSnapType;
    container.style.scrollSnapType = 'none';

    // Calculate positions
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const startTop = container.scrollTop;
    const targetTop = targetRect.top - containerRect.top + startTop;
    const distance = targetTop - startTop;

    // Manual smooth scroll with requestAnimationFrame
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      container.scrollTop = startTop + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Re-enable snap after animation
        container.style.scrollSnapType = originalSnapType || '';
        isScrollingRef.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }, [containerId]);

  return scrollToElement;
};

export default useSnapScroll;
