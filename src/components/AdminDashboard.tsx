import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  LogOut,
  Building2,
  CalendarClock,
  ClipboardCheck,
  UsersRound,
  ShieldCheck,
  BarChart3,
  Ban,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import "./../styles/AdminDashboard.css";
import {
  GestionEspacios,
  GestionHorarios,
  GestionSanciones,
  GestionReservas,
  GestionUsuarios,
  GestionReportes,
  GestionIncidencias,
  GestionAuditoria
} from "./GestionAdmin";
import { requestBackendLogout } from "../utils/logout";
import { isBackendLoginType } from "../utils/apiConfig";

type ModuleId =
  | "labs"
  | "schedules"
  | "sanctions"
  | "reservas"
  | "users"
  | "audit"
  | "reports"
  | "incidencias";

interface ModuleDefinition {
  id: ModuleId;
  name: string;
  description: string;
  icon: LucideIcon;
  color: "blue" | "green" | "indigo" | "purple" | "orange" | "red";
}

interface NavGroup {
  id: "reservas" | "gestiones" | "reportes";
  label: string;
  modules: ModuleId[];
}

interface User {
  id: string;
  email: string;
  sessionToken?: string;
  user_metadata: {
    name: string;
    avatar_url: string;
    role?: string;
    login_type?: string;
  };
}

interface AdminDashboardProps {
  user: User;
}

const MODULES: ModuleDefinition[] = [
  {
    id: "labs",
    name: "Espacios",
    description: "Administra aulas, laboratorios y ambientes especiales",
    icon: Building2,
    color: "blue"
  },
  {
    id: "schedules",
    name: "Horarios",
    description: "Configura turnos y tiempos por cada escuela",
    icon: CalendarClock,
    color: "green"
  },
  {
    id: "sanctions",
    name: "Sanciones",
    description: "Administra sanciones activas y su historial",
    icon: Ban,
    color: "red"
  },
  {
    id: "reservas",
    name: "Reservas",
    description: "Aprueba, rechaza y monitorea las solicitudes recibidas",
    icon: ClipboardCheck,
    color: "orange"
  },
  {
    id: "users",
    name: "Usuario",
    description: "Define responsables y permisos del sistema",
    icon: UsersRound,
    color: "purple"
  },
  {
    id: "audit",
    name: "Auditoria",
    description: "Consulta los eventos relevantes registrados",
    icon: ShieldCheck,
    color: "red"
  },
  {
    id: "reports",
    name: "Reportes",
    description: "Construye reportes y estadisticas ejecutivas",
    icon: BarChart3,
    color: "indigo"
  },
  {
    id: "incidencias",
    name: "Incidencias",
    description: "Revisa y filtra los reportes registrados en los espacios",
    icon: AlertCircle,
    color: "red"
  }
];

const SUPERVISOR_ALLOWED_MODULES: ModuleId[] = [
  "reservas",
  "sanctions",
  "reports",
  "incidencias"
];

const NAV_GROUPS: NavGroup[] = [
  {
    id: "reservas",
    label: "Reservas",
    modules: ["reservas", "incidencias", "sanctions"]
  },
  {
    id: "gestiones",
    label: "Gestiones",
    modules: ["labs", "schedules", "users"]
  },
  {
    id: "reportes",
    label: "Reportes",
    modules: ["reports", "audit"]
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const normalizedRole = useMemo(
    () => user.user_metadata.role?.trim().toLowerCase() ?? "",
    [user.user_metadata.role]
  );

  const isSupervisor = normalizedRole === "supervisor";

  const availableModules = useMemo(() => {
    if (isSupervisor) {
      return MODULES.filter((module) =>
        SUPERVISOR_ALLOWED_MODULES.includes(module.id)
      );
    }
    return MODULES;
  }, [isSupervisor]);

  const [activeModule, setActiveModule] = useState<ModuleId>("reservas");
  const [openGroups, setOpenGroups] = useState<Record<NavGroup["id"], boolean>>({
    reservas: true,
    gestiones: true,
    reportes: true
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!availableModules.some((module) => module.id === activeModule)) {
      const fallbackModule = availableModules[0]?.id ?? MODULES[0].id;
      setActiveModule(fallbackModule);
    }
  }, [activeModule, availableModules]);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const userInitial = useMemo(() => {
    const fallback = user.email || "A";
    const source = user.user_metadata.name || fallback;
    return source.charAt(0).toUpperCase();
  }, [user.email, user.user_metadata.name]);

  const shouldNotifyBackend = useMemo(
    () => isBackendLoginType(user.user_metadata.login_type),
    [user.user_metadata.login_type]
  );

  const displayRole = useMemo(() => {
    const rawRole = user.user_metadata.role?.trim();
    if (!rawRole) return "Administrador";
    return rawRole.charAt(0).toUpperCase() + rawRole.slice(1);
  }, [user.user_metadata.role]);

  const visibleNavGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        modules: group.modules.filter((moduleId) =>
          availableModules.some((module) => module.id === moduleId)
        )
      })).filter((group) => group.modules.length > 0),
    [availableModules]
  );

  const addAuditLog = useCallback(() => {}, []);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      if (shouldNotifyBackend) {
        await requestBackendLogout(user.id, user.sessionToken);
      }
    } catch (error) {
      console.error("No se pudo cerrar la sesion en el backend:", error);
    } finally {
      try {
        localStorage.removeItem("admin_session");
      } catch {}
      window.location.reload();
    }
  }, [isLoggingOut, shouldNotifyBackend, user.id, user.sessionToken]);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        event.target instanceof Node &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keyup", handleEscape);
    };
  }, []);

  return (
    <div
      className={`admin-dashboard ${
        isSidebarCollapsed ? "is-sidebar-collapsed" : ""
      }`}
    >
            <header className="admin-header">
        <div className="admin-header-left">
          <button
            type="button"
            className={`admin-sidebar-toggle ${
              isSidebarCollapsed ? "is-collapsed" : ""
            }`}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            aria-pressed={isSidebarCollapsed}
            aria-label="Alternar menu lateral"
          >
            <span className="admin-sidebar-toggle-icon">
              <span />
              <span />
            </span>
          </button>
          <div className="admin-header-text">
            <p className="admin-kicker">Panel principal</p>
            <p className="admin-header-helper">IntegraUPT - Sistema de Gestion</p>
          </div>
        </div>

        <div className="admin-header-right" ref={profileRef}>
          <button
            type="button"
            className={`admin-profile-trigger ${
              isProfileOpen ? "is-open" : ""
            }`}
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="admin-user-info">
              <p className="admin-user-name">{user.user_metadata.name}</p>
            </div>
            <div className="admin-user-avatar">
              <span className="admin-avatar-text">{userInitial}</span>
            </div>
          </button>

          {isProfileOpen && (
            <div className="admin-profile-card" role="dialog" aria-label="Perfil">
              <div className="admin-profile-surface">
                <div className="admin-profile-overview">
                  <div className="admin-profile-avatar-large" aria-hidden>
                    <span className="admin-avatar-text">{userInitial}</span>
                  </div>

                  <div className="admin-profile-text">
                    <p className="admin-profile-name">{user.user_metadata.name}</p>
                    {user.email ? (
                      <p className="admin-profile-email">{user.email}</p>
                    ) : null}
                    <p className="admin-profile-role">Rol: {displayRole}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="admin-profile-logout"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="admin-profile-logout-icon" />
                  {isLoggingOut ? "Cerrando..." : "Cerrar Sesion"}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <aside
        className={`admin-sidebar ${isSidebarCollapsed ? "is-collapsed" : ""}`}
      >

        <div className="admin-sidebar-nav-wrapper">

          <nav className="admin-nav">
            {visibleNavGroups.map((group) => {
              const isOpen = openGroups[group.id];
              return (
                <div key={group.id} className="admin-nav-group">
                  <button
                    type="button"
                    className="admin-group-button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenGroups((prev) => ({
                        ...prev,
                        [group.id]: !prev[group.id]
                      }))
                    }
                  >
                    <div className="admin-group-label-stack">
                      <span className="admin-group-label">{group.label}</span>
                    </div>
                    <ChevronDown
                      className={`admin-group-icon ${isOpen ? "is-open" : ""}`}
                    />
                  </button>

                  <div
                    className={`admin-group-items ${isOpen ? "group-open" : "group-closed"}`}
                  >
                    {group.modules
                      .filter((moduleId) =>
                        availableModules.some((module) => module.id === moduleId)
                      )
                      .map((moduleId) => {
                        const module = availableModules.find(
                          (item) => item.id === moduleId
                        );
                        if (!module) return null;
                        const Icon = module.icon;
                        const isActive = activeModule === module.id;
                        return (
                          <button
                            key={module.id}
                            onClick={() => setActiveModule(module.id)}
                            className={`admin-nav-button ${
                              isActive ? "admin-nav-button-active" : ""
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span
                              className={`admin-nav-icon admin-module-${module.color}`}
                            >
                              <Icon className="admin-nav-icon-svg" />
                            </span>
                            <span className="admin-nav-title">{module.name}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

      </aside>

      <div className="admin-main-stack">
        <div className="admin-system-shell">
          <section className="admin-system-hero admin-module-container">
            <div className="admin-module-content">
              {activeModule === "labs" && (
                <GestionEspacios onAuditLog={addAuditLog} />
              )}

              {activeModule === "schedules" && <GestionHorarios />}

              {activeModule === "sanctions" && (
                <GestionSanciones onAuditLog={addAuditLog} currentUser={user} />
              )}

              {activeModule === "reservas" && (
                <GestionReservas onAuditLog={addAuditLog} currentUser={user} />
              )}

              {activeModule === "users" && (
                <GestionUsuarios onAuditLog={addAuditLog} />
              )}

              {activeModule === "incidencias" && (
                <GestionIncidencias onAuditLog={addAuditLog} currentUser={user} />
              )}

              {activeModule === "reports" && (
                <GestionReportes onAuditLog={addAuditLog} />
              )}

              {activeModule === "audit" && (
                <GestionAuditoria onAuditLog={addAuditLog} />
              )}
              </div>
          </section>
          </div>
        </div>
      </div>
  );
};