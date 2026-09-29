// src/pages/PostWork.jsx
import { useState } from "react";
import { WORK_CATEGORIES } from "../data/categories";

export default function PostWork({ jobs, onAddJob }) {
      const [title, setTitle] = useState("");
      const [category, setCategory] = useState("electrician");
      const [budget, setBudget] = useState("");
      const [city, setCity] = useState("");
      const [customerPhone, setCustomerPhone] = useState("");
      const [filterCat, setFilterCat] = useState("all");

      const handleSubmit = (e) => {
            e.preventDefault();
            const newJob = {
                  id: Date.now(),
                  title,
                  category,
                  budget: Number(budget),
                  city,
                  customerPhone,
                  postedAt: "अभी-अभी"
            };
            onAddJob(newJob);
            setTitle("");
            setBudget("");
            alert("आपका काम पोस्ट हो गया है! आस-पास के वर्कर्स अब आपसे संपर्क कर सकेंगे।");
      };

      const filteredJobs = jobs.filter(
            (job) => filterCat === "all" || job.category === filterCat
      );

      return (
            <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 16px" }}>
                  {/* काम पोस्ट करने का फॉर्म */}
                  <form onSubmit={handleSubmit} style={styles.form}>
                        <h3 style={{ marginTop: 0 }}>📢 काम की ज़रूरत पोस्ट करें (Post Work Requirement)</h3>

                        <div style={styles.grid}>
                              <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                                    {WORK_CATEGORIES.map((cat) => (
                                          <option key={cat.id} value={cat.id}>
                                                {cat.icon} {cat.name} ({cat.hindi})
                                          </option>
                                    ))}
                              </select>

                              <input
                                    required
                                    placeholder="काम का विवरण (जैसे: 2 कमरे की वायरिंग करानी है)"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={styles.input}
                              />
                        </div>

                        <div style={styles.grid}>
                              <input
                                    required
                                    type="number"
                                    placeholder="बजट / दिहाड़ी (₹)"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    style={styles.input}
                              />
                              <input
                                    required
                                    placeholder="शहर / इलाका (जैसे: Alambagh, Lucknow)"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={styles.input}
                              />
                              <input
                                    required
                                    placeholder="आपका मोबाइल नंबर"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    style={styles.input}
                              />
                        </div>

                        <button type="submit" style={styles.postBtn}>
                              🚀 काम पोस्ट करें
                        </button>
                  </form>

                  {/* वर्कर्स के लिए उपलब्ध काम (Job Board) */}
                  <div style={{ marginTop: "30px" }}>
                        <h3>📋 बाज़ार में उपलब्ध काम ({filteredJobs.length})</h3>

                        {/* आइकन से काम फ़िल्टर करें */}
                        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px" }}>
                              <button
                                    onClick={() => setFilterCat("all")}
                                    style={{
                                          ...styles.filterPill,
                                          background: filterCat === "all" ? "#2563eb" : "#fff",
                                          color: filterCat === "all" ? "#fff" : "#1e293b"
                                    }}
                              >
                                    All Jobs
                              </button>
                              {WORK_CATEGORIES.map((cat) => (
                                    <button
                                          key={cat.id}
                                          onClick={() => setFilterCat(cat.id)}
                                          style={{
                                                ...styles.filterPill,
                                                background: filterCat === cat.id ? "#2563eb" : "#fff",
                                                color: filterCat === cat.id ? "#fff" : "#1e293b"
                                          }}
                                    >
                                          {cat.icon} {cat.name}
                                    </button>
                              ))}
                        </div>

                        {/* काम के कार्ड्स */}
                        <div style={styles.jobGrid}>
                              {filteredJobs.map((job) => {
                                    const catObj = WORK_CATEGORIES.find((c) => c.id === job.category);
                                    return (
                                          <div key={job.id} style={styles.jobCard}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                      <span style={styles.badge}>
                                                            {catObj?.icon} {catObj?.name}
                                                      </span>
                                                      <strong style={{ color: "#16a34a", fontSize: "16px" }}>बजट: ₹{job.budget}</strong>
                                                </div>
                                                <h4 style={{ margin: "12px 0 6px 0" }}>{job.title}</h4>
                                                <small style={{ color: "#64748b" }}>📍 {job.city} • 🕒 {job.postedAt}</small>
                                                <div style={{ marginTop: "14px", textAlign: "right" }}>
                                                      <a href={`tel:${job.customerPhone}`} style={styles.callBtn}>
                                                            📞 मालिक को कॉल करें: {job.customerPhone}
                                                      </a>
                                                </div>
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
}

const styles = {
      form: { background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" },
      grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "12px" },
      input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", width: "100%" },
      postBtn: { background: "#f59e0b", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", width: "100%" },
      filterPill: { padding: "8px 14px", borderRadius: "20px", border: "1px solid #cbd5e1", cursor: "pointer", whiteSpace: "nowrap", fontWeight: "500" },
      jobGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginTop: "16px" },
      jobCard: { background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" },
      badge: { background: "#eff6ff", color: "#1d4ed8", padding: "4px 10px", borderRadius: "6px", fontSize: "13px", fontWeight: "bold" },
      callBtn: { display: "inline-block", background: "#16a34a", color: "#fff", textDecoration: "none", padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold" }
};