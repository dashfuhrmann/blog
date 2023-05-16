import Header from "@/components/Header";
import "../../styles/globals.css";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Blog",
  description: "WIP Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-7xl mx-auto">
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
