// Skeleton mostrado durante transiciones de ruta — fondo negro que
// matchea el hero / PageHero de todas las páginas, sin flash.
export default function Loading() {
  return (
    <div
      style={{
        background: "#0B0B0B",
        minHeight: "100vh",
        width: "100%",
      }}
      aria-hidden
    />
  );
}
