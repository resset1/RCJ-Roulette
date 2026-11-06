import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Roulette from "./components/Roulette/Roulette";
import AddParticipants from "./components/AddParticipants/AddParticipants";
import Footer from "./components/Footer/Footer";
import WinnerModal from "./components/WinnerModal/WinnerModal";
import { useEffect, useRef, useState } from "react";

const createAmountChipImage = (
  text: string,
  chipImg: HTMLImageElement | null,
): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const height = 200;
  const font = "bold 40px Helvetica, Arial, sans-serif";
  const iconSize = 56;
  const gap = 12;
  const paddingX = 16;

  ctx.font = font;
  const textWidth = Math.ceil(ctx.measureText(text).width);
  const totalWidth = textWidth + gap + iconSize + paddingX * 2;

  canvas.width = totalWidth;
  canvas.height = height;

  ctx.font = font;
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(text, paddingX, height / 2);

  if (chipImg && chipImg.complete && chipImg.naturalWidth > 0) {
    ctx.drawImage(
      chipImg,
      paddingX + textWidth + gap,
      (height - iconSize) / 2,
      iconSize,
      iconSize,
    );
  }

  return canvas.toDataURL("image/png");
};

const DEFAULT_VALUES = [
  "50",
  "60",
  "80",
  "100",
  "150",
  "200",
  "50",
  "60",
  "80",
  "100",
  "150",
  "200",
  "50",
  "60",
  "80",
  "100",
  "50",
  "60",
];

const buildAmountsList = (
  values: string[],
  chipImg: HTMLImageElement | null,
) =>
  values.map((value, index) => ({
    option: value,
    image: {
      uri: createAmountChipImage(value, chipImg),
      landscape: true,
      sizeMultiplier: 1,
    },
    style: {
      backgroundColor: index % 2 === 0 ? "#df3428" : "#1A1616",
      textColor: "white",
    },
  }));

function App() {
  const [amounts, setAmounts] = useState<any[]>(() =>
    buildAmountsList(DEFAULT_VALUES, null),
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const chipImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}FICHA.png`;
    img.onload = () => {
      chipImageRef.current = img;
      setAmounts((prev) =>
        prev.map((item) => ({
          ...item,
          image: {
            uri: createAmountChipImage(item.option, img),
            landscape: true,
            sizeMultiplier: 1,
          },
        })),
      );
    };
    chipImageRef.current = img;
  }, []);

  const addParticipant = (name: string) => {
    const newAmount = {
      option: name,
      image: {
        uri: createAmountChipImage(name, chipImageRef.current),
        landscape: true,
        sizeMultiplier: 1,
      },
      style: {
        backgroundColor: amounts.length % 2 === 0 ? "#df3428" : "#1A1616",
        textColor: "white",
      },
    };
    setAmounts([...amounts, newAmount]);
  };

  const handleResetAll = () => {
    setAmounts([]);
    setWinner(null);
  };

  const handleWinner = (winnerAmount: string) => {
    setWinner(winnerAmount);
  };

  return (
    <div
      style={{
        backgroundColor: "#121010",
        minHeight: "100dvh",
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main className="container-fluid px-3 px-md-5 py-3 flex-grow-1 d-flex flex-column position-relative">
        <div className="d-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setIsSettingsOpen(true)}
            title="Configuración"
          >
            <i className="fi fi-rr-settings fs-4 d-flex"></i>
          </button>
        </div>

        <div className="row g-3 justify-content-center w-100 m-0 flex-grow-1">
          <div className="col-12 col-xl-9 d-flex flex-column flex-grow-1 p-0">
            <div className="d-flex flex-column gap-3 flex-grow-1">
              <Roulette data={amounts} onWinner={handleWinner} />
            </div>
          </div>
        </div>
      </main>

      {isSettingsOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div
              className="modal-content rounded-4 text-white p-3 p-md-4"
              style={{
                backgroundColor: "#1A1616",
                border: "1px solid #2C2424",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                  <i className="fi fi-rr-settings d-flex text-danger"></i>
                  Configuración de Montos
                </h5>
              </div>

              <div className="modal-body p-0">
                <AddParticipants
                  onAdd={addParticipant}
                  currentData={amounts.length}
                  amounts={amounts.map((p) => p.option)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-pill px-4 fw-bold"
                  onClick={handleResetAll}
                >
                  REINICIAR!
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill px-4 fw-bold"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <WinnerModal winner={winner} onClose={() => setWinner(null)} />

      <Footer />
    </div>
  );
}

export default App;
