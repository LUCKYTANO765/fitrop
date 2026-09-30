# Preferencias del proyecto FITROP

- El usuario fijó el código de acceso al administrador. Conservar la credencial guardada en `data/admin-auth.json`; no rotarla, regenerarla ni sustituirla por una clave aleatoria o de pruebas sin una nueva instrucción explícita del usuario.
- Las pruebas automatizadas deben usar un `FITROP_DATA_FILE` aislado y sus propias credenciales temporales. Nunca aplicar esas credenciales al servidor principal ni a `data/admin-auth.json`.
- Al reiniciar o publicar, conservar los datos y la misma credencial administrativa. No imprimir hashes, cookies ni claves de sesión en los resultados.
- Conservar compras y titulares existentes al habilitar inventario. No marcar pagos como verificados automáticamente.
