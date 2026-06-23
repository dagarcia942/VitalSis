# VitalSis — Demo

Plataforma que conecta al paciente con homeópatas reales. El paciente completa una
**anamnesis estructurada** guiada, el sistema aplica un **triaje de seguridad** (detecta
banderas rojas y deriva a urgencias en lugar de agendar) y entrega el caso ordenado al
médico, que es quien **diagnostica y formula**.

> Este es un demo de presentación. Usa datos simulados, no procesa información clínica
> real. El diagnóstico y la prescripción los realiza siempre un profesional con licencia.

## Stack

- **Next.js 14** (App Router) — frontend + base para el backend (API routes)
- **React 18**
- **lucide-react** — íconos
- Sin dependencia de backend en el demo (datos simulados en el cliente)

## Correr en local

Requiere Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

```
vitalsis/
├── app/
│   ├── layout.js      # estructura raíz + tipografías
│   ├── page.js        # la aplicación (experiencia del paciente + panel del médico)
│   └── globals.css    # estilos
├── package.json
└── next.config.mjs
```

## Próximos pasos (roadmap con financiación)

- Conectar **Supabase** (PostgreSQL + Auth) para historia clínica real por cédula
- **Seguridad obligatoria antes de datos reales:** rotar las claves del proyecto y
  activar Row Level Security (RLS). No subir datos de pacientes sin esto.
- Agenda, videoconsulta y formulación firmada
- Órdenes de laboratorio y despacho de farmacia
- Pasarela de pago
- Reactivar el módulo de medicina general (el modelo de datos ya lo contempla)
