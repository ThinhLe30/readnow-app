import {createContext, useState} from 'react';

const LoginRequiredContext = createContext({});

function LoginRequiredProvider({children}) {
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  const handleLoginRequired = isRequired => {
    setIsLoginRequired(isRequired);
  };
  const contextValue = {isLoginRequired, handleLoginRequired};
  return (
    <LoginRequiredContext.Provider value={contextValue}>
      {children}
    </LoginRequiredContext.Provider>
  );
}
export {LoginRequiredContext, LoginRequiredProvider};
