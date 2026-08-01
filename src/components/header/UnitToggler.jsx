import { useContext } from "react";
import { UnitContext } from "../../context";

export default function UnitToggler() {
  const { unit, toggleUnit } = useContext(UnitContext);

  return (
    <button
      onClick={toggleUnit}
      className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/25 rounded-md transition-all flex items-center justify-center font-semibold text-sm w-10 h-10 shadow-md"
      title={`Switch to ${unit === "C" ? "Fahrenheit" : "Celsius"}`}
      id="unit-toggle-btn"
    >
      °{unit === "C" ? "F" : "C"}
    </button>
  );
}
