import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.top - 27, left: rect.left - 60 });
    }
  }, [visible]);

  return (
    <>
      <div
        ref={ref}
        className="relative flex items-center"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            className="absolute bg-zinc-600 text-white py-0.5 px-1.5 rounded text-xs z-50"
            style={{ top: coords.top, left: coords.left }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
};
