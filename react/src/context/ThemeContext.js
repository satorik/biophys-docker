import React from 'react';

const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {
  return (
    <ThemeContext.Provider value={props.value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };