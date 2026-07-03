import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-paradigm',   label: 'Le changement de paradigme' },
  { id: 's-vs-seo',     label: 'GEO vs. SEO traditionnel' },
  { id: 's-visibility', label: 'Renforcer la visibilité IA' },
  { id: 's-technical',  label: 'Prérequis SEO technique' },
  { id: 's-faq',        label: 'FAQ' },
  { id: 's-takeaways',  label: 'Points clés' },
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

export default function DeathOfTraditionalSearchFrPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

  const FAQ_ITEMS = [
    {
      q: 'Le GEO va-t-il complètement remplacer le SEO traditionnel ?',
      a: "Non. Tout consultant qui prétend le contraire essaie de vous vendre quelque chose. SEO et GEO ne sont pas un choix binaire. Le SEO technique traditionnel forme la fondation crawlable dont dépendent les moteurs IA. Sans architecture de site propre et contenu indexable, aucun moteur IA ne vous citera. Voyez les choses ainsi : le SEO technique est la route. Le GEO est la signalisation qui indique à l'IA où aller.",
    },
    {
      q: 'Comment mesurer le ROI de la visibilité dans la recherche IA ?',
      a: <>
        <p>La mesure du ROI pour la visibilité IA est encore en maturation, mais vous ne pilotez pas à l'aveugle. Suivez ces signaux :</p>
        <ul>
          <li>Le volume de mentions de marque dans les réponses générées par l'IA.</li>
          <li>Le trafic de référence issu des clics sourcés par l'IA. Surveillez l'impact direct de vos efforts GEO à mesure que les moteurs IA font émerger et renvoient de plus en plus vers votre contenu.</li>
          <li>La part de voix dans les panneaux de réponse IA face à vos concurrents. Vous pouvez suivre votre part de voix exacte sur tous les principaux moteurs IA avec <Link to={`/${lang}/visibility`}>Poliris AI Visibility</Link>.</li>
          <li>La croissance des requêtes de recherche de marque. Elles connaissent souvent un pic lorsque les moteurs IA vous citent de manière répétée.</li>
        </ul>
      </>,
    },
    {
      q: 'Quelle est la plus grande erreur commise par les marques ?',
      a: "La plus grande erreur commise par les marques est de traiter le GEO comme un simple ajustement de mise en forme du contenu. En pratique, cela exige un changement structurel. Les équipes qui se contentent d'ajouter une section FAQ à la fin d'articles de blog existants obtiennent peu de résultats. Les marques qui gagnent restructurent l'ensemble de leur hiérarchie de contenu autour de l'autorité d'entité et d'affirmations lisibles par les machines.",
    },
  ];

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
        <title>La mort de la recherche traditionnelle : pourquoi le GEO est votre priorité | Poliris</title>
        <meta name="description" content="Le GEO consiste à structurer votre contenu pour que les moteurs de réponse IA puissent l'extraire et le citer directement. Voici pourquoi c'est votre nouvelle priorité." />
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
              <span>30 juin 2026</span>
            </div>
            <h1 className="bp-title">La mort de la recherche traditionnelle : pourquoi l'optimisation pour les moteurs génératifs (GEO) est votre nouvelle priorité</h1>
            <p className="bp-deck">L'optimisation pour les moteurs génératifs (GEO) consiste à structurer le contenu pour que les moteurs de réponse IA puissent l'extraire et le citer directement. Ces moteurs incluent ChatGPT, Claude et Gemini. Le SEO traditionnel optimise pour des listes classées sur Google. Le GEO cible la couche de réponse au-dessus de la page de résultats de recherche.</p>
            <p className="bp-deck">Le comportement de recherche a déjà changé. <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents">Gartner prévoit que le volume de recherche traditionnelle diminuera de 25 % d'ici 2026</a>. Les requêtes basculent massivement vers des interfaces IA conversationnelles. Si votre contenu manque de la structure adaptée à cet environnement, il sera probablement ignoré. Votre classement Google n'aura plus d'importance. Ce guide est la remise à zéro de votre stratégie digitale. Vous apprendrez exactement comment fonctionne le GEO, pourquoi il exige une architecture de contenu différente du SEO classique, et comment les principes du SEO génératif IA vous aident à vous adapter dès aujourd'hui.</p>
            <div className="bp-tags">GEO · SEO · Visibilité IA</div>
          </header>

          {/* 01 */}
          <section className="bp-section" id="s-paradigm" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Le changement de paradigme : qu'est-ce que l'optimisation pour les moteurs génératifs ?</h2>
            </div>
            <p>S'adapter au GEO signifie dépasser le classement pour les clics. Le nouvel objectif est de devenir la source de confiance qu'une IA cite. La recherche n'a pas changé soudainement. Pendant des décennies, le SEO a récompensé les pages qui correspondaient à des mots-clés et gagnaient des backlinks. Puis les grands modèles de langage sont arrivés, et la logique de récupération s'est inversée. Les moteurs IA synthétisent désormais une réponse à partir des sources en lesquelles ils ont le plus confiance, au lieu de renvoyer une liste de liens. Si votre contenu manque de la structure adéquate pour cette synthèse, il reste invisible.</p>
            <p>En pratique, voici à quoi ressemble le GEO. Un fondateur demande à Gemini comment réduire le taux d'attrition client. Gemini n'affiche pas dix liens bleus. Il compose un paragraphe et attribue des idées à deux ou trois sources crédibles. L'une de ces sources remporte la conversation. L'optimisation pour la recherche générative est la discipline qui place votre contenu dans ce siège gagnant.</p>
            <p>L'autorité d'entité permet d'obtenir ce placement. Les moteurs IA ne se contentent pas de scanner des mots-clés. Ils évaluent si votre marque, vos auteurs et vos affirmations forment une entité cohérente et fiable sur l'ensemble du web. Cette discipline concerne avant tout les stratèges de contenu, les professionnels du SEO et les fondateurs. Leurs acheteurs utilisent déjà des outils IA pour orienter leurs décisions. En effet, <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html#:~:text=B2B%20buyers%20use%20AI%20search,tools%20into%20their%20research%20process.">73 % des acheteurs B2B utilisent des outils IA comme ChatGPT ou Perplexity dans leurs recherches fournisseurs</a>. Si votre audience pose des questions à ChatGPT avant de visiter un moteur de recherche, le GEO est votre priorité dès aujourd'hui. Une bonne intégration SEO reste le fondement. Vous pouvez découvrir comment ces deux disciplines se rejoignent dans notre guide, <Link to={`/${lang}/blog/why-seo-is-the-cornerstone-of-geo-success`}>Pourquoi le SEO est la pierre angulaire du succès GEO</Link>.</p>
            <ImgHold label="Figure 1" sub="Le basculement de la récupération : des liens classés à une réponse unique synthétisée" />
            <div className="bp-note">
              <div className="bp-note-label">Note d'expert</div>
              <p>Rédigez chaque affirmation clé sous la forme d'une phrase déclarative unique de moins de 50 mots. C'est exactement le format que les moteurs IA extraient mot pour mot lorsqu'ils composent leurs réponses.</p>
            </div>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-vs-seo" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>GEO vs. SEO traditionnel : pourquoi les liens bleus disparaissent</h2>
            </div>
            <p>Les liens bleus perdent du terrain rapidement. Un utilisateur pose une question à ChatGPT ou à Gemini et obtient une réponse directe. Il n'obtient pas une liste de dix URLs à cliquer. Ce seul changement bouleverse la façon dont les marques gagnent en visibilité en ligne.</p>
            <p>Le débat GEO contre SEO se résume à une seule question. Optimisez-vous pour une position de classement, ou pour être cité comme la source ? Le SEO traditionnel poursuivait la densité de mots-clés et le nombre de backlinks. Le GEO construit une autorité d'entité. Cela signifie que les moteurs IA doivent reconnaître votre marque comme une source fiable et bien définie sur un sujet précis. C'est un peu la différence entre figurer sur une étagère surchargée et être la marque qu'un vendeur expérimenté recommande nommément.</p>
            <h3>De la densité de mots-clés à l'autorité d'entité</h3>
            <p>La transition vers le GEO n'est pas un remplacement. C'est un processus de superposition. Le SEO technique traditionnel reste la fondation requise. Les crawlers IA ne peuvent tout simplement pas analyser votre contenu avec précision sans directives de crawl propres, une hiérarchie de titres bien structurée et des pages qui se chargent rapidement. Un site techniquement défaillant est invisible aussi bien pour Google que pour les moteurs génératifs.</p>
            <p>Ce qui change au-dessus de cette fondation, c'est l'objectif ultime. Le SEO des débuts récompensait la répétition d'une expression cible. Le GEO récompense la profondeur de sens et la clarté de l'attribution. Les moteurs IA extraient des réponses à partir de contenus qui définissent explicitement des concepts, nomment de vraies entités et les relient par un raisonnement logique. Voici, concrètement, où la plupart des marques échouent :</p>
            <ul className="bp-prose-list">
              <li>Elles optimisent pour les clics mais ne structurent jamais leur contenu pour l'extraction directe.</li>
              <li>Elles considèrent le balisage schema comme optionnel, alors qu'il constitue l'épine dorsale lisible par les machines.</li>
              <li>Elles ne se soucient pas de savoir si les moteurs IA peuvent leur attribuer spécifiquement une affirmation.</li>
            </ul>
            <div className="bp-note">
              <div className="bp-note-label">Note d'expert</div>
              <p>Si un moteur IA ne peut pas résumer votre contenu en deux phrases sans deviner, votre autorité d'entité est trop faible. Réécrivez vos pages principales avec une prose déclarative, dense en faits, qui se suffit à elle-même sans contexte environnant.</p>
            </div>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-visibility" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Renforcer la visibilité dans la recherche IA : comment les moteurs extraient les réponses</h2>
            </div>
            <p>La visibilité dans la recherche IA repose sur une vérité fondamentale. Des moteurs comme ChatGPT, Claude et Gemini ne classent pas les pages. Ils les analysent. La question n'est pas de savoir si votre contenu apparaît dans un index. Elle est de savoir si un modèle de langage peut extraire une réponse claire et fiable de votre texte, puis la citer.</p>
            <p>La plupart des contenus échouent à ce test. Ils échouent parce qu'ils n'ont pas été écrits pour l'analyse par une IA. De longs paragraphes, des affirmations noyées et des transitions vagues facilitent la lecture pour un humain. Mais ils rendent presque impossible l'extraction d'une réponse autonome pour un moteur IA. C'est comme un classeur de rangement. Un humain peut fouiller les dossiers pour trouver ce dont il a besoin. Un moteur IA a besoin de tiroirs clairement étiquetés.</p>
            <h3>Comment s'aligner sur les standards de la recherche IA</h3>
            <p>Répondre aux standards du GEO implique de restructurer la façon dont vous délivrez vos affirmations. Suivez ces étapes pour intégrer l'optimisation pour la recherche IA à votre stratégie de contenu existante :</p>
            <ol className="bp-steps">
              <li><strong>Commencez par la réponse :</strong> placez votre affirmation principale dans la première phrase de chaque section. Les moteurs IA accordent un poids important aux phrases d'ouverture pour l'extraction de citations.</li>
              <li><strong>Utilisez un langage simple :</strong> visez un niveau de lecture accessible, équivalent à la fin du collège. La complexité dissimule le sens, aussi bien aux analyseurs qu'aux lecteurs humains.</li>
              <li><strong>Appliquez des insights pilotés par l'IA :</strong> utilisez des outils qui font émerger les questions réelles auxquelles les moteurs IA répondent sur vos sujets cibles. Construisez du contenu qui y répond directement.</li>
              <li><strong>Construisez un contexte riche en entités :</strong> nommez explicitement le quoi, le qui et le pourquoi. L'optimisation pour la recherche générative récompense le contenu qui définit ses propres termes plutôt que de présumer une connaissance sectorielle partagée.</li>
              <li><strong>Structurez avec une hiérarchie :</strong> des titres H2 et H3 clairs servent de repères de navigation essentiels pour les crawlers IA.</li>
            </ol>
            <ImgHold label="Figure 2" sub="Le cadre en cinq étapes pour aligner le contenu sur les standards de la recherche IA" />
            <div className="bp-note">
              <div className="bp-note-label">Note d'expert</div>
              <p>Faites passer votre brouillon dans un outil de mesure de lisibilité (comme le score de Flesch) avant publication. Si votre contenu dépasse un niveau de lecture avancé, réécrivez d'abord les paragraphes les plus denses. Des structures de phrases plus simples améliorent nettement les taux de citation IA.</p>
            </div>
            <p>En pratique, une marque de services financiers a restructuré ses pages FAQ autour de phrases déclaratives et directes. Les moteurs IA ont commencé à faire remonter ses définitions comme réponses directes peu après la publication. Le fond du contenu n'a pas changé. Seule la manière de le délivrer a changé. Les backlinks seuls ne signalent plus l'autorité. Une lecture claire, une analyse directe et la répétition signalent désormais l'autorité.</p>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-technical" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Les prérequis SEO technique pour les crawlers IA</h2>
            </div>
            <p>Les crawlers IA ne parcourent pas votre site comme le font les robots de Google. Ils analysent, extraient et synthétisent. Si votre fondation technique est faible, les modèles de langage ignorent entièrement votre contenu, quelle que soit la qualité de votre rédaction. La plupart des gens présument qu'une rédaction soignée suffit pour l'optimisation des moteurs génératifs. En pratique, le véritable gardien est technique. Si l'infrastructure est défaillante, votre contenu n'entre jamais dans le champ de conscience du modèle.</p>
            <h3>Auditez d'abord vos directives de crawl</h3>
            <p>Le SEO technique commence par l'accès. Des agents IA comme GPTBot et ClaudeBot lisent votre fichier robots.txt avant de toucher la moindre page. Si vos directives les bloquent par erreur, votre indexation s'arrête à la porte. Voici comment corriger cela :</p>
            <ul className="bp-prose-list">
              <li>Ouvrez votre fichier robots.txt et vérifiez l'absence de règles Disallow trop larges qui bloqueraient involontairement les user-agents IA.</li>
              <li>Ajoutez des directives Allow explicites pour les crawlers auxquels vous souhaitez accorder l'accès, comme GPTBot et Google-Extended.</li>
              <li>Auditez les balises meta robots sur l'ensemble du site. Une balise noindex sur une page pilier bloque les crawlers IA aussi sûrement qu'elle bloque les moteurs de recherche classiques.</li>
            </ul>
            <h3>Structurez les données pour l'extraction d'entités</h3>
            <p>Le texte brut est difficile à analyser rapidement pour les modèles de langage. Le balisage schema change la donne en enveloppant votre contenu dans un format lisible par les machines. Cela rend les relations entre entités explicites. Utilisez le schema Article sur le contenu éditorial. Ajoutez le schema FAQPage aux sections de questions-réponses : c'est de là que les moteurs IA extraient des réponses directes. Appliquez le schema Organization à votre page À propos pour renforcer l'autorité d'entité globale. Par ailleurs, la mise en place d'un fichier llm.txt constitue un nouveau standard critique pour l'indexation par les LLM. Ce fichier agit comme une carte directe pour les crawlers IA et garantit que vos données essentielles sont analysées sans friction.</p>
            <ImgHold label="Figure 3" sub="La pile de dépendances entre le crawl, le schema et la hiérarchie des titres, jusqu'à la citation" />
            <h3>Corrigez la hiérarchie du contenu et la lisibilité</h3>
            <p>Des niveaux de titres cassés perturbent les analyseurs. Une balise H4 apparaissant directement après un H2, sans H3 intermédiaire, signale une structure médiocre. Les modèles de langage considèrent une hiérarchie de titres correctement imbriquée comme un signe de contenu logique et fiable. Un langage simple compte tout autant. Des phrases courtes, des affirmations claires et un enchaînement logique réduisent tous la friction d'analyse pour les systèmes IA.</p>
            <p><strong>Point clé :</strong> un accès de crawl propre, un schema complet et une hiérarchie de titres logique sont les trois prérequis non négociables avant que tout effort d'optimisation pour la recherche générative puisse porter ses fruits.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Questions fréquemment posées</h2>
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
                    <div className="bp-faq-body-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div id="s-takeaways" style={{ scrollMarginTop: '90px', marginTop: '3.5rem' }}>
            <h2 className="bp-section-h2">Conclusion</h2>
            <p className="bp-takeaways-intro">L'avenir de la recherche est déjà là. Les moteurs IA redessinent activement la façon dont les réponses émergent, et les marques qui attendent perdront rapidement du terrain. Adapter votre stratégie digitale à cette réalité n'est pas optionnel.</p>
            <p className="bp-takeaways-intro">Comprendre les mécanismes de l'optimisation pour les moteurs génératifs est la première étape. L'exécuter avec constance est ce qui sépare les marques citées des marques ignorées. L'écart entre ces deux groupes se creusera chaque trimestre. Lancez votre audit GEO dès aujourd'hui en identifiant vos trois pages les plus fréquentées. Réécrivez leurs paragraphes d'ouverture sous forme de réponses directes et déclaratives.</p>
            <div className="bp-takeaways">
              <h2 className="bp-takeaways-title">Points clés</h2>
              <ul className="bp-takeaways-list">
                <li>L'optimisation pour les moteurs génératifs déplace l'objectif du classement pour les clics vers la structuration du contenu pour que les moteurs IA puissent l'extraire et le citer.</li>
                <li>Le SEO technique traditionnel est la fondation non négociable de toute mise en œuvre du GEO. Cela inclut des directives de crawl propres, un schema adapté et une hiérarchie de titres claire.</li>
                <li>La visibilité dans la recherche IA dépend fortement de l'autorité d'entité et de la lisibilité, pas de la densité de mots-clés.</li>
                <li>Le GEO et le SEO ne sont pas des stratégies concurrentes. Le GEO s'appuie sur la fondation technique du SEO et l'étend aux environnements pilotés par l'IA.</li>
              </ul>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
