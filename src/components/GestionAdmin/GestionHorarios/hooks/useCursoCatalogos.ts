import { useCallback, useEffect, useState } from "react";
import type { FacultadItem, EscuelaItem } from "../types";
import { fetchCatalogoEscuelas, fetchCatalogoFacultades } from "../cursosService";

interface CursoCatalogosState {
  facultades: FacultadItem[];
  escuelas: EscuelaItem[];
  loading: boolean;
  error: string | null;
}

export const useCursoCatalogos = () => {
  const [state, setState] = useState<CursoCatalogosState>({
    facultades: [],
    escuelas: [],
    loading: false,
    error: null
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const [facultades, escuelas] = await Promise.all([
        fetchCatalogoFacultades(),
        fetchCatalogoEscuelas()
      ]);
      setState({ facultades, escuelas, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudieron cargar los catalogos.";
      setState({ facultades: [], escuelas: [], loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    facultades: state.facultades,
    escuelas: state.escuelas,
    loading: state.loading,
    error: state.error,
    reload: load
  };
};
