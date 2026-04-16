import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
