// src/pages/Bookings.jsx
export default function Bookings({ bookings, onUpdateStatus, onDeleteBooking, onGoHome }) {
      return (
            <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h2 style={{ margin: 0 }}>📅 मेरी बुकिंग्स (Bookings Dashboard)</h2>
                        <button onClick={onGoHome} style={styles.backBtn}>
                              ⬅️ होमपेज पर जाएँ
                        </button>
                  </div>

                  {bookings.length === 0 ? (
                        <div style={styles.emptyBox}>
                              <p style={{ fontSize: "16px", marginBottom: "12px" }}>
                                    अभी तक कोई वर्कर बुक नहीं किया गया है।
                              </p>
                              <button onClick={onGoHome} style={styles.findBtn}>
                                    🔍 अभी वर्कर ढूँढें और बुक करें
                              </button>
                        </div>
                  ) : (
                        <div style={styles.grid}>
                              {bookings.map((b) => (
                                    <div key={b.id} style={styles.card}>
                                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <strong style={{ fontSize: "16px" }}>👷 वर्कर: {b.workerName}</strong>
                                                <span
                                                      style={{
                                                            ...styles.statusBadge,
                                                            background: b.status === "Completed" ? "#dcfce7" : "#fef3c7",
                                                            color: b.status === "Completed" ? "#166534" : "#92400e"
                                                      }}
                                                >
                                                      {b.status === "Completed" ? "✅ पूरा हुआ" : "⏳ Pending"}
                                                </span>
                                          </div>

                                          <div style={styles.infoBox}>
                                                <div>👤 <strong>कस्टमर:</strong> {b.customerName}</div>
                                                <div>📍 <strong>पता:</strong> {b.address}</div>
                                                <div>📆 <strong>तारीख:</strong> {b.workDate}</div>
                                                <div>💰 <strong>तय दिहाड़ी:</strong> ₹{b.dailyWage}/दिन</div>
                                          </div>

                                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                                                <a href={`tel:${b.workerPhone}`} style={styles.callBtn}>
                                                      📞 कॉल करें ({b.workerPhone})
                                                </a>

                                                {b.status !== "Completed" && (
                                                      <button
                                                            onClick={() => onUpdateStatus(b.id, "Completed")}
                                                            style={styles.doneBtn}
                                                      >
                                                            ✅ काम पूरा हुआ
                                                      </button>
                                                )}

                                                <button
                                                      onClick={() => onDeleteBooking(b.id)}
                                                      style={styles.deleteBtn}
                                                >
                                                      🗑️ हटाएँ
                                                </button>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
}

const styles = {
      backBtn: { padding: "8px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontWeight: "bold" },
      findBtn: { padding: "10px 18px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: "bold" },
      emptyBox: { background: "#fff", padding: "40px 20px", borderRadius: "12px", textAlign: "center", color: "#64748b", border: "1px solid #e2e8f0" },
      grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" },
      card: { background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
      infoBox: { background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", margin: "12px 0", fontSize: "14px", lineHeight: "1.7" },
      statusBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" },
      callBtn: { background: "#2563eb", color: "#fff", textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold" },
      doneBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" },
      deleteBtn: { background: "#fee2e2", color: "#b91c1c", border: "none", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }
};