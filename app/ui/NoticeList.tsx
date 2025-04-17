import { Notice } from "../api/notice/route";

export default function NoticeList({ notices }: { notices: Notice[] }) {
  return (
    <>
      {notices.length === 0 ? (
        <p>공지 없음</p>
      ) : (
        <ul className="space-y-2">
          {notices.map((notice) => (
            <li key={notice.id} className="border p-2">
              <h3 className="font-semibold">{notice.title}</h3>
              <p>{notice.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
