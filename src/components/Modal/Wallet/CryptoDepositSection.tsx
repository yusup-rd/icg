import { cryptoCurrencies } from "@/data/currenciesData";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";
import AddressCopy from "./AddressCopy";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { absoluteDropdownMotion, motionVariants } from "@/utils/framerUtil";

const CryptoDepositSection = () => {
  const t = useTranslations("Modal.Wallet.Crypto.Deposit");

  const [selectedCryptocurrency, setSelectedCryptocurrency] = useState(
    cryptoCurrencies[0],
  );
  const [selectedBlockchain, setSelectedBlockchain] = useState(
    selectedCryptocurrency.blockchains.length > 0
      ? selectedCryptocurrency.blockchains[0]
      : null,
  );
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isBlockchainDropdownOpen, setIsBlockchainDropdownOpen] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyDropdownOpen(false);
        if (isBlockchainDropdownOpen) {
          setIsBlockchainDropdownOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isBlockchainDropdownOpen]);

  const handleCurrencyClick = () => {
    setIsCurrencyDropdownOpen((prev) => !prev);
    if (isBlockchainDropdownOpen) {
      setIsBlockchainDropdownOpen(false);
    }
  };

  const handleBlockchainClick = () => {
    setIsBlockchainDropdownOpen((prev) => !prev);
    if (isCurrencyDropdownOpen) {
      setIsCurrencyDropdownOpen(false);
    }
  };

  const mockAddress = "0x695aaf3bb438e2c5e57b60a63fe69366ef16058d";
  const qrValue = `otpauth://totp/MyApp?secret=${mockAddress}&issuer=MyApp`;

  return (
    <div className="flex flex-col gap-3 rounded bg-card p-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm">{t("currencyLabel")}</label>
        <div className="relative" ref={dropdownRef}>
          {/* Custom Currency Dropdown */}
          <div
            className="flex min-h-14 cursor-pointer items-center justify-between rounded bg-white px-3 py-2 shadow-md"
            onClick={handleCurrencyClick}
          >
            <span className="flex items-center gap-2 text-nowrap">
              <div className="size-8">
                <selectedCryptocurrency.Icon
                  className="size-full"
                  style={{ color: selectedCryptocurrency.color }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                  {selectedCryptocurrency.name}
                </span>
                <span className="text-xs opacity-80">
                  {selectedCryptocurrency.fullName}
                </span>
              </div>
            </span>
            <div>
              {isCurrencyDropdownOpen ? (
                <FaChevronDown className="rotate-180 duration-100" />
              ) : (
                <FaChevronDown className="rotate-0 duration-100" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isCurrencyDropdownOpen && (
              <motion.ul
                className="absolute z-10 mt-1 w-full divide-y rounded bg-white py-2 shadow-md"
                {...motionVariants}
                variants={absoluteDropdownMotion}
              >
                {cryptoCurrencies.map((item) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      setSelectedCryptocurrency(item);
                      setSelectedBlockchain(
                        item.blockchains.length > 0
                          ? item.blockchains[0]
                          : null,
                      );
                      setIsCurrencyDropdownOpen(false);
                      setIsBlockchainDropdownOpen(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-8">
                        <item.Icon
                          className="size-full"
                          style={{ color: item.color }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          {item.name}
                        </span>
                        <span className="text-xs opacity-80">
                          {item.fullName}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedCryptocurrency.blockchains.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-sm">{t("networkLabel")}</label>
          <div className="relative">
            {/* Custom Blockchain Network Dropdown */}
            <div
              className="flex min-h-14 cursor-pointer items-center justify-between rounded bg-white px-3 py-2 shadow-md"
              onClick={handleBlockchainClick}
            >
              <span className="flex items-center gap-2 text-nowrap">
                <div className="text-sm font-semibold">
                  {selectedBlockchain?.networkName}
                </div>
              </span>
              {isBlockchainDropdownOpen ? (
                <FaChevronDown className="rotate-180 duration-100" />
              ) : (
                <FaChevronDown className="rotate-0 duration-100" />
              )}
            </div>

            <AnimatePresence>
              {isBlockchainDropdownOpen && (
                <motion.ul
                  className="absolute z-10 mt-1 w-full divide-y rounded bg-white py-2 shadow-md"
                  {...motionVariants}
                  variants={absoluteDropdownMotion}
                >
                  {selectedCryptocurrency.blockchains.map((blockchain) => (
                    <li
                      key={blockchain.networkName}
                      onClick={() => {
                        setSelectedBlockchain(blockchain);
                        setIsBlockchainDropdownOpen(false);
                      }}
                      className="cursor-pointer px-3 py-4 hover:bg-gray-100"
                    >
                      <div className="text-sm">
                        {blockchain.networkName} - {blockchain.fullName} (
                        {blockchain.name})
                      </div>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Address Code */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              {t("depositAddressLabel", {
                currency: selectedCryptocurrency.name,
              })}
            </p>
            <AddressCopy
              address={mockAddress}
              currency={selectedCryptocurrency.name}
            />
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="mx-auto">
              <QRCodeCanvas
                value={qrValue}
                size={150}
                className="rounded-lg bg-white p-2"
              />
            </div>
            <p className="text-center text-sm opacity-80">
              {t("qrLabel", { currency: selectedCryptocurrency.name })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDepositSection;
