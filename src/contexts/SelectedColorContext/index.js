import { createContext, useState } from "react";
import { masterColors } from "../../utils";

export const SelectedColorContext = createContext({
    selectedColor : masterColors[0],
    setSelectedColor : () => {},
});

const ColorContextProvider = ({children}) => {
    const [selectedColor, setSelectedColor] = useState(masterColors[0]);
    return (
      <SelectedColorContext.Provider value={{selectedColor, setSelectedColor}}>
        {children}
      </SelectedColorContext.Provider>
    );
}
export default ColorContextProvider;