'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type IframeContextType = {
  isIframe: boolean;
};

const IframeContext = createContext<IframeContextType>({
  isIframe: false,
});

export const useIframe = () => useContext(IframeContext);

export default function IframeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    // Check if window.self is different from window.parent to detect iframe
    try {
      setIsIframe(window.self !== window.parent);
    } catch (e) {
        // If cross-origin restrictions apply, it means we are likely in an iframe (or at least cannot access parent)
       // However, the simple inequality check usually doesn't throw, accessing properties might.
       // The standard way is just comparing the references.
       setIsIframe(true);
    }
  }, []);

  return (
    <IframeContext.Provider value={{ isIframe }}>
      {children}
    </IframeContext.Provider>
  );
}
