import * as React from 'react';
import {useRef, useEffect, ReactNode} from 'react';
import {useLoggerContext} from '../contexts/LoggerContext';
import '../scss/coordinate-logger.scss';

interface CoordinateLoggerProps {
  children: ReactNode;
}

const generateId = () => `logger-${Math.random().toString(36).substr(2, 9)}`;

export const CoordinateLogger: React.FC<CoordinateLoggerProps> = ({children}) => {
  const {dispatch} = useLoggerContext();
  const loggerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(generateId());

  const calculateCenter = () => {

    if (!loggerRef.current) return {x: 0, y: 0};

    const childrenElements = loggerRef.current.children;

    let totalLeft = 0,
      totalTop = 0,
      totalRight = 0,
      totalBottom = 0;

    Array.from(childrenElements).forEach(child => {

      const rect = (child as HTMLElement).getBoundingClientRect();

      const left = rect.left -
        Number(window.getComputedStyle(child).getPropertyValue("margin-left").replace('px', ''));
      if (totalLeft === 0 || totalLeft > left) {
        totalLeft = left
      }

      const top = rect.top -
        Number(window.getComputedStyle(child).getPropertyValue("margin-top").replace('px', ''));
      if (totalTop === 0 || totalTop > top) {
        totalTop = top
      }

      const right = rect.right +
        Number(window.getComputedStyle(child).getPropertyValue("margin-right").replace('px', ''));
      if (totalRight === 0 || totalRight < right) totalRight = right

      const bottom = rect.bottom +
          Number(window.getComputedStyle(child).getPropertyValue("margin-bottom").replace('px', ''));
      if (totalBottom === 0 || totalBottom < bottom) {

        totalBottom = bottom
      }

      // без учета margin
      //   totalLeft += rect.left;
      //   totalTop += rect.top;
      //   totalRight += rect.right;
      //   totalBottom += rect.bottom;

    });

    // без учета margin
    // const count = childrenElements.length;
    // const centerX = (totalRight + totalLeft) / (2 * count);
    // const centerY = (totalBottom + totalTop) / (2 * count);

    const centerX = (totalRight + totalLeft) / 2;
    const centerY = (totalBottom + totalTop) / 2;

    return {x: centerX, y: centerY};
  };

  useEffect(() => {
    const center = calculateCenter();
    dispatch({type: 'ADD_LOGGER', id: idRef.current, center});

    return () => {
      dispatch({ type: 'REMOVE_LOGGER', id: idRef.current });
    };
  }, [children]);

  return (
    <>
      <div className="coordinate-logger" ref={loggerRef}>
        {children}
      </div>
      <div
        className="center-point" id="point"
        style={{left: `${calculateCenter().x}px`, top: `${calculateCenter().y}px`}}
      />
    </>
  );
};
