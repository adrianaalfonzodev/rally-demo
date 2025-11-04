README - Docker (desarrollo)

Resumen
- Proyecto: Laravel 12 + Inertia + React 18 + Vite.
- Contenedores: app (PHP + Node) y db (MySQL).
- Sí: el proyecto usa bind mount (./ -> /var/www). Los cambios locales se reflejan inmediatamente dentro del contenedor.

Acceso rápido
- Laravel: http://localhost:8000
- Vite (dev server): http://localhost:5080  (mapeo host:container -> 5080:5173 en docker-compose.yml)

Comandos útiles (PowerShell desde la raíz del proyecto)
- Levantar (reconstruir):
  docker-compose up --build
- Levantar en background:
  docker-compose up -d --build
- Detener y eliminar contenedores:
  docker-compose down
- Detener y eliminar contenedores + volúmenes:
  docker-compose down -v
- Ver logs:
  docker-compose logs -f
- Entrar al contenedor de la app:
  docker exec -it erp_rally_app bash

Desarrollo con hot-reload (Vite)
- Se puede ejecutar Vite dentro del contenedor (hot reload):
  docker exec -it erp_rally_app bash
  npm run dev
- O usar el script que ejecuta Laravel + Vite simultáneamente (si aplicaste):
  docker-compose up --build
  (el servicio `app` corre `npm run dev:all` y muestra tanto Laravel como Vite)

Cómo se aplican los cambios PHP / assets
- Cambios en controladores, vistas y modelos: con el bind mount se ven al refrescar el navegador.
- Cambios en configuración (.env, config/*): ejecutar dentro del contenedor:
  php artisan config:clear && php artisan cache:clear && php artisan route:clear
- Nuevas clases (composer):
  composer dump-autoload
- Si los archivos están copiados en la imagen en vez de montados, hay que reconstruir la imagen:
  docker-compose down
  docker-compose up --build

Migraciones y comandos Artisan
- Ejecutar migraciones:
  docker exec -it erp_rally_app bash -c "php artisan migrate"
- Ejecutar seeders:
  docker exec -it erp_rally_app bash -c "php artisan db:seed"
- Crear enlace a storage:
  docker exec -it erp_rally_app bash -c "php artisan storage:link"

Problemas comunes y soluciones
- Error DB access denied (1045):
  - Verificar `.env` y `docker-compose.yml` coincidencia de DB_USERNAME/MYSQL_USER y passwords.
  - Si cambias credenciales, borrar volumen de MySQL y recrear:
    docker-compose down -v
    docker-compose up --build

- Error ports not available (bind):
  - Verificar si el puerto está ocupado: netstat -aon | findstr :<PUERTO>
  - Probar con otro puerto alto (ej. 30077:5173) y actualizar `docker-compose.yml` y `vite.config.js`.
  - Ejecutar PowerShell como Administrador o reiniciar Docker Desktop.

- CORS / HMR (Vite):
  - Asegurar `vite.config.js` tiene server.host = '0.0.0.0', origin = 'http://localhost:<HOST_PORT>' y hmr.host='localhost'.
  - Eliminar `public/hot` si existe (evita usar el dev server viejo).

Notas finales
- El setup actual es para desarrollo. Para producción separar servicios (PHP-FPM + Nginx) y usar `npm run build` para assets.
- Si `concurrently` no se encuentra al ejecutar `npm run dev:all`, moverlo a `dependencies` o instalarlo dentro del Dockerfile.

