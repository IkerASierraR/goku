import { useEffect, useState } from "react";
import { getQrReservasApiUrl } from "../../../utils/apiConfig";

interface QrReservaVerificationPageProps {
  token: string;
}

type VerificationStatus = "loading" | "success" | "error";

export const QrReservaVerificationPage: React.FC<QrReservaVerificationPageProps> = ({ token }) => {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string>("Validando información...");

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      try {
        const response = await fetch(
          getQrReservasApiUrl(`/api/qr/reservas/validar?token=${encodeURIComponent(token)}`)
        );

        if (!response.ok) {
          throw new Error("Token inválido o expirado");
        }

        const data = (await response.json()) as { mensaje?: string } | null;

        if (!isMounted) return;
        setStatus("success");
        setMessage(data?.mensaje ?? "El código QR es válido. Puedes continuar con tu reserva.");
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "No pudimos validar el código QR. Intenta nuevamente más tarde."
        );
      }
    };

    void verifyToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="qr-verification-page">
      <div className="qr-verification-card">
        <div className="qr-verification-status">
          {status === "loading" && <div className="qr-spinner" aria-label="Cargando" />}
          {status === "success" && <span className="qr-status-success">✓</span>}
          {status === "error" && <span className="qr-status-error">✕</span>}
        </div>
        <h1>Verificación de código QR</h1>
        <p className="qr-message">{message}</p>
        <p className="qr-token-hint">Código: {token}</p>
      </div>
    </div>
  );
};