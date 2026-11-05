import React from "react";
import { Wheel } from "react-custom-roulette";

interface Props {
  data: any[];
  onWinner: (name: string) => void;
  onReset: () => void;
}

const Roulette = ({ data, onWinner, onReset }: Props) => {
  const [mustSpin, setMustSpin] = React.useState(false);
  const [prizeNumber, setPrizeNumber] = React.useState(0);

  const handleSpinClick = () => {
    if (data.length === 0) return alert("¡Agrega un monto primero!");

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div
      className="p-3 p-md-4 rounded-4 w-100 flex-grow-1 d-flex flex-column justify-content-center"
      style={{ backgroundColor: "#1A1616", border: "1px solid #2C2424" }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 gap-md-4 w-100">
        {data.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center w-100 roulette-wheel-wrapper">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={Math.min(prizeNumber, data.length - 1)}
              data={data}
              onStopSpinning={() => {
                setMustSpin(false);
                onWinner(data[prizeNumber].option);
              }}
            />
          </div>
        ) : (
          <div className="text-secondary py-5 fs-5">Esperando montos...</div>
        )}

        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch align-items-sm-center gap-3 w-100">
          <button
            className="btn btn-danger btn-lg rounded-pill px-5 fw-bold"
            onClick={handleSpinClick}
            disabled={mustSpin || data.length === 0}
          >
            {mustSpin ? "GIRANDO..." : "¡GIRA!"}
          </button>

          <button
            className="btn btn-outline-danger btn-lg rounded-pill px-5 fw-bold"
            onClick={onReset}
            disabled={mustSpin}
          >
            REINICIAR!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
