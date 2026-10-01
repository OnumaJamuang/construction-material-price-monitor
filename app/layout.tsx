export const metadata = {
  title: "Construction Material Price Monitor",
  description: "สำรวจและติดตามราคาวัสดุก่อสร้างจากหลายแหล่ง"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f6f7f9", color: "#111827" }}>
        {children}
      </body>
    </html>
  );
}