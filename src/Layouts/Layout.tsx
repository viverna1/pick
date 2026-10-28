import type { ReactNode } from "react";
import Header from "@/Widgets/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-(--gap) p-(--gap)">
      <Header />
      {children}
    </div>
  );
}
