// Main JavaScript for Rishav Mishra Portfolio
// Specialized: Creative Brand Strategist | Content Engineer | Growth & Operations

async function startApp() {
  // 1. Initialize Theme (Dark / Light Mode) immediately
  initTheme();

  let data = null;
  try {
    const res = await fetch('assets/data/portfolio-data.json');
    if (res.ok) {
      data = await res.json();
    }
  } catch (e) {
    console.warn('Local fetch fallback:', e);
  }

  if (!data) {
    data = window.portfolioData || (typeof portfolioData !== "undefined" ? portfolioData : null);
  }

  if (!data) {
    console.error('Portfolio data could not be loaded from JSON or fallback.');
    return;
  }

  // 2. Initialize Profile & Hero
  initProfile(data.profile);

  // 3. Initialize Workflows & Interactive Step Breakdown Engine
  initFrameworks(data.frameworks);

  // 4. Initialize Clients & Brands with Multi-Filter & Show More Expander
  initClients(data.clients, data.brands);

  // 5. Initialize Products & Engineering Projects
  initProjects(data.projects);

  // 6. Initialize Content Stack & AI Toolkit
  initToolkit(data.toolkit);

  // 7. Initialize Academic Research Rigor
  initPublications(data.publications);

  // 8. Initialize Operations & Leadership
  initOperations(data.operationsLeadership);

  // 9. Initialize Education
  initEducation(data.education);

  // 10. Initialize Modals, Toast, Smooth Scroll, and Navigation
  initInteractions(data);

  // 11. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/** Dark / Light Theme Controller */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlEl = document.documentElement;

  // Safely read saved theme (handles file:/// security restrictions)
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {}

  let systemPrefersDark = false;
  try {
    systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {}

  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `<i data-lucide="sun" class="w-4 h-4 text-amber-300"></i>`;
        btn.setAttribute('title', 'Switch to Light Mode');
      });
    } else {
      htmlEl.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `<i data-lucide="moon" class="w-4 h-4 text-zinc-700"></i>`;
        btn.setAttribute('title', 'Switch to Dark Mode');
      });
    }
    if (window.lucide) window.lucide.createIcons();
  };

  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = htmlEl.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });
}

/** Profile & Hero Setup */
function initProfile(profile) {
  document.querySelectorAll('.profile-name').forEach(el => el.textContent = profile.name);
  document.querySelectorAll('.profile-title').forEach(el => el.textContent = profile.title);
  document.querySelectorAll('.profile-headline').forEach(el => el.textContent = profile.headline);
  document.querySelectorAll('.profile-location').forEach(el => el.textContent = profile.location);
  document.querySelectorAll('.profile-email').forEach(el => {
    el.textContent = profile.email;
    if (el.tagName === 'A') el.href = `mailto:${profile.email}`;
  });
  document.querySelectorAll('.profile-phone').forEach(el => {
    el.textContent = profile.phone;
    if (el.tagName === 'A') el.href = `tel:${profile.phone.replace(/\s+/g, '')}`;
  });

  const bioEl = document.getElementById('hero-bio');
  if (bioEl) bioEl.textContent = profile.bio;

  const extendedBioEl = document.getElementById('about-extended-bio');
  if (extendedBioEl) extendedBioEl.textContent = profile.extendedBio;

  // Render Metric Highlight Cards in Hero with Yellow Highlights
  const metricsGrid = document.getElementById('hero-metrics-grid');
  if (metricsGrid && profile.highlightMetrics) {
    metricsGrid.innerHTML = profile.highlightMetrics.map(m => `
      <div class="p-4 bg-zinc-50 dark:bg-[#141417] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 card-hover">
        <span class="text-2xl sm:text-3xl font-black tracking-tight block leading-tight text-zinc-900 dark:text-white">
          <span class="yellow-highlight">${m.value}</span>
        </span>
        <span class="text-xs font-bold text-zinc-900 dark:text-zinc-200 mt-2 block uppercase tracking-wider">${m.label}</span>
        <span class="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 block leading-snug">${m.detail}</span>
      </div>
    `).join('');
  }

  // Floating Sidebar Socials
  const sidebarSocials = document.getElementById('sidebar-socials');
  if (sidebarSocials) {
    sidebarSocials.innerHTML = profile.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
         class="flex items-center gap-2.5 p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-xs font-semibold group">
        <span class="p-1.5 bg-white dark:bg-zinc-800 rounded-lg shadow-2xs border border-zinc-100 dark:border-zinc-700 group-hover:scale-110 transition-transform">
          <i data-lucide="${s.icon}" class="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300"></i>
        </span>
        <span>${s.name}</span>
      </a>
    `).join('');
  }

  // Footer Socials
  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials) {
    footerSocials.innerHTML = profile.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
         class="flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-all">
        <i data-lucide="${s.icon}" class="w-4 h-4"></i>
        <span>${s.name}</span>
      </a>
    `).join('');
  }
}

/** Workflows & Interactive Step Breakdown Engine */
function initFrameworks(frameworks) {
  const tabsContainer = document.getElementById('framework-tabs');
  const flowchartContainer = document.getElementById('framework-flowchart-view');
  if (!tabsContainer || !flowchartContainer) return;

  let activeFwIndex = 0;
  let activeStepIndex = 0; // Default: Step 1 (0-indexed)

  // Render Framework Selector Tabs with HIGH CONTRAST WHITE TEXT ON ACTIVE BADGES
  const renderFrameworkTabs = () => {
    tabsContainer.innerHTML = frameworks.map((fw, index) => {
      const isActive = index === activeFwIndex;
      return `
        <div class="framework-card-btn p-5 rounded-2xl border transition-all cursor-pointer card-hover ${
          isActive 
            ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/10' 
            : 'bg-white dark:bg-[#141417] text-zinc-900 dark:text-white border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
        }" data-fw-index="${index}">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              isActive 
                ? 'bg-zinc-950 text-white font-black' 
                : 'bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-zinc-300 border border-blue-100 dark:border-zinc-700'
            }">${fw.badge}</span>
            <span class="text-[10px] font-black ${isActive ? 'text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'}">${fw.steps.length} Steps</span>
          </div>
          <h3 class="text-sm sm:text-base font-black leading-snug mb-1 ${isActive ? 'text-zinc-950' : 'text-zinc-900 dark:text-white'}">${fw.title}</h3>
          <p class="text-[11px] leading-relaxed line-clamp-2 ${isActive ? 'text-zinc-900 font-medium' : 'text-zinc-500 dark:text-zinc-400'}">${fw.tagline}</p>
        </div>
      `;
    }).join('');
  };

  // Render Framework View & Dynamic Step Breakdown
  const renderFrameworkView = () => {
    const fw = frameworks[activeFwIndex];
    if (!fw) return;

    if (activeStepIndex >= fw.steps.length) {
      activeStepIndex = 0;
    }

    const currentStep = fw.steps[activeStepIndex];
    const breakdown = currentStep.breakdown;

    flowchartContainer.innerHTML = `
      <div class="p-6 sm:p-9 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] shadow-xs animate-fadeIn space-y-8">
        
        <!-- Framework Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider border border-blue-100 dark:border-zinc-700">
                ${fw.badge}
              </span>
              <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${fw.steps.length}-Step Sequential Pipeline</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight">${fw.title}</h3>
            <p class="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-1">${fw.tagline}</p>
          </div>
          <button class="open-framework-modal-btn px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto" data-fw-id="${fw.id}">
            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
            <span>View Full SOP</span>
          </button>
        </div>

        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          ${fw.summary}
        </p>

        <!-- Visual Step Pipeline Cards -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Sequential Process (Click or Hover Any Step)
            </span>
            <span class="text-[11px] font-bold text-blue-600 dark:text-amber-400 hidden sm:inline-block">
              Currently viewing Step ${activeStepIndex + 1} of ${fw.steps.length}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${fw.steps.length} gap-3">
            ${fw.steps.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              return `
                <div class="flow-step-node p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 border-zinc-900 dark:border-amber-400 shadow-md' 
                    : 'bg-zinc-50/80 dark:bg-[#18181b] text-zinc-900 dark:text-white border-zinc-200/80 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800'
                }" data-step-target="${idx}">
                  
                  <div class="flex items-center justify-between mb-2">
                    <span class="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                      isSelected 
                        ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-amber-400' 
                        : 'bg-zinc-900 dark:bg-zinc-700 text-white'
                    }">
                      ${idx + 1}
                    </span>
                    <span class="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-white/10 dark:bg-zinc-950/20 text-white dark:text-zinc-950 font-black' 
                        : 'text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700'
                    }">
                      ${step.metric}
                    </span>
                  </div>

                  <h4 class="text-xs font-black leading-snug mb-1 ${isSelected ? (document.documentElement.classList.contains('dark') ? 'text-zinc-950' : 'text-white') : 'text-zinc-900 dark:text-white'}">${step.title}</h4>
                  <p class="text-[11px] leading-relaxed line-clamp-2 mb-2 ${isSelected ? (document.documentElement.classList.contains('dark') ? 'text-zinc-900' : 'text-zinc-300') : 'text-zinc-500 dark:text-zinc-400'}">${step.description}</p>
                  
                  <div class="pt-2 border-t text-[10px] font-bold flex items-center justify-between ${
                    isSelected 
                      ? 'border-white/10 dark:border-zinc-950/20 ' + (document.documentElement.classList.contains('dark') ? 'text-zinc-900' : 'text-zinc-300') 
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
                  }">
                    <span>Tool:</span>
                    <span class="font-extrabold ${isSelected ? (document.documentElement.classList.contains('dark') ? 'text-zinc-950' : 'text-white') : 'text-zinc-900 dark:text-white'}">${step.tool}</span>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- DYNAMIC ACTIVE STEP BREAKDOWN CARD -->
        <div class="p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-[#18181b] border-2 border-zinc-200/90 dark:border-zinc-800 space-y-6">
          
          <!-- Step Breakdown Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 text-xs font-black flex items-center justify-center shadow-xs">
                ${activeStepIndex + 1}
              </span>
              <div>
                <span class="text-[10px] font-extrabold text-blue-700 dark:text-amber-400 uppercase tracking-widest block">
                  Step ${activeStepIndex + 1} of ${fw.steps.length} Deep-Dive
                </span>
                <h4 class="text-lg font-black text-zinc-900 dark:text-white leading-tight">${currentStep.title}</h4>
              </div>
            </div>

            <!-- Quick Step Navigation Pills -->
            <div class="flex items-center gap-1.5 self-start sm:self-auto">
              ${fw.steps.map((_, idx) => `
                <button class="step-nav-pill px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                  idx === activeStepIndex 
                    ? 'bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 border-zinc-900 dark:border-amber-400' 
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                }" data-step-target="${idx}">
                  Step ${idx + 1}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Step Overview -->
          <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed font-medium">
            ${breakdown.overview}
          </p>

          <!-- Core Execution Details Grid -->
          <div class="grid sm:grid-cols-2 gap-5">
            
            <!-- Key Actions -->
            <div class="p-4 rounded-2xl bg-white dark:bg-[#141417] border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
              <h5 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>
                <span>Key Execution Actions</span>
              </h5>
              <ul class="space-y-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                ${breakdown.keyActions.map(action => `
                  <li class="flex items-start gap-2">
                    <span class="text-blue-500 font-bold">•</span>
                    <span>${action}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Tools & Artifacts -->
            <div class="p-4 rounded-2xl bg-white dark:bg-[#141417] border border-zinc-200/80 dark:border-zinc-800 shadow-2xs space-y-4">
              <div>
                <h5 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <i data-lucide="wrench" class="w-3.5 h-3.5 text-blue-500"></i>
                  <span>Tools & Purpose</span>
                </h5>
                <div class="space-y-1.5 text-xs">
                  ${breakdown.toolsApplied.map(t => `
                    <div class="flex items-start justify-between gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700">
                      <span class="font-extrabold text-zinc-900 dark:text-white">${t.name}</span>
                      <span class="text-zinc-500 dark:text-zinc-400 text-[11px] text-right">${t.purpose}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-2 border-t border-zinc-100 dark:border-zinc-700">
                <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Tangible Output Produced:</span>
                <span class="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mt-0.5">${breakdown.outputArtifact}</span>
              </div>
            </div>

          </div>

          <!-- Rule of Thumb Callout with Yellow Highlight Badge -->
          <div class="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3">
            <div class="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5">
              !
            </div>
            <div>
              <strong class="font-black text-amber-900 dark:text-amber-300 block uppercase tracking-wider text-[10px] mb-0.5">Rule of Thumb / Practical Heuristic</strong>
              <p class="leading-relaxed font-medium">${breakdown.decisionRule}</p>
            </div>
          </div>

          <!-- SPECIAL: 6-PART CONTENT ANATOMY (Only shown for Step 4 of Content Creation) -->
          ${breakdown.anatomyBlocks ? `
            <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Content Architecture
                  </span>
                  <h5 class="text-sm font-black text-zinc-900 dark:text-white">The 6-Part Content Anatomy Breakdown</h5>
                </div>
                <span class="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Applies across all content formats</span>
              </div>

              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${breakdown.anatomyBlocks.map(block => `
                  <div class="p-3.5 rounded-2xl bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 font-mono text-[10px] font-black flex items-center justify-center">
                        ${block.part}
                      </span>
                      <span class="text-[9px] font-extrabold uppercase text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                        ${block.role}
                      </span>
                    </div>
                    <h6 class="text-xs font-black text-zinc-900 dark:text-white leading-tight mb-1">${block.name}</h6>
                    <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">${block.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  };

  // Initial render
  renderFrameworkTabs();
  renderFrameworkView();

  // Tab Switcher Listener
  tabsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.framework-card-btn');
    if (!card) return;

    const newIndex = parseInt(card.getAttribute('data-fw-index'), 10);
    if (newIndex === activeFwIndex) return;

    activeFwIndex = newIndex;
    activeStepIndex = 0;
    renderFrameworkTabs();
    renderFrameworkView();
  });

  // Step Switcher Listener (Click & Hover)
  flowchartContainer.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('[data-step-target]');
    if (!targetBtn) return;

    const newStepIndex = parseInt(targetBtn.getAttribute('data-step-target'), 10);
    if (newStepIndex === activeStepIndex) return;

    activeStepIndex = newStepIndex;
    renderFrameworkView();
  });

  flowchartContainer.addEventListener('mouseenter', (e) => {
    const targetNode = e.target.closest('.flow-step-node');
    if (!targetNode) return;

    const newStepIndex = parseInt(targetNode.getAttribute('data-step-target'), 10);
    if (newStepIndex === activeStepIndex) return;

    activeStepIndex = newStepIndex;
    renderFrameworkView();
  }, true);
}

/** Filterable Clients & Brands Engine with Show More Expander */
function initClients(clients, brands) {
  const container = document.getElementById('clients-grid');
  const typeContainer = document.getElementById('client-type-tabs');
  const categoryContainer = document.getElementById('category-filter-container');
  const expandContainer = document.getElementById('clients-expand-controls');
  if (!container) return;

  let activeType = 'all';
  let activeCategory = 'all';
  let isExpanded = false;
  const INITIAL_VISIBLE_COUNT = 3; // Show top 3 clients initially

  // Render Sub-Category Filter Chips
  const updateCategoryChips = () => {
    if (!categoryContainer) return;

    let categories = [];
    if (activeType === 'brand') {
      categories = ['all', ...new Set(brands.map(b => b.category))];
    } else if (activeType === 'client') {
      categories = ['all', 'Strategy & Operations'];
    } else {
      categories = ['all', ...new Set(brands.map(b => b.category))];
    }

    categoryContainer.innerHTML = categories.map(cat => {
      const label = cat === 'all' 
        ? (activeType === 'brand' ? 'All Brands' : activeType === 'client' ? 'All Clients' : 'All Categories')
        : cat;
      const isActive = activeCategory === cat;
      return `
        <button class="category-chip px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
          isActive 
            ? 'bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 border-zinc-900 dark:border-amber-400' 
            : 'bg-zinc-50 dark:bg-[#141417] text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }" data-category="${cat}">
          ${label}
        </button>
      `;
    }).join('');
  };

  // Render Grid Cards with Expand / Collapse
  const renderCards = () => {
    let items = [];

    if (activeType === 'client') {
      items = clients;
    } else if (activeType === 'brand') {
      items = brands;
    } else {
      items = [...clients, ...brands];
    }

    if (activeCategory !== 'all') {
      items = items.filter(item => {
        if (item.type === 'client') {
          return activeCategory === 'all' || activeCategory === 'Strategy & Operations';
        }
        return item.category === activeCategory;
      });
    }

    const totalCount = items.length;
    const displayedItems = isExpanded ? items : items.slice(0, INITIAL_VISIBLE_COUNT);

    container.innerHTML = displayedItems.map(item => {
      if (item.type === 'client') {
        // Individual Founder / Client Card
        const firstName = item.name.split(' ')[0];
        return `
          <article class="p-6 sm:p-8 rounded-3xl border-2 border-zinc-900/10 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover flex flex-col justify-between group shadow-sm md:col-span-2">
            <div>
              <!-- Header Row -->
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                <a href="${item.linkedin}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 group/client">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 shadow-sm flex-shrink-0 flex items-center justify-center group-hover/client:scale-105 transition-transform">
                    <span class="text-xl font-black text-amber-400 tracking-wider">${item.monogram || 'CL'}</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="text-xl font-black text-zinc-900 dark:text-white leading-tight group-hover/client:text-blue-600 dark:group-hover/client:text-amber-400 transition-colors">${item.name}</h3>
                      <span class="p-1 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-zinc-800" title="LinkedIn Profile">
                        <i data-lucide="linkedin" class="w-4 h-4"></i>
                      </span>
                    </div>
                    <p class="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">${item.role}</p>
                    <span class="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">${item.period}</span>
                  </div>
                </a>

                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-black">
                    ${item.engagementType || 'Founder Client'}
                  </span>
                  <a href="${item.linkedin}" target="_blank" rel="noopener noreferrer" 
                     class="px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow-xs">
                    <i data-lucide="linkedin" class="w-3.5 h-3.5"></i>
                    <span>${firstName}'s LinkedIn</span>
                  </a>
                </div>
              </div>

              <!-- High-Leverage Verified Metrics Banner with Yellow Highlights -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200/80 dark:border-zinc-800">
                <div>
                  <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Impressions</span>
                  <span class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
                    <span class="yellow-highlight">${item.stats.impressions}</span>
                  </span>
                  <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${item.stats.impressionsGrowth}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Engagements</span>
                  <span class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
                    <span class="yellow-highlight">${item.stats.engagements}</span>
                  </span>
                  <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${item.stats.engagementsGrowth}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Followers</span>
                  <span class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
                    <span class="yellow-highlight">${item.stats.followers}</span>
                  </span>
                  <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${item.stats.followerGrowth}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Content Output</span>
                  <span class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
                    <span class="yellow-highlight">${item.stats.postsCount}</span>
                  </span>
                  <span class="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 block mt-0.5">High-Signal Posts</span>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                ${item.summary}
              </p>

              <!-- Top Performing Posts Quick Preview Grid -->
              ${item.topPosts && item.topPosts.length > 0 ? `
              <div class="grid sm:grid-cols-2 gap-3 mb-6">
                ${item.topPosts.slice(0, 2).map(p => `
                  <div class="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-[#18181b] border border-blue-100 dark:border-zinc-800">
                    <div class="flex items-center justify-between gap-1 mb-1">
                      <span class="text-[10px] font-black uppercase text-blue-700 dark:text-amber-400">${p.title}</span>
                      <a href="${p.postUrl}" target="_blank" rel="noopener noreferrer" class="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5">
                        <span>Post</span>
                        <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
                      </a>
                    </div>
                    <p class="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 italic line-clamp-2 mb-2">
                      "${p.hook}"
                    </p>
                    <div class="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                      <span class="yellow-highlight text-[10px]">${p.impressions}</span> • ${p.reactions}
                    </div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>

            <!-- Action CTA -->
            <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                ${item.topPosts && item.topPosts.length > 0 ? `Performance teardown & ${item.topPosts.length} post breakdowns` : 'Direct founder ghostwriting & strategy'}
              </span>
              <div class="flex items-center gap-2 self-stretch sm:self-auto">
                <a href="${item.linkedin}" target="_blank" rel="noopener noreferrer" 
                   class="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5">
                  <i data-lucide="linkedin" class="w-3.5 h-3.5 text-blue-500"></i>
                  <span>${firstName}'s LinkedIn</span>
                </a>
                ${item.topPosts && item.topPosts.length > 0 ? `
                <button class="open-case-study-btn px-5 py-2.5 bg-zinc-900 dark:bg-amber-400 hover:bg-zinc-800 dark:hover:bg-amber-300 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 justify-center"
                        data-client-id="${item.id}">
                  <span>View Breakdown</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                </button>
                ` : ''}
              </div>
            </div>
          </article>
        `;
      } else {
        // Company / Brand Card (Notion, Levo, Vedantu, etc.) WITH INTERNSHIP BADGE
        return `
          <article class="p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover flex flex-col justify-between group">
            <div>
              <!-- Header Row -->
              <div class="flex items-start justify-between gap-3 mb-4">
                <div class="flex items-center gap-3.5">
                  <div class="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs p-2 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src="${item.logo}" alt="${item.name}" class="w-full h-full object-contain" 
                         onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'text-xs font-black text-zinc-800 dark:text-white\\'>${item.name.slice(0, 2).toUpperCase()}</span>';" />
                  </div>
                  <div>
                    <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight">${item.name}</h3>
                    <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${item.role}</span>
                  </div>
                </div>
                
                <div class="flex flex-col items-end gap-1">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase text-[9px] border border-emerald-200 dark:border-emerald-800">
                    ${item.engagementType || 'Internship Experience'}
                  </span>
                  <span class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase">${item.category}</span>
                </div>
              </div>

              <!-- Metric Banner with Yellow Highlights -->
              <div class="mb-4 p-3 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
                </div>
                <div>
                  <span class="text-xs font-black text-zinc-900 dark:text-white block leading-tight">
                    <span class="yellow-highlight text-[11px]">${item.headlineMetric}</span>
                  </span>
                  <span class="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 block leading-tight mt-0.5">${item.secondaryMetric}</span>
                </div>
              </div>

              <div class="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                <span>${item.period}</span>
              </div>

              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                ${item.summary}
              </p>

              <div class="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                <strong class="font-bold text-zinc-900 dark:text-white block mb-0.5">What I did:</strong>
                ${item.whatIDid}
              </div>
            </div>

            <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span class="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Verified Experience</span>
              <button class="open-brand-modal-btn text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline flex items-center gap-1 transition-colors" data-brand-id="${item.id}">
                <span>View Details</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </article>
        `;
      }
    }).join('');

    // Render Expand / Collapse Controls
    if (expandContainer) {
      if (totalCount > INITIAL_VISIBLE_COUNT) {
        expandContainer.innerHTML = `
          <button id="toggle-clients-expand-btn" class="px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-amber-400 hover:bg-zinc-800 dark:hover:bg-amber-300 text-white dark:text-zinc-950 text-xs font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95">
            <span>${isExpanded ? 'Show Less ↑' : 'See More ↓'}</span>
            <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
          </button>
        `;
        document.getElementById('toggle-clients-expand-btn')?.addEventListener('click', () => {
          isExpanded = !isExpanded;
          renderCards();
        });
      } else {
        expandContainer.innerHTML = '';
      }
    }

    if (window.lucide) window.lucide.createIcons();
  };

  // Initial render
  updateCategoryChips();
  renderCards();

  // Type Filter Tabs Listener
  if (typeContainer) {
    typeContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.type-filter-btn');
      if (!btn) return;

      typeContainer.querySelectorAll('.type-filter-btn').forEach(b => {
        b.classList.remove('bg-zinc-900', 'dark:bg-amber-400', 'text-white', 'dark:text-zinc-950', 'shadow-xs');
        b.classList.add('text-zinc-600', 'dark:text-zinc-400');
      });
      btn.classList.add('bg-zinc-900', 'dark:bg-amber-400', 'text-white', 'dark:text-zinc-950', 'shadow-xs');
      btn.classList.remove('text-zinc-600', 'dark:text-zinc-400');

      activeType = btn.getAttribute('data-type');
      activeCategory = 'all';
      isExpanded = false;
      updateCategoryChips();
      renderCards();
    });
  }

  // Category Filter Chips Listener
  if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.category-chip');
      if (!chip) return;

      activeCategory = chip.getAttribute('data-category');
      categoryContainer.querySelectorAll('.category-chip').forEach(c => {
        c.classList.remove('bg-zinc-900', 'dark:bg-amber-400', 'text-white', 'dark:text-zinc-950');
        c.classList.add('bg-zinc-50', 'dark:bg-[#141417]', 'text-zinc-600', 'dark:text-zinc-300');
      });
      chip.classList.add('bg-zinc-900', 'dark:bg-amber-400', 'text-white', 'dark:text-zinc-950');
      chip.classList.remove('bg-zinc-50', 'dark:bg-[#141417]', 'text-zinc-600', 'dark:text-zinc-300');
      renderCards();
    });
  }
}

/** Products & Engineering Projects Engine */
function initProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !projects) return;

  container.innerHTML = projects.map(p => `
    <article class="p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover flex flex-col justify-between group">
      <div>
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-amber-300 font-bold uppercase text-[10px] mb-1.5 inline-block">
              ${p.category}
            </span>
            <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight">${p.title}</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] border border-emerald-200 dark:border-emerald-800">
            ${p.badge}
          </span>
        </div>

        <div class="mb-4 p-3 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
            <i data-lucide="layers" class="w-3.5 h-3.5"></i>
          </div>
          <span class="text-xs font-black text-zinc-900 dark:text-white">
            <span class="yellow-highlight text-[11px]">${p.headlineMetric}</span>
          </span>
        </div>

        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
          ${p.summary}
        </p>

        <div class="space-y-2 mb-4 text-xs">
          <div class="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong class="font-bold text-zinc-900 dark:text-white block mb-0.5">Problem:</strong>
            ${p.problem}
          </div>
          <div class="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong class="font-bold text-zinc-900 dark:text-white block mb-0.5">Solution:</strong>
            ${p.solution}
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5 mb-4">
          ${p.technologies.map(t => `
            <span class="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono font-medium">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span class="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Source Code & Demo</span>
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline flex items-center gap-1 transition-colors">
          <span>View Project</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </article>
  `).join('');
}

/** Content Stack & AI Toolkit Engine */
function initToolkit(toolkit) {
  const container = document.getElementById('toolkit-grid');
  if (!container || !toolkit) return;

  container.innerHTML = toolkit.map(cat => `
    <div class="p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover">
      <h3 class="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span>${cat.category}</span>
        <span class="w-2 h-2 rounded-full bg-blue-600 dark:bg-amber-400"></span>
      </h3>
      <div class="space-y-3">
        ${cat.tools.map(t => `
          <div class="p-3 rounded-2xl bg-zinc-50/80 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
            <h4 class="text-xs font-black text-zinc-900 dark:text-white">${t.name}</h4>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">${t.role}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/** Academic Research & Rigor Setup */
function initPublications(publications) {
  const container = document.getElementById('publications-container');
  if (!container) return;

  container.innerHTML = publications.map(pub => `
    <div class="p-7 sm:p-10 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <div class="w-8 h-8 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 flex items-center justify-center shadow-2xs">
          <img src="${pub.logo || 'assets/images/logos/ieee.svg'}" alt="${pub.publisher}" class="w-full h-full object-contain" />
        </div>
        <span class="px-3 py-1 rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider border border-blue-100 dark:border-zinc-700">
          ${pub.publisher}
        </span>
        <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">${pub.date}</span>
        <span class="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">DOI: ${pub.doi}</span>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug mb-3 hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
        <a href="${pub.link}" target="_blank" rel="noopener noreferrer">
          ${pub.title}
        </a>
      </h3>

      <div class="mb-4 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs leading-relaxed text-amber-950 dark:text-amber-200 font-medium">
        <strong class="font-bold text-amber-900 dark:text-amber-300 block uppercase tracking-wider mb-1">Why This Matters for Strategy & Content Roles</strong>
        ${pub.whyThisMatters}
      </div>

      <p class="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
        <strong class="text-zinc-900 dark:text-white font-bold">Authors:</strong> ${pub.authors}
      </p>
      <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 italic mb-4">
        ${pub.conference} • ${pub.location}
      </p>

      <p class="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-4xl">
        ${pub.abstract}
      </p>

      <a href="${pub.link}" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-amber-400 hover:bg-zinc-800 dark:hover:bg-amber-300 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95">
        <i data-lucide="file-text" class="w-4 h-4"></i>
        <span>Read on IEEE Xplore</span>
        <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
      </a>
    </div>
  `).join('');
}

/** Operations & Leadership Setup */
function initOperations(operations) {
  const container = document.getElementById('operations-container');
  if (!container) return;

  container.innerHTML = operations.map(op => `
    <div class="p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold uppercase text-[10px]">
            ${op.category}
          </span>
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">${op.year}</span>
        </div>

        <div class="flex items-start gap-3.5 mb-3">
          ${op.logo ? `
            <div class="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs p-1.5 flex items-center justify-center flex-shrink-0">
              <img src="${op.logo}" alt="${op.organization}" class="w-full h-full object-contain" />
            </div>
          ` : ''}
          <div>
            <h4 class="text-lg font-black text-zinc-900 dark:text-white leading-tight">${op.title}</h4>
            <p class="text-xs font-bold text-blue-600 dark:text-amber-400 mt-0.5">${op.organization}</p>
          </div>
        </div>

        <div class="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 rounded-lg text-xs font-black mb-3">
          ${op.impact}
        </div>

        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
          ${op.description}
        </p>
      </div>

      <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
        <strong class="text-zinc-900 dark:text-white font-bold">Execution Takeaway:</strong> ${op.takeaway}
      </div>
    </div>
  `).join('');
}

/** Education Setup */
function initEducation(education) {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = education.map(edu => `
    <div class="p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141417] card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 shadow-sm p-2 flex items-center justify-center flex-shrink-0">
          <img src="${edu.logo || 'assets/images/logos/vit.svg'}" alt="${edu.institution}" class="w-full h-full object-contain" />
        </div>
        <div>
          <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">${edu.period}</span>
          <h4 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white mt-0.5">${edu.degree}</h4>
          <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-0.5">${edu.institution} • ${edu.location}</p>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-2xl leading-relaxed">${edu.description}</p>
        </div>
      </div>

      <div class="flex-shrink-0 flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
        <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cumulative GPA</span>
        <span class="text-2xl font-black text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800 px-4 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <span class="yellow-highlight">${edu.cgpa}</span>
        </span>
      </div>
    </div>
  `).join('');
}

/** Modals, Toast, Smooth Scroll, and Navigation Handlers */
function initInteractions(data) {
  const profile = data.profile;
  const clients = data.clients;
  const brands = data.brands;
  const frameworks = data.frameworks;

  // 1. Framework SOP Modal
  const fwModal = document.getElementById('framework-modal');
  const closeFwModalBtn = document.getElementById('close-framework-modal');
  const fwModalBackdrop = document.getElementById('framework-modal-backdrop');
  const fwModalBody = document.getElementById('framework-modal-body');

  const openFrameworkModal = (fwId) => {
    const fw = frameworks.find(f => f.id === fwId) || frameworks[0];
    if (!fwModal || !fwModalBody) return;

    fwModalBody.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-amber-300 font-black uppercase text-[10px] mb-1 inline-block">
            ${fw.badge}
          </span>
          <h2 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight">${fw.title}</h2>
          <p class="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-0.5">${fw.tagline}</p>
        </div>
      </div>

      <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
        ${fw.summary}
      </p>

      <div class="space-y-4">
        ${fw.steps.map((step, idx) => `
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 text-xs font-black flex items-center justify-center">
                  ${idx + 1}
                </span>
                <h4 class="text-sm font-black text-zinc-900 dark:text-white">${step.title}</h4>
              </div>
              <span class="px-2.5 py-0.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] font-black rounded shadow-2xs">
                ${step.tool}
              </span>
            </div>
            <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${step.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    fwModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeFrameworkModal = () => {
    if (!fwModal) return;
    fwModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-framework-modal-btn');
    if (btn) {
      const fwId = btn.getAttribute('data-fw-id');
      openFrameworkModal(fwId);
    }
  });

  if (closeFwModalBtn) closeFwModalBtn.addEventListener('click', closeFrameworkModal);
  if (fwModalBackdrop) fwModalBackdrop.addEventListener('click', closeFrameworkModal);

  // 2. Case Study Deep-Dive Modal (Bharat Singhal with Verified Direct Post Links)
  const caseStudyModal = document.getElementById('case-study-modal');
  const closeCaseStudyBtn = document.getElementById('close-case-study-modal');
  const caseStudyBackdrop = document.getElementById('case-study-backdrop');
  const caseStudyContent = document.getElementById('case-study-modal-body');

    const openCaseStudy = (clientId) => {
    const client = clients.find(c => c.id === clientId) || clients[0];
    if (!caseStudyModal || !caseStudyContent) return;
    const firstName = client.name.split(' ')[0];

    caseStudyContent.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 shadow-sm flex-shrink-0 flex items-center justify-center">
            <span class="text-xl font-black text-amber-400 tracking-wider">${client.monogram || 'CL'}</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                ${client.engagementType || 'Founder Client'}
              </span>
              <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${client.period}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight mt-1">${client.name}</h2>
            <p class="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400">${client.role}</p>
          </div>
        </div>

        <a href="${client.linkedin}" target="_blank" rel="noopener noreferrer" 
           class="px-4 py-2 bg-zinc-900 dark:bg-amber-400 text-white dark:text-zinc-950 text-xs font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-amber-300 transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-xs">
          <i data-lucide="linkedin" class="w-3.5 h-3.5"></i>
          <span>${firstName}'s Profile</span>
        </a>
      </div>

      <!-- High-Impact 4-Metric Grid with Yellow Highlights -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">
        <div>
          <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Impressions</span>
          <span class="text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
            <span class="yellow-highlight">${client.stats.impressions}</span>
          </span>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${client.stats.impressionsGrowth}</span>
        </div>
        <div>
          <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Engagements</span>
          <span class="text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
            <span class="yellow-highlight">${client.stats.engagements}</span>
          </span>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${client.stats.engagementsGrowth}</span>
        </div>
        <div>
          <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Followers</span>
          <span class="text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">
            <span class="yellow-highlight">${client.stats.followers}</span>
          </span>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">${client.stats.followerGrowth}</span>
        </div>
        <div>
          <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Volume</span>
          <span class="text-2xl font-black text-zinc-900 dark:text-white block mt-0.5">${client.stats.postsCount}</span>
          <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block mt-0.5">Published Sprint</span>
        </div>
      </div>

      <!-- Verified Live Posts -->
      ${client.topPosts && client.topPosts.length > 0 ? `
      <div class="space-y-4 mb-6">
        <h4 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
          <span>Top-Performing Content Breakdowns</span>
          <span class="text-[10px] text-zinc-500 font-normal">Direct Post Links</span>
        </h4>
        
        <div class="grid sm:grid-cols-2 gap-3.5">
          ${client.topPosts.map(p => `
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-2 mb-2">
                  <h5 class="text-xs font-black text-zinc-900 dark:text-white leading-snug">${p.title}</h5>
                  <a href="${p.postUrl}" target="_blank" rel="noopener noreferrer" class="px-2 py-1 bg-white dark:bg-zinc-800 text-blue-600 dark:text-amber-400 text-[10px] font-black rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1 flex-shrink-0">
                    <span>View Post</span>
                    <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
                  </a>
                </div>
                <p class="text-xs text-zinc-700 dark:text-zinc-300 italic mb-3 bg-white dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  "${p.hook}"
                </p>
                <div class="p-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900 text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">
                  <strong class="text-zinc-900 dark:text-zinc-200 font-bold block mb-0.5">Why it worked:</strong>
                  ${p.whyItWorked}
                </div>
              </div>
              <div class="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <span class="yellow-highlight text-[11px]">${p.impressions}</span>
                <span>${p.reactions}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Learnings -->
      ${client.learningsAndTakeaways && client.learningsAndTakeaways.length > 0 ? `
      <div>
        <h4 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Key Strategic Takeaways</h4>
        <ul class="grid sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
          ${client.learningsAndTakeaways.map(l => `
            <li class="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-100 dark:border-zinc-800">
              <span class="text-amber-500 font-bold">✓</span>
              <span>${l}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      ` : ''}
    `;

    if (window.lucide) window.lucide.createIcons();
    caseStudyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    if (!caseStudyModal) return;
    caseStudyModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-case-study-btn');
    if (btn) {
      const clientId = btn.getAttribute('data-client-id');
      openCaseStudy(clientId);
    }
  });

  if (closeCaseStudyBtn) closeCaseStudyBtn.addEventListener('click', closeCaseStudy);
  if (caseStudyBackdrop) caseStudyBackdrop.addEventListener('click', closeCaseStudy);

  // 3. Brand Detail Modal
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-brand-modal-btn');
    if (!btn) return;

    const brandId = btn.getAttribute('data-brand-id');
    const brand = brands.find(b => b.id === brandId);
    if (!brand || !caseStudyModal || !caseStudyContent) return;

    caseStudyContent.innerHTML = `
      <div class="flex items-center gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div class="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs p-2.5 flex items-center justify-center flex-shrink-0">
          <img src="${brand.logo}" alt="${brand.name}" class="w-full h-full object-contain" />
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              ${brand.engagementType || 'Internship Experience'}
            </span>
            <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${brand.category}</span>
          </div>
          <h2 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight">${brand.name}</h2>
          <p class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${brand.role} • ${brand.period}</p>
        </div>
      </div>

      <div class="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <i data-lucide="award" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-base font-black text-zinc-900 dark:text-white block leading-tight">
            <span class="yellow-highlight text-sm">${brand.headlineMetric}</span>
          </span>
          <span class="text-xs text-zinc-600 dark:text-zinc-400 font-semibold block leading-tight mt-0.5">${brand.secondaryMetric}</span>
        </div>
      </div>

      <div class="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <div>
          <h4 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-2">Overview</h4>
          <p class="text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">${brand.summary}</p>
        </div>

        <div>
          <h4 class="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-2">What I Executed (Internship Scope)</h4>
          <p class="text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">${brand.whatIDid}</p>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    caseStudyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // 4. Contact Modal
  const modal = document.getElementById('contact-modal');
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.getElementById('close-contact-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close modals on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCaseStudy();
      closeFrameworkModal();
    }
  });

  // 5. Toast Notifications
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.remove('hidden-toast');
    toast.classList.add('visible-toast');
    setTimeout(() => {
      toast.classList.remove('visible-toast');
      toast.classList.add('hidden-toast');
    }, 3000);
  };

  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(profile.email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('Email: ' + profile.email);
      });
    });
  });

  document.querySelectorAll('.copy-phone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(profile.phone).then(() => {
        showToast('Phone number copied to clipboard!');
      }).catch(() => {
        showToast('Phone: ' + profile.phone);
      });
    });
  });

  // 6. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 7. Active Nav Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active', 'text-zinc-900', 'dark:text-white', 'border-b-2');
          link.classList.add('text-zinc-600', 'dark:text-zinc-400');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active', 'text-zinc-900', 'dark:text-white', 'border-b-2');
            link.classList.remove('text-zinc-600', 'dark:text-zinc-400');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);
}
