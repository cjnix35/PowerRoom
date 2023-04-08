import React from "react";

const RefreshContext = React.createContext<(() => void) | null>(null);

export const RefreshProvider = RefreshContext.Provider;
export const RefreshConsumer = RefreshContext.Consumer;
export default RefreshContext;
