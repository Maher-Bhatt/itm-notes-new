import { createContext, useContext, useState, ReactNode } from 'react';

interface FocusModeContextType {
  focusMode: boolean;
  toggleFocusMode: () => void;
  setFocusMode: (value: boolean) => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  focusMode: false,
  toggleFocusMode: () => {},
  setFocusMode: () => {},
});

export const FocusModeProvider = ({ children }: { children: ReactNode }) => {
  const [focusMode, setFocusMode] = useState(false);
  const toggleFocusMode = () => setFocusMode((f) => !f);

  return (
    <FocusModeContext.Provider value={{ focusMode, toggleFocusMode, setFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
};

export const useFocusMode = () => useContext(FocusModeContext);
