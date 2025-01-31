"use client";

import { FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";

const ReferralLink = () => {
  const referralLink = "fafa.com/?c=GjsUVhQJ";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast(
      <div className="flex items-center gap-2 font-semibold text-primary">
        <FaCopy />
        <span>Referral link copied!</span>
      </div>,
      {
        className: "primary-toast",
        closeButton: false,
      },
    );
  };

  return (
    <div className="flex">
      <div className="w-0 flex-1">
        <div className="flex flex-col items-center gap-6 rounded bg-card p-4 shadow-md">
          <p className="w-full opacity-80">
            Ready to earn commission? Tap the &apos;Copy Referral Link&apos;
            button and share your default campaign.
          </p>
          <div className="flex w-full items-center gap-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              onClick={handleCopy}
              className="h-fit min-w-0 max-w-40 flex-1 cursor-pointer truncate rounded px-4 py-2 text-sm shadow-md"
            />
            <button
              onClick={handleCopy}
              className="text-nowrap rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-md duration-200 hover:scale-105 hover:bg-secondary"
            >
              Copy Referral Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralLink;
