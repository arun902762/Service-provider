// src/pages/Home.jsx
import { useState } from "react";
import { WORK_CATEGORIES } from "../data/categories";
import WorkerCard from "../components/WorkerCard";

export default function Home({ workers, onBookWorker, onToggleStatus, onRateWorker }) {
      const [selectedCategory, setSelectedCategory] = useState("all");
      const [searchQuery, setSearchQuery] = useState("");
      const [onlyAvailable, setOnlyAvailable] = useState(false);
      const [sortByPrice, setSortByPrice] = useState("default");

      const getCategoryCount = (catId) => {
            return workers.filter((w) => w.skills.includes(catId)).length;
      };

      const filteredWorkers = workers
            .filter((worker) => {
                  const matchesCategory =
                        selectedCategory === "all" || worker.skills.includes(selectedCategory);

                  const q = searchQuery.toLowerCase();
                  const matchesSearch =
                        worker.name.toLowerCase().includes(q) ||
                        worker.city.toLowerCase().includes(q) ||
                        worker.pincode.includes(q) ||
                        (worker.subSkills &&
                              worker.subSkills.some((s) => s.toLowerCase().includes(q)));

                  const matchesAvailability = !onlyAvailable || worker.available;

                  return matchesCategory && matchesSearch && matchesAvailability;
            })
            .sort((a, b) => {
                  if (sortByPrice === "lowToHigh") return a.dailyWage - b.dailyWage;
                  if (sortByPrice === "highToLow") return b.dailyWage - a.dailyWage;
                  return 0;
            });

      return (
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
                  {/* Search & Filter Bar */}
                  <div style={styles.filterBox}>
                        <input
                              type="text"
                              placeholder="🔍 नाम, शहर, पिनकोड या काम सर्च करें (जैसे: Pipe Leakage, Lucknow)..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              style={styles.searchInput}
                        />

                        <div style={styles.filterControls}>
                              <label style={styles.checkboxLabel}>
                                    <input
                                          type="checkbox"
                                          checked={onlyAvailable}
                                          onChange={(e) => setOnlyAvailable(e.target.checked)}
                                    />
                                    🟢 सिर्फ उपलब्ध (Available) वर्कर दिखाएँ
                              </label>

                              <select
                                    value={sortByPrice}
                                    onChange={(e) => setSortByPrice(e.target.value)}
                                    style={styles.selectInput}
                              >
                                    <option value="default">↕️ दिहाड़ी के हिसाब से छांटें (Sort)</option>
                                    <option value="lowToHigh">💰 कम दिहाड़ी पहले (Low to High)</option>
                                    <option value="highToLow">💎 ज़्यादा दिहाड़ी पहले (High to Low)</option>
                              </select>

                              {(selectedCategory !== "all" || searchQuery || onlyAvailable || sortByPrice !== "default") && (
                                    <button
                                          type="button"
                                          onClick={() => {
                                                setSelectedCategory("all");
                                                setSearchQuery("");
                                                setOnlyAvailable(false);
                                                setSortByPrice("default");
                                          }}
                                          style={styles.resetBtn}
                                    >
                                          ❌ फ़िल्टर हटाएँ
                                    </button>
                              )}
                        </div>
                  </div>

                  {/* Category Icons Grid */}
                  <h3>किस काम के लिए वर्कर चाहिए? (आइकन चुनें)</h3>
                  <div style={styles.iconGrid}>
                        <div
                              onClick={() => setSelectedCategory("all")}
                              style={{
                                    ...styles.iconCard,
                                    borderColor: selectedCategory === "all" ? "#2563eb" : "#e2e8f0",
                                    background: selectedCategory === "all" ? "#eff6ff" : "#fff"
                              }}
                        >
                              <div style={{ fontSize: "28px" }}>📋</div>
                              <div style={{ fontWeight: "bold", fontSize: "14px" }}>All Workers</div>
                              <small style={styles.countBadge}>कुल: {workers.length}</small>
                        </div>

                        {WORK_CATEGORIES.map((cat) => {
                              const isActive = selectedCategory === cat.id;
                              const count = getCategoryCount(cat.id);
                              return (
                                    <div
                                          key={cat.id}
                                          onClick={() => setSelectedCategory(cat.id)}
                                          style={{
                                                ...styles.iconCard,
                                                borderColor: isActive ? "#2563eb" : "#e2e8f0",
                                                background: isActive ? "#eff6ff" : "#fff"
                                          }}
                                    >
                                          <div style={{ fontSize: "28px" }}>{cat.icon}</div>
                                          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{cat.name}</div>
                                          <small style={{ color: "#64748b", display: "block" }}>{cat.hindi}</small>
                                          <small style={styles.countBadge}>{count} वर्कर</small>
                                    </div>
                              );
                        })}
                  </div>

                  {/* Filtered Workers List */}
                  <h3 style={{ marginTop: "30px" }}>
                        उपलब्ध वर्कर्स ({filteredWorkers.length})
                  </h3>

                  {filteredWorkers.length === 0 ? (
                        <div style={styles.emptyBox}>
                              <p style={{ margin: 0, fontSize: "16px" }}>
                                    😕 इस कैटेगरी या लोकेशन में अभी कोई वर्कर नहीं मिला।
                              </p>
                        </div>
                  ) : (
                        <div style={styles.workerGrid}>
                              {filteredWorkers.map((worker) => (
                                    <WorkerCard
                                          key={worker.id}
                                          worker={worker}
                                          onBookWorker={onBookWorker}
                                          onToggleStatus={onToggleStatus}
                                          onRateWorker={onRateWorker}
                                    />
                              ))}
                        </div>
                  )}
            </div>
      );
}

const styles = {
      filterBox: { background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "20px" },
      searchInput: { width: "100%", padding: "12px 16px", fontSize: "15px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "12px" },
      filterControls: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" },
      checkboxLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "500", cursor: "pointer" },
      selectInput: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", cursor: "pointer" },
      resetBtn: { padding: "8px 12px", borderRadius: "8px", border: "none", background: "#fee2e2", color: "#b91c1c", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
      iconGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))", gap: "12px" },
      iconCard: { border: "2px solid", borderRadius: "12px", padding: "12px 8px", textAlign: "center", cursor: "pointer", transition: "0.2s" },
      countBadge: { display: "inline-block", marginTop: "6px", background: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold" },
      emptyBox: { background: "#fff", padding: "30px", borderRadius: "12px", textAlign: "center", color: "#64748b", border: "1px solid #e2e8f0" },
      workerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }
};