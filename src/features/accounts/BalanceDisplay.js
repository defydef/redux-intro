import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance, isLoading } = useSelector((store) => store.account);
  useSelector((store) => store.customer);
  return (
    <div className="balance">
      {isLoading ? "loading..." : formatCurrency(balance)}
    </div>
  );
  // return (
  //   <div className="balance">
  //     {isLoading ? "loading..." : formatCurrency(balance)}
  //   </div>
}

// function mapStateToProps(state) {
//   return {
//     balance: state.account.balance,
//   };
// }

// export default connect(mapStateToProps)(BalanceDisplay);
export default BalanceDisplay;
// connect & mapStateToProps: legacy way to connect with Redux store
// useSelector: modern way to connect with Redux store
