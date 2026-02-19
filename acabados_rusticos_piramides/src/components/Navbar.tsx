import { useEffect, useRef, useState } from "react";
import menuIcon from "../assets/icons/menu.png";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from "../routes";


type NavHandler = (path: string) => void;

type NavbarProps = {
  onNavigate?: NavHandler;
  menuIconSrc?: string;

  /** Imagen del avatar (URL o import). Si no la mandas, se muestra placeholder. */
  avatarSrc?: string;

  /** Opcional: click al avatar */
  onAvatarClick?: () => void;
};

export default function Navbar({
  onNavigate,
  menuIconSrc,
  avatarSrc,
  onAvatarClick,
}: NavbarProps) {
  const routerNavigate = useNavigate();
  const navigate: NavHandler = onNavigate ?? routerNavigate;


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);

  const salesRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al click fuera
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!salesRef.current) return;
      if (!salesRef.current.contains(e.target as Node)) setSalesOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // Cerrar dropdown y drawer con ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSalesOpen(false);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(path: string) {
    setSalesOpen(false);
    setDrawerOpen(false);
    navigate(path);
  }

  function toggleDrawer() {
    setDrawerOpen((v) => !v);
    setSalesOpen(false);
  }

  function toggleSales() {
    setSalesOpen((v) => !v);
    setDrawerOpen(false);
  }

  // Clase base: hover verde (para botones del navbar)
  const navBtn =
    "h-10 px-4 rounded-xl transition flex items-center gap-2 " +
    "text-white/90 hover:text-emerald-400 hover:bg-white/5";

  // Botón cuadrado del ícono (izq)
  const iconBtn =
    "h-10 w-10 grid place-items-center rounded-xl transition " +
    "text-white/90 hover:text-emerald-400 hover:bg-white/5";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full h-14 z-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="h-full px-6 flex items-center">
          {/* IZQUIERDA */}
          <div className="w-1/3 flex items-center">
            <button
              type="button"
              onClick={toggleDrawer}
              className={iconBtn}
              aria-label="Abrir menú"
              aria-expanded={drawerOpen}
            >
              <img src={menuIcon} alt="Menú" className="h-6 w-6" />
            </button>
          </div>

          {/* CENTRO */}
          <div className="w-1/3 flex items-center justify-center">
            <div className="flex items-center gap-12">
              {/* Ventas y pedidos (dropdown) */}
              <div className="relative" ref={salesRef}>
                <button
                  type="button"
                  onClick={toggleSales}
                  className={navBtn}
                  aria-haspopup="menu"
                  aria-expanded={salesOpen}
                >
                  <span className="opacity-90">🧾</span>
                  <span className="font-medium">Ventas y pedidos</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      salesOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {salesOpen && (
                  <div
                    role="menu"
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl
                               bg-slate-800/95 border border-white/10 shadow-xl backdrop-blur z-50"
                  >
                    <div className="p-2">
                      <DropdownItemDark
                        label="Registrar venta"
                        onClick={() => go("/sales/register")}
                      />
                      <DropdownItemDark
                        label="Registrar pedido"
                        onClick={() => go("/orders/register")}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Indicadores */}
              <button
                type="button"
                onClick={() => go("/")}
                className={navBtn}
              >
                <span className="opacity-90">📈</span>
                <span className="font-medium">Indicadores</span>
              </button>
            </div>
          </div>

          {/* DERECHA (AVATAR) */}
          <div className="w-1/3 flex items-center justify-end">
            <button
              type="button"
              onClick={onAvatarClick ?? (() => navigate("/perfil"))}
              className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-white/25 transition"
              aria-label="Perfil"
              title="Perfil"
            >
              <img
                src={avatarSrc ?? "https://via.placeholder.com/80"}
                alt="Perfil"
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Espaciador para que el contenido no quede debajo del navbar fijo */}
      <div className="h-14" />

      {/* OVERLAY (oscurece el fondo cuando el drawer está abierto) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* DRAWER / SIDE MENU */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-r from-[#1A2539] to-[#0F172A]
                    z-50 shadow-2xl transform transition-transform
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!drawerOpen}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b">
          <span className="font-semibold text-white">Menú principal</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="h-9 w-9 rounded-lg hover:bg-white/10 transition grid place-items-center"
            aria-label="Cerrar menú"
          >
            <span className="text-white hover:text-emerald-400">x</span>
          </button>
        </div>

        <div className="p-4 flex flex-col items-center gap-1 w-full">
          <SideItem label="Inventario" onClick={() => go(ROUTES.INVENTORY)} />
          <SideItem label="Productos" onClick={() => go(ROUTES.PRODUCTS)} />
          <SideItem label="Proveedores" onClick={() => go(ROUTES.SUPPLIERS)} />
          <SideItem label="Clientes" onClick={() => go(ROUTES.CLIENTS)} />
          <SideItem label="Descuentos" onClick={() => go(ROUTES.DISCOUNTS)} />
          <SideItem label="Ventas y pedidos" onClick={() => go(ROUTES.SALES.ROOT)} />
          <SideItem label="Pedidos" onClick={() => go(ROUTES.ORDERS.ROOT)} />
          <SideItem label="Reporte de ventas" onClick={() => go(ROUTES.SALES.REPORT)} />
        </div>
      </aside>
    </>
  );
}

/** Dropdown oscuro con hover verde que “se mueve” al pasar el mouse */
function DropdownItemDark({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="
        w-full text-left px-3 py-2 rounded-xl transition
        text-white/90 hover:text-emerald-400 hover:bg-white/10
        focus:outline-none focus:ring-2 focus:ring-emerald-500/40
      "
    >
      {label}
    </button>
  );
}

function SideItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className= "w-full max-w-xs text-left px-4 py-3 rounded-xl cursor-pointer  hover:text-emerald-400 hover:bg-white/10 transition text-white"
    >
      {label}
    </button>
  );
}
