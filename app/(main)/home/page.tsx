"use client";

import { useEffect, useState } from "react";
import { Notice } from "@/app/api/notice/route";
import NoticeForm from "@/app/ui/NoticeForm";
import NoticeList from "@/app/ui/NoticeList";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [open, setOpen] = useState(false); // ✅ 모달 open 상태

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await fetch("/api/notice");
    const data = await res.json();
    console.log("fetchNotices", data);
    
    if (data.code !== 200) {
      console.log("Failed to fetch notices", data);
      
      alert(data.message || "Failed to fetch notices");
    } else {
      setNotices(data.data?.notices || []);
    }
  };

  return (
    <div>
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4 p-6">
          <h2 className="text-lg font-bold mb-2">📋 공지 목록</h2>

          {/* 공지 작성 다이얼로그 */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>공지 작성</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>공지 작성</DialogTitle>
              </DialogHeader>
              <NoticeForm
                onSuccess={() => {
                  console.log("onSuccess");
                  fetchNotices(); // ✅ 리스트 갱신
                  setOpen(false); // ✅ 모달 닫기
                }}
                onError={(error) => {
                  console.error("onError", error);
                  alert(error); // ✅ 에러 메시지 출력
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* 공지 목록 */}
        <NoticeList notices={notices} />
      </div>
    </div>
  );
};

export default Home;
