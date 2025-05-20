import Header from "../ui/header";
import LNB from "../ui/lnb";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="flex">
        <LNB />
        {children}
      </div>
    </div>
  );
}
