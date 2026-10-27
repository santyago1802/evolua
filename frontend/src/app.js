import React, { useState } from 'react';
import { LISTA_DE_LOGROS } from './data/logrosData';

function App() {
  const [usuario, setUsuario] = useState({
    nombre: 'Santiago Martínez',
    nivel: 2,
    currentXp: 180,
    xpMaxima: 360,
    rachaDias: 7,
    habitosConsolidados: 14,
    xpTotalAcumulada: 1250, // XP histórica para rangos
    notificacionRacha: '⚠️ Alerta: Tu racha está en riesgo. Si faltas 1 días, perderas 100 XP. ¡Completa un hábito hoy para mantener tu racha viva!'
  });

  const [habitos, setHabitos] = useState([
    { id: 1, titulo: 'Práctica de Arquitectura Limpia & SQL', categoria: 'Conocimiento & Código', xp: 45, completado: false },
    { id: 2, titulo: 'Hidratación óptima (2.5L de agua)', categoria: 'Bio-Salud & Fitness', xp: 20, completado: true },
    { id: 3, titulo: 'Entrenamiento de hipertrofia o cardio 40m', categoria: 'Bio-Salud & Fitness', xp: 50, completado: false },
    { id: 4, titulo: '15 minutos de respiración consciente', categoria: 'Equilibrio Mental', xp: 30, completado: true },
    { id: 5, titulo: 'Lectura de 20 páginas de libro formativo', categoria: 'Conocimiento & Código', xp: 35, completado: false }
  ]);

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('Conocimiento & Código');
  const [nuevoXp, setNuevoXp] = useState(40);

  const [logros] = useState(LISTA_DE_LOGROS);

  // Sistema de rangos con apodos de "aura"
  const obtenerRangoPorXp = (xp) => {
    if (xp < 500) return { nombre: 'Bronce', aura: 'Experimento Inestable', color: '#b45309', siguiente: 500, medalla: '🥉' };
    if (xp < 1000) return { nombre: 'Plata', aura: 'Mutación en Desarrollo', color: '#94a3b8', siguiente: 1000, medalla: '🥈' };
    if (xp < 1500) return { nombre: 'Oro', aura: 'Humano Promedio Estandarizado', color: '#facc15', siguiente: 1500, medalla: '🥇' };
    if (xp < 2000) return { nombre: 'Platino', aura: 'Humano Optimizado', color: '#2dd4bf', siguiente: 2000, medalla: '💎' };
    if (xp < 2500) return { nombre: 'Diamante', aura: 'Sujeto de Élite', color: '#60a5fa', siguiente: 2500, medalla: '💠' };
    if (xp < 3000) return { nombre: 'Heroico', aura: 'Vanguardia Inquebrantable', color: '#f87171', siguiente: 3000, medalla: '🔥' };
    if (xp < 3500) return { nombre: 'Heroico Élite', aura: 'Dominador del Caos', color: '#ec4899', siguiente: 3500, medalla: '⚡' };
    if (xp < 4000) return { nombre: 'Maestro', aura: 'Soberano del Genoma', color: '#a855f7', siguiente: 4000, medalla: '🔮' };
    if (xp < 5000) return { nombre: 'Maestro Élite', aura: 'Entidad Inmortalizada', color: '#8b5cf6', siguiente: 5000, medalla: '🛡️' };
    return { nombre: 'Gran Maestro', aura: 'Apex Omnipotente 👑', color: '#f59e0b', siguiente: 5000, medalla: '👑' };
  };

  const rangoActual = obtenerRangoPorXp(usuario.xpTotalAcumulada);
  const xpFaltanteSiguienteRango = rangoActual.siguiente - usuario.xpTotalAcumulada;
  const porcentajeRango = rangoActual.siguiente === 5000 && usuario.xpTotalAcumulada >= 5000 
    ? 100 
    : Math.min(((usuario.xpTotalAcumulada % 500) / 500) * 100, 100);

  const totalCompletados = habitos.filter(h => h.completado).length;

  const toggleCompletarHabito = (id) => {
    setHabitos(habitos.map(h => {
      if (h.id === id) {
        const nuevoEstado = !h.completado;
        const cambioXp = nuevoEstado ? h.xp : -h.xp;
        
        let xpActualizada = usuario.currentXp + cambioXp;
        let xpTotalNueva = usuario.xpTotalAcumulada + cambioXp;
        let nivelActual = usuario.nivel;
        let xpMaxActual = usuario.xpMaxima;

        if (xpActualizada >= xpMaxActual) {
          xpActualizada -= xpMaxActual;
          nivelActual += 1;
          xpMaxActual += 180;
        } else if (xpActualizada < 0) {
          xpActualizada = 0;
        }

        setUsuario(prev => ({
          ...prev,
          currentXp: xpActualizada,
          xpTotalAcumulada: Math.max(0, xpTotalNueva),
          nivel: nivelActual,
          xpMaxima: xpMaxActual,
          habitosConsolidados: nuevoEstado ? prev.habitosConsolidados + 1 : prev.habitosConsolidados - 1
        }));

        return { ...h, completado: nuevoEstado };
      }
      return h;
    }));
  };

  const agregarHabito = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;
    const nuevo = { id: Date.now(), titulo: nuevoTitulo, categoria: nuevaCategoria, xp: Number(nuevoXp), completado: false };
    setHabitos([nuevo, ...habitos]);
    setNuevoTitulo('');
  };

  const eliminarHabito = (id) => {
    setHabitos(habitos.filter(h => h.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        
        {/* BANNER DE NOTIFICACIÓN DE RACHA */}
        {usuario.notificacionRacha && (
          <div className="notification-banner">
            <span>{usuario.notificacionRacha}</span>
            <button 
              onClick={() => setUsuario(prev => ({ ...prev, notificacionRacha: null }))}
              style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* HEADER */}
        <header className="app-header">
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', color: '#60a5fa' }}>EVOLUA🧬</h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>La constancia es el ADN de los grandes cambios; un hábito a la vez transforma tu día.</p>
          </div>
          <div style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            ● Sincronizado en tiempo real
          </div>
        </header>

        {/* PERFIL, MEDALLA Y APODO CON AURA */}
        <section className="profile-section">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{usuario.nombre}</h2>
              <span className="badge-box" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${rangoActual.color}`, color: rangoActual.color }}>
                {rangoActual.medalla} {rangoActual.nombre}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
              Estado: <strong style={{ color: rangoActual.color, fontStyle: 'italic' }}>{rangoActual.aura}</strong>
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#38bdf8' }}>
              {usuario.xpTotalAcumulada >= 5000 ? '👑 ¡Rango Máximo Absoluto!' : `Faltan ${xpFaltanteSiguienteRango} XP para Platino`}
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#cbd5e1' }}>
              <span>Progreso hacia Siguiente Rango</span>
              <span>{usuario.xpTotalAcumulada} / {rangoActual.siguiente} XP</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#0f172a', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid #334155' }}>
              <div style={{ width: `${porcentajeRango}%`, height: '100%', background: rangoActual.color, transition: 'width 0.5s' }}></div>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Nivel de Dominio: Nivel {usuario.nivel}</p>
          </div>

          <div style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.3)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>🔥 {usuario.rachaDias} DÍAS</span>
              <p style={{ margin: 0, fontSize: '10px', color: '#fcd34d', textTransform: 'uppercase' }}>Racha Activa Imparable</p>
            </div>
            <span style={{ background: '#d97706', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px' }}>x1.5 XP</span>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid-layout">
          
          {/* IZQUIERDA: CREAR HÁBITO Y LISTA MASIVA DE LOGROS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="card">
              <h3 style={{ marginTop: 0, fontSize: '16px', color: '#60a5fa' }}>➕ Registrar Nuevo Hábito</h3>
              <form onSubmit={agregarHabito}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Actividad o Rutina</label>
                <input type="text" placeholder="Ej: Programar 45 min..." value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} className="form-input" />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Área</label>
                    <select value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)} className="form-input">
                      <option value="Conocimiento & Código">Código</option>
                      <option value="Bio-Salud & Fitness">Salud</option>
                      <option value="Equilibrio Mental">Mental</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>XP</label>
                    <input type="number" value={nuevoXp} onChange={e => setNuevoXp(e.target.value)} className="form-input" />
                  </div>
                </div>

                <button type="submit" className="btn-primary">Registrar en el Genoma</button>
              </form>
            </div>

            {/* SECCIÓN DE LOGROS CON SCROLL */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#facc15' }}>🏆 Logros de Mutación</h3>
                <span style={{ fontSize: '11px', background: '#1e293b', padding: '2px 8px', borderRadius: '6px', color: '#94a3b8' }}>
                  {logros.filter(l => totalCompletados >= l.reqHabitos).length} / {logros.length}
                </span>
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {logros.map(l => {
                  const activo = totalCompletados >= l.reqHabitos;
                  return (
                    <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: activo ? 'rgba(16, 185, 129, 0.05)' : '#0f172a', border: activo ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid #1e293b', borderRadius: '8px', fontSize: '12px' }}>
                      <div>
                        <strong style={{ color: activo ? '#34d399' : '#fff' }}>{l.titulo}</strong>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '10px' }}>{l.desc}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: activo ? '#34d399' : '#64748b', fontWeight: 'bold' }}>
                        {activo ? 'COMPLETADO' : `Req: ${l.reqHabitos}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* DERECHA: LISTA DE HÁBITOS */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>⚡ Secuencia de Hábitos Diarios</h3>
              <span style={{ fontSize: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 10px', borderRadius: '12px' }}>
                {totalCompletados} / {habitos.length} Completados
              </span>
            </div>

            <div>
              {habitos.map(h => (
                <div key={h.id} className={`habit-card ${h.completado ? 'completed' : ''}`}>
                  <div>
                    <span className="badge-tag">{h.categoria}</span>
                    <h4 style={{ margin: '6px 0 2px 0', fontSize: '14px', textDecoration: h.completado ? 'line-through' : 'none', color: h.completado ? '#94a3b8' : '#fff' }}>{h.titulo}</h4>
                    <span style={{ fontSize: '11px', color: '#f59e0b' }}>+{h.xp} XP</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => toggleCompletarHabito(h.id)} className={h.completado ? 'btn-secondary' : 'btn-primary'} style={{ padding: '8px 12px', fontSize: '11px' }}>
                      {h.completado ? 'Revertir' : 'Completar'}
                    </button>
                    <button onClick={() => eliminarHabito(h.id)} className="btn-danger">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;