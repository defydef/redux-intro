import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 10,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const CURR_CONVERSION_URL = "api.frankfurter.app";

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(loanAmount, loanPurpose) {
        return {
          payload: { loanAmount, loanPurpose },
        };
      }, // Converting payload into object before passing it to the reducer,
      // because action creator in RTK by default only can receive 1 param as payload
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.loanAmount;
        state.balance += Number(action.payload.loanAmount);
        state.loanPurpose = action.payload.loanPurpose;
      },
    },
    payLoan(state) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});
console.log(accountSlice);

export default accountSlice.reducer;
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/setLoading":
//       return { ...state, isLoading: true };
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     try {
//       // Set isLoading as true
//       dispatch(loading());
//       // API call
//       const res = await fetch(
//         `https://${CURR_CONVERSION_URL}/latest?amount=${amount}&from=${currency}&to=USD`
//       );
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       if (data.Response === "False") throw new Error();
//       const convertedAmount = data.rates.USD;
//       // return action
//       dispatch({ type: "account/deposit", payload: Number(convertedAmount) });
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }

// export function loading() {
//   return { type: "account/setLoading" };
// }
