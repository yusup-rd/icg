"use client";

import { historyMockData } from "@/data/tableMockData";
import { useEffect, useState } from "react";
import SortByDropdown from "../Dropdown/SortByDropdown";
import Pagination from "../Layout/Pagination";
import { sortHistoryData } from "@/utils/tableSortingUtil";
import { FaBoxOpen } from "react-icons/fa6";
import DateRangeDropdown from "../Dropdown/DateRangeDropdown";
import { useTranslations } from "next-intl";

const HistoryTable = () => {
  const t = useTranslations("ProfilePage.History.Table");

  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("statusDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleSortChange = (optionKey: string) => {
    if (optionKey === sortOption) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(optionKey);
      setSortOrder("desc");
    }
  };

  // Mock existing or empty data
  const sortedRows = sortHistoryData(historyMockData, sortOption, sortOrder);
  // const sortedRows = sortHistoryData([], sortOption, sortOrder);

  // Filter by date range
  const filteredRows = sortedRows.filter((history) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const date = new Date(history.statusDate);
    return date >= dateRange[0] && date <= dateRange[1];
  });

  const rowsPerPage = 5;
  const totalRows = filteredRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Options to be passed to the SortByDropdown component
  const sortOptions = [
    { key: "amount", label: t("amount") },
    { key: "channel", label: t("channel") },
    { key: "bankAccount", label: t("bankAccount") },
    { key: "depositDate", label: t("depositDate") },
    { key: "status", label: t("status") },
    { key: "statusDate", label: t("statusDate") },
  ];

  return (
    <div className="flex">
      <div className="flex w-0 flex-1 flex-col">
        {/* Sorting */}
        <div className="hidden justify-between gap-3 md:flex md:flex-col lg:flex-row">
          <div>
            {currentRows.length > 0 && (
              <SortByDropdown
                options={sortOptions}
                selectedOption={sortOption}
                sortOrder={sortOrder}
                setSortOption={handleSortChange}
              />
            )}
          </div>
          <div>
            <DateRangeDropdown
              dateInfo={t("statusDate")}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pb-1">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="h-14 opacity-80">
                <th className="text-nowrap px-4 py-2">{t("amount")}</th>
                <th className="hidden text-nowrap px-4 py-2 sm:table-cell">
                  {t("channel")}
                </th>
                <th className="hidden text-nowrap px-4 py-2 md:table-cell">
                  {t("bankAccount")}
                </th>
                <th className="hidden text-nowrap px-4 py-2 md:table-cell">
                  {t("depositDate")}
                </th>
                <th className="hidden text-nowrap px-4 py-2 sm:table-cell">
                  {t("status")}
                </th>
                <th className="text-nowrap px-4 py-2">{t("statusDate")}</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((history) => (
                  <tr
                    key={history.id}
                    className="h-14 text-center odd:bg-card even:bg-white"
                  >
                    <td className="max-w-14 rounded-l px-4 py-2">
                      {history.amount}
                    </td>
                    <td className="hidden max-w-14 whitespace-nowrap px-4 py-2 sm:table-cell">
                      {history.channel}
                    </td>
                    <td className="hidden max-w-14 px-4 py-2 md:table-cell">
                      {history.bankAccount}
                    </td>
                    <td className="hidden max-w-14 px-4 py-2 md:table-cell">
                      {history.depositDate}
                    </td>
                    <td className="hidden max-w-14 overflow-hidden whitespace-nowrap px-4 py-2 sm:table-cell">
                      {history.status}
                    </td>
                    <td className="max-w-14 whitespace-nowrap rounded-r px-4 py-2">
                      {history.statusDate}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-14 text-center odd:bg-card even:bg-white">
                  <td colSpan={6} className="rounded py-4">
                    <div className="flex items-center justify-center gap-3 opacity-60">
                      <FaBoxOpen className="size-8" />
                      <span className="text-sm">{t("empty")}</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        {currentRows.length > 0 && (
          <div className="flex justify-end">
            <div className="my-4 w-fit rounded bg-card p-2">
              <span className="text-sm font-semibold opacity-80">
                <span>{t("total")}: </span>
                {filteredRows.length > 0
                  ? filteredRows.reduce((acc, row) => acc + row.amount, 0)
                  : sortedRows.reduce((acc, row) => acc + row.amount, 0)}
              </span>
            </div>
          </div>
        )}

        {/* Pagination */}
        {currentRows.length > 0 && (
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
