"use client";

import { useEffect, useCallback, useState } from "react";
import { FaWallet, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slices/walletModalSlice";
import { RootState } from "@/store";
import WalletContentSection from "./WalletContentSection";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { modalMotion, motionVariants, overlayMotion } from "@/utils/framerUtil";

const WalletModal = () => {
  const t = useTranslations("Modal");

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.walletModal.isOpen);

  const [mode, setMode] = useState("fiat-deposit");

  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeModal());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleEscPress);
    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen, handleEscPress]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center md:bg-black/80"
          onClick={(event) =>
            event.target === event.currentTarget && dispatch(closeModal())
          }
          key="overlay"
          {...motionVariants}
          variants={overlayMotion}
        >
          <motion.div
            className="relative flex h-full w-full flex-col bg-white shadow-lg md:max-h-[90vh] md:w-8/12 md:rounded-lg lg:w-6/12"
            key="modal"
            {...motionVariants}
            variants={modalMotion}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span>
                  <FaWallet />
                </span>
                <span className="font-bold">{t("Wallet.label")}</span>
              </div>
              <button
                className="text-gray-500 duration-200 hover:text-gray-800"
                onClick={() => dispatch(closeModal())}
              >
                <FaXmark className="size-5" />
              </button>
            </div>
            <div className="w-full border ring-gray-500"></div>
            <div className="flex-1 overflow-y-auto p-8">
              <WalletContentSection mode={mode} setMode={setMode} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
