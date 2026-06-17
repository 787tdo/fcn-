import { useState } from "react";
import { MessageSquare, ThumbsUp, Share2, Send, Hash, TrendingUp, Pin } from "lucide-react";

// Hashtag del día — rota cada día del año usando la fecha
function getDailyHashtag(): string {
  const hashtags = [
    "MéxicoExigeJusticia",
    "NiUnaMás",
    "MadresBuscadoras",
    "FueraCORRUPCIÓN",
    "DesaparecidosMéxico",
    "MéxicoSeguro",
    "JusticiaParaTodos",
    "VozCiudadana",
    "MéxicoDespierta",
    "FuerzaMadresBuscadoras",
    "AnticorrupciónYa",
    "DerechosHumanosMéxico",
    "MéxicoNoEstáSolo",
    "JusticiaParaEllos",
    "SeguridadYa",
    "MéxicoUnido",
    "TransparenciaYa",
    "BuscarEsResistir",
    "MéxicoExige",
    "NoMásImpunidad",
    "FuerzaMéxico",
    "CiudadanosUnidos",
    "JusticiaSocial",
    "MéxicoDignidad",
    "NoMásCorrupción",
    "VerdadYJusticia",
    "MéxicoResiste",
    "PorEllasPorTodos",
    "ExigimosCuentas",
    "MéxicoConVoz",
    "PazYJusticia",
  ];
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return hashtags[dayOfYear % hashtags.length];
}

const initialPosts = [
  {
    id: 1,
    author: "Rosario M.",
    estado: "Jalisco",
    time: "hace 12 min",
    tag: "Desapariciones",
    tagColor: "#b91c1c",
    pinned: true,
    content:
      "Llevamos 3 años buscando a mi hijo. La fiscalía cerró el caso sin resultados. ¿Alguien más ha pasado por esto y sabe cómo recurrir ante la CNDH? Necesitamos asesoría urgente.",
    likes: 184,
    replies: 37,
  },
  {
    id: 2,
    author: "Colectivo Sonora Segura",
    estado: "Sonora",
    time: "hace 28 min",
    tag: "Seguridad",
    tagColor: "#2d4a7a",
    pinned: false,
    content:
      "Documentamos 14 colonias en Hermosillo sin alumbrado público desde hace 8 meses. Ya enviamos 3 oficios al municipio sin respuesta. Mañana haremos plantón. ¿Quién se une?",
    likes: 97,
    replies: 22,
  },
  {
    id: 3,
    author: "Anónimo",
    estado: "Veracruz",
    time: "hace 1 hr",
    tag: "Corrupción",
    tagColor: "#374151",
    pinned: false,
    content:
      "El director de obras públicas de mi municipio adjudicó contratos a su propia empresa. Tengo documentos. ¿Cómo los presento ante la SFP de forma segura y sin exponer mi identidad?",
    likes: 213,
    replies: 54,
  },
  {
    id: 4,
    author: "Familias de Guerrero",
    estado: "Guerrero",
    time: "hace 2 hr",
    tag: "Desapariciones",
    tagColor: "#b91c1c",
    pinned: false,
    content:
      "Este viernes realizamos jornada de búsqueda en zona serrana. Necesitamos voluntarios con vehículo propio. También buscamos médicos o paramédicos para acompañar el operativo.",
    likes: 76,
    replies: 18,
  },
  {
    id: 5,
    author: "Red Feminista CDMX",
    estado: "Ciudad de México",
    time: "hace 3 hr",
    tag: "Feminicidio",
    tagColor: "#7c1d1d",
    pinned: false,
    content:
      "La Fiscalía clasifica el caso de Andrea como 'homicidio doloso' y no como feminicidio, evitando la agravante. Iniciamos campaña legal. Abogadas con experiencia en perspectiva de género: necesitamos su apoyo.",
    likes: 301,
    replies: 89,
  },
];

const tagColors: Record<string, string> = {
  Desapariciones: "#b91c1c",
  Seguridad: "#2d4a7a",
  Corrupción: "#374151",
  Feminicidio: "#7c1d1d",
  Marchas: "#4b5563",
  Derechos: "#1a2744",
  General: "#6b6b6b",
};

export function Forum() {
  const hashtag = getDailyHashtag();
  const [posts, setPosts] = useState(initialPosts);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [newPost, setNewPost] = useState({ content: "", tag: "General", estado: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTag, setActiveTag] = useState("Todos");

  const tags = ["Todos", "Desapariciones", "Seguridad", "Corrupción", "Feminicidio", "Marchas", "Derechos", "General"];

  const filtered = activeTag === "Todos" ? posts : posts.filter((p) => p.tag === activeTag);

  const handleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, likes: p.likes - 1 } : p)));
      } else {
        next.add(id);
        setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (!newPost.content.trim() || !newPost.estado.trim()) return;
    const post = {
      id: Date.now(),
      author: "Ciudadano anónimo",
      estado: newPost.estado,
      time: "ahora mismo",
      tag: newPost.tag,
      tagColor: tagColors[newPost.tag] || "#6b6b6b",
      pinned: false,
      content: newPost.content,
      likes: 0,
      replies: 0,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost({ content: "", tag: "General", estado: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputBase = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    color: "#1a2744",
    backgroundColor: "#f5f4f0",
    border: "1px solid rgba(26,39,68,0.18)",
    borderRadius: "2px",
    padding: "0.65rem 0.9rem",
    outline: "none",
    width: "100%",
  };

  return (
    <section style={{ backgroundColor: "#f5f4f0" }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header + Hashtag del día */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ backgroundColor: "#b91c1c" }} />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#b91c1c",
                }}
                className="uppercase"
              >
                Foro ciudadano
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Hablemos sin miedo
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#6b6b6b",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                marginTop: "0.75rem",
                maxWidth: "420px",
              }}
            >
              Comparte tu caso, busca asesoría, organiza acciones. Espacio
              moderado por la comunidad.
            </p>
          </div>

          {/* Hashtag del día */}
          <div
            style={{
              backgroundColor: "#1a2744",
              padding: "1.25rem 1.75rem",
              minWidth: "260px",
              borderLeft: "3px solid #b91c1c",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={13} color="#b91c1c" />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.66rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.1em",
                }}
                className="uppercase"
              >
                Hashtag del día
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <Hash size={20} color="#b91c1c" style={{ marginTop: "2px", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#ffffff",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {hashtag}
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.7rem",
                marginTop: "0.75rem",
              }}
            >
              Úsalo hoy en tus redes sociales para amplificar tu voz
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed — 2/3 */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.9rem",
                    backgroundColor: activeTag === t ? "#1a2744" : "transparent",
                    color: activeTag === t ? "#ffffff" : "#1a2744",
                    border: "1px solid",
                    borderColor: activeTag === t ? "#1a2744" : "rgba(26,39,68,0.2)",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-4">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(26,39,68,0.1)",
                    borderLeft: post.pinned ? "3px solid #b91c1c" : "1px solid rgba(26,39,68,0.1)",
                    padding: "1.5rem",
                  }}
                >
                  {/* Post header */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: post.tagColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#1a2744", fontWeight: 600 }}>
                          {post.author}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#9a9a9a", marginLeft: "0.5rem" }}>
                          · {post.estado} · {post.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.pinned && (
                        <span className="flex items-center gap-1" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#b91c1c" }}>
                          <Pin size={10} /> Fijado
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.65rem",
                          color: post.tagColor,
                          backgroundColor: `${post.tagColor}18`,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "2px",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#2d2d2d",
                      fontSize: "0.88rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {post.content}
                  </p>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-5 mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(26,39,68,0.06)" }}
                  >
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.78rem",
                        color: likedIds.has(post.id) ? "#b91c1c" : "#6b6b6b",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <ThumbsUp size={13} fill={likedIds.has(post.id) ? "#b91c1c" : "none"} />
                      {post.likes}
                    </button>
                    <button
                      className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.78rem",
                        color: "#6b6b6b",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <MessageSquare size={13} />
                      {post.replies} respuestas
                    </button>
                    <button
                      className="flex items-center gap-1.5 hover:opacity-70 transition-opacity ml-auto"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.78rem",
                        color: "#6b6b6b",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <Share2 size={13} />
                      Compartir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — 1/3 */}
          <div className="flex flex-col gap-6">
            {/* New post form */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,39,68,0.1)",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#1a2744",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                Publicar en el foro
              </h3>

              {submitted && (
                <div
                  style={{
                    backgroundColor: "rgba(22,163,74,0.08)",
                    border: "1px solid rgba(22,163,74,0.3)",
                    padding: "0.75rem",
                    marginBottom: "1rem",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.8rem",
                    color: "#166534",
                    borderRadius: "2px",
                  }}
                >
                  ✓ Tu mensaje fue publicado
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div>
                  <label style={{ ...inputBase, padding: 0, backgroundColor: "transparent", border: "none", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.3rem", display: "block" }}>
                    Tu estado
                  </label>
                  <input
                    style={inputBase}
                    placeholder="ej. Jalisco"
                    value={newPost.estado}
                    onChange={(e) => setNewPost((p) => ({ ...p, estado: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ ...inputBase, padding: 0, backgroundColor: "transparent", border: "none", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.3rem", display: "block" }}>
                    Categoría
                  </label>
                  <select
                    style={{ ...inputBase, appearance: "none" }}
                    value={newPost.tag}
                    onChange={(e) => setNewPost((p) => ({ ...p, tag: e.target.value }))}
                  >
                    {Object.keys(tagColors).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ ...inputBase, padding: 0, backgroundColor: "transparent", border: "none", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.3rem", display: "block" }}>
                    Tu mensaje
                  </label>
                  <textarea
                    style={{ ...inputBase, resize: "vertical", minHeight: "110px" }}
                    placeholder="Comparte tu caso, busca apoyo o convoca a acción..."
                    value={newPost.content}
                    onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "#1a2744",
                    color: "#ffffff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    padding: "0.75rem",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  <Send size={14} />
                  Publicar mensaje
                </button>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#9a9a9a", lineHeight: 1.5 }}>
                  Puedes publicar de forma anónima. El contenido es moderado por la comunidad.
                </p>
              </div>
            </div>

            {/* Hashtags recientes */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,39,68,0.1)",
                padding: "1.5rem",
              }}
            >
              <h4
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#1a2744",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: "1rem",
                }}
                className="uppercase"
              >
                Hashtags recientes
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { tag: hashtag, posts: "Hoy" },
                  { tag: "MéxicoExigeJusticia", posts: "Ayer" },
                  { tag: "NiUnaMás", posts: "Hace 2 días" },
                  { tag: "MadresBuscadoras", posts: "Hace 3 días" },
                  { tag: "AnticorrupciónYa", posts: "Hace 4 días" },
                ].map((h, i) => (
                  <div key={`htag-${i}`} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Hash size={11} color="#b91c1c" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#1a2744" }}>
                        {h.tag}
                      </span>
                    </div>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#9a9a9a" }}>
                      {h.posts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reglas del foro */}
            <div
              style={{
                backgroundColor: "#1a2744",
                padding: "1.5rem",
              }}
            >
              <h4
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: "1rem",
                }}
                className="uppercase"
              >
                Reglas del foro
              </h4>
              <ul className="flex flex-col gap-2">
                {[
                  "Respeto a todas las personas",
                  "No datos personales de terceros",
                  "Sin incitación a la violencia",
                  "Información verificada cuando sea posible",
                  "Anonimato garantizado para todos",
                ].map((r, i) => (
                  <li key={`rule-${i}`} className="flex items-start gap-2">
                    <span style={{ color: "#b91c1c", fontSize: "0.75rem", marginTop: "1px" }}>→</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
