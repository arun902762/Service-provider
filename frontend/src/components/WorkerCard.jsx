// src/components/WorkerCard.jsx
import { useState } from "react";
import { WORK_CATEGORIES } from "../data/categories";

export default function WorkerCard({ worker, onBookWorker, onToggleStatus, onRateWorker }) {
      const [showModal, setShowModal] = useState(false);
      const [customerName, setCustomerName] = useState("");
      const [address, setAddress] = useState("");
      const [workDate, setWorkDate] = useState("");

      const workerCategories = WORK_CATEGORIES.filter((cat) =>
            worker.skills.includes(cat.id)
      );

      const handleBookingSubmit = (e) => {
            e.preventDefault();
            onBookWorker({
                  id: Date.now(),
                  workerId: worker.id,
                  workerName: worker.name,
                  workerPhone: worker.phone,
                  dailyWage: worker.dailyWage,
                  customerName,
                  address,
                  workDate,
                  status: "Pending"
            });
            setShowModal(false);
            setCustomerName("");
            setAddress("");
            setWorkDate("");
            alert(`✅ ${worker.name} के लिए आपकी बुकिंग कन्फर्म हो गई है!`);
      };

      const whatsappMsg = encodeURIComponent(
            `नमस्ते ${worker.name} जी, मुझे KaamWala ऐप से आपका नंबर मिला। मुझे काम के सिलसिले में बात करनी है।`
      );

      return (
            <div style={styles.card}>
                  <div style={styles.header}>
                        <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                                    <h3 style={{ margin: 0 }}>{worker.name}</h3>
                                    {worker.verified !== false && (
                                          <span style={styles.verifiedBadge} title="ID Verified Worker">
                                                ✔ Verified
                                          </span>
                                    )}
                              </div>
                              <small style={{ color: "#555", display: "block", marginTop: "4px" }}>
                                    📍 {worker.city} ({worker.pincode}) • {worker.experience} yrs exp
                              </small>
                        </div>
                        <span style={styles.wageBadge}>₹{worker.dailyWage}/दिन</span>
                  </div>

                  {/* Star Rating Bar */}
                  <div style={styles.ratingRow}>
                        <span style={{ fontWeight: "bold", color: "#b45309", fontSize: "13px" }}>
                              ⭐ {worker.rating || "4.5"} ({worker.reviewsCount || 1} रिव्यू)
                        </span>
                        {onRateWorker && (
                              <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                                    <small style={{ color: "#64748b", marginRight: "4px", fontSize: "12px" }}>रेट करें:</small>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                          <button
                                                key={star}
                                                type="button"
                                                onClick={() => onRateWorker(worker.id, star)}
                                                style={styles.starBtn}
                                                title={`${star} Star दें`}
                                          >
                                                ★
                                          </button>
                                    ))}
                              </div>
                        )}
                  </div>

                  {/* काम के आइकन्स */}
                  <div style={styles.badgeContainer}>
                        {workerCategories.map((cat) => (
                              <span key={cat.id} style={styles.skillBadge}>
                                    {cat.icon} {cat.name}
                              </span>
                        ))}
                  </div>

                  {worker.subSkills?.length > 0 && (
                        <p style={{ fontSize: "13px", color: "#444", margin: "8px 0" }}>
                              <strong>काम:</strong> {worker.subSkills.join(", ")}
                        </p>
                  )}

                  {/* Availability Status */}
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span
                              onClick={() => onToggleStatus && onToggleStatus(worker.id)}
                              title="स्टेटस बदलने के लिए क्लिक करें"
                              style={{
                                    color: worker.available ? "#16a34a" : "#dc2626",
                                    fontWeight: "bold",
                                    fontSize: "13px",
                                    cursor: "pointer"
                              }}
                        >
                              ● {worker.available ? "Available Now (उपलब्ध)" : "Busy (व्यस्त)"} 🔄
                        </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={styles.footer}>
                        <a href={`tel:${worker.phone}`} style={styles.callBtn}>
                              📞 Call
                        </a>
                        <a
                              href={`https://wa.me/91${worker.phone}?text=${whatsappMsg}`}
                              target="_blank"
                              rel="noreferrer"
                              style={styles.waBtn}
                        >
                              💬 WhatsApp
                        </a>
                        <button
                              type="button"
                              onClick={() => setShowModal(true)}
                              disabled={!worker.available}
                              style={{
                                    ...styles.bookBtn,
                                    background: worker.available ? "#1e293b" : "#94a3b8"
                              }}
                        >
                              📅 बुक करें
                        </button>
                  </div>

                  {/* Booking Popup Modal */}
                  {showModal && (
                        <div style={styles.modalOverlay}>
                              <form onSubmit={handleBookingSubmit} style={styles.modal}>
                                    <h3 style={{ marginTop: 0 }}>📅 {worker.name} को बुक करें</h3>
                                    <input
                                          required
                                          placeholder="आपका नाम"
                                          value={customerName}
                                          onChange={(e) => setCustomerName(e.target.value)}
                                          style={styles.input}
                                    />
                                    <input
                                          required
                                          placeholder="काम का पूरा पता (Address)"
                                          value={address}
                                          onChange={(e) => setAddress(e.target.value)}
                                          style={styles.input}
                                    />
                                    <input
                                          required
                                          type="date"
                                          value={workDate}
                                          onChange={(e) => setWorkDate(e.target.value)}
                                          style={styles.input}
                                    />
                                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                                          <button type="submit" style={styles.confirmBtn}>
                                                ✅ कन्फर्म करें
                                          </button>
                                          <button
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                                style={styles.cancelBtn}
                                          >
                                                रद्द करें
                                          </button>
                                    </div>
                              </form>
                        </div>
                  )}
            </div>
      );
}

const styles = {
      card: { border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
      header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
      verifiedBadge: { background: "#dbeafe", color: "#1e40af", fontSize: "11px", padding: "2px 6px", borderRadius: "6px", fontWeight: "bold" },
      wageBadge: { background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px" },
      ratingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fffbeb", padding: "6px 10px", borderRadius: "8px", marginTop: "10px" },
      starBtn: { background: "transparent", border: "none", color: "#f59e0b", fontSize: "17px", cursor: "pointer", padding: "0 2px" },
      badgeContainer: { display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0" },
      skillBadge: { background: "#eff6ff", color: "#1d4ed8", padding: "4px 10px", borderRadius: "6px", fontSize: "13px", fontWeight: "500" },
      footer: { display: "flex", gap: "8px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" },
      callBtn: { flex: 1, textAlign: "center", background: "#2563eb", color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold" },
      waBtn: { flex: 1, textAlign: "center", background: "#16a34a", color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold" },
      bookBtn: { flex: 1, color: "#fff", border: "none", padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" },
      modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "16px" },
      modal: { background: "#fff", padding: "20px", borderRadius: "12px", width: "100%", maxWidth: "380px" },
      input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
      confirmBtn: { flex: 1, padding: "10px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
      cancelBtn: { flex: 1, padding: "10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }
};