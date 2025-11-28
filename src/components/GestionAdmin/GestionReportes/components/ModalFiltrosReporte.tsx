import React, { useState, useEffect } from "react";
import { X, Building, Users, Calendar, Filter } from "lucide-react";
import type { FiltrosReporte } from "../types";

interface ModalFiltrosReporteProps {
  open: boolean;
  onClose: () => void;
  onAplicarFiltros: (filtros: FiltrosReporte) => void;
  filtrosActuales?: FiltrosReporte;
}

// Datos mock para facultades y escuelas (deberías reemplazar con datos reales de tu API)
const FACULTADES = [
  { id: 1, nombre: "Facultad de Ingeniería" },
  { id: 2, nombre: "Facultad de Derecho y Ciencias Políticas" },
  { id: 3, nombre: "Facultad de Ciencias Empresariales" },
  { id: 4, nombre: "Facultad de Educación, Ciencias de la Comunicación" },
  { id: 5, nombre: "Facultad de Ciencias De la Salud" },
  { id: 6, nombre: "Facultad de Arquitectura y Urbanismo" }
];

const ESCUELAS = [
  { id: 1, facultadId: 1, nombre: "Ing. Civil" },
  { id: 2, facultadId: 1, nombre: "Ing. de Sistemas" },
  { id: 3, facultadId: 1, nombre: "Ing. Electronica" },
  { id: 4, facultadId: 1, nombre: "Ing. Agroindustrial" },
  { id: 5, facultadId: 1, nombre: "Ing. Ambiental" },
  { id: 6, facultadId: 1, nombre: "Ing. Industrial" },
  { id: 7, facultadId: 2, nombre: "Derecho" },
  { id: 8, facultadId: 3, nombre: "Ciencias Contables y Financieras" },
  { id: 9, facultadId: 3, nombre: "Economia y Microfinanzas" },
  { id: 10, facultadId: 3, nombre: "Administracion" }
];

const TIPOS_USUARIO = [
  { id: 1, nombre: "Docentes" },
  { id: 2, nombre: "Estudiantes" },
  { id: 3, nombre: "Administrativos" }
];

const SEMESTRES = [
  { id: "marzo-julio", nombre: "Marzo - Julio" },
  { id: "agosto-diciembre", nombre: "Agosto - Diciembre" }
];

export const ModalFiltrosReporte: React.FC<ModalFiltrosReporteProps> = ({
  open,
  onClose,
  onAplicarFiltros,
  filtrosActuales = {}
}) => {
  const [filtrosLocales, setFiltrosLocales] = useState<FiltrosReporte>(filtrosActuales);
  const [escuelasFiltradas, setEscuelasFiltradas] = useState(ESCUELAS);

  useEffect(() => {
    setFiltrosLocales(filtrosActuales);
  }, [filtrosActuales, open]);

  useEffect(() => {
    if (filtrosLocales.facultadId) {
      const escuelasFiltradas = ESCUELAS.filter(escuela => 
        escuela.facultadId === filtrosLocales.facultadId
      );
      setEscuelasFiltradas(escuelasFiltradas);
      
      // Si la escuela actual no pertenece a la facultad seleccionada, limpiarla
      if (filtrosLocales.escuelaId && !escuelasFiltradas.some(e => e.id === filtrosLocales.escuelaId)) {
        setFiltrosLocales(prev => ({ ...prev, escuelaId: undefined }));
      }
    } else {
      setEscuelasFiltradas(ESCUELAS);
    }
  }, [filtrosLocales.facultadId]);

  const handleFacultadChange = (facultadId: number | undefined) => {
    setFiltrosLocales(prev => ({ 
      ...prev, 
      facultadId,
      escuelaId: undefined // Reset escuela cuando cambia facultad
    }));
  };

  const handleEscuelaChange = (escuelaId: number | undefined) => {
    setFiltrosLocales(prev => ({ ...prev, escuelaId }));
  };

  const handleTipoUsuarioChange = (tipoUsuario: number | undefined) => {
    setFiltrosLocales(prev => ({ ...prev, tipoUsuario }));
  };

  const handleSemestreChange = (semestre: string | undefined) => {
    setFiltrosLocales(prev => ({ ...prev, semestre }));
  };

  const handleFechaInicioChange = (fechaInicio: string) => {
    setFiltrosLocales(prev => ({ ...prev, fechaInicio }));
  };

  const handleFechaFinChange = (fechaFin: string) => {
    setFiltrosLocales(prev => ({ ...prev, fechaFin }));
  };

  const handleAplicar = () => {
    onAplicarFiltros(filtrosLocales);
    onClose();
  };

  const handleLimpiar = () => {
    const filtrosVacios: FiltrosReporte = {};
    setFiltrosLocales(filtrosVacios);
  };

  const tieneFiltros = filtrosLocales.facultadId || filtrosLocales.escuelaId || 
                      filtrosLocales.tipoUsuario || filtrosLocales.semestre || 
                      filtrosLocales.fechaInicio;

  if (!open) {
    return null;
  }

  return (
    <div className="gestion-reportes-modal-backdrop" role="dialog" aria-modal="true">
      <div className="gestion-reportes-modal gestion-reportes-modal-lg">
        <div className="gestion-reportes-modal-header">
          <div>
            <h3>Filtrar Reportes</h3>
            <p>Selecciona los criterios para filtrar los datos del reporte</p>
          </div>
          <button
            type="button"
            className="gestion-reportes-modal-close"
            aria-label="Cerrar modal"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="gestion-reportes-modal-content">
          <div className="gestion-reportes-filtros-grid">
            {/* Facultad */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Building size={16} />
                Facultad
              </label>
              <select
                className="gestion-reportes-filtro-select"
                value={filtrosLocales.facultadId || ""}
                onChange={(e) => handleFacultadChange(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Todas las facultades</option>
                {FACULTADES.map(facultad => (
                  <option key={facultad.id} value={facultad.id}>
                    {facultad.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Escuela */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Building size={16} />
                Escuela
              </label>
              <select
                className="gestion-reportes-filtro-select"
                value={filtrosLocales.escuelaId || ""}
                onChange={(e) => handleEscuelaChange(e.target.value ? Number(e.target.value) : undefined)}
                disabled={!filtrosLocales.facultadId}
              >
                <option value="">Todas las escuelas</option>
                {escuelasFiltradas.map(escuela => (
                  <option key={escuela.id} value={escuela.id}>
                    {escuela.nombre}
                  </option>
                ))}
              </select>
              {!filtrosLocales.facultadId && (
                <small style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  Selecciona una facultad primero
                </small>
              )}
            </div>

            {/* Tipo de Usuario */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Users size={16} />
                Tipo de Usuario
              </label>
              <select
                className="gestion-reportes-filtro-select"
                value={filtrosLocales.tipoUsuario || ""}
                onChange={(e) => handleTipoUsuarioChange(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Todos los usuarios</option>
                {TIPOS_USUARIO.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Semestre */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Calendar size={16} />
                Semestre
              </label>
              <select
                className="gestion-reportes-filtro-select"
                value={filtrosLocales.semestre || ""}
                onChange={(e) => handleSemestreChange(e.target.value || undefined)}
              >
                <option value="">Todos los semestres</option>
                {SEMESTRES.map(semestre => (
                  <option key={semestre.id} value={semestre.id}>
                    {semestre.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha Inicio */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Calendar size={16} />
                Fecha Inicio
              </label>
              <input
                type="date"
                className="gestion-reportes-filtro-input"
                value={filtrosLocales.fechaInicio || ""}
                onChange={(e) => handleFechaInicioChange(e.target.value)}
              />
            </div>

            {/* Fecha Fin */}
            <div className="gestion-reportes-filtro-group">
              <label className="gestion-reportes-filtro-label">
                <Calendar size={16} />
                Fecha Fin
              </label>
              <input
                type="date"
                className="gestion-reportes-filtro-input"
                value={filtrosLocales.fechaFin || ""}
                onChange={(e) => handleFechaFinChange(e.target.value)}
              />
            </div>
          </div>

          {/* Resumen de Filtros */}
          {tieneFiltros && (
            <div className="gestion-reportes-filtros-resumen">
              <h4>Filtros aplicados:</h4>
              <div className="gestion-reportes-filtros-chips">
                {filtrosLocales.facultadId && (
                  <span className="gestion-reportes-filtro-chip">
                    Facultad: {FACULTADES.find(f => f.id === filtrosLocales.facultadId)?.nombre}
                  </span>
                )}
                {filtrosLocales.escuelaId && (
                  <span className="gestion-reportes-filtro-chip">
                    Escuela: {ESCUELAS.find(e => e.id === filtrosLocales.escuelaId)?.nombre}
                  </span>
                )}
                {filtrosLocales.tipoUsuario && (
                  <span className="gestion-reportes-filtro-chip">
                    Usuario: {TIPOS_USUARIO.find(t => t.id === filtrosLocales.tipoUsuario)?.nombre}
                  </span>
                )}
                {filtrosLocales.semestre && (
                  <span className="gestion-reportes-filtro-chip">
                    Semestre: {SEMESTRES.find(s => s.id === filtrosLocales.semestre)?.nombre}
                  </span>
                )}
                {filtrosLocales.fechaInicio && filtrosLocales.fechaFin && (
                  <span className="gestion-reportes-filtro-chip">
                    Fechas: {filtrosLocales.fechaInicio} a {filtrosLocales.fechaFin}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="gestion-reportes-modal-actions">
          <button
            type="button"
            className="gestion-reportes-btn ghost"
            onClick={handleLimpiar}
            disabled={!tieneFiltros}
          >
            Limpiar todo
          </button>
          <button
            type="button"
            className="gestion-reportes-btn ghost"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="gestion-reportes-btn primary"
            onClick={handleAplicar}
          >
            <Filter size={16} />
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};