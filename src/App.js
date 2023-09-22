import CreateCustomer from "../src/features/customers/CreateCustomer";
import Customer from "../src/features/customers/Customer";
import AccountOperations from "../src/features/accounts/AccountOperations";
import BalanceDisplay from "../src/features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const customerFullName = useSelector((store) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerFullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
