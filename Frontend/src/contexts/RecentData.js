import React from "react";
import { useState } from "react";
const RecentContext = React.createContext({
    refetchUsers: false,
    handleRefetchUsers: () => {},
});
/**
 * Context for the Category Selected
 *
 * @param {React.Component} children Who can access this context
 * @returns {React.Component}
 */
export function RecentContextProvider(props) {
  const [refetchUsers, setRefetchUsers] = useState(false);

  /**
   * Function for the Category Selected
   *
   * @param {boolean} Category  - which indicates if the Category Selected is enabled or not
   */
  function handleRefetchUsers () {
    setRefetchUsers(prev => !prev);
  };

  return (
    <RecentContext.Provider
      value={{
        refetchUsers,
        handleRefetchUsers,
      }}
    >
      {props.children}
    </RecentContext.Provider>
  );
}

// export default RecentContext
export default RecentContext;