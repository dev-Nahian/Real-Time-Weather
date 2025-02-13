import HeartIcon from "../../assets/heart.svg";
import RedHeartIcon from "../../assets/heart-red.svg";
import { useContext, useState, useEffect } from "react";
import { FavouriteContext, WeatherContext } from "../../context";

export default function AddToFavourite() {
  // Contexts
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouriteContext);
  const { weatherData } = useContext(WeatherContext);

  // State
  const [isFavourite, setFavourite] = useState(false);

  const { latitude, longitude, location } = weatherData;

  //  Effects
  useEffect(()=>{
    const found = favourites.find((fav) => fav.location === location)
    setFavourite(found)
  },[])

  // Handler
  function handleFavourites() {
    const found = favourites.find((fav) => fav.location === location);

    if(!found) {
      addToFavourites(latitude, longitude, location)
    }else{
      removeFromFavourites(location)
    }

    setFavourite(!isFavourite);
  }

  
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          onClick={handleFavourites}
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
        >
          <span>Add to Favourite</span>
          <img src={isFavourite ? RedHeartIcon : HeartIcon} alt="heart" />
        </button>
      </div>
    </div>
  );
}
