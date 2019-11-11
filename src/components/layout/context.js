import React from 'react';

const contextValue = {
  section: 'intro',
  setSection: () => {}
}

export { contextValue };

export default React.createContext(contextValue);
