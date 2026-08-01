import { UnitContext } from "../context";
import { useLocalStorage } from "../hooks";

// eslint-disable-next-line react/prop-types
const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useLocalStorage("tempUnit", "C"); // "C" or "F"

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export default UnitProvider;
