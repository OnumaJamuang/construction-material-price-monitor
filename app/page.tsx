const stats = [
  { label: "สินค้าทั้งหมด", value: "0" },
  { label: "แหล่งข้อมูล", value: "1" },
  { label: "ราคาขึ้น", value: "0" },
  { label: "ราคาลง", value: "0" }
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 8 }}>Construction Material Price Monitor</h1>
        <p style={{ margin: 0, color: "#6b7280" }}>
          ระบบสำรวจและติดตามราคาวัสดุก่อสร้างจากหลายแหล่ง
        </p>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {stats.map((item) => (
          <div key={item.label} style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <div style={{ color: "#6b7280", fontSize: 14 }}>{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{item.value}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24, background: "white", padding: 20, borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <h2 style={{ marginTop: 0 }}>แหล่งข้อมูล</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>แหล่ง</th>
              <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>สถานะ</th>
              <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>อัปเดตล่าสุด</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 12 }}>DoHome</td>
              <td style={{ padding: 12 }}>พร้อมพัฒนา adapter</td>
              <td style={{ padding: 12 }}>—</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}