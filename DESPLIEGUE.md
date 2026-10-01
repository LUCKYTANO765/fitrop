# FITROP en Vercel

La web se compila con `npm run build`. Solo las cuatro páginas HTML y las carpetas `css`, `js` y `assets` se copian a `dist`. El servidor local sigue funcionando con `npm run dev`.

`api/index.js` atiende las rutas `/api/*`. La gestión utiliza Postgres mediante `DATABASE_URL` (Neon conectado al proyecto FITROP). Los puestos, compras, códigos y sesiones se conservan en `fitrop_state`; los comprobantes privados se guardan en `fitrop_receipts`. Las operaciones usan transacciones y bloqueo de inventario para evitar que dos compradores adquieran el mismo puesto. Los pagos se verifican manualmente.

La primera migración se ejecuta con `npm run migrate:vercel`, después de descargar las variables de producción a `.env.local`. Conserva la credencial de `data/admin-auth.json`, los titulares, compras y comprobantes locales. Si ya existen datos en la base, se niega a sobrescribirlos. No repetirla para sincronizar compras: a partir de la publicación, el panel público administra los datos de la nube y el servidor local conserva su copia anterior.

Publicar cambios: `npx vercel deploy --prod`. No subir `data`, `.env*`, `.vercel`, comprobantes ni credenciales a Git. No modificar la contraseña del administrador durante un despliegue.

Pruebas: `npm test` utiliza datos y credenciales temporales. La prueba de Postgres requiere `FITROP_RUN_DB_TESTS=1` y las variables de conexión; crea y elimina únicamente su registro aislado. No modifica el inventario de producción.
