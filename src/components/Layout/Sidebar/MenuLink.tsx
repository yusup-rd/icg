"use client";

import { JSX } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { dropdownMotion, motionVariants } from "@/utils/framerUtil";

interface MenuLinkProps {
  link: {
    name: string;
    label?: string;
    type: "dropdown" | "link" | string;
    icon: JSX.Element;
    href?: string;
    items?: Array<string | { name: string; href: string }>;
  };
  isExpanded: boolean;
  submenuOpen: string | null;
  toggleSubmenu: (item: string) => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuLink = ({
  link,
  isExpanded,
  submenuOpen,
  toggleSubmenu,
  setIsExpanded,
}: MenuLinkProps) => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const isActive = link.href && pathname.startsWith(link.href);

  return (
    <div className="mb-2 overflow-hidden text-nowrap duration-200">
      {link.type === "dropdown" ? (
        <>
          <button
            onClick={() => {
              if (!isExpanded) setIsExpanded(true);
              toggleSubmenu(link.name);
            }}
            className={`flex w-full items-center justify-between rounded p-2 ${submenuOpen === link.name ? "bg-white/10" : "hover:bg-white/20"}`}
          >
            <div
              className={`flex items-center gap-3 ${!isExpanded ? "w-full justify-center" : ""}`}
            >
              <span>{link.icon}</span>
              {isExpanded && <span>{t(link.name)}</span>}
            </div>
            {isExpanded && (
              <span className="ml-2">
                <div
                  className={`transition-transform duration-100 ${submenuOpen === link.name ? "rotate-180" : "rotate-0"}`}
                >
                  <FaChevronDown className="size-3" />
                </div>
              </span>
            )}
          </button>

          <motion.div
            className="flex flex-col"
            {...motionVariants}
            variants={dropdownMotion(submenuOpen === link.name && isExpanded)}
          >
            <div
              className={`my-2 rounded ${submenuOpen === link.name ? "bg-white/10" : "hover:bg-white/20"}`}
            >
              <div className="my-1">
                {link.items?.map((item) => (
                  <div
                    key={typeof item === "object" ? item.name : item}
                    className={`p-2 duration-200 last:rounded-b hover:bg-white/20 ${typeof item === "object" && pathname === item.href ? "bg-white/40" : ""}`}
                  >
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="flex items-center gap-3"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <Link
          href={link.href || "#"}
          className={`flex w-full items-center gap-3 rounded p-2 duration-200 hover:bg-white/20 ${isExpanded ? "" : "md:justify-center"} ${isActive ? "bg-white/40" : ""}`}
        >
          <span>{link.icon}</span>
          {isExpanded && <span>{t(link.name)}</span>}
        </Link>
      )}
    </div>
  );
};

export default MenuLink;
