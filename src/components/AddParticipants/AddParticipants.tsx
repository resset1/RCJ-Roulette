import { useState } from "react";
import "./AddParticipants.css";

interface Props {
  onAdd: (name: string) => void;
  currentData: number;
  amounts: string[];
}

function AddParticipants({ onAdd, currentData }: Props) {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount.trim() === "") {
      alert("Por favor, ingresa un monto.");
      return;
    }

    if (currentData >= 18) {
      alert("¡No puedes agregar más montos!");
      return;
    }

    onAdd(amount);
    setAmount("");
  };

  return (
    <div
      className="p-3 p-md-4 rounded-4 w-100"
      style={{
        backgroundColor: "#1A1616",
        border: "1px solid #2C2424",
      }}
    >
      <form className="row g-2 g-md-3 align-items-end" onSubmit={handleSubmit}>
        <div className="col-12 col-sm-8 flex-grow-1">
          <label
            htmlFor="inputParticipant"
            className="form-label text-white fw-bold pb-1 fs-5 mb-1"
          >
            Agrega un Monto
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-pill custom-input"
            id="inputParticipant"
            placeholder="Monto..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              backgroundColor: "#2C2424",
              color: "white",
              border: "1px solid transparent",
              height: "3.2rem",
            }}
          />
        </div>

        <div className="col-12 col-sm-auto">
          <button
            type="submit"
            className="btn btn-danger btn-lg rounded-pill w-100 px-4 px-md-5 fw-bold"
            style={{ height: "3.2rem" }}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddParticipants;
