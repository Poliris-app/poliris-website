import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-defining',     label: 'SEO vs. GEO' },
  { id: 's-newrule',      label: 'La nouvelle règle' },
  { id: 's-geo',          label: 'Comprendre le GEO' },
  { id: 's-crawlers',     label: 'Crawlers IA' },
  { id: 's-technical',    label: 'Rôle du SEO technique' },
  { id: 's-crawlability', label: 'Crawlabilité' },
  { id: 's-headings',     label: 'Structure des titres' },
  { id: 's-schema',       label: 'Données structurées' },
  { id: 's-without',      label: 'GEO sans SEO ?' },
  { id: 's-poliris',      label: 'Naviguer avec Poliris' },
  { id: 's-faq',          label: 'FAQ' },
  { id: 's-takeaways',    label: 'Points clés' },
];

const FAQ_ITEMS = [
  {
    q: 'Quel est le coût typique de la combinaison GEO et SEO technique ?',
    a: "Le coût varie en fonction de la portée du projet, des outils nécessaires et du fait que vous développiez des capacités en interne ou que vous fassiez appel à un spécialiste. La plupart des engagements d'entreprise combinent l'audit SEO technique avec la surveillance GEO — allant généralement de quelques milliers d'euros par mois pour les services gérés jusqu'à des contrats annuels à six chiffres pour les grandes organisations.",
  },
  {
    q: 'Quel est le bon moment pour commencer ?',
    a: "Commencez quand votre contenu est déjà bien classé dans la recherche traditionnelle mais absent des réponses générées par l'IA. Cet écart est le signal le plus clair. Si ChatGPT ou Perplexity citent des concurrents plutôt que vous, la visibilité dans la recherche IA vous coûte déjà du pipeline.",
  },
  {
    q: 'Quelles sont les alternatives et comment se comparent-elles ?',
    a: "Des alternatives comme la recherche payante ou la syndication de contenu peuvent générer du trafic à court terme, mais elles ne construisent pas la fondation crawlable et structurée que les moteurs IA requièrent. Le GEO sans fondamentaux SEO est une stratégie avec un plafond — des éclats de visibilité qui ne se capitalisent pas dans le temps.",
  },
  {
    q: 'Comment choisir la bonne plateforme ?',
    a: "La sélection se résume à trois critères : (1) La plateforme suit-elle à la fois les signaux SEO techniques et les métriques de citation GEO ? (2) Peut-elle auditer les directives de crawl comme robots.txt et les structures de titres ? (3) Surveille-t-elle le sentiment de marque sur les LLMs comme ChatGPT, Gemini et Perplexity ? Poliris est conçu spécifiquement autour de ces trois exigences.",
  },
];

function ImgHold({ label, sub }) {
  return (
    <div className="bp-img-hold">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <div className="bp-img-hold-label">{label}</div>
      {sub && <div className="bp-img-hold-sub">{sub}</div>}
    </div>
  );
}

export default function SeoGeoCornerstoneFrPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      let current = '';
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      });
      setActiveSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bp-page">
      <Head>
        <title>Pourquoi le SEO est la pierre angulaire du succès GEO | Poliris</title>
        <meta name="description" content="Le GEO a besoin du SEO. Sans fondations techniques solides, même la meilleure stratégie GEO s'effondre. Voici pourquoi et par où commencer." />
      </Head>
      <Navbar />

      <div className="bp-layout">

        {/* ── Sidenav ── */}
        <aside className="bp-sidenav">
          <Link to={`/${lang}/blog`} className="bp-back-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Retour au blog
          </Link>
          <div className="bp-sidenav-label">Sur cette page</div>
          <ul className="bp-sidenav-list">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'bp-active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="bp-sidenav-foot">
            <div className="bp-progress-label">Progression</div>
            <div className="bp-progress-track">
              <div className="bp-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <main className="bp-main">

          <Link to={`/${lang}/blog`} className="bp-back-link bp-back-mobile">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Retour au blog
          </Link>

          <header className="bp-hero">
            <div className="bp-meta">
              <span className="bp-category">GEO Insights</span>
              <span className="bp-dot" />
              <span>9 min de lecture</span>
              <span className="bp-dot" />
              <span>Équipe Poliris</span>
              <span className="bp-dot" />
              <span>23 juin 2026</span>
            </div>
            <h1 className="bp-title">Pourquoi le SEO est la pierre angulaire du succès GEO</h1>
            <p className="bp-deck">Le GEO a besoin du SEO. Ignorer ce lien est l'une des erreurs les plus coûteuses qu'une équipe de recherche puisse faire aujourd'hui. Sans des fondamentaux SEO solides, même la meilleure stratégie GEO s'effondre.</p>
            <div className="bp-tags">GEO · SEO Technique · Visibilité IA</div>
          </header>

          {/* 01 */}
          <section className="bp-section" id="s-defining" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Définir les disciplines : SEO vs. GEO</h2>
            </div>
            <div className="bp-def-pair">
              <div className="bp-def-cell">
                <div className="bp-def-label">GEO — Optimisation des moteurs génératifs</div>
                <p>Structurer le contenu pour que les moteurs de recherche alimentés par l'IA puissent l'interpréter avec précision, le citer et le faire apparaître dans les réponses générées. Le GEO vous vaut une citation dans la réponse elle-même.</p>
              </div>
              <div className="bp-def-cell">
                <div className="bp-def-label">SEO — Optimisation pour les moteurs de recherche</div>
                <p>L'épine dorsale structurelle qui rend le GEO possible. Construit sur des directives de crawl propres, un contenu structuré et de bonnes performances. Le SEO vous vaut un lien bleu.</p>
              </div>
              <div className="bp-def-synergy">
                <div className="bp-def-label" style={{ color: 'rgba(255,255,255,0.45)' }}>La synergie</div>
                <p>Les deux disciplines ne sont pas des priorités concurrentes. Elles sont le même moteur fonctionnant avec un carburant différent. Le SEO vous met sur l'étagère. Le GEO vous fait lire à voix haute par l'assistant derrière le comptoir.</p>
              </div>
            </div>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-newrule" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>La nouvelle règle de la recherche</h2>
            </div>
            <p><strong>Le GEO a besoin du SEO</strong> est le principe selon lequel l'optimisation des moteurs génératifs ne peut pas fonctionner efficacement sans une base SEO technique. Les systèmes d'IA lisent les mêmes signaux que les moteurs de recherche traditionnels. Sans directives de crawl propres, contenu structuré et performances solides, les moteurs IA ignorent vos pages.</p>
            <div className="bp-pull-quote">
              <p>"Le GEO amplifie ce que le SEO construit. Sans la fondation, il n'y a rien que les moteurs IA puissent faire émerger."</p>
            </div>
            <p>Ce n'est pas une préoccupation future. Une entreprise SaaS B2B avec de bons classements de mots-clés mais une structure de titres médiocre peut voir son contenu ignoré par les résumés générés par l'IA. La correction nécessite que les deux approches travaillent ensemble.</p>
            <h3>Par où commencer</h3>
            <ol className="bp-steps">
              <li>Auditez les directives de crawl et les configurations <code>robots.txt</code>.</li>
              <li>Nettoyez les hiérarchies de titres pour que les crawlers IA puissent analyser la structure de votre page.</li>
              <li>Alignez le schéma de contenu avec les questions auxquelles les moteurs IA répondent réellement.</li>
            </ol>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-geo" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Comprendre l'optimisation des moteurs génératifs</h2>
            </div>
            <p>L'optimisation des moteurs génératifs désigne la pratique consistant à structurer le contenu pour que les moteurs de recherche alimentés par l'IA puissent l'interpréter avec précision, le citer et le faire émerger dans les réponses générées. Contrairement au classement traditionnel, le GEO n'est pas une question de densité de mots-clés. Il s'agit de rendre votre contenu suffisamment fiable et lisible par les machines pour qu'un moteur IA le choisisse plutôt que celui d'un concurrent.</p>
            <p>Un responsable des achats cherchant des comparaisons de fournisseurs, ou un analyste financier cherchant des benchmarks de marché, ne défilera peut-être jamais au-delà d'un résumé généré par l'IA. Si votre contenu n'est pas cité dans ce résumé, vous n'existez pas pour cet utilisateur. C'est là que la portée de visibilité du GEO diverge de la logique SEO classique.</p>
            <ImgHold label="Diagramme : flux de signaux SEO vers GEO" sub="Organigramme montrant comment les signaux SEO alimentent le crawler IA et les taux de citation GEO" />
            <p className="bp-img-caption">Fig. 1 — Comment les signaux SEO techniques se répercutent sur les résultats de citation IA</p>
            <div className="bp-note">
              <div className="bp-note-label">Note d'expert</div>
              <p>N'optimisez pas pour le GEO de manière isolée. Les taux de citation IA s'améliorent le plus rapidement lorsque vos fondamentaux SEO techniques sont déjà solides. Considérez le GEO comme le dernier étage d'un bâtiment, et le SEO technique comme les fondations sur lesquelles il repose.</p>
            </div>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-crawlers" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Comment les crawlers IA analysent les sites web</h2>
            </div>
            <p>Les crawlers web IA ne lisent pas votre contenu comme un humain. Ils analysent la structure, suivent les directives et extraient le sens à partir de signaux que vous ne voyez peut-être même pas. Contrairement aux robots de recherche traditionnels, ils n'indexent pas seulement les mots-clés. Ils évaluent le contexte sémantique, la hiérarchie des titres et les balises lisibles par machine pour décider de ce que signifie réellement une page.</p>
            <ImgHold label="Illustration : crawler IA analysant la structure d'une page" sub="Vue en écran partagé montrant le HTML brut vs. l'extraction structurée de l'IA" />
            <p className="bp-img-caption">Fig. 2 — Ce que voit un crawler IA vs. ce qu'un navigateur affiche</p>
            <h3>Comment cela affecte l'indexation et le classement GEO</h3>
            <p>Les moteurs IA ne stockent pas seulement une URL. Ils extraient des affirmations, des entités et des faits, puis les classent par crédibilité et clarté. Une page enfouie dans du JavaScript ou sans balises de titres propres est essentiellement invisible pour ces systèmes.</p>
            <p>Considérez deux articles de blog concurrents sur le même sujet : celui avec des définitions H2 explicites et des balises schema est cité par Perplexity. Celui sans est complètement ignoré. La crawlabilité est une condition préalable à la citation IA.</p>
            <h3>Les trois signaux qui comptent le plus</h3>
            <ul className="bp-prose-list">
              <li><strong>Directives de crawl propres</strong> dans votre <code>robots.txt</code> et vos balises meta robots.</li>
              <li><strong>Structure de titres logique</strong> qui reflète la hiérarchie du contenu.</li>
              <li><strong>Données structurées</strong> qui identifient clairement vos sujets et entités clés.</li>
            </ul>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-technical" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Le rôle du SEO technique dans le GEO</h2>
            </div>
            <p>Le SEO technique est la fondation invisible qui détermine si les moteurs de recherche alimentés par l'IA peuvent lire, faire confiance et citer votre contenu. Sans lui, même la stratégie GEO la mieux conçue tombe à plat.</p>
            <div className="bp-pull-quote">
              <p>"Le GEO est la décoration intérieure. Le SEO technique, c'est le câblage, la plomberie et les murs porteurs."</p>
            </div>
            <ImgHold label="Diagramme : SEO technique comme couche de fondation" sub="Architecture en couches — crawl, indexation, citation GEO" />
            <p className="bp-img-caption">Fig. 3 — La pile de dépendances, de la santé du crawl à la visibilité IA</p>
          </section>

          {/* 06 */}
          <section className="bp-section" id="s-crawlability" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">06</span>
              <h2>Crawlabilité : votre première ligne de visibilité</h2>
            </div>
            <p>Si les crawlers IA ne peuvent pas atteindre votre contenu, rien d'autre n'a d'importance. Votre fichier <code>robots.txt</code> et vos directives meta robots contrôlent exactement ce à quoi les crawlers peuvent accéder.</p>
            <ul className="bp-prose-list">
              <li>Vérifiez que <code>robots.txt</code> ne bloque pas accidentellement des répertoires de contenu clés.</li>
              <li>Vérifiez les balises meta robots. <code>noindex</code> ou <code>nofollow</code> sur des pages critiques coupe complètement l'accès IA.</li>
              <li>Surveillez régulièrement les erreurs de crawl dans Google Search Console.</li>
              <li>Utilisez correctement les balises canoniques pour éviter la confusion liée au contenu dupliqué.</li>
            </ul>
          </section>

          {/* 07 */}
          <section className="bp-section" id="s-headings" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">07</span>
              <h2>Structure des titres et hiérarchie du contenu</h2>
            </div>
            <p>Les moteurs IA ne lisent pas seulement vos mots. Ils lisent la forme de votre contenu. Une hiérarchie de titres appropriée (H1, H2, H3) est l'un des signaux les plus clairs qu'un crawler IA utilise pour comprendre de quoi parle une page et quelles sections ont le plus de poids.</p>
            <p>Une page avec un seul H1, des sections H2 logiques et des sous-sections H3 de support donne aux systèmes IA une carte claire. Une page où les titres sont utilisés pour le style visuel plutôt que pour la signification sémantique sera mal comprise ou ignorée.</p>
            <ImgHold label="Exemple : hiérarchie de titres correcte vs. cassée" sub="Comparaison côte à côte d'un arbre de titres bien structuré vs. plat" />
            <p className="bp-img-caption">Fig. 4 — Comment la hiérarchie des titres correspond à la compréhension du crawler IA</p>
          </section>

          {/* 08 */}
          <section className="bp-section" id="s-schema" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">08</span>
              <h2>Données structurées : parler le langage des machines</h2>
            </div>
            <p>Le balisage schema est ce qui se rapproche le plus d'une conversation directe avec les crawlers IA. Il étiquette votre contenu de manière explicite, indiquant aux moteurs non seulement ce que dit votre page, mais ce qu'elle <em>est</em>. Considérez deux concurrents publiant un contenu équivalent. L'un utilise le schema FAQ et le balisage Article. L'autre publie du HTML simple. Le site structuré obtient la citation. L'autre n'apparaît pas du tout dans le résumé.</p>
            <h3>Ce qui fait vraiment bouger les choses</h3>
            <ul className="bp-prose-list">
              <li>Étiquetez les entités principales avec les schemas <strong>Organisation</strong>, <strong>Produit</strong> et <strong>Article</strong>.</li>
              <li>Ajoutez le schema <strong>FAQ</strong> au contenu qui répond à des questions directes.</li>
              <li>Utilisez le balisage <strong>BreadcrumbList</strong> pour aider les crawlers à cartographier la hiérarchie de votre site.</li>
              <li>Validez régulièrement le balisage avec le test des résultats enrichis de Google ou des outils équivalents.</li>
            </ul>
            <div className="bp-note">
              <div className="bp-note-label">Poliris surveille cela</div>
              <p>Poliris surveille la santé du schema parallèlement aux taux de citation de marque, montrant exactement quelles lacunes en données structurées vous coûtent de la visibilité sur ChatGPT, Gemini et Perplexity.</p>
            </div>
          </section>

          {/* 09 */}
          <section className="bp-section" id="s-without" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">09</span>
              <h2>Le GEO peut-il fonctionner sans le SEO ?</h2>
            </div>
            <p>Les stratégies GEO ne peuvent pas remplacer le SEO traditionnel. Sans une base technique solide, les moteurs de recherche alimentés par l'IA n'ont pas de contenu fiable à citer. Considérez le GEO comme un moteur de recommandation pour un magasin sans système d'inventaire. Il peut essayer de faire émerger des produits, mais si le catalogue est désorganisé ou bloqué aux crawlers, rien n'est recommandé avec précision.</p>
            <h3>Ce qui se casse sans la fondation</h3>
            <ul className="bp-prose-list">
              <li><strong>La conversion du trafic</strong> chute parce que les citations IA pointent vers des pages qui chargent lentement ou retournent des erreurs de crawl.</li>
              <li><strong>Les métriques d'engagement</strong> baissent lorsque les utilisateurs atterrissent sur du contenu mal structuré non optimisé pour la lisibilité.</li>
              <li><strong>Les crawlers web IA</strong> ignorent ou mal-indexent les pages bloquées par des directives <code>robots.txt</code> mal configurées.</li>
            </ul>
            <h3>Le coût à long terme d'une approche GEO uniquement</h3>
            <p>Manquer la synergie GEO et SEO ne nuit pas seulement aux classements à court terme. Cela crée des lacunes de visibilité cumulatives. Avec le temps, les modèles IA s'entraînent sur du contenu accessible et bien structuré de concurrents, élargissant davantage l'écart. Les sites qui se concentrent sur le GEO sans traiter la crawlabilité et les données structurées maintiennent rarement leurs taux de citation.</p>
          </section>

          {/* 10 */}
          <section className="bp-section" id="s-poliris" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">10</span>
              <h2>Naviguer dans la visibilité de recherche moderne avec Poliris</h2>
            </div>
            <p>La plupart des plateformes vous forcent à choisir entre le suivi des classements traditionnels et la surveillance des performances de citation IA. Poliris supprime ce compromis entièrement avec une architecture d'audit à double couche : des crawls SEO techniques automatisés combinés avec un tableau de bord de surveillance GEO en direct.</p>
            <ImgHold label="Capture d'écran : tableau de bord de surveillance GEO Poliris" sub="Interface Poliris affichant les taux de citation et la santé du crawl côte à côte" />
            <p className="bp-img-caption">Fig. 5 — Le tableau de bord Poliris : santé du crawl technique et métriques de citation IA côte à côte</p>
            <ul className="bp-prose-list">
              <li>Suit automatiquement les directives de crawl, les meta robots et les structures de titres.</li>
              <li>Surveille les mentions de marque, les taux de citation IA et les scores de sentiment sur ChatGPT, Gemini et Perplexity.</li>
              <li>Montre la relation de cause à effet directe entre les corrections techniques et les résultats de visibilité IA.</li>
              <li>Comble l'écart de mesure que la plupart des plateformes d'audit laissent ouvert.</li>
            </ul>
            <div className="bp-cta-box">
              <div>
                <h3>Mesurez le GEO et le SEO en un seul endroit</h3>
                <p>Poliris suit les taux de citation sur tous les principaux LLMs avec votre santé de crawl technique.</p>
              </div>
              <a href="https://app.poliris.io" target="_blank" rel="noopener noreferrer" className="bp-cta-btn">
                Essayer Poliris →
              </a>
            </div>
          </section>

          {/* 11 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">11</span>
              <h2>Questions fréquemment posées</h2>
            </div>
            <div className="bp-faq">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bp-faq-item">
                  <button
                    className={`bp-faq-btn${openFaq === i ? ' bp-open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.q}
                    <span className="bp-faq-icon" />
                  </button>
                  <div className={`bp-faq-body${openFaq === i ? ' bp-open' : ''}`}>
                    <div className="bp-faq-body-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div className="bp-takeaways" id="s-takeaways" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-takeaways-title">Points clés</div>
            <ul className="bp-takeaways-list">
              <li><strong>Le GEO a besoin du SEO comme fondation structurelle.</strong> Sans pages crawlables et techniquement solides, les systèmes IA ne citeront pas votre contenu.</li>
              <li><strong>Les signaux SEO techniques</strong> comme robots.txt, les balises canoniques et la hiérarchie des titres influencent directement le comportement des crawlers IA.</li>
              <li><strong>Les données structurées et les balises schema</strong> rendent le contenu lisible par les machines, améliorant les taux de citation IA sur ChatGPT et Perplexity.</li>
              <li>L'<strong>importance stratégique d'une approche combinée</strong> grandit à mesure que les moteurs génératifs remplacent de plus en plus les résultats de recherche traditionnels.</li>
              <li>L'<strong>avenir du SEO</strong> appartient aux organisations qui traitent la visibilité IA comme une métrique mesurable, et non comme un sous-produit des classements.</li>
              <li>Le <strong>succès piloté par l'IA</strong> nécessite un suivi unifié de la santé technique et du sentiment de marque sur les LLMs simultanément.</li>
              <li>Des plateformes comme <strong>Poliris</strong> auditent les deux dimensions dans un seul tableau de bord, comblant l'écart entre les fondamentaux SEO et la performance GEO.</li>
            </ul>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
