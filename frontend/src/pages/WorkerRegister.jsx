// src/pages/WorkerRegister.jsx
import { useState } from "react";
import { WORK_CATEGORIES } from "../data/categories";

export default function WorkerRegister({ onAddWorker, onSwitchToHome }) {
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [city, setCity] = useState("");
      const [pincode, setPincode] = useState("");
      const [dailyWage, setDailyWage] = useState("");
      const [experience, setExperience] = useState("");
      const [selectedSkills, setSelectedSkills] = useState([]);
      const [selectedSubSkills, setSelectedSubSkills] = useState([]);

      // एक से ज़्यादा मुख्य काम (Icons) चुनने का फंक्शन
      const toggleSkill = (skillId) => {
            if (selectedSkills.includes(skillId)) {
                  setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
            } else {
                  setSelectedSkills([...selectedSkills, skillId]);
            }
      };

      // Sub-skills चुनने का फंक्शन
      const toggleSubSkill = (sub) => {
            if (selectedSubSkills.includes(sub)) {
                  setSelectedSubSkills(selectedSubSkills.filter((s) => s !== sub));
            } else {
                  setSelectedSubSkills([...selectedSubSkills, sub]);
            }
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            if (selectedSkills.length === 0) {
                  alert("कृपया कम से कम एक काम का आइकन चुनें!");
                  return;
            }

            const newWorker = {
                  id: Date.now(),
                  name,
                  phone,
                  city,
                  pincode,
                  dailyWage: Number(dailyWage),
                  experience: Number(experience),
                  skills: selectedSkills, // Array ऑफ़ आइकन्स
                  subSkills: selectedSubSkills,
                  available: true
            };

            onAddWorker(newWorker);
            alert("रजिस्ट्रेशन सफल! अब आप चुने गए सभी आइकन्स में दिखेंगे।");
            onSwitchToHome();
      };

      return (
            <form onSubmit={handleSubmit} style={styles.form}>
                  <h2>👷 नया वर्कर रजिस्ट्रेशन (Worker Registration)</h2>

                  <div style={styles.row}>
                        <input required placeholder="पूरा नाम" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                        <input required placeholder="मोबाइल नंबर" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
                  </div>

                  <div style={styles.row}>
                        <input required placeholder="शहर (City)" value={city} onChange={(e) => setCity(e.target.value)} style={styles.input} />
                        <input required placeholder="पिनकोड (Pincode)" value={pincode} onChange={(e) => setPincode(e.target.value)} style={styles.input} />
                  </div>

                  <div style={styles.row}>
                        <input required type="number" placeholder="दिहाड़ी / रेट (₹ प्रति दिन)" value={dailyWage} onChange={(e) => setDailyWage(e.target.value)} style={styles.input} />
                        <input required type="number" placeholder="अनुभव (साल में)" value={experience} onChange={(e) => setExperience(e.target.value)} style={styles.input} />
                  </div>

                  <h4>1. आप कौन-कौन से काम कर लेते हैं? (एक से ज़्यादा आइकन चुन सकते हैं)</h4>
                  <div style={styles.iconGrid}>
                        {WORK_CATEGORIES.map((cat) => {
                              const isSelected = selectedSkills.includes(cat.id);
                              return (
                                    <div
                                          key={cat.id}
                                          onClick={() => toggleSkill(cat.id)}
                                          style={{
                                                ...styles.iconBox,
                                                borderColor: isSelected ? "#16a34a" : "#cbd5e1",
                                                background: isSelected ? "#dcfce7" : "#fff"
                                          }}
                                    >
                                          <div style={{ fontSize: "26px" }}>{cat.icon}</div>
                                          <div style={{ fontSize: "13px", fontWeight: "bold" }}>{cat.name}</div>
                                          <small>{cat.hindi}</small>
                                    </div>
                              );
                        })}
                  </div>

                  {/* चुने गए आइकन के हिसाब से Sub-skills दिखाना */}
                  {selectedSkills.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                              <h4>2. इनमें से आप क्या-क्या काम कर लेते हैं? (टिक करें)</h4>
                              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                    {WORK_CATEGORIES.filter((c) => selectedSkills.includes(c.id)).map((cat) =>
                                          cat.subSkills.map((sub) => (
                                                <label key={sub} style={styles.checkboxLabel}>
                                                      <input
                                                            type="checkbox"
                                                            checked={selectedSubSkills.includes(sub)}
                                                            onChange={() => toggleSubSkill(sub)}
                                                      />{" "}
                                                      {sub}
                                                </label>
                                          ))
                                    )}
                              </div>
                        </div>
                  )}

                  <button type="submit" style={styles.submitBtn}>
                        ✅ प्रोफाइल सेव करें
                  </button>
            </form>
      );
}

const styles = {
      form: { maxWidth: "700px", margin: "20px auto", padding: "24px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" },
      row: { display: "flex", gap: "12px", marginBottom: "12px" },
      input: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px" },
      iconGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "10px" },
      iconBox: { border: "2px solid", borderRadius: "10px", padding: "10px", textAlign: "center", cursor: "pointer" },
      checkboxLabel: { background: "#f8fafc", padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", cursor: "pointer", fontSize: "14px" },
      submitBtn: { width: "100%", marginTop: "24px", padding: "14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }
};