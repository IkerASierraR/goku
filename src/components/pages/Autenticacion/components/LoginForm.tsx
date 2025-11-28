import type { FC } from 'react';
import { Loader2, Lock, Mail, RefreshCw } from 'lucide-react';

interface LoginFormProps {
  identifier: string;
  password: string;
  captcha: string;
  captchaInput: string;
  error: string | null;
  loading: boolean;
  infoMessage: string | null;
  onIdentifierChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onCaptchaInputChange: (value: string) => void;
  onRefreshCaptcha: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  identifier,
  password,
  captcha,
  captchaInput,
  error,
  loading,
  infoMessage,
  onIdentifierChange,
  onPasswordChange,
  onCaptchaInputChange,
  onRefreshCaptcha,
  onSubmit,
}) => {

  const handleCaptchaChange = (value: string) => {
    const filteredValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 5);
    onCaptchaInputChange(filteredValue);
  };

  return (
    <div className="space-y-6">
      <form className="login-form space-y-4" onSubmit={onSubmit}>
        <div className="login-form-group space-y-1">
          <label className="login-label" htmlFor="identifier">
            Código universitario o correo electrónico
          </label>
          <div className="login-input-wrapper">
            <Mail className="login-input-icon" />
            <input
              id="identifier"
              className="login-input"
              placeholder="Ej. UPT2024001 o usuario@upt.edu.pe"
              autoComplete="username"
              value={identifier}
              onChange={(event) => onIdentifierChange(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="login-form-group space-y-1">
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <div className="login-input-wrapper">
            <Lock className="login-input-icon" />
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="login-form-group space-y-1">
          <label className="login-label" htmlFor="captcha">
            Código de seguridad
          </label>
          <div className="login-captcha-container">
            <div className="login-captcha-display administrative">
              {captcha}
            </div>
            <button
              type="button"
              className="login-captcha-refresh"
              onClick={onRefreshCaptcha}
              aria-label="Actualizar código de seguridad"
            >
              <RefreshCw className="login-captcha-icon" />
            </button>
          </div>

          <input
            id="captcha"
            className="login-input"
            placeholder="Ingresa los 5 caracteres mostrados"
            value={captchaInput}
            onChange={(event) => handleCaptchaChange(event.target.value)}
            maxLength={5}
            pattern="[A-Za-z0-9]{5}"
            title="Ingresa exactamente 5 caracteres (letras o números)"
            required
          />
          
          <div className="login-captcha-counter">
            {captchaInput.length}/5 caracteres
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}
        {infoMessage && !error && (
          <div className="login-test-credentials login-test-admin">
            {infoMessage}
          </div>
        )}

        <button
          type="submit"
          className="login-submit-btn login-submit-admin"
          disabled={loading || captchaInput.length !== 5}
        >
          {loading ? (
            <span className="login-loading space-x-2">
              <Loader2 className="login-spinner" />
              Procesando...
            </span>
          ) : (
            <span>Iniciar sesión</span>
          )}
        </button>
      </form>
    </div>
  );
};