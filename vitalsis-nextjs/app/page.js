"use client";

import React, { useState } from "react";
import {
  Stethoscope, HeartPulse, ShieldCheck, AlertTriangle, ArrowRight, ArrowLeft,
  Check, CheckCircle2, Activity, FileText, Pill, FlaskConical, User, Clock,
  ChevronDown, ChevronRight, Phone, Building2, ClipboardList, Search, Plus,
  Sparkles, LifeBuoy
} from "lucide-react";

const DOCTOR = { name: "Dra. Elena Vargas", spec: "Homeopatía · Medicina integrativa", reg: "RM 88241" };

const TRI = {
  verde:    { c: "var(--green)", soft: "var(--green-soft)", label: "Rutinario", pill: { color:"#1F7A50", bg:"var(--green-soft)" } },
  amarillo: { c: "var(--amber)", soft: "var(--amber-soft)", label: "Prioritario", pill: { color:"#8A5A0A", bg:"var(--amber-soft)" } },
  rojo:     { c: "var(--red)",   soft: "var(--red-soft)",   label: "Urgencia",    pill: { color:"#A82B2B", bg:"var(--red-soft)" } },
};

const SEED = [
  {
    id: "c2", nombre: "María Restrepo", edad: 34, cedula: "1037•••218", tipo: "Homeopatía",
    motivo: "Flema en la garganta al comer dulces", triage: "verde", hace: "hace 1 h",
    evolucion: "Aprox. 3 meses, intermitente", localizacion: "Garganta, sensación de moco posterior",
    intensidad: 4, mejora: "Carraspear, bebidas calientes", empeora: "Dulces, lácteos, por la noche",
    acompanantes: ["Carraspeo frecuente", "Más sed al hacer ejercicio"],
    antecedentes: "Sin patologías de base. Hace ejercicio 3 veces/semana.",
    medicacion: "Ninguna", alergias: "Ninguna conocida",
    rubricas: [
      { name: "GARGANTA — Moco, agravado por dulces", rems: [["Arg-n",3],["Puls",2],["Kali-bi",2],["Nat-m",1]] },
      { name: "GENERALES — Dulces, agravación", rems: [["Arg-n",3],["Sulph",2],["Lyc",2]] },
      { name: "GARGANTA — Carraspear, necesidad de", rems: [["Kali-bi",3],["Arg-n",2],["Phos",2]] },
    ],
  },
  {
    id: "c3", nombre: "Jorge Patiño", edad: 51, cedula: "79•••402", tipo: "Homeopatía",
    motivo: "Cefalea recurrente desde hace 2 semanas", triage: "amarillo", hace: "hace 3 h",
    evolucion: "2 semanas, casi a diario", localizacion: "Frontal y temporal, bilateral",
    intensidad: 8, mejora: "Descanso en oscuridad", empeora: "Pantallas, estrés laboral",
    acompanantes: ["Tensión en el cuello", "Dificultad para concentrarse"],
    antecedentes: "Hipertensión en control. Trabajo de oficina, alta carga.",
    medicacion: "Losartán 50 mg/día", alergias: "Ninguna conocida",
    rubricas: [
      { name: "CABEZA — Dolor, frontal, bilateral", rems: [["Bry",3],["Nat-m",2],["Bell",2]] },
      { name: "CABEZA — Dolor, por esfuerzo mental o estrés", rems: [["Nux-v",3],["Nat-c",2],["Calc",2]] },
      { name: "CABEZA — Dolor, mejora con reposo y oscuridad", rems: [["Bell",3],["Bry",2],["Sang",1]] },
    ],
  },
  {
    id: "c4", nombre: "Lucía Gómez", edad: 27, cedula: "1018•••775", tipo: "Homeopatía",
    motivo: "Insomnio de conciliación y ansiedad leve", triage: "verde", hace: "ayer",
    evolucion: "1 mes, ligado a un cambio de trabajo", localizacion: "—",
    intensidad: 5, mejora: "Rutina de sueño, caminar", empeora: "Cafeína en la tarde, pensar en el trabajo",
    acompanantes: ["Mente acelerada al acostarse", "Despertar cansada"],
    antecedentes: "Sin antecedentes relevantes.", medicacion: "Ninguna", alergias: "Ninguna conocida",
    rubricas: [
      { name: "SUEÑO — Insomnio por afluencia de ideas", rems: [["Coff",3],["Nux-v",2],["Ign",2]] },
      { name: "MENTE — Ansiedad anticipatoria", rems: [["Arg-n",3],["Gels",2],["Lyc",2]] },
    ],
  },
];

const FLAGS = [
  "Dolor en el pecho que se extiende al brazo, cuello o mandíbula",
  "Dificultad para respirar súbita o severa",
  "Debilidad o adormecimiento repentino en un lado del cuerpo",
  "Dificultad repentina para hablar o entender",
  "El peor dolor de cabeza de mi vida, de inicio súbito",
  "Fiebre alta con rigidez en el cuello",
  "Sangrado abundante que no se detiene",
  "Desmayo o pérdida de conciencia",
];

const EVOLUCIONES = ["Menos de 24 horas", "1 a 3 días", "Una semana", "Varias semanas", "Más de un mes"];

function Logo() {
  return (
    <div className="vs-logo">
      <span className="mk"><HeartPulse size={18} /></span>
      Vital<b>Sis</b>
    </div>
  );
}

function FlowCard({ step, icon, title, text }) {
  return (
    <div className="vs-flow-card">
      <div className="vs-flow-ico">{icon}</div>
      <div className="vs-flow-step">{step}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Hero({ go }) {
  return (
    <div className="vs-wrap vs-hero">
      <div className="vs-eyebrow">Salud conectada · Latinoamérica</div>
      <h1 className="vs-h1">El paciente llega <i>preparado</i>. El médico decide.</h1>
      <p className="vs-lead">
        VitalSis organiza la historia del paciente antes de la consulta, detecta señales de
        urgencia y la entrega lista al profesional —homeópata o de medicina general— que
        diagnostica, formula y conecta con laboratorios y farmacia.
      </p>
      <div className="vs-cta-row">
        <button className="vs-btn vs-btn-primary" onClick={() => go("intake")}>
          <User size={18} /> Probar como paciente <ArrowRight size={17} />
        </button>
        <button className="vs-btn vs-btn-ghost" onClick={() => go("doctor")}>
          <Stethoscope size={18} /> Ver el panel del médico
        </button>
      </div>

      <div className="vs-flow">
        <FlowCard step="01" icon={<ClipboardList size={19} />} title="Anamnesis estructurada"
          text="El paciente describe su caso guiado paso a paso. Nada de diagnósticos automáticos." />
        <FlowCard step="02" icon={<ShieldCheck size={19} />} title="Triaje de seguridad"
          text="Detecta banderas rojas y deriva a urgencias en lugar de agendar una cita." />
        <FlowCard step="03" icon={<Stethoscope size={19} />} title="El médico recibe el caso"
          text="Información ordenada y, para homeopatía, referencia repertorial de apoyo." />
        <FlowCard step="04" icon={<Pill size={19} />} title="Formula y deriva"
          text="Diagnóstico, fórmula firmada, orden de laboratorio y despacho de farmacia." />
      </div>
    </div>
  );
}

/* ---------------- PATIENT INTAKE ---------------- */
const BLANK = {
  nombre: "", cedula: "", edad: "", tipo: "Homeopatía", motivo: "", intensidad: 5,
  evolucion: "", flags: [], selfHarm: false, localizacion: "", mejora: "",
  empeora: "", acompanantes: "", antecedentes: "", medicacion: "", alergias: "",
};

function Intake({ onFinish, go }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState(BLANK);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const toggleFlag = (flag) =>
    setF((s) => ({ ...s, flags: s.flags.includes(flag) ? s.flags.filter((x) => x !== flag) : [...s.flags, flag] }));

  const steps = [
    { k: "Paso 1 de 5", t: "¿Quién consulta?", d: "Solo lo básico para tu historia clínica." },
    { k: "Paso 2 de 5", t: "Cuéntanos el motivo", d: "¿Qué te trae a consulta y desde cuándo?" },
    { k: "Paso 3 de 5", t: "Una verificación importante", d: "¿Tienes alguno de estos síntomas en este momento?" },
    { k: "Paso 4 de 5", t: "Caractericemos el síntoma", d: "Estos detalles ayudan al médico a precisar." },
    { k: "Paso 5 de 5", t: "Antecedentes y medicación", d: "Lo que el profesional necesita saber por seguridad." },
  ];

  const canNext = () => {
    if (step === 0) return f.nombre && f.cedula && f.edad;
    if (step === 1) return f.motivo && f.evolucion;
    return true;
  };

  const finish = () => {
    let triage = "verde";
    if (f.flags.length > 0) triage = "rojo";
    else if (Number(f.intensidad) >= 8) triage = "amarillo";
    onFinish({ ...f, triage });
  };

  const cur = steps[step];

  return (
    <div className="vs-wrap vs-section">
      <div className="vs-stage">
        <div className="vs-prog">
          {steps.map((_, i) => <span key={i} className={i <= step ? "done" : ""} />)}
        </div>
        <div className="vs-step-k">{cur.k}</div>
        <h2 className="vs-step-t">{cur.t}</h2>
        <p className="vs-step-d">{cur.d}</p>

        {step === 0 && (
          <>
            <div className="vs-field">
              <label>Nombre completo</label>
              <input className="vs-input" value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej. Ana Morales" />
            </div>
            <div className="vs-grid2">
              <div className="vs-field">
                <label>Cédula</label>
                <input className="vs-input" value={f.cedula} onChange={(e) => set("cedula", e.target.value)} placeholder="N.º de documento" />
              </div>
              <div className="vs-field">
                <label>Edad</label>
                <input className="vs-input" value={f.edad} onChange={(e) => set("edad", e.target.value.replace(/\D/g, ""))} placeholder="Años" />
              </div>
            </div>
            <div className="vs-note"><Sparkles size={15} style={{ flexShrink: 0, color: "var(--brand)" }} />
              En el producto real, tu cédula recupera tu historia clínica cifrada. En este demo no se guarda ningún dato.
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="vs-field">
              <label>¿Qué te trae a consulta?</label>
              <textarea className="vs-area" value={f.motivo} onChange={(e) => set("motivo", e.target.value)}
                placeholder="Describe lo que sientes con tus propias palabras…" />
            </div>
            <div className="vs-field">
              <label>¿Desde cuándo?</label>
              <select className="vs-select" value={f.evolucion} onChange={(e) => set("evolucion", e.target.value)}>
                <option value="">Selecciona…</option>
                {EVOLUCIONES.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="vs-field">
              <label>Intensidad ahora mismo · {f.intensidad}/10</label>
              <input className="vs-slider" type="range" min="1" max="10" value={f.intensidad}
                onChange={(e) => set("intensidad", e.target.value)} />
              <div className="vs-slider-val"><span>Leve</span><span>Insoportable</span></div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {FLAGS.map((flag) => {
              const on = f.flags.includes(flag);
              return (
                <button key={flag} className={"vs-flagbox" + (on ? " on" : "")} onClick={() => toggleFlag(flag)}>
                  <span className="ck">{on && <Check size={14} />}</span>
                  <span>{flag}</span>
                </button>
              );
            })}
            <button className={"vs-flagbox" + (f.selfHarm ? " on" : "")} onClick={() => set("selfHarm", !f.selfHarm)}>
              <span className="ck">{f.selfHarm && <Check size={14} />}</span>
              <span>Tengo pensamientos de hacerme daño</span>
            </button>
            <div className="vs-note" style={{ marginTop: 12 }}>
              <ShieldCheck size={15} style={{ flexShrink: 0, color: "var(--brand)" }} />
              Si marcas alguna, VitalSis no agenda una cita: te orienta de inmediato hacia la atención adecuada.
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="vs-field">
              <label>¿Dónde lo sientes? (localización)</label>
              <input className="vs-input" value={f.localizacion} onChange={(e) => set("localizacion", e.target.value)} placeholder="Ej. garganta, cabeza, abdomen…" />
            </div>
            <div className="vs-grid2">
              <div className="vs-field">
                <label>¿Qué lo mejora?</label>
                <input className="vs-input" value={f.mejora} onChange={(e) => set("mejora", e.target.value)} placeholder="Calor, reposo, comer…" />
              </div>
              <div className="vs-field">
                <label>¿Qué lo empeora?</label>
                <input className="vs-input" value={f.empeora} onChange={(e) => set("empeora", e.target.value)} placeholder="Frío, noche, esfuerzo…" />
              </div>
            </div>
            <div className="vs-field">
              <label>Síntomas que lo acompañan</label>
              <input className="vs-input" value={f.acompanantes} onChange={(e) => set("acompanantes", e.target.value)} placeholder="Ej. náuseas, sed, cansancio (separa con comas)" />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="vs-field">
              <label>Antecedentes médicos relevantes</label>
              <textarea className="vs-area" value={f.antecedentes} onChange={(e) => set("antecedentes", e.target.value)} placeholder="Enfermedades, cirugías, condiciones crónicas…" />
            </div>
            <div className="vs-grid2">
              <div className="vs-field">
                <label>Medicación actual</label>
                <input className="vs-input" value={f.medicacion} onChange={(e) => set("medicacion", e.target.value)} placeholder="Medicamentos que tomas" />
              </div>
              <div className="vs-field">
                <label>Alergias</label>
                <input className="vs-input" value={f.alergias} onChange={(e) => set("alergias", e.target.value)} placeholder="Medicamentos, alimentos…" />
              </div>
            </div>
            <div className="vs-note">
              <FileText size={15} style={{ flexShrink: 0, color: "var(--brand)" }} />
              Al enviar, VitalSis ordena todo en una ficha y la entrega al médico. El diagnóstico y la fórmula son siempre del profesional.
            </div>
          </>
        )}

        <div className="vs-nav">
          {step === 0
            ? <button className="vs-btn vs-btn-ghost" onClick={() => go("hero")}><ArrowLeft size={17} /> Volver</button>
            : <button className="vs-btn vs-btn-ghost" onClick={() => setStep(step - 1)}><ArrowLeft size={17} /> Atrás</button>}
          {step < 4
            ? <button className="vs-btn vs-btn-primary" disabled={!canNext()}
                style={{ opacity: canNext() ? 1 : .45 }} onClick={() => canNext() && setStep(step + 1)}>
                Continuar <ArrowRight size={17} />
              </button>
            : <button className="vs-btn vs-btn-primary" onClick={finish}>Enviar mi caso <ArrowRight size={17} /></button>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- TRIAGE RESULT ---------------- */
function Result({ data, go, restart }) {
  const { triage } = data;

  if (data.selfHarm) {
    return (
      <div className="vs-wrap vs-section">
        <div className="vs-result">
          <div className="halo" style={{ background: "var(--brand)" }}><LifeBuoy size={34} /></div>
          <h2>No tienes que pasar por esto solo</h2>
          <p>Lo que escribiste importa y mereces apoyo ahora. Hablar con alguien preparado puede ayudarte a sentirte mejor.</p>
          <div className="vs-urgent" style={{ background: "var(--brand-soft)", borderColor: "#BBDDD8" }}>
            <h3 style={{ color: "var(--brand-deep)" }}><Phone size={18} /> Busca apoyo de inmediato</h3>
            <ul>
              <li>En Colombia, la Línea 106 ofrece apoyo psicológico gratuito.</li>
              <li>Si estás en peligro inmediato, llama a la línea de emergencias 123.</li>
              <li>Acompañarte con alguien de confianza también ayuda.</li>
            </ul>
          </div>
          <div className="vs-cta-row" style={{ justifyContent: "center", marginTop: 22 }}>
            <button className="vs-btn vs-btn-ghost" onClick={restart}>Volver al inicio</button>
          </div>
        </div>
      </div>
    );
  }

  if (triage === "rojo") {
    return (
      <div className="vs-wrap vs-section">
        <div className="vs-result">
          <div className="halo" style={{ background: "var(--red)" }}><AlertTriangle size={34} /></div>
          <h2>Esto requiere atención inmediata</h2>
          <p>Según lo que indicaste, tus síntomas pueden ser una urgencia. VitalSis no agenda una cita en estos casos.</p>
          <div className="vs-urgent">
            <h3><AlertTriangle size={18} /> Qué hacer ahora</h3>
            <ul>
              <li>Dirígete al servicio de urgencias más cercano.</li>
              <li>Llama a la línea de emergencias 123.</li>
              <li>Si puedes, pide que alguien te acompañe o te traslade.</li>
            </ul>
            <button className="vs-call"><Phone size={17} /> Llamar al 123</button>
          </div>
          <div className="vs-cta-row" style={{ justifyContent: "center", marginTop: 22 }}>
            <button className="vs-btn vs-btn-ghost" onClick={restart}>Entiendo, volver</button>
          </div>
        </div>
      </div>
    );
  }

  const t = TRI[triage];
  return (
    <div className="vs-wrap vs-section">
      <div className="vs-result">
        <div className="halo" style={{ background: t.c }}><CheckCircle2 size={34} /></div>
        <h2>{triage === "amarillo" ? "Listo, te damos prioridad" : "Listo, organizamos tu caso"}</h2>
        <p>
          {triage === "amarillo"
            ? "Por la intensidad de tus síntomas, tu caso entra como prioritario. Un médico lo revisará pronto."
            : "Preparamos tu información y la enviamos al médico. Él hará el diagnóstico y la fórmula en la consulta."}
        </p>

        <div className="vs-assigned">
          <span className="av">EV</span>
          <span>
            <b>{DOCTOR.name}</b>
            <small>Homeopatía · Recibió tu caso</small>
          </span>
          <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: t.pill.color, background: t.pill.bg, padding: "5px 11px", borderRadius: 99 }}>
            {t.label}
          </span>
        </div>

        <div className="vs-summary">
          <div className="vs-srow"><span className="k">Motivo</span><span className="v">{data.motivo}</span></div>
          <div className="vs-srow"><span className="k">Evolución</span><span className="v">{data.evolucion}</span></div>
          <div className="vs-srow"><span className="k">Intensidad</span><span className="v">{data.intensidad}/10</span></div>
          {data.empeora && <div className="vs-srow"><span className="k">Empeora con</span><span className="v">{data.empeora}</span></div>}
          {data.medicacion && <div className="vs-srow"><span className="k">Medicación</span><span className="v">{data.medicacion}</span></div>}
        </div>

        <div className="vs-cta-row" style={{ justifyContent: "center", marginTop: 24 }}>
          <button className="vs-btn vs-btn-primary" onClick={() => go("doctor")}>
            <Stethoscope size={18} /> Ver cómo lo recibe el médico
          </button>
          <button className="vs-btn vs-btn-ghost" onClick={restart}>Nueva consulta</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- DOCTOR ---------------- */
function Pill_({ triage }) {
  const t = TRI[triage];
  return <span className="vs-pill" style={{ color: t.pill.color, background: t.pill.bg }}>{t.label}</span>;
}

function DoctorList({ cases, open, freshId }) {
  const [q, setQ] = useState("");
  const visible = cases.filter((c) => c.triage !== "rojo");
  const filtered = visible.filter((c) =>
    (c.nombre + c.motivo).toLowerCase().includes(q.toLowerCase()));
  const prioritarios = visible.filter((c) => c.triage === "amarillo").length;

  return (
    <div className="vs-wrap vs-section">
      <div className="vs-pagehead">
        <div>
          <h2>Casos del día</h2>
          <p>Cada paciente llega con su anamnesis estructurada y su nivel de triaje. Abre uno para ver el caso completo y formular.</p>
        </div>
      </div>

      <div className="vs-docbar">
        <span className="av">EV</span>
        <div><b>{DOCTOR.name}</b><br /><small>{DOCTOR.spec} · {DOCTOR.reg}</small></div>
      </div>

      <div className="vs-stats">
        <div className="vs-stat"><div className="n">{visible.length}</div><div className="l">Casos en cola</div></div>
        <div className="vs-stat"><div className="n" style={{ color: "var(--amber)" }}>{prioritarios}</div><div className="l">Prioritarios</div></div>
        <div className="vs-stat"><div className="n" style={{ color: "var(--red)" }}>1</div><div className="l">Derivados a urgencias hoy</div></div>
        <div className="vs-stat"><div className="n" style={{ color: "var(--green)" }}>6</div><div className="l">Validados esta semana</div></div>
      </div>

      <div className="vs-search">
        <Search size={16} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o motivo…" />
      </div>

      <div className="vs-caselist">
        {filtered.map((c) => (
          <button key={c.id} className={"vs-caserow" + (c.id === freshId ? " fresh" : "")} onClick={() => open(c.id)}>
            <span className="vs-dot" style={{ background: TRI[c.triage].c }} />
            <span className="who">
              <b>{c.nombre}{c.id === freshId && <span style={{ fontSize: 11, fontWeight: 600, color: "var(--brand)", marginLeft: 8 }}>· nuevo</span>}</b>
              <small>{c.motivo}</small>
            </span>
            <span className="vs-tag">{c.tipo}</span>
            <Pill_ triage={c.triage} />
            <span className="vs-meta"><Clock size={13} /> {c.hace}</span>
            <ChevronRight size={18} style={{ color: "var(--ink-faint)" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function RepertoryRef({ rubricas }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="vs-rep">
      <button className="vs-rep-head" onClick={() => setOpen(!open)}>
        <span className="ico"><FlaskConical size={17} /></span>
        <span style={{ flex: 1 }}>
          <b>Referencia repertorial · Kent (dominio público)</b>
          <small>Apoyo para el médico — visible solo aquí</small>
        </span>
        <ChevronDown size={18} style={{ color: "#9A7426", transform: open ? "rotate(180deg)" : "none", transition: ".2s" }} />
      </button>
      {open && (
        <div className="vs-rep-body">
          <div className="vs-disclaim">
            <AlertTriangle size={15} style={{ flexShrink: 0 }} />
            Material de referencia, no un diagnóstico ni una prescripción. Las rúbricas y sus grados provienen del repertorio; el criterio clínico es del profesional.
          </div>
          {rubricas.map((r, i) => (
            <div className="vs-rub" key={i}>
              <div className="rname">{r.name}</div>
              <div className="vs-rems">
                {r.rems.map(([rem, g]) => (
                  <span key={rem} className={"vs-rem vs-g" + g}><i>{g}</i> {rem}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DoctorCase({ c, back, onSign, signed }) {
  const [dx, setDx] = useState("");
  const [rx, setRx] = useState("");
  const t = TRI[c.triage];
  const acomp = Array.isArray(c.acompanantes) ? c.acompanantes
    : String(c.acompanantes || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="vs-wrap vs-section">
      <button className="vs-back" onClick={back}><ArrowLeft size={16} /> Volver a los casos</button>

      <div className="vs-patienthead">
        <span className="av">{c.nombre.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
        <div>
          <h2>{c.nombre}</h2>
          <small>{c.edad} años · Cédula {c.cedula} · <span style={{ color: "var(--brand-deep)", fontWeight: 600 }}>{c.tipo}</span></small>
        </div>
      </div>

      <div className="vs-tri-banner" style={{ background: t.soft, color: t.pill.color }}>
        <ShieldCheck size={18} /> Triaje <b style={{ margin: "0 4px" }}>{t.label}</b>
        {c.triage === "amarillo" ? "— revisar pronto por intensidad alta" : "— sin banderas de urgencia"}
      </div>

      <div className="vs-detail-grid">
        <div>
          <div className="vs-block">
            <h3><ClipboardList size={15} /> Anamnesis estructurada</h3>
            <div className="vs-dl">
              <div className="r"><span className="k">Motivo</span><span className="v">{c.motivo}</span></div>
              <div className="r"><span className="k">Evolución</span><span className="v">{c.evolucion}</span></div>
              <div className="r"><span className="k">Localización</span><span className="v">{c.localizacion || "—"}</span></div>
              <div className="r"><span className="k">Intensidad</span><span className="v">{c.intensidad}/10</span></div>
              <div className="r"><span className="k">Mejora con</span><span className="v">{c.mejora || "—"}</span></div>
              <div className="r"><span className="k">Empeora con</span><span className="v">{c.empeora || "—"}</span></div>
            </div>
          </div>

          {acomp.length > 0 && (
            <div className="vs-block">
              <h3><Activity size={15} /> Síntomas acompañantes</h3>
              <div className="vs-chiprow">{acomp.map((a, i) => <span className="vs-chip" key={i}>{a}</span>)}</div>
            </div>
          )}

          <div className="vs-block">
            <h3><FileText size={15} /> Antecedentes y seguridad</h3>
            <div className="vs-dl">
              <div className="r"><span className="k">Antecedentes</span><span className="v">{c.antecedentes || "—"}</span></div>
              <div className="r"><span className="k">Medicación</span><span className="v">{c.medicacion || "Ninguna"}</span></div>
              <div className="r"><span className="k">Alergias</span><span className="v">{c.alergias || "Ninguna conocida"}</span></div>
            </div>
          </div>
        </div>

        <div>
          {c.tipo === "Homeopatía" && c.rubricas && <RepertoryRef rubricas={c.rubricas} />}

          <div className="vs-block vs-ws">
            <h3><Stethoscope size={15} /> Valoración del médico</h3>
            {signed ? (
              <div className="vs-signed">
                <div className="ico"><Check size={24} /></div>
                <b>Caso validado y firmado</b>
                <small>El paciente recibe el reporte con tu fórmula, la orden de laboratorio y el despacho de farmacia.</small>
              </div>
            ) : (
              <>
                <div className="vs-field">
                  <label>Diagnóstico</label>
                  <textarea className="vs-area" value={dx} onChange={(e) => setDx(e.target.value)} placeholder="Impresión diagnóstica del profesional…" />
                </div>
                <div className="vs-field">
                  <label>Formulación</label>
                  <textarea className="vs-area" value={rx} onChange={(e) => setRx(e.target.value)} placeholder={c.tipo === "Homeopatía" ? "Remedio, potencia y posología…" : "Medicamento, dosis y duración…"} />
                </div>
                <button className="vs-btn vs-btn-primary" style={{ width: "100%", justifyContent: "center", opacity: dx && rx ? 1 : .5 }}
                  disabled={!dx || !rx} onClick={onSign}>
                  <Check size={18} /> Firmar y enviar al paciente
                </button>
                <div className="vs-note" style={{ marginTop: 12 }}>
                  <Building2 size={15} style={{ flexShrink: 0, color: "var(--brand)" }} />
                  Al firmar se generan la orden de laboratorio y el despacho de farmacia conectados (módulos del roadmap).
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  const [view, setView] = useState("hero");
  const [tab, setTab] = useState("paciente");
  const [cases, setCases] = useState(SEED);
  const [freshId, setFreshId] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [signedIds, setSignedIds] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const go = (v) => {
    setView(v);
    setTab(v === "doctor" ? "medico" : "paciente");
    window.scrollTo(0, 0);
  };

  const onFinish = (data) => {
    setLastResult(data);
    if (data.triage !== "rojo" && !data.selfHarm) {
      const id = "live";
      const nc = {
        id, nombre: data.nombre || "Paciente demo", edad: data.edad || "—",
        cedula: data.cedula ? data.cedula.slice(0, 4) + "•••" + data.cedula.slice(-3) : "—",
        tipo: "Homeopatía",
        motivo: data.motivo, triage: data.triage, hace: "ahora",
        evolucion: data.evolucion, localizacion: data.localizacion,
        intensidad: data.intensidad, mejora: data.mejora, empeora: data.empeora,
        acompanantes: data.acompanantes, antecedentes: data.antecedentes,
        medicacion: data.medicacion, alergias: data.alergias,
        rubricas: [
          { name: "GENERALES — síntoma principal (referencia)", rems: [["Sulph",2],["Puls",2],["Nux-v",1]] },
        ],
      };
      setCases((cs) => [nc, ...cs.filter((c) => c.id !== "live")]);
      setFreshId(id);
    }
    go("result");
  };

  const restart = () => { setLastResult(null); go("intake"); };
  const openCase = (id) => { setOpenId(id); go("casedetail"); };
  const signCase = () => { if (openId) setSignedIds((s) => [...s, openId]); };

  const onTab = (which) => {
    setTab(which);
    if (which === "paciente") setView(lastResult ? "result" : "hero");
    else setView("doctor");
    window.scrollTo(0, 0);
  };

  const current = cases.find((c) => c.id === openId);

  return (
    <div className="vs-root">

      <header className="vs-top">
        <div className="vs-wrap vs-top-in">
          <Logo />
          <div className="vs-tabs">
            <button className={"vs-tab" + (tab === "paciente" ? " on" : "")} onClick={() => onTab("paciente")}>Experiencia del paciente</button>
            <button className={"vs-tab" + (tab === "medico" ? " on" : "")} onClick={() => onTab("medico")}>Panel del médico</button>
          </div>
          <span className="vs-badge">Demo</span>
        </div>
      </header>

      {view === "hero" && <Hero go={go} />}
      {view === "intake" && <Intake onFinish={onFinish} go={go} />}
      {view === "result" && lastResult && <Result data={lastResult} go={go} restart={restart} />}
      {view === "doctor" && <DoctorList cases={cases} open={openCase} freshId={freshId} />}
      {view === "casedetail" && current &&
        <DoctorCase c={current} back={() => go("doctor")} onSign={signCase} signed={signedIds.includes(openId)} />}

      <footer className="vs-foot">
        <div className="vs-wrap">
          <p>
            VitalSis · Demo para presentación a convocatoria. Datos simulados, no clínicos.
            El diagnóstico y la prescripción los realiza siempre un profesional con licencia vigente.
          </p>
        </div>
      </footer>
    </div>
  );
}
