'use client';

import { useMemo, useState } from 'react';

const sections = [
  { id: 'variations', label: 'Calcul des variations' },
  { id: 'augmented', label: 'Coût augmenté' },
  { id: 'pontryagin', label: 'Principe de Pontryagin' },
  { id: 'hamiltonian', label: 'Hamiltonien' },
  { id: 'autonomous', label: 'Système autonome' },
  { id: 'example', label: 'Exemple interactif' },
];

export default function Home() {
  const [X, setX] = useState(1);
  const [tf, setTf] = useState(2);
  const [t, setT] = useState(0.7);

  const values = useMemo(() => {
    const a = (2 * X) / (1 - Math.exp(-2 * tf));
    const lambda = a * Math.exp(-t);
    const u = -lambda;
    const x = X * Math.exp(t) + (a / 2) * (Math.exp(-t) - Math.exp(t));
    const H = 0.5 * u * u + lambda * (x + u);
    const Hconstant = a * (X - a / 2);
    return { a, lambda, u, x, H, Hconstant };
  }, [X, tf, t]);

  return (
    <main>
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Optimal Control</p>
          <h1>Synthèse interactive</h1>
          <p className="muted">Notes structurées à partir du cours, enrichies au fil de nos révisions.</p>
        </div>
        <nav>
          {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
        </nav>
      </aside>

      <div className="content">
        <section className="hero">
          <p className="eyebrow">Partie 1 · Contrôle optimal analytique</p>
          <h2>Comprendre Pontryagin, pas seulement mémoriser les formules.</h2>
          <p>Le fil conducteur est toujours le même : <strong>coût + dynamique + contraintes → conditions d’optimalité → commande optimale.</strong></p>
          <div className="formula flow">Modèle + coût + contraintes → optimisation → u*</div>
        </section>

        <section id="variations" className="card">
          <h3>1. Calcul des variations : d’où vient δJ ?</h3>
          <p>On considère une trajectoire optimale <span className="math">x*(t)</span> et une trajectoire voisine :</p>
          <div className="formula">x′(t) = x*(t) + δx(t)</div>
          <p>La variation totale du coût est :</p>
          <div className="formula">ΔJ = J[x* + δx] − J[x*]</div>
          <p>Un développement de Taylor sépare cette variation en une partie linéaire et des termes d’ordre supérieur. La <strong>première variation</strong> est la partie linéaire :</p>
          <div className="formula">δJ = ∫ [(∂h/∂x)ᵀδx + (∂h/∂ẋ)ᵀδẋ] dt</div>
          <div className="callout"><strong>Idée-clé :</strong> à un optimum, une petite perturbation admissible ne doit produire aucune variation au premier ordre, donc δJ = 0.</div>
        </section>

        <section id="augmented" className="card">
          <h3>2. Pourquoi un coût « augmented » ?</h3>
          <p>La dynamique est une contrainte :</p>
          <div className="formula">Λ = f(x,u) − ẋ = 0</div>
          <p>On l’intègre au problème à l’aide d’un multiplicateur de Lagrange vectoriel <span className="math">λ(t)</span> :</p>
          <div className="formula">L = h + λᵀ(f − ẋ)</div>
          <p>Oui, sur une trajectoire admissible, <span className="math">Λ = 0</span> et donc <span className="math">L = h</span>. Mais on ne peut pas supprimer ce terme avant de faire les variations : <strong>sa variation n’est pas nulle</strong>.</p>
          <div className="callout warning">Sans λᵀ(f−ẋ), l’optimisation « oublierait » la dynamique et pourrait choisir une trajectoire mathématiquement avantageuse mais physiquement impossible.</div>
        </section>

        <section id="pontryagin" className="card">
          <h3>3. Les trois équations à connaître</h3>
          <p>Après intégration par parties et application du théorème fondamental du calcul des variations :</p>
          <div className="grid3">
            <div className="mini"><span>État</span><div className="formula">ẋ = ∂H/∂λ</div></div>
            <div className="mini"><span>Adjoint</span><div className="formula">λ̇ = −∂H/∂x</div></div>
            <div className="mini"><span>Commande</span><div className="formula">∂H/∂u = 0</div></div>
          </div>
          <p>Pour une commande contrainte, la dernière condition devient plutôt :</p>
          <div className="formula">u*(t) = arg min₍u∈U₎ H</div>
        </section>

        <section id="hamiltonian" className="card">
          <h3>4. Que fait réellement le Hamiltonien ?</h3>
          <div className="formula accent">H(x,λ,u,t) = h(x,u,t) + λᵀf(x,u,t)</div>
          <p>Il ne sert pas uniquement à trouver <span className="math">u*</span>. Il rassemble le coût instantané et la dynamique et permet d’écrire toutes les conditions de Pontryagin dans une forme compacte.</p>
          <p>Le cours introduit aussi un état auxiliaire <span className="math">x₀</span> :</p>
          <div className="formula">ẋ₀ = h(x,u), &nbsp; x₀(0)=0, &nbsp; x₀(t_f)=J</div>
          <p>Le coût accumulé devient ainsi un état supplémentaire.</p>
        </section>

        <section id="autonomous" className="card">
          <h3>5. Pourquoi H est constant pour un problème autonome ?</h3>
          <p>Sur la trajectoire optimale :</p>
          <div className="formula">dH/dt = ∂H/∂t</div>
          <p>Les contributions via <span className="math">x(t)</span>, <span className="math">λ(t)</span> et <span className="math">u(t)</span> se compensent grâce aux conditions de Pontryagin.</p>
          <p>Si le problème n’a aucune dépendance explicite en temps :</p>
          <div className="formula">∂H/∂t = 0 ⇒ dH/dt = 0 ⇒ H = constante</div>
          <div className="callout warning"><strong>Piège d’examen :</strong> autonome ⇒ H constant, pas nécessairement H = 0. Pour avoir H = 0, il faut une condition supplémentaire, par exemple un temps final libre avec la condition de transversalité appropriée.</div>
        </section>

        <section id="example" className="card interactive">
          <div className="section-head">
            <div>
              <p className="eyebrow">Exemple du cours</p>
              <h3>6. Visualiser la solution de Pontryagin</h3>
            </div>
            <div className="badge">Interactif</div>
          </div>
          <div className="formula">ẋ = x + u, &nbsp; x(0)=X, &nbsp; x(t_f)=0, &nbsp; J = ½∫u²dt</div>
          <p>La solution du cours donne :</p>
          <div className="formula">λ(t)=ae⁻ᵗ, &nbsp; u*(t)=−ae⁻ᵗ, &nbsp; a = 2X/(1−e⁻²ᵗᶠ)</div>

          <div className="controls">
            <label>X = <strong>{X.toFixed(1)}</strong><input type="range" min="0.2" max="3" step="0.1" value={X} onChange={(e)=>setX(Number(e.target.value))}/></label>
            <label>t_f = <strong>{tf.toFixed(1)}</strong><input type="range" min="0.5" max="5" step="0.1" value={tf} onChange={(e)=>{const v=Number(e.target.value); setTf(v); if(t>v) setT(v);}}/></label>
            <label>t = <strong>{t.toFixed(2)}</strong><input type="range" min="0" max={tf} step="0.01" value={Math.min(t,tf)} onChange={(e)=>setT(Number(e.target.value))}/></label>
          </div>

          <div className="metrics">
            <div><span>a</span><strong>{values.a.toFixed(4)}</strong></div>
            <div><span>x(t)</span><strong>{values.x.toFixed(4)}</strong></div>
            <div><span>λ(t)</span><strong>{values.lambda.toFixed(4)}</strong></div>
            <div><span>u*(t)</span><strong>{values.u.toFixed(4)}</strong></div>
          </div>

          <div className="hamilton-check">
            <div><span>H calculé à t</span><strong>{values.H.toFixed(6)}</strong></div>
            <div><span>Valeur théorique constante</span><strong>{values.Hconstant.toFixed(6)}</strong></div>
          </div>
          <p className="muted">Déplace le curseur t : x, λ et u changent, mais H reste constant à l’arrondi numérique près. C’est la propriété démontrée pour un problème autonome.</p>
        </section>
      </div>
    </main>
  );
}
