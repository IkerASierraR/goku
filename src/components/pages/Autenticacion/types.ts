export type LoginType = 'administrative';

export interface BackendPerfil {
  id: string;
  codigo?: string;
  nombres?: string;
  apellidos?: string;
  email?: string;
  rol?: string;
  tipoLogin?: string;
  avatarUrl?: string;
  estado?: string;
  celular?: string;
  escuela?: string;
  facultad?: string;
  genero?: string;
  numeroDocumento?: string;
  escuelaId?: number;
  escuelaNombre?: string;
}

export interface BackendSession {
  token: string;
  perfil: BackendPerfil;
}

export interface BackendLoginResponse {
  success: boolean;
  message: string;
  perfil: BackendPerfil | null;
  token?: string | null;
}

export interface LoginScreenProps {
  onLoginSuccess?: (session: BackendSession) => void;
}