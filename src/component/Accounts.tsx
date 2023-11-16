import React from "react";
import AccountTable from "./AccountTable";
import NewAccount from "./NewAccount";

const Accounts: React.FC = () => {
  return (
      <>
        <AccountTable/>
        <div style={{marginTop: '20px'}}>
          <NewAccount/>
        </div>
      </>
  );
};

export default Accounts;