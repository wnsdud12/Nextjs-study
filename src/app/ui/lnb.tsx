import Link from "next/link";
import React from "react";

const LNB = () => {
  return (
    <div className="pc-min-w-200 border-r-1 border-button-border-line">
      <Link href="/notice" className="flex items-center gap-2.5 pc-p-20">회원정보</Link>
      <Link href="/notice" className="flex items-center gap-2.5 pc-p-20">매장</Link>
      <Link href="/notice" className="flex items-center gap-2.5 pc-p-20">매장</Link>
    </div>
  );
};

export default LNB;
