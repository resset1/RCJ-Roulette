import React from "react";
import { Wheel } from "react-custom-roulette";

interface Props {
  data: any[];
  onWinner: (name: string) => void;
}

const Roulette = ({ data, onWinner }: Props) => {
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
      <div className="d-flex flex-column align-items-center justify-content-center gap-2 gap-md-3 w-100">
        <img
          src={`${import.meta.env.BASE_URL}LOGO_ROYAL.png`}
          alt="Royal Casino Jirahara"
          style={{
            width: "clamp(130px, 18vh, 190px)",
            height: "auto",
            objectFit: "contain",
          }}
        />

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

        <div className="d-flex justify-content-center align-items-center w-100">
          <button
            className="btn btn-danger btn-lg rounded-pill px-5 fw-bold"
            onClick={handleSpinClick}
            disabled={mustSpin || data.length === 0}
          >
            {mustSpin ? "GIRANDO..." : "¡GIRA!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
