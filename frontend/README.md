# 🧬 Evolúa  - Adaptive Habit Architecture

> *"La constancia es el ADN de los grandes cambios; un hábito a la vez transforma tu día."*

**Evolúa** es una aplicación web full-stack de seguimiento de hábitos gamificados con una temática inspirada en la arquitectura genética y la evolución biológica (DNA). Diseñada para transformar rutinas diarias en una experiencia competitiva, desafiante y persistente.

---

## 🚀 Vista Previa de la Interfaz

*(Aquí puedes colocar una captura de pantalla de tu aplicación funcionando)*

---

## 🧠 Características Principales y Gamificación

- **Sistema de Rangos y Medallas:** Progresión competitiva basada en XP acumulada histórica, escalando desde rangos iniciales (*Bronce / Experimento Inestable*) hasta el dominio absoluto (*Gran Maestro / Apex Omnipotente*).
- **Apodos de Aura:** El perfil del usuario evoluciona su estado dinámicamente conforme sube de nivel y completa metas.
- **Logros de Mutación:** Más de 15+ logros exigentes organizados por etapas de evolución con una barra de desplazamiento optimizada (*scroll*).
- **Sistema de Alerta por Inactividad:** Notificaciones simuladas que advierten al usuario sobre el riesgo de perder su racha y la penalización en XP.
- **Persistencia en Tiempo Real:** Conectado de extremo a extremo a una base de datos NoSQL para asegurar que los cambios de hábitos y puntajes no se pierdan.

---

## 🛠️ Stack Tecnológico

Este proyecto está desarrollado bajo una arquitectura modular y separada de responsabilidades:

* **Frontend:** 
  * React.js (Componentes funcionales y Hooks)
  * CSS Moderno modular (`index.css`)
* **Backend:** 
  * Node.js con Express.js (API RESTful estructurada en Modelos, Controladores y Rutas)
* **Base de Datos:** 
  * MongoDB & Mongoose (Esquemas optimizados y persistencia de datos)

---

## ⚙️ Estructura del Proyecto

```text
evolua/
│
├── backend/
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio (habitoscontrollers.js)
│   │   ├── models/        # Esquemas de Mongoose (Habito.js)
│   │   ├── routers/       # Endpoints de la API (habitosRutas.js)
│   │   └── servidor.js    # Punto de entrada del servidor Express
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── data/          # Datos estáticos escalables (logrosData.js)
    │   ├── App.js         # Componente principal de vistas y estados
    │   └── index.css      # Estilos globales y diseño temático oscuro
    └── package.json