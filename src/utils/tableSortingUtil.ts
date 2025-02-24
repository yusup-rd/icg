type Referral = {
  id: number;
  username: string;
  registrationDate: string;
  totalDeposits?: number;
  lastDeposit?: number;
  wagered?: number;
  commission?: number;
};

type History = {
  id: number;
  amount: number;
  channel: string;
  bankAccount: number;
  depositDate: string;
  status: string;
  statusDate: string;
};

type RebateAndCashback = {
  id: number;
  amount: number;
  transactionDate: string;
};

type TotalBets = {
  id: number;
  bet: number;
  winLose: number;
  transactionDate: string;
};

type Redeems = {
  id: number;
  number: number;
  transactionDate: string;
  rewardType: string;
  reward: string;
  status: string;
  points: number;
  spins: number;
};

type Points = {
  id: number;
  amount: number;
  type: string;
  turnover: number;
  transactionDate: string;
};

type Sessions = {
  id: number;
  browser: string;
  location: string;
  ip: string;
  usedDate: string;
  action: string;
};

export const sortReferralData = (
  data: Referral[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): Referral[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "username") {
      result = a.username?.localeCompare(b.username ?? "") ?? 0;
    } else if (sortOption === "registrationDate") {
      result =
        new Date(a.registrationDate).getTime() -
        new Date(b.registrationDate).getTime();
    } else if (sortOption === "totalDeposits") {
      result = (a.totalDeposits ?? 0) - (b.totalDeposits ?? 0);
    } else if (sortOption === "lastDeposit") {
      result = (a.lastDeposit ?? 0) - (b.lastDeposit ?? 0);
    } else if (sortOption === "wagered") {
      result = (a.wagered ?? 0) - (b.wagered ?? 0);
    } else if (sortOption === "commission") {
      result = (a.commission ?? 0) - (b.commission ?? 0);
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortHistoryData = (
  data: History[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): History[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "amount") {
      result = a.amount - b.amount;
    } else if (sortOption === "channel") {
      result = a.channel.localeCompare(b.channel);
    } else if (sortOption === "bankAccount") {
      result = a.bankAccount - b.bankAccount;
    } else if (sortOption === "depositDate") {
      result =
        new Date(a.depositDate).getTime() - new Date(b.depositDate).getTime();
    } else if (sortOption === "status") {
      result = a.status.localeCompare(b.status);
    } else if (sortOption === "statusDate") {
      result =
        new Date(a.statusDate).getTime() - new Date(b.statusDate).getTime();
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortRebateAndCashbackData = (
  data: RebateAndCashback[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): RebateAndCashback[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "rebateAmount" || sortOption === "cashbackAmount") {
      result = a.amount - b.amount;
    } else if (sortOption === "transactionDate") {
      result =
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime();
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortTotalBetsData = (
  data: TotalBets[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): TotalBets[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "totalBets") {
      result = a.bet - b.bet;
    } else if (sortOption === "totalWinLose") {
      result = a.winLose - b.winLose;
    } else if (sortOption === "transactionDate") {
      result =
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime();
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortRedeemsData = (
  data: Redeems[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): Redeems[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "number") {
      result = a.number - b.number;
    } else if (sortOption === "transactionDate") {
      result =
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime();
    } else if (sortOption === "rewardType") {
      result = a.rewardType.localeCompare(b.rewardType);
    } else if (sortOption === "reward") {
      result = a.reward.localeCompare(b.reward);
    } else if (sortOption === "status") {
      result = a.status.localeCompare(b.status);
    } else if (sortOption === "usedPoints") {
      result = a.points - b.points;
    } else if (sortOption === "freeSpins") {
      result = a.spins - b.spins;
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortPointsData = (
  data: Points[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): Points[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "points") {
      result = a.amount - b.amount;
    } else if (sortOption === "type") {
      result = a.type.localeCompare(b.type);
    } else if (sortOption === "turnover") {
      result = a.turnover - b.turnover;
    } else if (sortOption === "transactionDate") {
      result =
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime();
    }

    return sortOrder === "asc" ? result : -result;
  });
};

export const sortSessionsData = (
  data: Sessions[],
  sortOption: string,
  sortOrder: "asc" | "desc",
): Sessions[] => {
  return data.sort((a, b) => {
    let result = 0;

    if (sortOption === "browser") {
      result = a.browser.localeCompare(b.browser);
    } else if (sortOption === "near") {
      result = a.location.localeCompare(b.location);
    } else if (sortOption === "ip") {
      result = a.ip.localeCompare(b.ip);
    } else if (sortOption === "lastUsed") {
      result = new Date(a.usedDate).getTime() - new Date(b.usedDate).getTime();
    } else if (sortOption === "action") {
      result = a.action.localeCompare(b.action);
    }

    return sortOrder === "asc" ? result : -result;
  });
};
