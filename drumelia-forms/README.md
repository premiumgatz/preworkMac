# drumeliaforms.com

Hub de formularios de Drumelia Real Estate. Proyecto Lovable: **Drumelia Open Day**
(id `39435f08-c007-4dbd-8743-1faa72b20a1f`).

## Estructura de URLs

| URL | Qué es |
|---|---|
| `drumeliaforms.com/` | Landing tipo Linktree con los formularios de Drumelia |
| `drumeliaforms.com/open-day` | Página del Open Day for Agents (3 dic 2026), sin cambios de contenido |
| `/thank-you`, `/pass/<token>` | Confirmación y pase de entrada del Open Day (no cambian de URL, los pases ya enviados siguen valiendo) |
| `/admin` | Panel privado de inscripciones |

Para añadir un formulario nuevo: crear la ruta en `src/routes/<slug>.tsx` y añadir una entrada
a la lista `FORMS` de `src/routes/index.tsx`.

## Copias de seguridad (antes del cambio, 19 nov 2026)

1. **Proyecto duplicado en Lovable:** "BACKUP Drumelia Open Day (19 nov, antes de drumeliaforms)"
   (id `30cc0255-15fc-4809-ab5a-6745c3dd0e51`). Copia completa del código, sin publicar.
2. **Punto de restauración en git de Lovable:** commit `9e2392535a07b00e604dce77893114c21e9d0aef`
   (último estado con el Open Day en `/`). Se puede volver a él desde el historial del editor de Lovable.

Cambio aplicado en Lovable: commit `e45d0f2379672ac90b4250ffb722f9d510d354c4` (19 nov 2026). Aún sin publicar.

La base de datos (inscripciones) no se toca: es la misma en las dos URLs.

## Copia de seguridad 2 (19 nov 2026, antes de publicar el email y la papelera)

Estado guardado: email del pase con QR, logo y PDF adjunto (Resend, openday@drumeliaforms.com)
y botón de papelera para borrar inscripciones en `/admin`.

1. **Proyecto duplicado en Lovable:** "BACKUP 2 Drumelia Open Day (19 nov, antes de publicar email+papelera)"
   (id `2015c26d-2f15-4ccc-8f40-5f1b9898efa5`). Comprobado que incluye el email con PDF y la papelera.
2. **GitHub** (`premiumgatz/drumelia-email-capture`, rama `main`): commit `422c7f6`.
   Versiones anteriores para volver atrás:
   - `33c06fd`: landing + `/open-day`, sin email.
   - `ea8decd`: primer email con QR (el que funcionó en la primera prueba).
   - `bec8eaf`: email con logo y PDF, sin papelera.

Los datos de las inscripciones no están en estas copias: para guardarlos, usar "Download CSV" en `/admin`.
