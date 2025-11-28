import React from "react";
import type { CursoFormValues, FacultadItem, EscuelaItem } from "../types";

interface CursoFormProps {
  values: CursoFormValues;
  facultades: FacultadItem[];
  escuelas: EscuelaItem[];
  onChange: (field: keyof CursoFormValues, value: string) => void;
}

export const CursoForm: React.FC<CursoFormProps> = ({
  values,
  facultades,
  escuelas,
  onChange
}) => {
  const escuelasFiltradas = values.facultad
    ? escuelas.filter((escuela) => escuela.facultadId === Number(values.facultad))
    : escuelas;

  return (
    <div className="horario-form-grid curso-form-grid">
      <label>
        Nombre
        <input
          type="text"
          value={values.nombre}
          className="horario-form-input"
          onChange={(event) => onChange("nombre", event.target.value)}
          placeholder="Nombre del curso"
          maxLength={30} // Limita a 30 caracteres
        />
      </label>
      <label>
        Facultad
        <select
          value={values.facultad}
          onChange={(event) => onChange("facultad", event.target.value)}
          className="horario-form-input"
        >
          <option value="">Selecciona facultad</option>
          {facultades.map((fac) => (
            <option key={fac.id} value={fac.id}>
              {fac.abreviatura ? `${fac.abreviatura} - ${fac.nombre}` : fac.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Escuela
        <select
          value={values.escuela}
          onChange={(event) => onChange("escuela", event.target.value)}
          className="horario-form-input"
        >
          <option value="">Selecciona escuela</option>
          {escuelasFiltradas.map((esc) => (
            <option key={esc.id} value={esc.id}>
              {esc.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ciclo
        <input
          type="text"
          value={values.ciclo}
          className="horario-form-input"
          onChange={(event) => {
            const value = event.target.value;
            // Solo permite números del 1 al 12, sin letras ni caracteres especiales
            if (value === '' || (/^[1-9][0-2]?$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12)) {
              onChange("ciclo", value);
            }
          }}
          onKeyPress={(event) => {
            // Previene cualquier caracter que no sea número
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          placeholder="Ej. 5"
          inputMode="numeric" // Muestra teclado numérico en móviles
        />
      </label>
      <label>
        Estado
        <select
          value={values.estado}
          onChange={(event) => onChange("estado", event.target.value as CursoFormValues["estado"])}
          className="horario-form-input"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </label>
    </div>
  );
};
