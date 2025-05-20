import Header from "../ui/header";
import LNB from "../ui/lnb";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="flex w-full h-full">
        <LNB />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
