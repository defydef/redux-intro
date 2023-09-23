import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  // const account = useSelector((store) => store.account);
  // useSelector((store) => store.customer);
  // return <div className="balance">{formatCurrency(account.balance)}</div>;
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
// connect & mapStateToProps: legacy way to connect with Redux store
// useSelector: modern way to connect with Redux store
