// src/App.jsx
import { useState, useEffect } from "react";
import { INITIAL_WORKERS } from "./data/categories";
import Home from "./pages/Home";
import WorkerRegister from "./pages/WorkerRegister";
import PostWork from "./pages/PostWork";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [jobs, setJobs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [serverOnline, setServerOnline] = useState(false);

  // 1. Backend से शुरुआती डेटा (Workers, Jobs, Bookings) लोड करना
  const fetchAllData = async () => {
    try {
      const [wRes, jRes, bRes] = await Promise.all([
        fetch(`${API_BASE}/workers`),
        fetch(`${API_BASE}/jobs`),
        fetch(`${API_BASE}/bookings`)
      ]);

      if (wRes.ok && jRes.ok && bRes.ok) {
        setWorkers(await wRes.json());
        setJobs(await jRes.json());
        setBookings(await bRes.json());
        setServerOnline(true);
      }
    } catch (err) {
      console.log("⚠️ Backend से कनेक्ट नहीं हो पाया, लोकल डेटा दिख रहा है।");
      setServerOnline(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 2. नया वर्कर Backend में रजिस्टर करना (POST /api/workers)
  const addWorker = async (newWorker) => {
    try {
      const res = await fetch(`${API_BASE}/workers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorker)
      });
      const savedWorker = await res.json();
      setWorkers([savedWorker, ...workers]);
    } catch {
      setWorkers([newWorker, ...workers]);
    }
  };

  // 3. नया काम Backend में पोस्ट करना (POST /api/jobs)
  const addJob = async (newJob) => {
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob)
      });
      const savedJob = await res.json();
      setJobs([savedJob, ...jobs]);
    } catch {
      setJobs([newJob, ...jobs]);
    }
  };

  // 4. नई बुकिंग Backend में सेव करना (POST /api/bookings)
  const addBooking = async (newBooking) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
      });
      const savedBooking = await res.json();
      setBookings([savedBooking, ...bookings]);
    } catch {
      setBookings([newBooking, ...bookings]);
    }
  };

  // 5. वर्कर का Available / Busy स्टेटस बदलना (PATCH /api/workers/:id/status)
  const toggleWorkerStatus = async (workerId) => {
    setWorkers(
      workers.map((w) =>
        w.id === workerId ? { ...w, available: !w.available } : w
      )
    );
    try {
      await fetch(`${API_BASE}/workers/${workerId}/status`, {
        method: "PATCH"
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 6. वर्कर को Star Rating देना (PATCH /api/workers/:id/rate)
  const rateWorker = async (workerId, stars) => {
    try {
      await fetch(`${API_BASE}/workers/${workerId}/rate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars })
      });
      await fetchAllData();
      alert(`⭐ धन्यवाद! आपने ${stars} स्टार रेटिंग दी है।`);
    } catch {
      alert("रेटिंग अपडेट हो गई!");
    }
  };

  // 7. बुकिंग को Completed मार्क करना (PATCH /api/bookings/:id)
  const updateBookingStatus = async (bookingId, status) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    try {
      await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 8. बुकिंग डिलीट करना (DELETE /api/bookings/:id)
  const deleteBooking = async (bookingId) => {
    setBookings(bookings.filter((b) => b.id !== bookingId));
    try {
      await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top Navbar */}
      <nav style={styles.nav}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2
            style={{ margin: 0, cursor: "pointer", fontSize: "20px", color: "#fff" }}
            onClick={() => setCurrentPage("home")}
          >
            🛠️ Service-Provider
          </h2>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "12px",
              background: serverOnline ? "#166534" : "#991b1b",
              color: "#fff"
            }}
          >
            {/* {serverOnline ? " Backend Connected" : "🟠 Local Mode"} */}
          </span>
        </div>

        <div style={styles.btnGroup}>
          <button onClick={() => setCurrentPage("home")} style={styles.navBtn}>
            🔍 Find worker/वर्कर ढूँढें
          </button>
          <button onClick={() => setCurrentPage("jobs")} style={styles.jobBtn}>
            📢 Post Work Requirement/काम पोस्ट करें / देखें
          </button>
          <button onClick={() => setCurrentPage("bookings")} style={styles.bookingBtn}>
            📅 Booking/बुकिंग्स ({bookings.length})
          </button>
          <button onClick={() => setCurrentPage("register")} style={styles.registerBtn}>
            ➕ Worker Registration/वर्कर रजिस्टर करें
          </button>
        </div>
      </nav>

      {/* Main Pages */}
      {currentPage === "home" && (
        <Home
          workers={workers}
          onBookWorker={addBooking}
          onToggleStatus={toggleWorkerStatus}
          onRateWorker={rateWorker}
        />
      )}

      {currentPage === "jobs" && <PostWork jobs={jobs} onAddJob={addJob} />}

      {currentPage === "bookings" && (
        <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>📅 मेरी बुकिंग्स (Bookings Dashboard)</h2>
            <button onClick={() => setCurrentPage("home")} style={styles.backBtn}>
              ⬅️ होमपेज पर जाएँ
            </button>
          </div>

          {bookings.length === 0 ? (
            <div style={styles.emptyBox}>
              <p style={{ fontSize: "16px", marginBottom: "12px" }}>
                अभी तक कोई वर्कर बुक नहीं किया गया है।
              </p>
              <button onClick={() => setCurrentPage("home")} style={styles.findBtn}>
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
                        onClick={() => updateBookingStatus(b.id, "Completed")}
                        style={styles.doneBtn}
                      >
                        ✅ काम पूरा हुआ
                      </button>
                    )}

                    <button
                      onClick={() => deleteBooking(b.id)}
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
      )}

      {currentPage === "register" && (
        <WorkerRegister
          onAddWorker={addWorker}
          onSwitchToHome={() => setCurrentPage("home")}
        />
      )}
    </div>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", padding: "14px 20px", background: "#1e293b", color: "#fff" },
  btnGroup: { display: "flex", gap: "8px", flexWrap: "wrap" },
  navBtn: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #fff", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "13px" },
  jobBtn: { padding: "8px 12px", borderRadius: "6px", border: "none", background: "#f59e0b", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" },
  bookingBtn: { padding: "8px 12px", borderRadius: "6px", border: "none", background: "#3b82f6", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" },
  registerBtn: { padding: "8px 12px", borderRadius: "6px", border: "none", background: "#22c55e", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" },
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