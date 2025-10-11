import { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

function ScannerQr({ onClose, onScan }) {
    const [data, setData] = useState("No result");

    const handleScan = (text) => {
        setData(text);
        if (onScan) {
            onScan(text);
        }
    };

    return (
        <section className="bg-[#F8F8F8] flex flex-col rounded items-center relative">
            <button
                onClick={onClose}
                className="absolute right-2 top-0 z-20 p-5 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
                aria-label="Fechar"
                type="button"
            >
                ×
            </button>
            <BarcodeScanner
                onSuccess={handleScan}
                onError={(error) => {
                    if (error) {
                        console.error(error.message);
                    }
                }}
                onLoad={() => console.log("Video feed has loaded!")}
                containerStyle={{ width: "50vh", padding: "10px" }}
            />
            <p className="text-center">{data}</p>
        </section>
    );
}

export default ScannerQr;
