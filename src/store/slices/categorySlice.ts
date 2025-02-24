import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  activeCasinoGame: string;
  activeSportsGame: string;
  activeCasinoLeaderboard: string;
  activeFaqGroup: string;
  activeWalletGroup: string;
}

const initialState: CategoryState = {
  activeCasinoGame: "Lobby",
  activeSportsGame: "Lobby",
  activeCasinoLeaderboard: "High Rollers",
  activeFaqGroup: "General",
  activeWalletGroup: "Deposit",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCasinoGame(state, action: PayloadAction<string>) {
      state.activeCasinoGame = action.payload;
    },
    setActiveSportsGame(state, action: PayloadAction<string>) {
      state.activeSportsGame = action.payload;
    },
    resetCasinoGame(state) {
      state.activeCasinoGame = "Lobby";
    },
    resetSportsGame(state) {
      state.activeSportsGame = "Lobby";
    },
    setActiveCasinoLeaderboard(state, action: PayloadAction<string>) {
      state.activeCasinoLeaderboard = action.payload;
    },
    setActiveFaqGroup(state, action: PayloadAction<string>) {
      state.activeFaqGroup = action.payload;
    },
    setActiveWalletGroup(state, action: PayloadAction<string>) {
      state.activeWalletGroup = action.payload;
    },
  },
});

export const {
  setActiveCasinoGame,
  setActiveSportsGame,
  resetCasinoGame,
  resetSportsGame,
  setActiveCasinoLeaderboard,
  setActiveFaqGroup,
  setActiveWalletGroup,
} = categorySlice.actions;
export default categorySlice.reducer;
