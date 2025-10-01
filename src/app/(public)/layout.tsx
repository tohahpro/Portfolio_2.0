import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-dvh flex flex-col">
        <Navbar />
        <div className="grow-1">
          {children}
        </div>
        <Footer />
      </main>

    </>
  );
}
