"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MenuItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LNBMenuList } from "../lib/constant";

// 단일 링크 메뉴
function LNBLinkItem({ label, path }: { label: string; path: string }) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div className={`px-4 py-2 ${isActive ? "font-bold text-blue-600" : ""}`}>
        {label}
      </div>
    </Link>
  );
}

// Accordion 내부 재귀 렌더링
function RenderMenuList(menu: MenuItem[], parentKey = "") {
  return menu.map((item, idx) => {
    const itemKey = `${parentKey}-${idx}`;

    // 하위 메뉴가 있는 경우
    if (item.children && item.children.length > 0) {
      return (
        <AccordionItem value={itemKey} key={itemKey}>
          <AccordionTrigger className="px-4 py-2 text-left">
            {item.label}
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">
              {RenderMenuList(item.children, itemKey)}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    // 하위 메뉴가 없는 경우 = 단일 링크
    return (
      <div key={itemKey}>
        <LNBLinkItem label={item.label} path={item.path!} />
      </div>
    );
  });
}

// 전체 LNB 컴포넌트
const LNB = () => {
  return (
    <nav className="pc-w-280 border-r">
      <Accordion type="multiple" className="w-full">
        {RenderMenuList(LNBMenuList)}
      </Accordion>
    </nav>
  );
};

export default LNB;
