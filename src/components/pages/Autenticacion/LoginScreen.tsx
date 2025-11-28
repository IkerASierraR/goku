import { type FC, useEffect } from 'react';
import './styles/LoginScreen.css';
import type { LoginScreenProps } from './types';
import { useLogin } from './hooks/useLogin';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';

export const LoginScreen: FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const {
    selectedType,
    identifier,
    password,
    captcha,
    captchaInput,
    error,
    loading,
    infoMessage,
    setIdentifier,
    setPassword,
    setCaptchaInput,
    refreshCaptcha,
    handleSubmit,
  } = useLogin(onLoginSuccess);

  useEffect(() => {
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const isDevToolsShortcut =
        (event.ctrlKey && event.shiftKey && (key === 'I' || key === 'J')) ||
        key === 'F12' ||
        (event.ctrlKey && key === 'U');

      if (isDevToolsShortcut) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const subtitleText = 'Portal Administrativo IntegraUPT';

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-panel">
          <LoginHeader selectedType={selectedType} subtitleText={subtitleText} />

          <div className="login-card space-y-6">
            <LoginForm
              identifier={identifier}
              password={password}
              captcha={captcha}
              captchaInput={captchaInput}
              error={error}
              loading={loading}
              infoMessage={infoMessage}
              onIdentifierChange={setIdentifier}
              onPasswordChange={setPassword}
              onCaptchaInputChange={setCaptchaInput}
              onRefreshCaptcha={refreshCaptcha}
              onSubmit={handleSubmit}
            />

            <div className="login-footer space-y-1">
              <p>
                IntegraUPT © {new Date().getFullYear()} Universidad Privada de Tacna
              </p>
              <p className="login-footer-sub">Soporte: soporte@upt.edu.pe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};