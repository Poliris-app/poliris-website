import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

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

const SECTIONS = [
  { id: 's-core',      label: 'Principes fondamentaux du GEO' },
  { id: 's-onpage',    label: 'Mise en forme on-page' },
  { id: 's-semantic',  label: 'HTML sémantique & schéma' },
  { id: 's-local',     label: 'GEO local & corroboration' },
  { id: 's-citation',  label: 'Format des citations & fraîcheur' },
  { id: 's-checklist', label: 'Checklist de visibilité IA' },
  { id: 's-faq',       label: 'FAQ' },
];

const FAQ_ITEMS = [
  {
    q: 'Une taille de DOM excessive affecte-t-elle la façon dont les systèmes RAG segmentent le contenu ?',
    a: <>Oui. Des ratios HTML/texte élevés (DOM bloat) peuvent sérieusement dégrader la capacité d'un modèle de langage à extraire les entités proprement. Lorsqu'une page est surchargée de balises <code>{'<div>'}</code> imbriquées ou de styles en ligne excessifs, les moteurs d'analyse peinent à identifier les frontières sémantiques d'un segment de texte. Maintenir un « Plain Text Rate » élevé et une profondeur de DOM faible garantit que votre contenu nécessite moins de calcul pour être vectorisé.</>,
  },
  {
    q: "Comment les robots d'exploration IA traitent-ils le texte rendu en JavaScript par rapport au HTML côté serveur ?",
    a: <>Si Googlebot est devenu très compétent pour le rendu du JavaScript côté client, de nombreux robots spécifiques aux LLM (comme GPTBot, ClaudeBot ou Perplexity) disposent de capacités de rendu plus limitées. Si votre contenu factuel principal ou vos citations en ligne dépendent d'une exécution JavaScript lourde pour se charger, il y a une forte probabilité que les moteurs IA ne voient qu'une page vide ou incomplète. Le rendu côté serveur (SSR) ou la génération de HTML statique est fortement recommandé pour une visibilité GEO maximale.</>,
  },
  {
    q: "Faut-il privilégier les citations textuelles en ligne ou le schéma JSON-LD pour l'ancrage factuel ?",
    a: <>Les deux servent deux phases distinctes du pipeline d'extraction et doivent être utilisés ensemble. Le schéma JSON-LD (comme Organization ou Article) établit l'autorité de l'entité au niveau macro de la page, agissant comme un signal de confiance immédiat. Les citations en ligne (structure sujet-prédicat-source dans le texte brut), elles, sont nécessaires pour l'ancrage factuel au niveau micro que les modèles RAG utilisent pour construire des réponses directes et des AI Overviews.</>,
  },
];

export default function HighVisibilityContentFrPage() {
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
        <title>Le plan directeur pour un contenu à forte visibilité : mise en forme, lisibilité et optimisation pour l'IA | Poliris</title>
        <link rel="canonical" href="https://poliris.io/fr/blog/blueprint-for-high-visibility-content" />
        <link rel="alternate" hrefLang="fr" href="https://poliris.io/fr/blog/blueprint-for-high-visibility-content" />
        <link rel="alternate" hrefLang="x-default" href="https://poliris.io/en/blog/blueprint-for-high-visibility-content" />
        <meta name="description" content="Le principe fondamental pour l'emporter dans ce nouveau paysage : structurer chaque page avec une hiérarchie de titres HTML stricte, des paragraphes courts, et des citations explicites en ligne." />
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
              <span>9 min de lecture</span>
              <span className="bp-dot" />
              <span>Équipe Poliris</span>
              <span className="bp-dot" />
              <span>20 août 2026</span>
            </div>
            <h1 className="bp-title">Le plan directeur pour un contenu à forte visibilité : mise en forme, lisibilité et optimisation pour l'IA</h1>
            <p className="bp-deck">La découverte via la recherche connaît une fragmentation massive. Pour réussir à <strong>optimiser le contenu pour l'IA générative</strong>, les équipes éditoriales doivent comprendre que les grands modèles de langage (LLM) ne traitent pas l'information exactement de la même façon que les robots d'indexation traditionnels. Alors que les systèmes historiques comme Google utilisent des algorithmes complexes pour cartographier la densité de mots-clés et les profils de backlinks, les moteurs génératifs modernes utilisant la génération augmentée par récupération (RAG) segmentent les documents, vectorisent les concepts, et associent les requêtes utilisateur à un sens sémantique.</p>
          </header>

          {/* Intro */}
          <div className="bp-section">
            <p>Dans un rapport de 2024, <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents">Gartner projetait une baisse de 25 % du volume de recherche traditionnelle d'ici 2026, portée par les chatbots IA et les agents virtuels</a>. Ce basculement est en cours, mais il prend une forme différente de la prévision initiale : ChatGPT traite désormais à lui seul <a target="_blank" rel="noopener noreferrer nofollow" href="https://techcrunch.com/2025/07/21/chatgpt-users-send-2-5-billion-prompts-a-day/">2,5 milliards de requêtes par jour</a> selon OpenAI, et pourtant la recherche traditionnelle n'a pas été purement et simplement remplacée, Google ayant conservé la grande majorité de ses parts de marché en intégrant les AI Overviews directement dans ses résultats. Pour les équipes de contenu, l'implication pratique reste la même dans les deux cas : être cité au sein d'une réponse générée par IA est désormais une seconde surface de découverte pour laquelle il faut activement se battre, en plus des classements traditionnels.</p>
            <p>Le principe fondamental pour l'emporter dans ce nouveau paysage est simple mais rigoureux : structurer chaque page avec une hiérarchie de titres HTML stricte, des paragraphes courts et contraints, et des citations explicites en ligne. Ce faisant, les systèmes automatisés peuvent segmenter, extraire et citer votre texte en toute confiance, comme une réponse vérifiée et fiable.</p>
            <p>Par ailleurs, les équipes éditoriales doivent comprendre que toutes les plateformes IA n'extraient pas l'information selon les mêmes heuristiques :</p>
            <ul className="bp-prose-list">
              <li><strong>Perplexity</strong> privilégie fortement le contenu récent et explicitement cité.</li>
              <li><strong>Claude</strong> a tendance à synthétiser le raisonnement et privilégie les argumentaires complets et bien structurés.</li>
              <li><strong>Les AI Overviews de Google</strong> privilégient des réponses directes, adaptées aux extraits, étroitement liées à l'autorité SEO traditionnelle.</li>
            </ul>
            <ImgHold label="Figure 1" sub="Comment Perplexity, Claude et les AI Overviews de Google priorisent le contenu différemment" />
            <p>Une <strong>mise en forme de contenu SEO</strong> solide satisfait simultanément tous ces pipelines variés en donnant aux systèmes IA des signaux propres et facilement analysables, en lesquels ils peuvent avoir confiance.</p>
          </div>

          {/* 01 */}
          <section className="bp-section" id="s-core" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Principes fondamentaux de l'optimisation pour moteurs génératifs (GEO)</h2>
            </div>
            <p>Optimiser pour l'IA générative exige un basculement stratégique délibéré, qui délaisse la densité de mots-clés au profit de la clarté structurelle et de l'ancrage factuel. Les décisions de mise en forme prises dès la phase de rédaction initiale déterminent si un système RAG pourra analyser proprement votre contenu, ou s'il l'ignorera purement et simplement. Pour les équipes qui ont besoin d'un accompagnement concret sur ce sujet, nos <Link to={`/${lang}/content-writing`}>services de rédaction de contenu</Link> spécialisés permettent de combler l'écart entre créativité humaine et structure exploitable par l'IA.</p>
            <p>Parce que les LLM fonctionnent en grande partie comme des systèmes boîte noire, le GEO moderne repose sur des tests rigoureux et des heuristiques éprouvées par la pratique plutôt que sur des plans algorithmiques absolus. L'heuristique qui se vérifie le plus systématiquement : traiter chaque section H2 comme un segment d'information autonome et logiquement complet. Cela réduit considérablement la charge d'analyse nécessaire à la lecture automatisée.</p>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-onpage" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>Mise en forme on-page : une architecture pensée pour l'extraction automatisée</h2>
            </div>
            <p>La mise en forme est l'architecture fondamentale qui soutient l'extraction automatisée. Si une mise en forme claire ne garantit pas absolument une citation IA, un texte dense et non structuré est, lui, fortement corrélé au fait d'être ignoré par les pipelines RAG. Lorsque vous auditez vos pages, décomposez votre évaluation en catégories distinctes : Lisibilité, Structure, et Architecture.</p>
            <h3>Heuristiques de lisibilité et de syntaxe</h3>
            <p>Pour définir des <strong>standards de lisibilité pour l'IA</strong>, les meilleures pratiques du secteur ciblent fréquemment un niveau de lecture Flesch-Kincaid compris entre 8 et 10. Si les LLM disposent de la puissance de calcul nécessaire pour traiter un texte académique très complexe, garder une syntaxe simple et limiter les paragraphes à 2-3 phrases offre des frontières d'extraction bien plus nettes pour les algorithmes de segmentation. Un bénéfice secondaire : cette mise en forme concise satisfait aussi parfaitement les exigences UX de la lecture mobile pour les humains.</p>
            <p><strong>Micro-formatage stratégique (Structure)</strong></p>
            <p>Le micro-formatage agit comme une série de repères structurels pour les moteurs d'analyse. Bien qu'il ne soit pas considéré comme un facteur de classement direct en SEO traditionnel, l'application de conventions de balisage cohérentes est largement observée comme un moyen d'aider les systèmes RAG à identifier rapidement les relations entre les concepts.</p>
            <div className="bp-table-wrap">
              <table className="bp-table">
                <thead>
                  <tr>
                    <th>Type de mise en forme</th>
                    <th>Règle d'implémentation</th>
                    <th>Objectif IA/GEO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Mise en gras des entités</strong></td>
                    <td>Mettre en gras la toute première occurrence des termes d'entité clés.</td>
                    <td>Une convention courante utilisée pour signaler clairement les concepts centraux au sein d'un paragraphe.</td>
                  </tr>
                  <tr>
                    <td><strong>Listes à puces ({'<ul>'})</strong></td>
                    <td>Utiliser les puces exclusivement pour des faits ou options catégoriels.</td>
                    <td>Regroupe des entités liées sans imposer de logique chronologique.</td>
                  </tr>
                  <tr>
                    <td><strong>Listes numérotées ({'<ol>'})</strong></td>
                    <td>Utiliser les listes numérotées strictement pour des étapes séquentielles ou des éléments classés.</td>
                    <td>Force le LLM à comprendre la chronologie, les processus étape par étape, et la hiérarchie des priorités.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-semantic" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>HTML sémantique et architecture de schéma</h2>
            </div>
            <p>Une structure de titres appropriée fournit une carte prévisible du document. Lorsqu'un système génératif segmente une page pour la vectoriser, il s'appuie souvent sur l'arborescence des titres pour conserver le contexte de l'information. Réaliser un <Link to={`/${lang}/technical-audit`}>audit technique</Link> complet est le moyen le plus rapide d'identifier et de réparer les cartes architecturales défaillantes des sites existants.</p>
            <h3>Hiérarchie stricte des titres HTML</h3>
            <p>Le HTML sémantique donne aux LLM un plan qu'ils peuvent analyser sans avoir à deviner l'intention de la page.</p>
            <ul className="bp-prose-list">
              <li><strong>Le H1</strong> définit le sujet global du document.</li>
              <li><strong>Les H2</strong> définissent les grands sous-thèmes.</li>
              <li><strong>Les H3</strong> détaillent les éléments granulaires et les informations à l'appui.</li>
            </ul>
            <p>Rompre cette chaîne sémantique, par exemple en passant directement d'un H1 à un H3, risque de fragmenter le contexte de la page. Cela peut potentiellement amener un modèle d'extraction à perdre la relation parent-enfant entre les idées, ce qui entraîne une hallucination ou une citation manquée.</p>
            <ImgHold label="Figure 2" sub="Anatomie d'une hiérarchie stricte de titres H1 → H2 → H3" />
            <h3>Le modèle de réponse directe (BLUF)</h3>
            <p>Pour améliorer vos chances d'extraction en featured snippet et d'apparition dans les AI Overviews de Google, nous recommandons la méthode Bottom Line Up Front (BLUF).</p>
            <p><strong>Mise en œuvre :</strong> commencez par une réponse directe et déclarative immédiatement sous chaque titre H2 et H3, avant de développer les détails à l'appui.</p>
            <h3>Intégration ciblée du schéma JSON-LD</h3>
            <p>Un balisage HTML front-end propre doit toujours être associé à des données structurées précises côté back-end. Il ne suffit pas d'avoir un JSON-LD générique sur une page ; il doit être mappé avec précision au format de contenu spécifique. Intégrer les <a target="_blank" rel="noopener noreferrer nofollow" href="https://schema.org/docs/documents.html">standards Schema.org</a> officiels aide les moteurs de recherche à cataloguer vos concepts instantanément.</p>
            <p>Lors de la mise en œuvre de ces évolutions, transmettez clairement ces exigences à votre développeur back-end afin de garantir que les schémas suivants soient injectés dynamiquement selon le type de page :</p>
            <ol className="bp-steps">
              <li><strong>Schéma Article ou NewsArticle :</strong> à utiliser pour établir les entités centrales et les auteurs du texte.</li>
              <li><strong>Schéma FAQPage :</strong> à déployer pour les blocs de questions-réponses directes, afin d'alimenter les requêtes en langage naturel directement à l'IA.</li>
              <li><strong>Schéma ItemList :</strong> à mettre en œuvre pour les listes classées, les guides comparatifs, et les ressources de type « Top 10 ».</li>
              <li><strong>Schéma LocalBusiness ou Organization :</strong> à déployer à l'échelle du site pour établir la présence physique de votre marque, sa zone d'activité, et les données de l'entité corporate pour les requêtes IA localisées.</li>
              <li><strong>Schéma ProfilePage et Person :</strong> à utiliser sur les pages de biographie d'auteur et de direction pour établir des signaux E-E-A-T clairs, prouvant aux moteurs IA que le contenu est rédigé par des experts humains vérifiés.</li>
            </ol>
            <ImgHold label="Figure 3" sub="Associer chaque type de schéma JSON-LD au type de page correspondant" />
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-local" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>GEO local et corroboration d'entité off-page</h2>
            </div>
            <p>La <strong>structure sémantique pour le SEO</strong> on-page ne représente que la moitié de la bataille. Les moteurs IA appliquent une corroboration rigoureuse multi-sources pour vérifier l'autorité d'une affirmation.</p>
            <p>Une marque, une affirmation factuelle, ou un cadre conceptuel mentionné sur plusieurs domaines indépendants et à forte autorité porte un poids de citation nettement supérieur dans un système RAG. Obtenir des mentions de marque non liées et entretenir des relations presse off-page cohérentes est absolument déterminant pour établir l'autorité d'entité requise pour les citations IA de premier plan.</p>
            <p><strong>L'avantage du GEO local :</strong> pour les marques centrées sur la visibilité locale et les stratégies de recherche localisées, cette corroboration off-page est encore plus essentielle. Les moteurs IA recoupent vos affirmations on-page avec les annuaires locaux, les mentions dans la presse locale, et les données cartographiques. Garantir la cohérence de votre NAP (Nom, Adresse, Téléphone) avec votre texte on-page évite aux LLM de recevoir des signaux contradictoires sur votre entité locale.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-citation" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Format des citations IA et fraîcheur</h2>
            </div>
            <p>Les modèles IA sont très sensibles à l'ancrage factuel et à la fraîcheur du contenu. Un contenu dépourvu d'ancrages vérifiables est fréquemment écarté au profit de sources citées.</p>
            <h3>Ancrer les faits et les affirmations</h3>
            <p>Vous devez structurer vos faits, statistiques et citations rapportées de façon à ce qu'ils soient facilement attribuables par une machine.</p>
            <p>Indiquez le nom de la source et l'année directement dans le texte (par exemple, <em>« Une étude Gartner de 2024 a souligné que... »</em>) plutôt que de reléguer l'attribution en bas de page ou dans un mot en lien hypertexte. Cette structure explicite sujet-prédicat-source réduit fortement le risque qu'un LLM traite une affirmation factuelle comme une opinion subjective non étayée.</p>
            <h3>Signaux de fraîcheur et de récence</h3>
            <p>Les moteurs IA, en particulier Perplexity, présentent un biais de récence très marqué. Les citations chutent souvent nettement à mesure que le contenu vieillit. Pour contrer cela, veillez à ce que les dates de « Dernière mise à jour » soient visiblement affichées dans le HTML front-end, et explicitement indiquées dans les données de schéma back-end, afin de signaler aux robots d'extraction la validité actuelle et continue du contenu.</p>
          </section>

          {/* 06 */}
          <section className="bp-section" id="s-checklist" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">06</span>
              <h2>La checklist de visibilité IA pour les équipes éditoriales</h2>
            </div>
            <p>Pour vous aligner sur les meilleures pratiques GEO actuelles et garantir que votre contenu passe à l'échelle sur l'ensemble des LLM, exécutez cet audit qualité sur chaque brouillon avant publication :</p>
            <ul className="bp-prose-list">
              <li><strong>Auditer la profondeur des titres :</strong> vérifier l'imbrication stricte H1 → H2 → H3. Ne jamais sauter un niveau de hiérarchie.</li>
              <li><strong>Vérifier le placement de la réponse directe :</strong> s'assurer que chaque H2 et H3 commence par une réponse directe et déclarative avant de développer les détails à l'appui (méthode BLUF).</li>
              <li><strong>Confirmer les repères de lisibilité :</strong> viser un score Flesch-Kincaid compris entre le niveau 8 et 10.</li>
              <li><strong>Renforcer les contraintes de paragraphe :</strong> scinder tout paragraphe dépassant trois phrases pour préserver des frontières de segmentation propres et facilement analysables.</li>
              <li><strong>Standardiser la syntaxe des listes :</strong> vérifier que le balisage ordonné ({'<ol>'}) est utilisé pour les étapes et que le balisage non ordonné ({'<ul>'}) est utilisé pour les fonctionnalités non séquentielles.</li>
            </ul>
            <ul className="bp-prose-list">
              <li><strong>Appliquer la mise en gras des entités :</strong> mettre en gras le concept ou l'entité principal dès sa toute première mention dans une section.</li>
              <li><strong>Valider les types de schéma :</strong> confirmer que les schémas JSON-LD désignés pour le type de page (par ex. Article, FAQPage, ItemList) sont présents, exacts, et sans erreur côté back-end.</li>
              <li><strong>Formater les citations en ligne :</strong> s'assurer que toutes les statistiques, données chiffrées et affirmations externes sont explicitement attribuées directement dans le texte.</li>
              <li><strong>Mettre à jour les signaux de fraîcheur :</strong> vérifier que l'horodatage « Dernière mise à jour » est à jour et visible à la fois dans l'interface front-end et dans le schéma back-end.</li>
            </ul>
            <p>Pour une perspective plus large sur l'impact de ces tâches sur votre performance à l'échelle du site, pensez à suivre l'ensemble de vos <Link to={`/${lang}/visibility`}>indicateurs de visibilité IA</Link> sur <Link to={`/${lang}`}>Poliris</Link>.</p>
          </section>

          {/* 07 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">07</span>
              <h2>Questions fréquentes</h2>
            </div>
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

        </main>
      </div>
      <Footer />
    </div>
  );
}
