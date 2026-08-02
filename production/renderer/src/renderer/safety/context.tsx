import { createContext, useContext } from "react";

type SafetyContextType = { show: boolean };

const SafetyContext = createContext<SafetyContextType>({ show: false });

export const SafetyProvider = SafetyContext.Provider;
export const useSafetyContext = () => useContext(SafetyContext);
