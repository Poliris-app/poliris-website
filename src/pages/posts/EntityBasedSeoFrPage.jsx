import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-shift',      label: 'SEO sémantique vs. SEO traditionnel' },
  { id: 's-kg',         label: 'Optimisation du Knowledge Graph' },
  { id: 's-llms',       label: 'Entités sémantiques & LLM' },
  { id: 's-implement',  label: 'Mettre en œuvre le SEO sémantique' },
  { id: 's-faq',        label: 'FAQ' },
  { id: 's-takeaways',  label: 'À retenir' },
];

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un exemple d'entité SEO ?",
    a: <><strong>Réponse courte :</strong> Une <strong>entité SEO</strong> est tout objet, personne, organisation ou concept réel qu'un moteur de recherche peut identifier de façon unique et relier à des faits associés. Une clinique médicale en est un exemple concret. Le Knowledge Graph de Google ne lit pas seulement les mots « Boston Children's Hospital ». Il résout cette chaîne de caractères en un nœud vérifié. Ce nœud porte des attributs : localisation, spécialité, date de fondation, médecins affiliés. Un contenu qui nomme et contextualise ces attributs gagne une autorité sémantique plus forte qu'un contenu saturé de variations de mots-clés.</>,
  },
  {
    q: 'Comment les LLM parcourent-ils les Knowledge Graphs ?',
    a: <><strong>Réponse courte :</strong> Les <strong>LLM</strong> ne parcourent pas les <strong>knowledge graphs</strong> comme un robot d'indexation traditionnel parcourt des pages. Ils apprennent des schémas relationnels pendant leur entraînement, puis récupèrent des faits structurés via la génération augmentée par récupération (RAG) au moment de la requête. C'est comme un étudiant qui aurait lu toute une encyclopédie avant un examen. Le jour de l'examen, il se souvient de faits connectés entre eux, pas de pages isolées. C'est pourquoi le contexte entitaire compte plus que la densité de mots-clés. Un contenu qui nomme les entités avec des relations sujet-prédicat-objet claires est cité plus fiablement dans les résultats de recherche neuronale.</>,
  },
  {
    q: "Quelle est une erreur courante en optimisation d'entités ?",
    a: <><strong>Réponse courte :</strong> L'<strong>erreur courante</strong> la plus dommageable en <strong>optimisation d'entités</strong> consiste à traiter le balisage schema comme une couche cosmétique plutôt que comme une fondation structurelle. Beaucoup de spécialistes ajoutent le schema après avoir rédigé le contenu, sans ajuster le texte sous-jacent. Le schema doit refléter les affirmations relationnelles du texte. Une seconde erreur fréquente consiste à ignorer la co-occurrence. Les entités gagnent en poids sémantique lorsqu'elles apparaissent de façon cohérente aux côtés de leurs relations vérifiées sur plusieurs pages, pas une seule fois dans un article isolé.</>,
  },
];

function ImgHold({ label, sub }) {
  return (
    <div className="bp-img-hold">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <span className="bp-img-hold-label">{label}</span>
      <span className="bp-img-hold-sub">{sub}</span>
    </div>
  );
}

export default function EntityBasedSeoFrPage() {
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
        <title>SEO Orienté Entités : Des Chaînes de Caractères aux Choses | Poliris</title>
        <link rel="canonical" href="https://poliris.io/fr/blog/entity-based-seo" />
        <link rel="alternate" hrefLang="fr" href="https://poliris.io/fr/blog/entity-based-seo" />
        <link rel="alternate" hrefLang="x-default" href="https://poliris.io/en/blog/entity-based-seo" />
        <meta name="description" content="Arrêtez de suivre la densité de mots-clés. Apprenez à relier votre contenu à des nœuds du Knowledge Graph, à passer les frameworks NER, et à sécuriser des citations RAG à l'ère de l'IA." />
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
            <div className="bp-progress-label">Progression de lecture</div>
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
              <span>10 min de lecture</span>
              <span className="bp-dot" />
              <span>Équipe Poliris</span>
              <span className="bp-dot" />
              <span>7 juil. 2026</span>
            </div>
            <h1 className="bp-title">L'essor du SEO orienté entités : des chaînes de caractères aux choses à l'ère de l'IA</h1>
            <p className="bp-deck">Le <strong>SEO sémantique</strong> consiste à optimiser le contenu autour du sens, des entités et des relations plutôt que de chaînes de mots-clés isolées. Les moteurs de recherche n'associent plus des mots, ils résolvent des concepts. Le <a target="_blank" rel="noopener" href="https://developers.google.com/knowledge-graph">Knowledge Graph de Google</a> relie des entités comme des personnes, des lieux et des idées au sein d'une carte structurée du sens. Ce basculement est au cœur de l'impact de l'ère de l'IA sur la recherche. Le point de friction est bien réel pour la plupart des spécialistes SEO : les stratégies bâties sur la densité de mots-clés et le volume de backlinks perdent du terrain face à des systèmes qui récompensent la <strong>résolution d'entités</strong> et la pertinence contextuelle. Si votre contenu ne se rattache pas à un nœud d'entité reconnu, il est quasiment invisible pour les systèmes de <strong>recherche neuronale</strong> modernes. Cette section pose le cadre de l'<strong>évolution</strong> de la recherche, du string-matching au meaning-matching. Comprendre ce basculement vous indique exactement où investir vos efforts d'optimisation ensuite. L'objectif n'est pas d'abandonner ce qui fonctionne, mais de l'étendre au territoire sémantique avant que vos concurrents ne le fassent.</p>
          </header>

          <div className="bp-note">
            <div className="bp-note-label">Conseil d'expert</div>
            <p>Le signal le plus clair que l'<strong>intention de l'utilisateur</strong> a supplanté la fréquence des mots-clés est le <a target="_blank" rel="noopener" href="https://blog.google/products-and-platforms/products/search/search-language-understanding-bert/">déploiement de BERT par Google</a>, qui a commencé à privilégier le contexte de la phrase entière plutôt que les tokens de requête pris isolément. Cette décision architecturale a fait des relations entre entités un signal de classement de premier plan, et non un simple raffinement secondaire.</p>
          </div>

          {/* 01 */}
          <section className="bp-section" id="s-shift" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>SEO orienté entités vs. SEO traditionnel : le basculement structurel</h2>
            </div>
            <p><strong>Le SEO traditionnel traite chaque requête comme une chaîne de caractères à faire correspondre.</strong> Le SEO sémantique la traite comme une question posée par une personne, avec un contexte, une intention et un sens précis. Cette distinction paraît simple. En pratique, elle change tout dans la façon de construire du contenu.</p>
            <h3>En quoi le keyword matching diverge de la résolution d'entités</h3>
            <p>Le <strong>keyword matching</strong> fonctionne en comptant la fréquence des mots et en mesurant leur proximité. Une page où « meilleures chaussures de running » apparaissait douze fois se classait bien. Le moteur ne se demandait pas ce qu'<em>étaient</em> des chaussures de running, il comptait simplement des chaînes de caractères. La <strong>résolution d'entités</strong> fonctionne différemment. Elle se demande : quelle chose du monde réel cette requête décrit-elle ? Le Knowledge Graph de Google, par exemple, ne stocke pas la chaîne « Paris ». Il stocke Paris comme un nœud, une ville, une capitale, une entité culturelle, reliée à la France, à la tour Eiffel et à la Seine. Ces relations portent un sens que les mots-clés n'ont jamais pu porter. Voici où le problème structurel des <strong>métriques historiques</strong> devient évident :</p>
            <ul className="bp-prose-list">
              <li>La densité de mots-clés mesure la répétition, pas la pertinence.</li>
              <li>Le TF-IDF évalue la fréquence d'un terme par rapport à un corpus, mais ignore les relations entre entités.</li>
              <li>Le nombre de backlinks signale une autorité sans confirmer la cohérence thématique.</li>
            </ul>
            <p>Aucun de ces signaux n'indique à un moteur de recherche <em>de quoi parle</em> réellement une page.</p>
            <ImgHold label="Figure 1" sub="Des chaînes de caractères aux choses : comment la résolution d'entités remplace le keyword matching" />
            <h3>Le vide structurel du SEO historique</h3>
            <p>La pensée <strong>orientée entités</strong> comble ce vide. Les frameworks de reconnaissance d'entités nommées (NER), de ceux qui font tourner les robots d'indexation modernes, classent les noms en catégories typées : personne, lieu, organisation, concept. Une fois classées, elles se relient à des nœuds Wikidata et à des entrées du Knowledge Graph. Une page qui fait explicitement apparaître ces connexions gagne une <strong>profondeur sémantique</strong> qu'un contenu bourré de mots-clés n'atteint jamais.</p>
            <div className="bp-note">
              <div className="bp-note-label">Conseil d'expert</div>
              <p>Faites passer vos pages les plus performantes par une analyse de reconnaissance d'entités nommées. Si vos entités ne se rattachent pas proprement à des nœuds du Knowledge Graph, votre contenu est invisible pour les moteurs de recherche neuronale, quelle que soit sa densité de mots-clés.</p>
            </div>
            <p>Ce basculement fondamental explique pourquoi comprendre le <Link to={`/${lang}/blog/why-seo-is-the-cornerstone-of-geo-success`}>socle du succès GEO</Link> est essentiel pour quiconque construit une stratégie de visibilité moderne. Le passage du string-matching à la résolution d'entités n'est pas une tendance. C'est le modèle opérationnel que la recherche a déjà adopté.</p>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-kg" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>Optimisation du Knowledge Graph pour la visibilité de recherche</h2>
            </div>
            <p>Les knowledge graphs déterminent quelles entités Google traite comme des sources de vérité vérifiées et faisant autorité. Lorsque le <strong>knowledge graph</strong> de Google relie votre marque, votre produit ou votre concept à des références externes confirmées, votre contenu gagne une <strong>autorité sémantique</strong> que la seule densité de mots-clés ne peut produire. Pensez-y comme à un réseau de citations dans l'édition académique : plus des sources crédibles pointent vers votre entité, plus elle devient digne de confiance.</p>
            <h3>Comment des nœuds vérifiés construisent l'autorité sémantique</h3>
            <p>Chaque entité du Knowledge Graph de Google existe comme un nœud doté de relations définies avec d'autres entités. Un <strong>nœud vérifié</strong> pour une entreprise de logiciels, par exemple, se relie à ses fondateurs, sa catégorie de produit, son secteur et ses concurrents. Chaque connexion confirmée renforce le signal de crédibilité de l'entité dans les environnements de recherche neuronale. La <strong>visibilité de recherche</strong> augmente lorsque ces connexions proviennent de références à forte autorité comme Wikidata, Wikipédia, ou un balisage schema structuré sur votre propre domaine. Les frameworks de reconnaissance d'entités nommées, y compris ceux intégrés à la plupart des pipelines NLP modernes, lisent ces connexions pour classer la pertinence du contenu. Plus la carte relationnelle de votre entité est riche, plus un système NLP catégorise votre contenu avec confiance.</p>
            <h3>La marche à suivre pour construire des profils d'entités définitifs</h3>
            <p>Suivez ce processus en quatre étapes pour construire des <strong>profils d'entités</strong> que Google peut vérifier :</p>
            <ol className="bp-steps">
              <li>Revendiquez ou créez une <a target="_blank" rel="noopener" href="https://www.wikidata.org/">entrée Wikidata</a> qui décrit fidèlement votre entité à l'aide de triplets sujet-prédicat-objet reconnus.</li>
              <li>Ajoutez un balisage schema structuré (schema Organization, Person ou Product) sur les pages clés de votre site, en le reliant à vos sources Wikidata et Wikipédia.</li>
              <li>Publiez des signaux de co-citation cohérents : assurez-vous que le nom, la description et les attributs de votre entité apparaissent de façon identique sur des sources tierces faisant autorité.</li>
              <li>Auditez régulièrement vos connexions d'entités à l'aide de validateurs de schema ou du Rich Results Test de Google, et développez vos relations de nœuds à mesure que votre entité grandit.</li>
            </ol>
            <ImgHold label="Figure 2" sub="La marche à suivre en quatre étapes pour construire des profils d'entités définitifs" />
            <div className="bp-note">
              <div className="bp-note-label">Conseil d'expert</div>
              <p>Le manque le plus courant en SEO orienté entités est une co-citation incomplète. Votre entité peut exister dans le knowledge graph mais se connecter à trop peu de sources vérifiées pour déclencher un classement à haute confiance. Traitez la construction de co-citations comme vous traiteriez le netlinking en SEO traditionnel.</p>
            </div>
            <p>Si vous avez besoin d'un décryptage technique rapide de ces concepts fondamentaux, explorez notre <Link to={`/${lang}/glossary`}>glossaire SEO &amp; GEO</Link> pendant que vous structurez votre architecture.</p>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-llms" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Comment les entités sémantiques façonnent la stratégie de contenu pour les LLM</h2>
            </div>
            <p><strong>Les grands modèles de langage ne lisent pas les pages comme le font les robots d'indexation de recherche.</strong> Ils extraient du sens en identifiant des entités nommées, en cartographiant les relations entre elles, puis en évaluant votre contenu par rapport à leurs modèles de connaissance internes. Ce basculement change tout dans votre façon d'écrire. Les <strong>entités sémantiques</strong> sont le fondement de ce processus. Un LLM ne traite pas la chaîne « avocat de New York ». Il reconnaît « New York » comme une entité géopolitique et « avocat » comme un rôle professionnel. Puis il relie les deux aux services juridiques via des associations apprises pendant l'entraînement. Votre stratégie de contenu doit épouser cette structure, pas la combattre.</p>
            <h3>Comment les LLM utilisent les relations entre entités pour attribuer des citations RAG</h3>
            <p>Les <strong>LLM</strong> utilisent les entités pour gérer l'<strong>interprétation d'intention</strong> avant de générer la moindre réponse. Lorsqu'un modèle puise du contenu source pour répondre à une requête, il sélectionne les passages où les entités sont clairement définies, directement connectées, et cohérentes avec ses données d'entraînement. Ce processus de sélection est ce qui pilote les <strong>citations RAG</strong>. Un contenu qui nomme explicitement les entités et énonce leurs relations sous forme sujet-prédicat-objet remporte ces citations bien plus souvent qu'une prose dense en mots-clés. En pratique, une page produit qui affirme « Stripe traite les paiements par carte pour les marchands e-commerce » donne à un LLM un triplet propre à extraire. Une page qui dit « notre plateforme aide les entreprises à mieux gérer leurs transactions » ne lui donne presque rien à exploiter. Concevez des <strong>boucles de contenu</strong> pour que chaque page renforce les mêmes relations d'entités à travers plusieurs formats : un paragraphe de définition, une section pratique, et une FAQ structurée. Cette répétition à travers différents types de contenu approfondit le signal sémantique sans bourrage de mots-clés. Pour une vision plus large de la façon dont ces basculements réécrivent la découverte, explorez notre analyse approfondie sur la <Link to={`/${lang}/blog/death-of-traditional-search-geo-priority`}>mort de la recherche traditionnelle et pourquoi le GEO est désormais une priorité</Link>.</p>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-implement" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Mettre en œuvre le SEO sémantique : étapes &amp; outils</h2>
            </div>
            <p>Migrer vers un SEO orienté entités paraît moins intimidant une fois découpé en une séquence claire. Les bonnes <strong>étapes de migration</strong> suivent un ordre logique : auditer l'existant, restructurer ce qui est cassé, puis construire vers l'extérieur en direction de connexions d'entités vérifiées.</p>
            <h3>Comment migrer l'architecture existante de votre site ?</h3>
            <p>Commencez par inventorier votre <strong>architecture de site</strong> actuelle à la recherche de lacunes entitaires. Lancez un crawl pour identifier les pages qui décrivent des concepts sans les nommer comme des entités. Une page produit qui dit « livraison rapide » sans mentionner la marque, la localisation, ou la catégorie de service comme nœud nommé ne donne rien aux moteurs de recherche pour s'ancrer. Voici une séquence pratique que suivent la plupart des équipes :</p>
            <ol className="bp-steps">
              <li><strong>Auditez le contenu existant</strong> à la recherche de références d'entités non résolues, à l'aide d'outils de reconnaissance d'entités nommées (NER) comme la Natural Language API de Google.</li>
              <li><strong>Menez des audits de connexion</strong> pour cartographier quelles entités de votre site se relient à des nœuds vérifiés du Knowledge Graph de Google ou de Wikidata.</li>
              <li><strong>Déployez un schema sur mesure</strong> (types Organization, Product, FAQPage ou Event) pour que chaque entité porte des attributs lisibles par machine.</li>
              <li><strong>Vérifiez votre autorité sémantique</strong> en comparant votre couverture d'entités à celle des pages concurrentes qui se classent dans les résumés générés par IA.</li>
              <li><strong>Validez avec un </strong><Link to={`/${lang}/technical-audit`}><strong>audit technique</strong></Link> pour repérer le schema orphelin, les données structurées cassées, et les identifiants d'entités manquants avant publication.</li>
            </ol>
            <p>De bons <strong>outils SEO</strong> rendent les étapes deux et trois gérables. Validateurs de schema, vérificateurs de knowledge graph, et tableaux de bord NER jouent chacun un rôle distinct. N'essayez pas de faire tourner les trois depuis une seule plateforme généraliste. Un exemple de SEO sémantique qui mérite d'être étudié : une marque SaaS qui a remplacé des descriptions de fonctionnalités vagues par des blocs d'entités structurés a vu ses pages produit apparaître dans des réponses comparatives générées par IA au cours d'un cycle de réindexation standard.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Questions fréquentes</h2>
            </div>
            <p>Le SEO sémantique déroute même les praticiens expérimentés. Voici des réponses directes aux questions qui reviennent le plus souvent.</p>
            <div className="bp-faq">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bp-faq-item">
                  <h3 className="bp-faq-heading">
                    <button
                      className={`bp-faq-btn${openFaq === i ? ' bp-open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      {item.q}
                      <span className="bp-faq-icon" />
                    </button>
                  </h3>
                  <div className={`bp-faq-body${openFaq === i ? ' bp-open' : ''}`}>
                    <div className="bp-faq-body-inner"><p>{item.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div id="s-takeaways" style={{ scrollMarginTop: '90px', marginTop: '3.5rem' }}>
            <h2 className="bp-section-h2">Conclusion</h2>
            <p className="bp-takeaways-intro">Le passage du string-matching à la résolution d'entités marque l'une des <strong>évolution</strong>s les plus significatives de l'histoire de la recherche. Le <strong>SEO sémantique</strong> n'est pas une tendance à observer de loin. C'est le cadre opérationnel qui détermine si votre contenu obtient une citation dans les réponses générées par IA, ou disparaît entièrement des résultats de recherche neuronale.</p>
            <div className="bp-takeaways">
              <h2 className="bp-takeaways-title">À retenir</h2>
              <ul className="bp-takeaways-list">
                <li>Les <strong>knowledge graphs</strong> relient des entités nommées à des faits vérifiés, donnant aux moteurs IA une carte structurée pour interpréter et citer votre contenu.</li>
                <li>L'<strong>autorité sémantique</strong> se construit par des profils d'entités cohérents à travers votre site, votre balisage schema, et des corroborations tierces.</li>
                <li>Les LLM récompensent le contenu qui résout clairement les relations entre entités. L'ambiguïté réduit votre probabilité de citation RAG.</li>
                <li>Une <strong>stratégie de contenu</strong> solide relie chaque page à un nœud d'entité défini avant même qu'un seul mot ne soit écrit.</li>
                <li>L'<strong>avenir de l'IA</strong> dans la recherche favorise les sites qui fonctionnent comme des sources de connaissance, pas comme des conteneurs de mots-clés.</li>
                <li>Les audits de schema et la résolution d'entités sont des tâches de maintenance, pas des migrations ponctuelles. Traitez-les comme des opérations continues.</li>
                <li>Les spécialistes SEO qui adoptent dès maintenant une pensée orientée entités construisent un avantage cumulatif que leurs pairs focalisés sur les mots-clés ne pourront pas facilement reproduire.</li>
              </ul>
            </div>
            <p className="bp-takeaways-intro">Les praticiens qui prospèrent dans cet environnement traitent leur site comme une base de connaissances structurée. Ils relient leurs entités à des identifiants Wikidata. Ils font tourner des audits de schema selon un cycle régulier. Cette discipline opérationnelle sépare les sites qui apparaissent dans les AI Overviews de ceux qui n'y apparaissent pas. L'<strong>évolution</strong> continue. Commencez par une entité. Construisez à partir de là.</p>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
