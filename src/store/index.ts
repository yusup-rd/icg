import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import promotionModalReducer from "./slices/promotionModalSlice";
import walletModalReducer from "./slices/walletModalSlice";
import messageModalReducer from "./slices/messageModalSlice";
import supportModalReducer from "./slices/supportModalSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    promotionModal: promotionModalReducer,
    walletModal: walletModalReducer,
    messageModal: messageModalReducer,
    supportModal: supportModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
