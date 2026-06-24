# VitalSis — Demo

Plataforma que conecta al paciente con homeópatas reales. El paciente completa una
**anamnesis estructurada** guiada, el sistema aplica un **triaje de seguridad** (detecta
banderas rojas y deriva a urgencias en lugar de agendar) y entrega el caso ordenado al
médico, que es quien **diagnostica y formula**. Incluye un **motor de repertorización**
real sobre el repertorio de Kent (dominio público).

> Demo de presentación. Los datos de pacientes son simulados. El diagnóstico y la
> prescripción los realiza siempre un profesional con licencia. La eficacia de la
> homeopatía no está demostrada científicamente; el repertorio es una herramienta de
> referencia para el profesional, no un sistema de recomendación médica.

## Stack

- **Next.js 14** (App Router) — frontend + backend (API routes)
- **React 18**
- **lucide-react** — íconos
- Sin servicios externos: el repertorio vive en el repo y se sirve desde la API

## Backend (lo que se ejecuta en el servidor)

- `data/kent.json` — base de datos de rúbricas del **Repertorio de Kent** (1897, dominio
  público). Subconjunto curado, con remedios y grados 1–3, y esquema listo para importar
  el repertorio completo.
- `lib/repertory.js` — **motor de repertorización**: búsqueda de rúbricas y cálculo de
  puntajes (suma de grados + cobertura por remedio, como el software homeopático profesional).
- `app/api/repertory/search` — `GET ?q=` → rúbricas que coinciden con el texto.
- `app/api/repertory/repertorize` — `POST { rubricIds | query }` → ranking de remedios.

El panel del médico llama a estos endpoints en vivo: toma las rúbricas del caso (o las
deriva del motivo del paciente), calcula el análisis y permite buscar y agregar rúbricas
para recalcular. El remedio sugerido es de mayor cobertura — **el médico confirma y
ajusta potencia y posología**.

## Correr en local

Requiere Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Probar la API directamente:

```bash
curl "http://localhost:3000/api/repertory/search?q=dulces"
curl -X POST http://localhost:3000/api/repertory/repertorize \
  -H "Content-Type: application/json" \
  -d '{"rubricIds":["throat-mucus","gen-sweets-agg"]}'
```

## Estructura

```
vitalsis/
├── app/
│   ├── layout.js
│   ├── page.js                 # experiencia del paciente + panel del médico
│   ├── globals.css
│   └── api/repertory/
│       ├── search/route.js
│       └── repertorize/route.js
├── lib/repertory.js            # motor de repertorización
├── data/kent.json              # rúbricas de Kent (dominio público)
├── jsconfig.json
├── package.json
└── next.config.mjs
```

## Roadmap (con financiación)

- Ampliar `kent.json` al repertorio de Kent completo (mismo esquema) y sumar
  Boenninghausen (también dominio público).
- **Supabase** (PostgreSQL + Auth) para historia clínica real por cédula.
  Seguridad obligatoria antes de datos reales: rotar claves y activar RLS.
- Agenda, videoconsulta y formulación firmada.
- Órdenes de laboratorio y despacho de farmacia.
- Pasarela de pago.
