import { useCallback, useEffect, useState } from "react";
import type { CursoItem, CursoPayload } from "../types";
import { createCurso, deleteCurso, fetchCursos, updateCurso } from "../cursosService";

interface CursosState {
  items: CursoItem[];
  loading: boolean;
  error: string | null;
}

export const useCursos = () => {
  const [state, setState] = useState<CursosState>({ items: [], loading: false, error: null });

  const loadCursos = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchCursos();
      setState({ items: data, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudieron cargar los cursos.";
      setState({ items: [], loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    void loadCursos();
  }, [loadCursos]);

  const saveCurso = useCallback(
    async (payload: CursoPayload, id?: number) => {
      const result = id ? await updateCurso(id, payload) : await createCurso(payload);
      setState((prev) => {
        const items = id
          ? prev.items.map((curso) => (curso.idCurso === id ? result : curso))
          : [result, ...prev.items];
        return { ...prev, items };
      });
      return result;
    },
    []
  );

  const removeCurso = useCallback(async (id: number) => {
    await deleteCurso(id);
    setState((prev) => ({
      ...prev,
      items: prev.items.map((curso) =>
        curso.idCurso === id ? { ...curso, estado: false } : curso
      )
    }));
  }, []);

  return {
    cursos: state.items,
    loading: state.loading,
    error: state.error,
    reload: loadCursos,
    saveCurso,
    removeCurso
  };
};
