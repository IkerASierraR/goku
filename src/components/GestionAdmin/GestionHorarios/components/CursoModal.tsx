import React from "react";
import { X, Loader2 } from "lucide-react";
import type { CursoFormValues, FacultadItem, EscuelaItem } from "../types";
import { CursoForm } from "./CursoForm";

interface CursoModalProps {
  open: boolean;
  mode: "create" | "edit";
  values: CursoFormValues;
  facultades: FacultadItem[];
  escuelas: EscuelaItem[];
  errors: string[];
  submitting: boolean;
  onChange: (field: keyof CursoFormValues, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const CursoModal: React.FC<CursoModalProps> = ({
  open,
  mode,
  values,
  facultades,
  escuelas,
  errors,
  submitting,
  onChange,
  onSubmit,
  onClose
}) => {
  if (!open) return null;

  return (
    <div className="horario-modal-backdrop">
      <div className="horario-modal">
        <div className="horario-modal-header">
          <div>
            <h3>{mode === "create" ? "Registrar curso" : "Editar curso"}</h3>
            <p>Completa los datos del curso.</p>
          </div>
          <button type="button" className="horario-modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="gestion-horarios-error">
            <ul>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <CursoForm
          values={values}
          onChange={onChange}
          facultades={facultades}
          escuelas={escuelas}
        />

        <div className="horario-modal-footer">
          <button type="button" className="gestion-horarios-btn secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="gestion-horarios-btn primary"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="usuario-modal-spinner" /> Guardando...
              </>
            ) : mode === "create" ? (
              "Guardar"
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
