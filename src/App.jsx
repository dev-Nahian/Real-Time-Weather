

import Page from "./Page";
import {
  WeatherProvider,
  FavouriteProvider,
  LocationProvider,
  UnitProvider,
} from "./provider";

function App() {
  return (
    <LocationProvider>
      <UnitProvider>
        <WeatherProvider>
          <FavouriteProvider>
            <Page />
          </FavouriteProvider>
        </WeatherProvider>
      </UnitProvider>
    </LocationProvider>
  );
}

export default App;
