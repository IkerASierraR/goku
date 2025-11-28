import type { CursoFormValues, CursoPayload } from "./types";

export const createEmptyCursoForm = (): CursoFormValues => ({
  nombre: "",
  facultad: "",
  escuela: "",
  ciclo: "",
  estado: "activo"
});

const NUMERIC_REGEX = /^[0-9]+$/;

export const validateCursoForm = (values: CursoFormValues): string[] => {
  const errors: string[] = [];
  if (!values.nombre.trim()) {
    errors.push("El nombre es obligatorio.");
  } else if (values.nombre.trim().length < 3 || values.nombre.trim().length > 100) {
    errors.push("El nombre debe tener entre 3 y 100 caracteres.");
  }
  if (!values.facultad.trim()) {
    errors.push("Selecciona una facultad.");
  } else if (!NUMERIC_REGEX.test(values.facultad.trim())) {
    errors.push("La facultad es obligatoria y debe ser numerica.");
  }
  if (!values.escuela.trim()) {
    errors.push("Selecciona una escuela.");
  } else if (!NUMERIC_REGEX.test(values.escuela.trim())) {
    errors.push("La escuela es obligatoria y debe ser numerica.");
  }
  if (!values.ciclo.trim()) {
    errors.push("El ciclo es obligatorio.");
  } else if (values.ciclo.trim().length > 2) {
    errors.push("El ciclo no debe superar 2 caracteres.");
  }
  return errors;
};

export const buildCursoPayload = (values: CursoFormValues): CursoPayload => ({
  nombre: values.nombre.trim(),
  facultad: Number(values.facultad),
  escuela: Number(values.escuela),
  ciclo: values.ciclo.trim(),
  estado: values.estado === "activo"
});
