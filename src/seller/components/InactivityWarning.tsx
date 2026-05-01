// src/seller/components/InactivityWarning.tsx
interface InactivityWarningProps {
  secondsLeft: number;
  onStayLoggedIn: () => void;
  onLogout: () => void;
}

const InactivityWarning = ({ secondsLeft, onStayLoggedIn, onLogout }: InactivityWarningProps) => {
  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 99999,
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "12px",
        padding: "2rem", width: "100%", maxWidth: "400px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)", margin: "0 1rem",
        textAlign: "center",
      }}>
        {/* Icon */}
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⏱️</div>

        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#1a1a1a" }}>
          Still there?
        </h3>
        <p style={{ margin: "0 0 1.5rem", color: "#666", fontSize: "0.9rem", lineHeight: 1.6 }}>
          You've been inactive for a while. For security, you'll be automatically
          logged out in:
        </p>

        {/* Countdown */}
        <div style={{
          backgroundColor: secondsLeft <= 10 ? "#fef2f2" : "#f9f9f9",
          borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem",
          transition: "background-color 0.3s",
        }}>
          <span style={{
            fontSize: "2.5rem", fontWeight: 700,
            color: secondsLeft <= 10 ? "#ef4444" : "#1a1a1a",
          }}>
            {secondsLeft}
          </span>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "#888" }}>
            seconds
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onStayLoggedIn}
            style={{
              flex: 1, padding: "0.75rem",
              backgroundColor: "#1a1a1a", color: "white",
              border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.9rem", fontWeight: 600,
            }}
          >
            Stay Logged In
          </button>
          <button
            onClick={onLogout}
            style={{
              flex: 1, padding: "0.75rem",
              backgroundColor: "white", color: "#555",
              border: "1px solid #ddd", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.9rem",
            }}
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityWarning;