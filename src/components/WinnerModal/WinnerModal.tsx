interface Props {
  winner: string | null;
  onClose: () => void;
}

const WinnerModal = ({ winner, onClose }: Props) => {
  if (!winner) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content rounded-4 text-white text-center p-4"
          style={{
            backgroundColor: "#1A1616",
            border: "1px solid #2C2424",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-body d-flex flex-column align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle mb-2"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "rgba(223, 52, 40, 0.15)",
                color: "#df3428",
              }}
            >
              <i className="bi bi-trophy-fill fs-1"></i>
            </div>

            <h4
              className="fw-bold mb-0 text-uppercase"
              style={{
                color: "#9ca3af",
                letterSpacing: "1px",
                fontSize: "0.9rem",
              }}
            >
              ¡Felicitaciones! Has ganado.
            </h4>

            <h2 className="display-5 fw-bold my-2 text-white">{winner}$</h2>

            <button
              type="button"
              className="btn btn-danger btn-lg rounded-pill px-5 fw-bold mt-3"
              onClick={onClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
