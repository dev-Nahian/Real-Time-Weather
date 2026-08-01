import { useContext, useEffect, useRef } from "react";
import { FavouriteContext, LocationContext } from "../../context";

// eslint-disable-next-line react/prop-types
export default function FavouriteListModal({ onClose }) {
  const { favourites } = useContext(FavouriteContext);
  const { setSelectedLocation } = useContext(LocationContext);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    }
    // Small timeout prevents immediate trigger from the open click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSelect = (fav) => {
    setSelectedLocation({ ...fav });
    if (onClose) onClose();
  };

  return (
    <div ref={modalRef} className="max-w-xs w-60 py-4 bg-white/95 backdrop-blur-md rounded-md border border-gray-100 absolute right-0 top-16 text-black shadow-2xl z-50">
      <h3 className="text-base font-bold px-4 text-gray-800">Favourite Locations</h3>
      <ul className="space-y-1 mt-3 max-h-60 overflow-y-auto">
        {favourites.length > 0 ? (
          favourites.map((fav) => (
            <li
              key={fav.location}
              onClick={() => handleSelect(fav)}
              className="hover:bg-gray-100 py-2 px-4 cursor-pointer transition-colors text-sm font-medium text-gray-700"
            >
              {fav.location}
            </li>
          ))
        ) : (
          <p className="px-4 py-2 text-sm text-gray-500 italic">No favourites added yet.</p>
        )}
      </ul>
    </div>
  );
}
