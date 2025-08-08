import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface MotionContextType {
  isMotionReduced: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
};

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  const [isMotionReduced, setIsMotionReduced] = useState(false);

  const toggleMotion = () => {
    setIsMotionReduced(prev => !prev);
  };

  const value = useMemo(() => ({
    isMotionReduced,
    toggleMotion,
  }), [isMotionReduced]);

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}; 