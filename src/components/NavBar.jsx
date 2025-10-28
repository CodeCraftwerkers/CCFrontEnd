export default function NavBar() {
  return (
    <nav
      style={{
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          height: "70px",
        }}
      >
       
        <img
          src="/LogoMobile.svg"
          alt="Logo"
          style={{
            height: "40px",
            objectFit: "contain",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "#333",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Iniciar Sesión
          </button>
          <button
            style={{
              background: "#7e22ce",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
}
