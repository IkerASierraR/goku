import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { HORARIOCURSO_API_BASE_URL } from "../../../utils/apiConfig";
import type { CursoItem, CursoPayload, FacultadItem, EscuelaItem } from "./types";

const cursosClient: AxiosInstance = axios.create({
  baseURL: HORARIOCURSO_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000
});

const normalizeError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    if (typeof responseData === "string") {
      return new Error(responseData);
    }
    if (responseData && typeof responseData === "object" && "message" in responseData) {
      const maybeMessage = (responseData as { message?: string }).message;
      if (maybeMessage) {
        return new Error(maybeMessage);
      }
    }
    return new Error(error.message || "No se pudo completar la solicitud en horariocurso-backend.");
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error("No se pudo completar la solicitud en horariocurso-backend.");
};

const unwrap = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
};

export const fetchCursos = async (): Promise<CursoItem[]> =>
  unwrap(cursosClient.get<CursoItem[]>("/api/cursos"));

export const createCurso = async (payload: CursoPayload): Promise<CursoItem> =>
  unwrap(cursosClient.post<CursoItem>("/api/cursos", payload));

export const updateCurso = async (id: number, payload: CursoPayload): Promise<CursoItem> =>
  unwrap(cursosClient.put<CursoItem>(`/api/cursos/${id}`, payload));

export const deleteCurso = async (id: number): Promise<void> =>
  unwrap(cursosClient.delete(`/api/cursos/${id}`));

export const fetchCatalogoFacultades = async (): Promise<FacultadItem[]> =>
  unwrap(cursosClient.get<FacultadItem[]>("/api/horarios/catalogos/facultades"));

export const fetchCatalogoEscuelas = async (): Promise<EscuelaItem[]> =>
  unwrap(cursosClient.get<EscuelaItem[]>("/api/horarios/catalogos/escuelas"));
