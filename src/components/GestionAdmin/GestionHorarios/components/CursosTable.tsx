import React from "react";
import { Pencil, Trash2, ListChecks, CalendarClock } from "lucide-react";
import type { CursoItem, FacultadItem, EscuelaItem } from "../types";

interface CursosTableProps {
  cursos: CursoItem[];
  loading: boolean;
  search: string;
  onSearch: (value: string) => void;
  facultades: FacultadItem[];
  escuelas: EscuelaItem[];
  facultadFilter: string;
  escuelaFilter: string;
  onFacultadFilterChange: (value: string) => void;
  onEscuelaFilterChange: (value: string) => void;
  onReload: () => void;
  onEdit: (curso: CursoItem) => void;
  onDelete: (curso: CursoItem) => void;
  error?: string | null;
}

export const CursosTable: React.FC<CursosTableProps> = ({
  cursos,
  loading,
  search,
  onSearch,
  facultades,
  escuelas,
  facultadFilter,
  escuelaFilter,
  onFacultadFilterChange,
  onEscuelaFilterChange,
  onEdit,
  onDelete,
  error
}) => {
  const filtered = cursos
    .filter((curso) =>
      search.trim()
        ? curso.nombre.toLowerCase().includes(search.trim().toLowerCase())
        : true
    )
    .filter((curso) =>
      facultadFilter ? `${curso.facultad}` === facultadFilter : true
    )
    .filter((curso) =>
      escuelaFilter ? `${curso.escuela}` === escuelaFilter : true
    );
  const total = cursos.length;
  const activos = cursos.filter((c) => c.estado).length;
  const inactivos = total - activos;
  const escuelasFiltradas = facultadFilter
    ? escuelas.filter((e) => `${e.facultadId}` === facultadFilter)
    : escuelas;

  return (
    <div className="gestion-horarios-card">
      <div className="gestion-horarios-stats">
        <div className="gestion-horarios-stat">
          <ListChecks size={20} />
          <div>
            <p>Total registrados</p>
            <strong>{total}</strong>
          </div>
        </div>
        <div className="gestion-horarios-stat">
          <CalendarClock size={20} />
          <div>
            <p>Activos</p>
            <strong>{activos}</strong>
          </div>
        </div>
        <div className="gestion-horarios-stat">
          <span className="gestion-horarios-dot inactive" />
          <div>
            <p>Inactivos</p>
            <strong>{inactivos}</strong>
          </div>
        </div>
      </div>

      <div className="gestion-horarios-toolbar">
        <div className="gestion-horarios-search">
          <input
            type="search"
            value={search}
            placeholder="Buscar por nombre..."
            onChange={(event) => onSearch(event.target.value)}
          />
          <select
            className="horario-form-input"
            value={facultadFilter}
            onChange={(event) => onFacultadFilterChange(event.target.value)}
          >
            <option value="">Todas las facultades</option>
            {facultades.map((fac) => (
              <option key={fac.id} value={fac.id}>
                {fac.abreviatura ? `${fac.abreviatura} - ${fac.nombre}` : fac.nombre}
              </option>
            ))}
          </select>
          <select
            className="horario-form-input"
            value={escuelaFilter}
            onChange={(event) => onEscuelaFilterChange(event.target.value)}
          >
            <option value="">Todas las escuelas</option>
            {escuelasFiltradas.map((esc) => (
              <option key={esc.id} value={esc.id}>
                {esc.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="gestion-horarios-actions">
          
          <div className="gestion-horarios-meta">
            {filtered.length} resultado{filtered.length === 1 ? "" : "s"} visibles
          </div>
        </div>
      </div>

      {error && <div className="gestion-horarios-error">{error}</div>}

      <div className="horario-table-wrapper">
        <table className="horario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Facultad</th>
              <th>Escuela</th>
              <th>Ciclo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="horario-table-empty">
                  Cargando cursos...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="horario-table-empty">
                  No hay cursos para mostrar.
                </td>
              </tr>
            )}
            {filtered.map((curso) => (
              <tr key={curso.idCurso}>
                <td>{curso.idCurso}</td>
                <td>{curso.nombre}</td>
                <td>{curso.facultadNombre ?? curso.facultad}</td>
                <td>{curso.escuelaNombre ?? curso.escuela}</td>
                <td>{curso.ciclo}</td>
                <td>
                  <span className={`horario-status-badge ${curso.estado ? "activo" : "inactivo"}`}>
                    {curso.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="horario-table-actions">
                    <button
                      type="button"
                      className="horario-action-button edit"
                      onClick={() => onEdit(curso)}
                    >
                      <Pencil size={16} />
                      Editar
                    </button>
                    <button
                      type="button"
                      className="horario-action-button delete"
                      onClick={() => onDelete(curso)}
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
