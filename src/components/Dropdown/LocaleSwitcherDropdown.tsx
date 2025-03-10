"use client";

import { useState, useTransition } from "react";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { MdLanguage } from "react-icons/md";
import { ImSpinner } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa6";
import { useParams } from "next/navigation";
import flags from "@/utils/flagsUtil";
import Image from "next/image";
import { dropdownMotion, motionVariants } from "@/utils/framerUtil";
import { motion } from "framer-motion";

interface LocaleSwitcherProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  device: "desktop" | "mobile";
}

const LocaleSwitcher = ({
  isExpanded,
  setIsExpanded,
  device,
}: LocaleSwitcherProps) => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingLocale, setPendingLocale] = useState<string | null>(null);
  const pathname = usePathname();
  const params = useParams();

  const toggleDropdown = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsOpen(true);
    } else {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  };

  function changeLocale(nextLocale: string) {
    setPendingLocale(nextLocale);
    startTransition(() => {
      // @ts-expect-error to suppress the TypeScript error in the router.replace() method
      router.replace({ pathname, params }, { locale: nextLocale });
      setPendingLocale(null);
    });
  }

  return (
    <div className="w-full text-nowrap">
      <button
        onClick={toggleDropdown}
        className={`flex w-full items-center justify-between rounded p-2 duration-200 hover:bg-white/20 ${
          device === "mobile" || isExpanded ? "" : "md:justify-center"
        } ${isOpen && isExpanded ? "bg-white/10" : ""}`}
      >
        <div className="flex items-center gap-3">
          <MdLanguage className="size-5" />
          {(device === "mobile" || isExpanded) && (
            <div className="flex items-center gap-1">
              <span>{t("label")}:</span>
              <span>{t("locale", { locale })}</span>
            </div>
          )}
        </div>
        {(isExpanded || device === "mobile") &&
          (isOpen ? (
            <FaChevronDown className="size-3 rotate-180 duration-100" />
          ) : (
            <FaChevronDown className="size-3 rotate-0 duration-100" />
          ))}
      </button>

      <motion.div
        className="mt-2 w-full rounded bg-white/10 py-1"
        {...motionVariants}
        variants={dropdownMotion(isOpen && isExpanded)}
      >
        {routing.locales.map((current) => (
          <button
            key={current}
            onClick={() => changeLocale(current)}
            disabled={isPending}
            className={`block w-full p-2 text-left duration-200 hover:bg-white/20 ${
              locale === current ? "bg-white/40" : ""
            } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex size-4 shrink-0 items-center justify-center rounded-full bg-white">
                <div
                  className={`size-2 rounded-full transition ${
                    locale === current ? "bg-primary" : ""
                  }`}
                />
              </div>
              <Image
                src={flags[current] || flags.en}
                alt={`${current} flag`}
                width={20}
                height={20}
              />
              <div className="flex w-full items-center justify-between gap-3">
                {t("locale", { locale: current })}
                {isPending && pendingLocale === current && (
                  <span className="animate-spin">
                    <ImSpinner />
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default LocaleSwitcher;
