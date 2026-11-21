---
name: bk-icon-standardization
description: Estandariza los íconos SVG de marca de blurlink-fe (raíz, fondo, sangría y registro en AVAILABLE_SVGS) sin tocar el dibujo ni sus colores. Úsala cuando se pase un SVG de marca para estandarizarlo o agregarlo, aunque solo se diga «estandarízalo».
---

# Estandarizar íconos de marca

El dibujo y sus colores quedan tal como vienen; solo se normaliza el envoltorio.

- Raíz: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" fill="none">`.
- Una figura que no tiene color propio ni lo hereda (de un grupo o del `<use>` que la dibuja) desaparecería con el `none` de la raíz: se le pone el color con que se veía (negro, si no traía ninguno).
- Si el `viewBox` no es de 32 (por ejemplo, 300×300), se deja el suyo y solo se pone `width="48" height="48"`. Los trazos no se reescalan a mano.
- Si el ícono tiene un fondo de cuadrado redondeado, pasa a `<rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="…"/>`, en lugar de `<rect width="32" height="32" rx="6">`.
- Sin `<style>` con `@keyframes` ni `@import`: los íconos se cargan con `<img>`, donde no funcionan. Si el SVG los trae, se quitan.
- Sangría de 2 espacios.
- El archivo queda en `public/[marca].svg`. Si la marca es nueva, se registra en `AVAILABLE_SVGS` de `src/constants/svgs.ts`, en orden alfabético y con `'default'` primero.
