# Crowzy — vídeo promo (motion graphics)

Vídeo horizontal 1920×1080 a 60 fps, ~29,5 s, al estilo de los promos de producto tipo Apple/Shopify:
fondo negro con *glow* del color de marca, logo que se revela desde el desenfoque, móvil 3D, tarjetas de UI flotando
con profundidad de campo, texto cinético con palabras en degradado, notificaciones y cierre con logo.

## Cómo está hecho

Todo el vídeo es **código**: una página HTML (`index.html`) en la que cada elemento se calcula como función del tiempo
(`render(t)`), y un script (`render.mjs`) que abre esa página en Chromium (Playwright), captura cada fotograma y se lo pasa a
ffmpeg. Al ser determinista, cualquier cambio de texto, color o tiempo se vuelve a renderizar idéntico.

| Pieza | Archivo |
|---|---|
| Composición y animaciones | `index.html` |
| Iconos (Lucide, ISC) | `icons.js` (generado con `build-icons.mjs`) |
| Render a vídeo | `render.mjs` |
| Mezcla de audio | `audio/mix.py` |
| Logo | `assets/crowzy-logo.png` (de `crowd-spark-events/public/brand`) |

### Marca (de `docs/BRAND_GUIDE.md` del repo)
- Degradado `#4f46e5 → #c084fc` (con el naranja del pájaro en el glow).
- Bricolage Grotesque (títulos) y Figtree (texto), servidas desde `@fontsource-variable`.
- Textos con la voz de la guía: «Actividades en tu ciudad. Apúntate o crea la tuya.», «Si no se llega al mínimo, no pagas.»,
  estados con su nombre («Plaza reservada», «Actividad confirmada»). Sin cifras inventadas ni urgencias.

### Guion (sincronizado a 116 BPM; 1 compás = 2,069 s)
| Tiempo | Escena |
|---|---|
| 0,0 – 4,1 | Logo: el pájaro aparece del desenfoque, la palabra «Crowzy» se desliza; zoom a través en el silencio previo al *drop* |
| 4,1 – 8,3 | *Drop*: el móvil 3D entra girando, se enciende la pantalla, el icono de Crowzy late y la cámara entra en él |
| 8,3 – 10,5 | «Descubre planes en tu ciudad.» |
| 10,3 – 14,6 | Feed 3D con profundidad de campo; foco en «Ruta en kayak al atardecer», toque en «Me apunto» → «Plaza reservada» |
| 14,4 – 18,7 | Mínimo 6 → 7 → 8 de 8, «Actividad confirmada» con chispas · «Si no se llega al mínimo, no pagas.» |
| 18,5 – 20,8 | «¿Tienes una idea?» → «Crea la tuya.» |
| 20,6 – 23,4 | Formulario «Publicar actividad»: se escribe «Taller de cerámica», toque → «Actividad publicada» |
| 23,3 – 25,0 | Notificaciones apiladas: «Laura se ha apuntado…» · «Mira quién se apunta.» |
| 24,8 – 29,5 | Cierre: logo, eslogan y crowzy.app |

### Audio (Epidemic Sound, con licencia de la cuenta)
- Música: «City Skylines» — Sum Wave (116 BPM). Tramo 144,82 s → 174,3 s de la pista original, de forma que el *drop*
  (148,96 s) cae justo cuando entra el móvil.
- Efectos: whoosh «Tech, Data Transition 02», swish «Short, Bright, Fast, Flyby», clic «UI Buttons, Bubbly, Select»,
  «Notification Tone 03» y «Completions, Melodic, Success».
- Mezcla normalizada a −14 LUFS (estándar de redes sociales).
- Los WAV no se suben al repositorio (licencia y tamaño): se vuelven a descargar desde Epidemic Sound.

## Volver a renderizar

```bash
npm install                              # gsap no se usa; fuentes, iconos
node build-icons.mjs                     # regenera icons.js
node render.mjs stills 2,6,12            # fotogramas sueltos en stills/ para revisar
node render.mjs video out/video_noaudio.mp4 60 1   # 1080p60 (escala 2 = 4K)
python3 audio/mix.py                     # desde audio/: genera soundtrack.wav
ffmpeg -i out/video_noaudio.mp4 -i audio/soundtrack.wav -c:v copy -c:a aac -b:a 256k -shortest out/crowzy-promo-1080p60.mp4
```

Para cambiar textos, tiempos o colores: edita `index.html` (objeto `T` con los tiempos de cada escena y la función `render`).
