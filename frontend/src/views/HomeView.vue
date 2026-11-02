<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="hasHomeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Compact Home Page -->
  <div
    v-else-if="compactHomeEnabled"
    data-testid="compact-home"
    class="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <header class="border-b border-gray-200 px-4 py-4 sm:px-6 dark:border-dark-800">
      <nav class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <img
            :src="siteLogo || '/logo.svg'"
            alt="Logo"
            class="h-9 w-9 shrink-0 rounded-lg object-contain"
          />
          <span class="min-w-0 truncate text-base font-semibold">{{ siteName }}</span>
        </div>
        <div class="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-2">
          <LocaleSwitcher />
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-dark-400 dark:hover:bg-dark-800"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>
          <router-link
            v-if="showModelPlazaEntry"
            to="/model-plaza"
            class="flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-white"
            :title="t('nav.modelPlaza')"
          >
            <Icon name="grid" size="md" />
            <span class="hidden sm:inline">{{ t('nav.modelPlaza') }}</span>
          </router-link>
          <button
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-dark-400 dark:hover:bg-dark-800"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            @click="toggleTheme"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex min-w-0 flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div class="min-w-0 max-w-2xl text-center">
        <img
          :src="siteLogo || '/logo.svg'"
          alt="Logo"
          class="mx-auto mb-6 h-20 w-20 rounded-2xl object-contain"
        />
        <h1 class="[overflow-wrap:anywhere] text-3xl font-bold md:text-4xl">{{ siteName }}</h1>
        <p class="mt-4 whitespace-pre-wrap [overflow-wrap:anywhere] text-base text-gray-600 dark:text-dark-300">{{ siteSubtitle }}</p>
        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="mt-8 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.login') }}
        </router-link>
      </div>
    </main>

    <footer class="min-w-0 border-t border-gray-200 px-4 py-5 text-center text-sm text-gray-500 [overflow-wrap:anywhere] sm:px-6 dark:border-dark-800 dark:text-dark-400">
      &copy; {{ currentYear }} {{ siteName }}
    </footer>
  </div>

  <!-- Default Home Page -->
  <div
    v-else
    class="landing-page relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <!-- Background Decorations -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="landing-grid absolute inset-0"
      ></div>
    </div>

    <!-- Header -->
    <header :class="['landing-header fixed inset-x-0 top-0 z-20 px-3 py-1', { 'is-scrolled': isHeaderScrolled }]">
      <nav class="landing-nav flex w-full items-center justify-between gap-4 py-1">
        <!-- Logo -->
        <div class="flex min-w-0 items-center gap-2.5">
          <img :src="siteLogo || '/logo.svg'" alt="Logo" class="h-8 w-8 shrink-0 object-contain" />
          <span class="truncate text-sm font-bold text-gray-900 dark:text-white">{{ siteName }}</span>
        </div>

        <div class="landing-nav-right">
          <div class="landing-nav-links" :class="{ 'is-open': isMenuOpen }">
            <a href="#top" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navHome') }}</a>
            <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navConsole') }}</router-link>
            <router-link to="/available-channels" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navChannels') }}</router-link>
            <router-link to="/model-plaza" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navModels') }}</router-link>
            <a :href="docUrl || '#quickstart'" :target="docUrl ? '_blank' : undefined" :rel="docUrl ? 'noopener noreferrer' : undefined" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navGuide') }}</a>
            <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="landing-nav-link" @click="isMenuOpen = false">{{ t('home.landing.navAbout') }}</a>
          </div>

          <!-- Nav Actions -->
          <div class="landing-nav-actions">
            <!-- Language Switcher -->
            <LocaleSwitcher mode="toggle" />

            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="landing-icon-button"
              :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            >
              <Icon v-if="isDark" name="sun" size="md" />
              <Icon v-else name="moon" size="md" />
            </button>

            <!-- Login / Dashboard Button -->
            <router-link
              v-if="isAuthenticated"
              :to="dashboardPath"
              class="landing-button landing-button-dark"
            >
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-[10px] font-semibold text-white"
              >
                {{ userInitial }}
              </span>
              <span class="text-xs font-medium text-white">{{ t('home.dashboard') }}</span>
              <svg
                class="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </router-link>
            <router-link
              v-else
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="landing-button landing-button-dark"
            >
              {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
            </router-link>
            <button
              type="button"
              class="landing-menu-button"
              :aria-expanded="isMenuOpen"
              :aria-label="isMenuOpen ? t('home.landing.closeMenu') : t('home.landing.openMenu')"
              @click="isMenuOpen = !isMenuOpen"
            >
              <span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main id="top" class="relative z-10 flex-1">
      <section class="orbit-hero" aria-labelledby="hero-title">
        <div class="orbit-sky" aria-hidden="true">
          <div class="orbit-aurora"></div>
          <div class="orbit-stars"></div>
          <span class="orbit-shoot orbit-shoot-one"></span>
          <span class="orbit-shoot orbit-shoot-two"></span>
          <span class="orbit-shoot orbit-shoot-three"></span>
          <div class="orbit-horizon"></div>
          <svg class="orbit-system" viewBox="0 0 1600 920" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(800 460)">
              <g class="orbit-float orbit-float-outer">
                <g transform="rotate(6)">
                  <path class="orbit-track orbit-track-outer" d="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                  <g>
                    <animateMotion dur="21s" repeatCount="indefinite" begin="-8s" path="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                    <circle r="12" class="orbit-dot-halo" /><circle r="3.5" class="orbit-dot orbit-dot-violet" />
                  </g>
                  <g class="orbit-label">
                    <animateMotion dur="44s" repeatCount="indefinite" begin="-2s" path="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                    <g class="orbit-depth" style="--orbit-time: 44s; --orbit-delay: -2s"><rect x="-45" y="-16" width="90" height="32" rx="16" /><foreignObject x="-37" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="gpt" size="16px" /></div></foreignObject><text x="6" y="4">OpenAI</text></g>
                  </g>
                  <g class="orbit-label">
                    <animateMotion dur="44s" repeatCount="indefinite" begin="-13s" path="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                    <g class="orbit-depth" style="--orbit-time: 44s; --orbit-delay: -13s"><rect x="-45" y="-16" width="90" height="32" rx="16" /><foreignObject x="-37" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="claude" size="16px" /></div></foreignObject><text x="7" y="4">Claude</text></g>
                  </g>
                  <g class="orbit-label">
                    <animateMotion dur="44s" repeatCount="indefinite" begin="-24s" path="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                    <g class="orbit-depth" style="--orbit-time: 44s; --orbit-delay: -24s"><rect x="-45" y="-16" width="90" height="32" rx="16" /><foreignObject x="-37" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="gemini" size="16px" /></div></foreignObject><text x="7" y="4">Gemini</text></g>
                  </g>
                  <g class="orbit-label">
                    <animateMotion dur="44s" repeatCount="indefinite" begin="-35s" path="M -700 0 A 700 250 0 1 1 700 0 A 700 250 0 1 1 -700 0" />
                    <g class="orbit-depth" style="--orbit-time: 44s; --orbit-delay: -35s"><rect x="-39" y="-16" width="78" height="32" rx="16" /><foreignObject x="-32" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="grok" size="16px" /></div></foreignObject><text x="7" y="4">Grok</text></g>
                  </g>
                </g>
              </g>
              <g class="orbit-float orbit-float-inner">
                <g transform="rotate(-8)">
                  <path class="orbit-track orbit-track-inner" d="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" />
                  <g><animateMotion dur="13s" repeatCount="indefinite" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><circle r="11" class="orbit-dot-halo" /><circle r="3.5" class="orbit-dot orbit-dot-violet" /></g>
                  <g><animateMotion dur="13s" repeatCount="indefinite" begin="-6.5s" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><circle r="11" class="orbit-dot-halo orbit-dot-halo-pink" /><circle r="3.5" class="orbit-dot orbit-dot-pink" /></g>
                  <g class="orbit-label"><animateMotion dur="30s" repeatCount="indefinite" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><g class="orbit-depth" style="--orbit-time: 30s"><rect x="-50" y="-16" width="100" height="32" rx="16" /><foreignObject x="-41" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="deepseek" size="16px" /></div></foreignObject><text x="8" y="4">DeepSeek</text></g></g>
                  <g class="orbit-label"><animateMotion dur="30s" repeatCount="indefinite" begin="-7.5s" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><g class="orbit-depth" style="--orbit-time: 30s; --orbit-delay: -7.5s"><rect x="-45" y="-16" width="90" height="32" rx="16" /><foreignObject x="-36" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="kimi" size="16px" /></div></foreignObject><text x="9" y="4">Kimi</text></g></g>
                  <g class="orbit-label"><animateMotion dur="30s" repeatCount="indefinite" begin="-15s" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><g class="orbit-depth" style="--orbit-time: 30s; --orbit-delay: -15s"><rect x="-53" y="-16" width="106" height="32" rx="16" /><foreignObject x="-43" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="doubao" size="16px" /></div></foreignObject><text x="8" y="4">Doubao</text></g></g>
                  <g class="orbit-label"><animateMotion dur="30s" repeatCount="indefinite" begin="-22.5s" path="M -500 0 A 500 175 0 1 1 500 0 A 500 175 0 1 1 -500 0" /><g class="orbit-depth" style="--orbit-time: 30s; --orbit-delay: -22.5s"><rect x="-56" y="-16" width="112" height="32" rx="16" /><foreignObject x="-46" y="-8" width="16" height="16"><div xmlns="http://www.w3.org/1999/xhtml" class="orbit-brand-icon"><ModelIcon model="qwen" size="16px" /></div></foreignObject><text x="8" y="4">通义千问</text></g></g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div class="orbit-hero-copy">
          <p class="orbit-eyebrow"><span></span>{{ t('home.landing.heroEyebrow') }}<span></span></p>
          <h1 id="hero-title">{{ t('home.landing.heroTitle') }}</h1>
          <p class="orbit-lead">{{ t('home.landing.heroLead') }}</p>
          <div class="orbit-actions">
            <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="orbit-primary-button">
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
              <Icon name="arrowRight" size="md" />
            </router-link>
            <a :href="docUrl || '#quickstart'" :target="docUrl ? '_blank' : undefined" :rel="docUrl ? 'noopener noreferrer' : undefined" class="orbit-secondary-button">
              {{ t('home.landing.quickstartCta') }}
            </a>
          </div>
        </div>

        <div class="hero-model-horizon" aria-hidden="true">
          <svg class="hero-model-orbit" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice">
            <g v-if="!prefersReducedMotion">
              <g v-for="(brand, index) in heroTrackBrands" :key="brand.key">
                <animateMotion
                  dur="46s"
                  repeatCount="indefinite"
                  :begin="`${-index * (46 / heroTrackBrands.length)}s`"
                  rotate="auto"
                  path="M 1680 292 A 1500 560 0 0 0 -240 292"
                />
                <g transform="rotate(180)">
                  <foreignObject x="-44" y="-15" width="88" height="30">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="hero-model-badge">
                      <ModelIcon :model="brand.icon" size="18px" />
                      <span>{{ brand.name }}</span>
                    </div>
                  </foreignObject>
                </g>
              </g>
            </g>
            <g v-else>
              <g
                v-for="brand in heroBrands"
                :key="brand.name"
                :transform="`translate(${brand.x} ${brand.y}) rotate(${brand.angle})`"
              >
                <g transform="rotate(180)">
                  <foreignObject x="-44" y="-15" width="88" height="30">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="hero-model-badge">
                      <ModelIcon :model="brand.icon" size="18px" />
                      <span>{{ brand.name }}</span>
                    </div>
                  </foreignObject>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </section>

      <div class="landing-content mx-auto w-full">
        <!-- Features Grid -->
        <section id="architecture" class="scroll-mt-24 landing-reveal">
          <div class="landing-section-inner">
            <div class="mb-8 max-w-2xl">
              <p class="landing-eyebrow">{{ t('home.landing.architectureEyebrow') }}</p>
              <p class="landing-section-subtitle">{{ t('home.landing.architectureSubtitle') }}</p>
              <h2 class="mb-3 mt-4 text-3xl font-bold leading-tight text-gray-950 dark:text-white sm:text-4xl">
                {{ t('home.landing.architectureTitle') }}
              </h2>
            </div>
            <div class="landing-architecture-grid landing-stagger">
              <article v-for="(capability, index) in architectureCards" :key="capability.title" class="landing-architecture-card landing-reveal">
                <div class="landing-card-head">
                  <span class="landing-card-number">0{{ index + 1 }}</span>
                  <span class="landing-card-tag">{{ capability.tag }}</span>
                </div>
                <svg v-if="index === 0" class="landing-card-diagram" viewBox="0 0 280 54" aria-hidden="true">
                  <path d="M8 11C64 11 82 27 132 27M8 27h124M8 43c56 0 74-16 124-16m36 0h104" fill="none" stroke="#b7a6e6" />
                  <circle cx="8" cy="11" r="2" fill="#9a86d8" /><circle cx="8" cy="27" r="2" fill="#9a86d8" /><circle cx="8" cy="43" r="2" fill="#9a86d8" />
                  <g v-if="!prefersReducedMotion" class="diagram-traveler"><animateMotion dur="1.8s" repeatCount="indefinite" path="M8 27H122" /><circle r="5" fill="#8c7cff" opacity="0.24" /><circle r="2.8" fill="#5138ef" /></g>
                  <g v-if="!prefersReducedMotion" class="diagram-traveler"><animateMotion dur="1.8s" begin="-0.9s" repeatCount="indefinite" path="M170 27H272" /><circle r="5" fill="#8c7cff" opacity="0.24" /><circle r="2.8" fill="#5138ef" /></g>
                  <rect x="122" y="16" width="48" height="22" rx="11" fill="#fffcff" stroke="#d8d0f0" /><text x="146" y="30" text-anchor="middle">API</text><circle cx="272" cy="27" r="2.4" fill="white" stroke="#8a78dc" />
                </svg>
                <svg v-else-if="index === 1" class="landing-card-diagram" viewBox="0 0 280 54" aria-hidden="true">
                  <path d="M14 34A130 42 0 0 1 266 34M14 34A130 22 0 0 0 266 34M14 34Q140 27 266 34" fill="none" stroke="#c4b6ee" />
                  <circle cx="14" cy="34" r="2.5" fill="white" stroke="#9a86d8" /><circle cx="140" cy="30" r="2.5" fill="white" stroke="#9a86d8" /><circle cx="266" cy="34" r="2.5" fill="white" stroke="#9a86d8" />
                  <g v-if="!prefersReducedMotion" class="diagram-traveler"><animateMotion dur="3.2s" repeatCount="indefinite" path="M14 34A130 42 0 0 1 266 34" /><circle r="5" fill="#8c7cff" opacity="0.24" /><circle r="2.8" fill="#5138ef" /></g>
                  <g v-if="!prefersReducedMotion" class="diagram-traveler"><animateMotion dur="2.8s" begin="-1.4s" repeatCount="indefinite" path="M14 34Q140 27 266 34" /><circle r="5" fill="#8c7cff" opacity="0.24" /><circle r="2.8" fill="#5138ef" /></g>
                </svg>
                <svg v-else class="landing-card-diagram" viewBox="0 0 280 54" aria-hidden="true">
                  <path d="M8 44h264M8 18h264" fill="none" stroke="#e4def4" />
                  <path class="diagram-draw" d="M8 37c34-1 50-15 84-12s52-13 86-9 54-6 94-3" fill="none" stroke="#8a63e8" stroke-width="1.3" />
                  <circle cx="92" cy="25" r="2.2" fill="white" stroke="#b7a6e6" /><circle cx="178" cy="16" r="2.2" fill="white" stroke="#b7a6e6" /><circle cx="272" cy="13" r="2.5" fill="white" stroke="#8a63e8" />
                  <g v-if="!prefersReducedMotion" class="diagram-traveler"><animateMotion dur="3s" repeatCount="indefinite" path="M8 37c34-1 50-15 84-12s52-13 86-9 54-6 94-3" /><circle r="5" fill="#8c7cff" opacity="0.24" /><circle r="2.8" fill="#5138ef" /></g>
                </svg>
                <h3>{{ t(capability.title) }}</h3>
                <p>{{ t(capability.description) }}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="quickstart" class="landing-quickstart scroll-mt-24 landing-reveal">
          <div class="landing-section-inner">
            <div class="max-w-3xl">
              <p class="landing-eyebrow">{{ t('home.landing.quickstartEyebrow') }}</p>
              <p class="landing-section-subtitle">{{ t('home.landing.quickstartSubtitle') }}</p>
              <h2 class="mt-3 text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.landing.quickstartTitle') }}</h2>
              <p class="mt-4 leading-7 text-gray-600 dark:text-dark-300">{{ t('home.landing.quickstartDescription') }}</p>
            </div>

            <div class="landing-capabilities landing-stagger">
              <article v-for="(capability, index) in landingCapabilities" :key="capability.title" class="landing-capability landing-reveal">
                <span class="landing-capability-index">0{{ index + 1 }}</span>
                <h3>{{ t(capability.title) }}</h3>
                <div>
                  <p>{{ t(capability.description) }}</p>
                  <p v-if="index === 0" class="landing-capability-tags">POST /v1/responses · POST /v1/messages · POST /v1/chat/completions</p>
                  <p v-else-if="index === 1" class="landing-capability-tags">OpenAI · Anthropic · Gemini · Grok · DeepSeek · Qwen</p>
                  <p v-else class="landing-capability-tags">{{ t('home.landing.capabilityBillingTags') }}</p>
                </div>
              </article>
            </div>

            <div class="landing-workstation landing-reveal">
              <aside class="landing-workstation-sidebar">
                <span v-for="(item, index) in workstationItems" :key="item" :class="['landing-workstation-nav', { active: index === 0 }]">
                  <Icon :name="workstationIcons[index]" size="sm" />{{ t(item) }}
                </span>
              </aside>
              <div class="landing-workstation-main">
                <div class="landing-workstation-top">
                  <h3>{{ t('home.landing.workbenchTitle') }}</h3>
                  <div class="landing-tabs" role="tablist" :aria-label="t('home.landing.protocolTabs')">
                    <button v-for="protocol in landingProtocols" :key="protocol.id" type="button" role="tab" :aria-selected="activeProtocol === protocol.id" :class="{ active: activeProtocol === protocol.id }" @click="activeProtocol = protocol.id">{{ t(protocol.label) }}</button>
                  </div>
                </div>
                <div class="landing-code-card">
                  <div class="landing-code-toolbar">
                    <div class="landing-tabs" role="tablist" :aria-label="t('home.landing.languageTabs')">
                      <button v-for="language in landingLanguages" :key="language.id" type="button" role="tab" :aria-selected="activeLanguage === language.id" :class="{ active: activeLanguage === language.id }" @click="activeLanguage = language.id">{{ language.label }}</button>
                    </div>
                    <span class="landing-live-status"><i></i>{{ t('home.landing.exampleEndpoint') }} · POST {{ protocolEndpoint }}</span>
                  </div>
                  <div class="landing-code-well">
                    <button type="button" class="landing-copy-code" :title="t('home.landing.copyCode')" :aria-label="t('home.landing.copyCode')" @click="copyCode"><Icon :name="codeCopied ? 'check' : 'copy'" size="sm" /></button>
                    <pre><code v-html="highlightedCodeExample"></code></pre>
                  </div>
                </div>
                <div class="landing-workstation-foot">
                  <span>{{ t('home.landing.gatewayAddress') }} <code>{{ gatewayBaseUrl }}</code> · {{ t('home.landing.gatewayModelNote') }}</span>
                  <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer">{{ t('home.landing.engineeringGuide') }} <Icon name="arrowRight" size="xs" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="models" class="landing-model-matrix scroll-mt-24">
          <div class="landing-section-inner">
            <p class="landing-eyebrow">{{ t('home.landing.modelMatrixEyebrow') }}</p>
            <p class="landing-section-subtitle">{{ t('home.landing.modelMatrixSubtitle') }}</p>
            <h2 class="mb-3 mt-4 text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.landing.modelMatrixTitle') }}</h2>
            <p class="text-sm leading-6 text-gray-600 dark:text-dark-400">{{ t('home.landing.modelMatrixDescription') }}</p>
            <div class="landing-model-list landing-stagger">
                <article v-for="group in landingModelGroups" :key="group.title" class="landing-model-row landing-reveal">
                <h3>{{ t(group.title) }}</h3>
              <div class="landing-model-pills">
                <button v-for="model in group.models" :key="model" type="button" class="landing-model-pill" :title="copiedModel === model ? t('home.landing.modelCopied') : t('home.landing.modelCopy')" @click="copyModelId(model)">
                  <ModelIcon :model="model" size="16px" />
                  <code>{{ model }}</code>
                  <Icon :name="copiedModel === model ? 'check' : 'copy'" size="xs" class="landing-model-copy-icon" />
                </button>
              </div>
              <p class="landing-model-note">{{ t(group.note) }}</p>
              </article>
            </div>
            <div class="landing-model-access-cards landing-stagger">
              <router-link to="/model-plaza" class="landing-access-card landing-access-card-violet landing-reveal">
                <div class="landing-access-card-copy">
                  <h3>{{ t('home.landing.modelCardTitle') }}</h3>
                  <p>{{ t('home.landing.modelCardDescription') }}</p>
                </div>
                <span class="landing-access-card-arrow">{{ t('home.landing.modelCardAction') }} <Icon name="arrowRight" size="sm" /></span>
                <svg class="landing-access-card-art" viewBox="0 0 320 190" fill="none" aria-hidden="true">
                  <path d="M52 190V110C52 104.477 56.477 100 62 100H182V122H84V162H320V190H52Z" fill="#F6F5F0" />
                  <path d="M204 42C204 36.477 208.477 32 214 32H320V78H204V42Z" fill="#F6F5F0" />
                  <rect x="182" y="78" width="22" height="22" rx="4" fill="#D4FF3F" />
                </svg>
              </router-link>
              <a :href="docUrl || '#quickstart'" :target="docUrl ? '_blank' : undefined" :rel="docUrl ? 'noopener noreferrer' : undefined" class="landing-access-card landing-access-card-dark landing-reveal">
                <div class="landing-access-card-copy">
                  <h3>{{ t('home.landing.docsCardTitle') }}</h3>
                  <p>{{ t('home.landing.docsCardDescription') }}</p>
                </div>
                <span class="landing-access-card-arrow">{{ t('home.landing.docsCardAction') }} <Icon name="arrowRight" size="sm" /></span>
                <svg class="landing-access-card-art" viewBox="0 0 320 190" fill="none" aria-hidden="true">
                  <path d="M36 190V152C36 146.477 40.477 142 46 142H144V108C144 102.477 148.477 98 154 98H182V132C182 137.523 177.523 142 172 142H166V162H58V190H36Z" fill="#F6F5F0" />
                  <path d="M204 36C204 30.477 208.477 26 214 26H320V76H204V36Z" fill="#F6F5F0" />
                  <rect x="182" y="76" width="22" height="22" rx="4" fill="#D4FF3F" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section class="landing-cta text-center">
          <div class="landing-section-inner">
            <p class="landing-eyebrow">{{ t('home.landing.ctaEyebrow') }}</p>
            <p class="landing-section-subtitle">{{ t('home.landing.finalCtaSubtitle') }}</p>
            <div>
              <h2 class="mt-3 text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.landing.finalCtaTitle') }}</h2>
              <p class="mt-3 text-gray-600 dark:text-dark-300">{{ t('home.landing.finalCtaDescription') }}</p>
            </div>
            <div class="flex flex-wrap justify-center gap-3">
              <router-link :to="isAuthenticated ? '/keys' : '/register'" class="landing-button landing-button-dark">
                {{ t('home.landing.finalCtaPrimary') }} <Icon name="arrowRight" size="sm" />
              </router-link>
              <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="landing-button landing-button-outline">
                {{ t('home.landing.finalCtaSecondary') }} <Icon name="arrowRight" size="sm" />
              </a>
            </div>
            <footer class="landing-footer">
              <div class="landing-footer-inner">
                <nav class="landing-footer-nav" :aria-label="t('home.landing.footerNavigation')">
                  <a href="#top">{{ t('home.landing.footerHome') }}</a>
                  <router-link to="/register">{{ t('home.landing.footerRegister') }}</router-link>
                  <router-link to="/model-plaza">{{ t('home.landing.footerModels') }}</router-link>
                  <a :href="docUrl || '#quickstart'" :target="docUrl ? '_blank' : undefined" :rel="docUrl ? 'noopener noreferrer' : undefined">{{ t('home.landing.footerGuide') }}</a>
                  <router-link to="/keys">{{ t('home.landing.footerKeys') }}</router-link>
                  <router-link :to="isAuthenticated ? dashboardPath : '/login'">{{ t('home.landing.footerConsole') }}</router-link>
                  <a :href="githubUrl" target="_blank" rel="noopener noreferrer">{{ t('home.landing.footerAbout') }}</a>
                </nav>
        <div class="landing-footer-meta">
                  <div>{{ siteName }} · {{ t('home.landing.footerTagline') }}</div>
                  <p>&copy; {{ currentYear }} {{ siteName }}</p>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import ModelIcon from '@/components/common/ModelIcon.vue'
import { sanitizeUrl } from '@/utils/url'
import { FeatureFlags, isFeatureFlagEnabled } from '@/utils/featureFlags'

const { t } = useI18n()
const isMenuOpen = ref(false)
const isHeaderScrolled = ref(window.scrollY > 20)
const copiedModel = ref('')
const activeProtocol = ref('responses')
const activeLanguage = ref('python')
const codeCopied = ref(false)
const prefersReducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
let revealObserver: IntersectionObserver | null = null
const syncHeaderScroll = () => {
  isHeaderScrolled.value = window.scrollY > 20
}
const updateMotionPreference = (event: MediaQueryListEvent) => {
  prefersReducedMotion.value = event.matches
}

const authStore = useAuthStore()
const appStore = useAppStore()

// Site settings - directly from appStore (already initialized from injected config)
const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'AI API Gateway Platform')
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const hasHomeContent = computed(() => homeContent.value.trim().length > 0)
const compactHomeEnabled = computed(() => appStore.cachedPublicSettings?.compact_home_enabled === true)
const modelPlazaEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.modelPlaza))

// Check if homeContent is a URL (for iframe display)
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Theme
const isDark = ref(document.documentElement.classList.contains('dark'))

// GitHub URL
const githubUrl = 'https://github.com/Wei-Shaw/sub2api'
const heroBrands = [
  { name: 'OpenAI', icon: 'gpt' },
  { name: 'Claude', icon: 'claude' },
  { name: 'Gemini', icon: 'gemini' },
  { name: 'DeepSeek', icon: 'deepseek' },
  { name: 'Grok', icon: 'grok' },
  { name: '通义千问', icon: 'qwen' },
  { name: '豆包', icon: 'doubao' },
  { name: 'Kimi', icon: 'kimi' },
].map((brand, index) => ({
  ...brand,
  x: 90 + index * 180,
  y: 50 + ((index - 3.5) / 3.5) ** 2 * 140,
  angle: (index - 3.5) * 2.5,
}))
const heroTrackBrands = [...heroBrands, ...heroBrands].map((brand, index) => ({
  ...brand,
  key: `${brand.icon}-${index}`,
}))
const landingCapabilities = [
  { title: 'home.landing.capabilityProtocols', description: 'home.landing.capabilityProtocolsDesc' },
  { title: 'home.landing.capabilityRouting', description: 'home.landing.capabilityRoutingDesc' },
  { title: 'home.landing.capabilityBilling', description: 'home.landing.capabilityBillingDesc' },
]
const architectureCards = [
  { tag: 'OPENAI · CLAUDE · GEMINI', title: 'home.landing.architectureProtocolTitle', description: 'home.landing.architectureProtocolDescription' },
  { tag: 'GROUP ROUTING · MULTI-CHANNEL', title: 'home.landing.architectureRoutingTitle', description: 'home.landing.architectureRoutingDescription' },
  { tag: 'REAL-TIME AUDIT · SUB-KEYS', title: 'home.landing.architectureAuditTitle', description: 'home.landing.architectureAuditDescription' },
]
const landingModelGroups = [
  { title: 'home.landing.modelGroupOpenAI', note: 'home.landing.modelNoteOpenAI', models: ['gpt-6.1-sol', 'gpt-6-astra', 'gpt-5.6-sol', 'gpt-image-2.5'] },
  { title: 'home.landing.modelGroupClaude', note: 'home.landing.modelNoteClaude', models: ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-fable-5-1', 'claude-haiku-4-5-20251001'] },
  { title: 'home.landing.modelGroupGoogleXai', note: 'home.landing.modelNoteGoogleXai', models: ['gemini-4-argon', 'gemini-3.8-flash', 'grok-4.7', 'grok-4.7-build-fast'] },
  { title: 'home.landing.modelGroupCn', note: 'home.landing.modelNoteCn', models: ['deepseek-v4-pro', 'deepseek-v4.1-flash', 'kimi-k3', 'glm-5.3'] },
]
const landingProtocols = [
  { id: 'responses', label: 'home.landing.protocolResponses', endpoint: '/v1/responses' },
  { id: 'messages', label: 'home.landing.protocolMessages', endpoint: '/v1/messages' },
  { id: 'chat', label: 'home.landing.protocolChat', endpoint: '/v1/chat/completions' },
]
const landingLanguages = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'curl', label: 'cURL' },
]
const workstationItems = [
  'home.landing.workbenchQuickstart',
  'home.landing.workbenchModels',
  'home.landing.workbenchKeys',
  'home.landing.workbenchUsage',
  'home.landing.workbenchLogs',
]
const workstationIcons = ['book', 'grid', 'key', 'chart', 'document'] as const
const gatewayBaseUrl = window.location.origin
const protocolEndpoint = computed(() => landingProtocols.find((item) => item.id === activeProtocol.value)?.endpoint ?? '/v1/responses')
const currentCodeExample = computed(() => {
  const sdk = activeProtocol.value === 'messages' ? 'anthropic' : 'openai'
  if (activeLanguage.value === 'curl') {
    const body = activeProtocol.value === 'messages'
      ? '{"model":"claude-sonnet-5-5","max_tokens":256,"messages":[{"role":"user","content":"Hello"}]}'
      : `{"model":"gpt-6.1-sol","input":"Hello"}`
    return `curl ${gatewayBaseUrl}${protocolEndpoint.value} \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${body}'`
  }
  if (activeLanguage.value === 'javascript') {
    return sdk === 'anthropic'
      ? `import Anthropic from "@anthropic-ai/sdk";\n\nconst client = new Anthropic({\n  apiKey: process.env.API_KEY,\n  baseURL: "${gatewayBaseUrl}",\n});\n\nconst result = await client.messages.create({\n  model: "claude-sonnet-5-5",\n  max_tokens: 256,\n  messages: [{ role: "user", content: "Hello" }],\n});`
      : `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  apiKey: process.env.API_KEY,\n  baseURL: "${gatewayBaseUrl}/v1",\n});\n\nconst result = await client.${activeProtocol.value === 'chat' ? 'chat.completions.create({ model: "gpt-6.1-sol", messages: [{ role: "user", content: "Hello" }] })' : 'responses.create({ model: "gpt-6.1-sol", input: "Hello" })'};`
  }
  return sdk === 'anthropic'
    ? `from anthropic import Anthropic\n\nclient = Anthropic(\n    api_key="YOUR_API_KEY",\n    base_url="${gatewayBaseUrl}",\n)\n\nmessage = client.messages.create(\n    model="claude-sonnet-5-5",\n    max_tokens=256,\n    messages=[{"role": "user", "content": "Hello"}],\n)`
    : `from openai import OpenAI\n\nclient = OpenAI(\n    api_key="YOUR_API_KEY",\n    base_url="${gatewayBaseUrl}/v1",\n)\n\nresponse = client.${activeProtocol.value === 'chat' ? 'chat.completions.create(\n    model="gpt-6.1-sol",\n    messages=[{"role": "user", "content": "Hello"}],\n)' : 'responses.create(\n    model="gpt-6.1-sol",\n    input="Hello",\n)'} `
})
const highlightedCodeExample = computed(() => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => htmlEntities[character] ?? character)
  const tokenPattern = /(#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|-[A-Za-z]\w*|\b[A-Za-z_]\w*(?=\s*[:(])|\b(?:import|from|const|let|var|new|await|return|true|false|null|async)\b|\b\d+\b)/g
  const token = (name: string, color: string, value: string) => `<span class="code-token-${name}" style="color:${color}">${escapeHtml(value)}</span>`
  let cursor = 0
  return currentCodeExample.value.split(tokenPattern).map((part) => {
    if (!part) return ''
    const position = currentCodeExample.value.indexOf(part, cursor)
    cursor = position + part.length
    if (/^(#|\/\/)/.test(part)) return token('comment', '#718096', part)
    if (/^["'`]/.test(part)) return token('string', '#2874c7', part)
    if (/^-[A-Za-z]/.test(part)) return token('keyword', '#6547ed', part)
    if (/^[A-Za-z_]\w*$/.test(part) && /^\s*:/.test(currentCodeExample.value.slice(cursor))) return token('property', '#a34d18', part)
    if (/^[A-Za-z_]\w*$/.test(part) && /^(import|from|const|let|var|new|await|return|true|false|null|async)$/.test(part)) return token('keyword', '#6547ed', part)
    if (/^[A-Za-z_]\w*$/.test(part) && /^\s*\(/.test(currentCodeExample.value.slice(cursor))) return token('function', '#253b80', part)
    if (/^\d+$/.test(part)) return token('number', '#c05b20', part)
    return escapeHtml(part)
  }).join('')
})
async function copyCode() {
  try {
    await navigator.clipboard.writeText(currentCodeExample.value)
    codeCopied.value = true
    window.setTimeout(() => { codeCopied.value = false }, 1600)
  } catch {
    codeCopied.value = false
  }
}

async function copyModelId(model: string) {
  try {
    await navigator.clipboard.writeText(model)
    copiedModel.value = model
    window.setTimeout(() => {
      if (copiedModel.value === model) copiedModel.value = ''
    }, 1600)
  } catch {
    copiedModel.value = ''
  }
}

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const modelPlazaRequiresAuth = computed(
  () => appStore.cachedPublicSettings?.model_plaza_require_auth === true,
)
const showModelPlazaEntry = computed(
  () => modelPlazaEnabled.value && (isAuthenticated.value || !modelPlazaRequiresAuth.value),
)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const userInitial = computed(() => {
  const user = authStore.user
  if (!user || !user.email) return ''
  return user.email.charAt(0).toUpperCase()
})

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Toggle theme
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  window.addEventListener('scroll', syncHeaderScroll, { passive: true })
  motionPreference.addEventListener?.('change', updateMotionPreference)
  initTheme()

  if (!prefersReducedMotion.value) {
    const landingPage = document.querySelector('.landing-page')
    if (landingPage) {
      landingPage.classList.add('motion-ready')
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('in-view')
            else if (entry.boundingClientRect.top > window.innerHeight * 0.96) {
              entry.target.classList.remove('in-view')
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
      )
      landingPage.querySelectorAll('.landing-reveal').forEach((element) => revealObserver?.observe(element))
      landingPage.querySelectorAll('.landing-stagger').forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (child.classList.contains('landing-reveal')) {
            const element = child as HTMLElement
            element.style.setProperty('--stagger', `${Math.min(index * 75, 280)}ms`)
          }
        })
      })
    }
  }

  // Check auth state
  authStore.checkAuth()

  // Ensure public settings are loaded (will use cache if already loaded from injected config)
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncHeaderScroll)
  motionPreference.removeEventListener?.('change', updateMotionPreference)
  revealObserver?.disconnect()
  revealObserver = null
})
</script>

<style scoped>
.landing-page {
  --landing-line: rgba(15, 23, 42, 0.1);
}

.landing-grid {
  background-image: linear-gradient(rgba(99, 102, 241, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black, transparent 75%);
}

.landing-nav {
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
}

.landing-nav-right {
  display: flex;
  align-items: center;
  gap: 28px;
}

.landing-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dark .landing-nav {
  border-color: rgba(148, 163, 184, 0.16);
  background: rgba(17, 24, 39, 0.92);
}

.landing-nav-link {
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  transition: color 150ms ease;
}

.landing-nav-link:hover {
  color: #111827;
}

.dark .landing-nav-link:hover {
  color: #fff;
}

.landing-icon-button {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  color: #64748b;
  transition: background 150ms ease, color 150ms ease;
}

.landing-icon-button:hover {
  background: #f1f5f9;
  color: #111827;
}

.dark .landing-icon-button:hover {
  background: #273244;
  color: #fff;
}

.landing-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 7px;
  padding: 0 17px;
  font-size: 13px;
  font-weight: 600;
  transition: transform 150ms ease, background 150ms ease, border-color 150ms ease;
}

.landing-button:hover {
  transform: translateY(-1px);
}

.landing-button-dark {
  background: #111827;
  color: white;
}

.landing-button-dark:hover {
  background: #273244;
}

.landing-nav-actions > .landing-button {
  min-height: 36px;
  padding-inline: 13px;
  font-size: 12px;
}

.landing-button-primary {
  background: #5145cd;
  color: #fff;
}

.landing-button-primary:hover {
  background: #4338b8;
}

.landing-button-outline {
  border: 1px solid #d7dce5;
  background: rgba(255, 255, 255, 0.8);
  color: #334155;
}

.landing-button-outline:hover {
  border-color: #aeb8c8;
  background: #fff;
}

.dark .landing-button-outline {
  border-color: #374151;
  background: #111827;
  color: #e5e7eb;
}

.landing-eyebrow {
  color: #635b9a;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.5;
  text-transform: uppercase;
}

.dark .landing-eyebrow {
  color: #aaa2e8;
}

.landing-title-dot {
  color: #7064d8;
}

.landing-code-panel {
  width: min(100%, 490px);
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  background: #111827;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.15);
}

.landing-code {
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  line-height: 1.9;
  white-space: pre;
}

.landing-model-strip {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  background: #fafbfc;
}

.dark .landing-model-strip {
  border-color: #273244;
  background: #111827;
}

.landing-feature {
  border-radius: 7px;
}

.landing-quickstart {
  border: 1px solid rgba(99, 102, 241, 0.15);
  background: #f7f7fc;
}

.dark .landing-quickstart {
  border-color: rgba(129, 140, 248, 0.2);
  background: #111827;
}

.landing-protocol {
  border: 1px solid #dfe3eb;
  border-radius: 5px;
  padding: 5px 8px;
  color: #475569;
  font-family: ui-monospace, monospace;
  font-size: 11px;
}

.dark .landing-protocol {
  border-color: #374151;
  color: #cbd5e1;
}

.landing-cta {
  border: 1px solid #e4e7ee;
  background: #fafbfc;
}

.dark .landing-cta {
  border-color: #273244;
  background: #111827;
}

@media (max-width: 640px) {
  .landing-button {
    min-height: 40px;
    padding-right: 13px;
    padding-left: 13px;
  }

  .landing-code {
    font-size: 11px;
  }
}

.landing-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  pointer-events: none;
  border: 0;
  background: transparent;
  backdrop-filter: none;
}

.landing-header > .landing-nav {
  pointer-events: auto;
}

.dark .landing-header {
  background: transparent;
}

.landing-nav {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  min-height: 54px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  transition:
    max-width 700ms cubic-bezier(0.16, 1, 0.3, 1),
    min-height 700ms cubic-bezier(0.16, 1, 0.3, 1),
    margin 700ms cubic-bezier(0.16, 1, 0.3, 1),
    padding 700ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 700ms cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 700ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1),
    backdrop-filter 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.landing-header.is-scrolled .landing-nav {
  max-width: 832px;
  min-height: 48px;
  margin-top: 8px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 16px;
  padding: 0 6px 0 16px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 2px 16px -6px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(24px) saturate(160%);
}

.dark .landing-nav {
  background: transparent;
}

.dark .landing-header.is-scrolled .landing-nav {
  border-color: rgba(148, 163, 184, 0.18);
  background: rgba(20, 20, 32, 0.76);
  box-shadow: 0 2px 16px -6px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(148, 163, 184, 0.1);
}

.landing-nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.landing-nav-link {
  color: #626274;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
}

.landing-nav-link:hover {
  color: #4933b8;
}

.landing-menu-button {
  display: none;
  width: 40px;
  height: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid #d8d4e6;
  border-radius: 8px;
}

.landing-menu-button span {
  width: 16px;
  height: 1.5px;
  background: currentColor;
}

.orbit-hero {
  position: relative;
  height: 100svh;
  min-height: 680px;
  overflow: hidden;
  background: linear-gradient(110deg, #f3efff 0%, #fbfaff 25%, #fbfcff 68%, #edf6ff 100%);
  isolation: isolate;
}

.dark .orbit-hero {
  background: linear-gradient(110deg, #181526 0%, #12121b 45%, #121722 100%);
}

.orbit-sky {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  animation: orbit-sky-enter 1.1s ease-out both;
}

.orbit-aurora {
  position: absolute;
  inset: -22%;
  background: linear-gradient(118deg, transparent 6%, rgba(190, 169, 255, 0.22) 22%, transparent 43%, rgba(168, 205, 255, 0.18) 73%, transparent 96%);
  filter: blur(72px);
  animation: orbit-aurora-drift 28s ease-in-out infinite alternate;
}

.orbit-stars {
  position: absolute;
  inset: 0;
  opacity: 0.56;
  background-image:
    radial-gradient(1px 1px at 8% 13%, #806ed2 99%, transparent),
    radial-gradient(1.5px 1.5px at 18% 34%, #a18adf 99%, transparent),
    radial-gradient(1px 1px at 28% 72%, #7c78c4 99%, transparent),
    radial-gradient(1px 1px at 41% 22%, #a19ad0 99%, transparent),
    radial-gradient(1.5px 1.5px at 57% 18%, #8e7acf 99%, transparent),
    radial-gradient(1px 1px at 72% 31%, #9a8ccb 99%, transparent),
    radial-gradient(1px 1px at 85% 17%, #8171c6 99%, transparent),
    radial-gradient(1.5px 1.5px at 92% 61%, #88a4d8 99%, transparent),
    radial-gradient(1px 1px at 12% 78%, #8e7acf 99%, transparent);
}

.orbit-shoot {
  position: absolute;
  width: 140px;
  height: 1px;
  opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(106, 76, 214, 0.85), transparent);
  animation: orbit-shoot 13s linear infinite;
}

.orbit-shoot-one { left: 8%; top: 14%; --shoot-angle: 22deg; animation-delay: 2.5s; }
.orbit-shoot-two { left: 58%; top: 8%; --shoot-angle: 17deg; animation-delay: 8s; animation-duration: 16s; }
.orbit-shoot-three { left: 30%; top: 22%; --shoot-angle: 26deg; animation-delay: 13s; animation-duration: 18s; }

.orbit-horizon {
  position: absolute;
  left: 50%;
  bottom: -26%;
  width: 130%;
  height: 37%;
  transform: translateX(-50%);
  border-top: 1px solid rgba(112, 88, 213, 0.66);
  border-radius: 50% 50% 0 0 / 65% 65% 0 0;
  background: linear-gradient(180deg, rgba(245, 241, 255, 0.96), #f8f6ff 68%);
  box-shadow:
    0 -12px 34px -6px rgba(132, 112, 225, 0.38),
    0 -40px 90px -12px rgba(171, 151, 244, 0.28);
  animation: orbit-horizon-enter 1.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.dark .orbit-horizon {
  border-color: rgba(151, 132, 240, 0.55);
  background: linear-gradient(180deg, #1c1930, #171624 72%);
}

.orbit-system {
  position: absolute;
  top: 43%;
  left: 50%;
  display: block;
  width: 100vw;
  height: auto;
  max-width: none;
  overflow: visible;
  transform: translate(-50%, -50%);
  animation: orbit-system-enter 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

.orbit-track {
  fill: none;
  stroke-width: 1.1;
}

.orbit-track-outer { stroke: rgba(157, 132, 221, 0.68); }
.orbit-track-inner { stroke: rgba(160, 138, 224, 0.72); }
.orbit-brand-icon {
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
}
.orbit-brand-icon :deep(svg) { display: block; }
.orbit-dot-halo { fill: #8060eb; opacity: 0.21; }
.orbit-dot-halo-pink { fill: #bb60d6; }
.orbit-dot-violet { fill: #5b3fd4; }
.orbit-dot-pink { fill: #984cc1; }

.orbit-float-outer { animation: orbit-float 15s ease-in-out -5s infinite alternate; }
.orbit-float-inner { animation: orbit-float 11s ease-in-out infinite alternate-reverse; }

.orbit-label {
  opacity: 0;
  animation: orbit-label-enter 1.2s ease 0.6s forwards;
}

.orbit-label rect {
  fill: rgba(255, 253, 255, 0.94);
  stroke: #ded7f2;
  stroke-width: 1.4;
}

.orbit-label text {
  fill: #3a3558;
  font-family: ui-sans-serif, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 10px;
  text-anchor: middle;
}

.orbit-depth {
  animation: orbit-depth var(--orbit-time, 30s) linear var(--orbit-delay, 0s) infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.orbit-hero-copy {
  position: absolute;
  top: 44%;
  left: 50%;
  z-index: 2;
  width: min(850px, calc(100% - 40px));
  text-align: center;
  transform: translate(-50%, -54%);
}

.orbit-eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 0;
  color: #5b568e;
  font-size: 15px;
  font-weight: 700;
}

.orbit-eyebrow span {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #aaa0d6);
  animation: orbit-brow 4.6s ease-in-out infinite;
}

.orbit-eyebrow span:last-child { transform: rotate(180deg); }

.orbit-hero-copy h1 {
  margin: 26px 0 0;
  color: #4933a4;
  background: linear-gradient(175deg, #51309d 18%, #235ca8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 64px;
  font-weight: 800;
  line-height: 1.05;
  white-space: pre-line;
}

.orbit-lead {
  max-width: 780px;
  margin: 22px auto 0;
  color: #626575;
  font-size: 17px;
  line-height: 1.8;
}

.dark .orbit-eyebrow { color: #c4b9ee; }
.dark .orbit-lead { color: #b9b9c9; }

.orbit-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

.orbit-primary-button,
.orbit-secondary-button {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 12px;
  padding: 0 25px;
  font-size: 16px;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.orbit-primary-button {
  color: #fff;
  background: linear-gradient(135deg, #6654d5, #433bb8);
  box-shadow: 0 12px 30px rgba(79, 63, 193, 0.2);
}

.orbit-secondary-button {
  border: 1px solid #d7d5e7;
  color: #252840;
  background: rgba(255, 255, 255, 0.75);
}

.orbit-primary-button:hover,
.orbit-secondary-button:hover { transform: translateY(-2px); }
.orbit-primary-button:hover { box-shadow: 0 16px 34px rgba(79, 63, 193, 0.27); }
.dark .orbit-secondary-button { border-color: #403d56; color: #f0eff7; background: rgba(30, 29, 44, 0.8); }

.hero-model-horizon {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 220px;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.hero-model-orbit {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.hero-model-badge {
  display: flex;
  align-items: center;
  width: 88px;
  height: 30px;
  gap: 5px;
  justify-content: center;
  border: 1px solid #e3dcf4;
  border-radius: 999px;
  padding: 0 5px;
  color: #514b69;
  background: rgba(255, 252, 255, 0.96);
  box-shadow: 0 2px 8px rgba(62, 48, 110, 0.03);
  font-size: 10px;
  font-weight: 650;
  white-space: nowrap;
}

.hero-model-badge :deep(svg) { flex: 0 0 auto; }

.landing-content {
  position: relative;
  z-index: 2;
}

@keyframes orbit-sky-enter { from { opacity: 0; } }
@keyframes orbit-aurora-drift { to { transform: translate(4%, 3%) scale(1.08); } }
@keyframes orbit-shoot { 0% { opacity: 0; transform: rotate(var(--shoot-angle)) translateX(0) scaleX(0.35); } 1.5% { opacity: 0.85; } 7%, 100% { opacity: 0; transform: rotate(var(--shoot-angle)) translateX(46vw) scaleX(1); } }
@keyframes orbit-horizon-enter { from { opacity: 0; transform: translate(-50%, 4%); } to { opacity: 1; transform: translate(-50%, 0); } }
@keyframes orbit-system-enter { from { opacity: 0; scale: 0.94; } }
@keyframes orbit-float { from { translate: 0 -9px; } to { translate: 0 9px; } }
@keyframes orbit-depth { 0%, 50%, to { opacity: 0.72; scale: 0.86; } 25% { opacity: 0.28; scale: 0.6; } 75% { opacity: 1; scale: 1.16; } }
@keyframes orbit-label-enter { to { opacity: 1; } }
@keyframes orbit-brow { 0%, to { opacity: 0.45; scale: 0.5 1; } 50% { opacity: 1; scale: 1 1; } }
@media (max-width: 1100px) {
  .landing-nav-links { gap: 16px; }
  .landing-nav-link { font-size: 13px; }
  .landing-nav-right { gap: 18px; }
}

@media (max-width: 860px) {
  .orbit-hero { height: 100svh; min-height: 680px; }
  .landing-nav-links {
    position: absolute;
    top: calc(100% - 2px);
    right: 16px;
    left: 16px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 8px;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 12px 35px rgba(18, 20, 40, 0.12);
  }
  .landing-nav-right { gap: 8px; }
  .landing-nav-actions { gap: 8px; }
  .landing-nav-links.is-open { display: flex; }
  .landing-nav-link { padding: 11px 4px; }
  .landing-menu-button { display: flex; }
  .orbit-system { width: 126vw; min-width: 940px; }
  .orbit-hero-copy h1 { font-size: 56px; }
  .orbit-lead { max-width: 640px; font-size: 16px; }
  .hero-model-horizon { height: 190px; }
}

@media (max-width: 560px) {
  .orbit-hero { height: 760px; min-height: 760px; }
  .orbit-system { top: 47%; width: 165vw; min-width: 800px; }
  .orbit-hero-copy { top: 44%; width: calc(100% - 34px); }
  .orbit-eyebrow { gap: 9px; font-size: 10px; }
  .orbit-eyebrow span { width: 18px; }
  .orbit-hero-copy h1 { margin-top: 20px; font-size: 43px; line-height: 1.1; }
  .orbit-lead { margin-top: 17px; font-size: 15px; line-height: 1.75; }
  .orbit-actions { gap: 10px; margin-top: 22px; }
  .orbit-primary-button, .orbit-secondary-button { min-height: 50px; border-radius: 11px; padding: 0 17px; font-size: 15px; }
  .hero-model-horizon { height: 150px; }
  .landing-content { padding-top: 48px; }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-sky, .orbit-aurora, .orbit-shoot, .orbit-horizon, .orbit-system,
  .orbit-float, .orbit-depth, .orbit-label, .orbit-eyebrow span,
  .diagram-draw, .diagram-pulse {
    animation: none !important;
  }
  .diagram-draw { stroke-dashoffset: 0 !important; }
  .orbit-label { opacity: 1; }
}

/* Terminal Container */
.terminal-container {
  position: relative;
  display: inline-block;
}

/* Terminal Window */
.terminal-window {
  width: 420px;
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border-radius: 14px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
  transition: transform 0.3s ease;
}

.terminal-window:hover {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-4px);
}

/* Terminal Header */
.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close {
  background: #ef4444;
}
.btn-minimize {
  background: #eab308;
}
.btn-maximize {
  background: #22c55e;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-family: ui-monospace, monospace;
  color: #64748b;
  margin-right: 52px;
}

/* Terminal Body */
.terminal-body {
  padding: 20px 24px;
  font-family: ui-monospace, 'Fira Code', monospace;
  font-size: 14px;
  line-height: 2;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  opacity: 0;
  animation: line-appear 0.5s ease forwards;
}

.line-1 {
  animation-delay: 0.3s;
}
.line-2 {
  animation-delay: 1s;
}
.line-3 {
  animation-delay: 1.8s;
}
.line-4 {
  animation-delay: 2.5s;
}

@keyframes line-appear {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.code-prompt {
  color: #22c55e;
  font-weight: bold;
}
.code-cmd {
  color: #38bdf8;
}
.code-flag {
  color: #a78bfa;
}
.code-url {
  color: #14b8a6;
}
.code-comment {
  color: #64748b;
  font-style: italic;
}
.code-success {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.code-response {
  color: #fbbf24;
}

/* Blinking Cursor */
.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #22c55e;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Dark mode adjustments */
:deep(.dark) .terminal-window {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(20, 184, 166, 0.2),
    0 0 40px rgba(20, 184, 166, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.landing-capabilities {
  border-top: 1px solid rgba(148, 163, 184, 0.28);
}

.landing-capability {
  position: relative;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.22);
  padding: 17px 0;
}

.landing-capability-index {
  padding-top: 2px;
  color: #8177b6;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  font-weight: 700;
}

.landing-capability h3 {
  margin: 0;
  color: #242435;
  font-size: 15px;
  font-weight: 700;
}

.landing-capability p {
  margin: 6px 0 0;
  color: #626575;
  font-size: 13px;
  line-height: 1.7;
}

.dark .landing-capability h3 { color: #f3f2f8; }
.dark .landing-capability p { color: #b9b9c9; }
.dark .landing-capabilities,
.dark .landing-capability { border-color: rgba(148, 163, 184, 0.18); }

.landing-model-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.landing-model-group {
  min-width: 0;
  border: 1px solid #e0dced;
  border-radius: 7px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.72);
}

.landing-model-group h3 {
  margin: 0 0 12px;
  color: #333247;
  font-size: 14px;
  font-weight: 700;
}

.landing-model-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.landing-model-pill {
  display: inline-flex;
  min-width: 0;
  min-height: 34px;
  align-items: center;
  gap: 7px;
  border: 1px solid #e5e1ef;
  border-radius: 5px;
  padding: 0 9px;
  color: #4e4b61;
  background: #fff;
  transition: border-color 150ms ease, background 150ms ease;
}

.landing-model-pill:hover {
  border-color: #b7a9e7;
  background: #faf8ff;
}

.landing-model-pill code {
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}

.landing-model-copy-icon {
  flex: 0 0 auto;
  color: #8b849e;
  opacity: 0;
  transition: opacity 150ms ease;
}

.landing-model-pill:hover .landing-model-copy-icon,
.landing-model-pill:focus-visible .landing-model-copy-icon { opacity: 1; }

.dark .landing-model-group {
  border-color: #39364c;
  background: rgba(24, 23, 37, 0.8);
}
.dark .landing-model-group h3 { color: #f1eff8; }
.dark .landing-model-pill { border-color: #454157; color: #d3d0df; background: #211f31; }
.dark .landing-model-pill:hover { border-color: #7163a8; background: #29263e; }

.landing-text-link {
  color: #5548bd;
  font-size: 14px;
  font-weight: 650;
}
.landing-text-link:hover { color: #392c9c; }
.dark .landing-text-link { color: #b8adff; }

@media (max-width: 860px) {
  .landing-header.is-scrolled .landing-nav {
    max-width: 720px;
    margin-top: 6px;
  }
}

@media (max-width: 560px) {
  .landing-model-groups { grid-template-columns: minmax(0, 1fr); }
  .landing-header.is-scrolled .landing-nav { min-height: 44px; }
  .landing-header.is-scrolled .landing-nav-actions > .landing-button { min-height: 32px; padding-inline: 9px; }
}

.landing-content > section {
  padding: 5.5rem 1.5rem;
}

.landing-content > section:first-child {
  padding-top: 2.75rem;
}

.landing-section-inner {
  width: min(100%, 1280px);
  margin-inline: auto;
}

.landing-section-subtitle {
  margin: 0.7rem 0 0;
  color: #777583;
  font-size: 13px;
}

.landing-architecture-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.landing-architecture-card {
  min-width: 0;
  border: 1px solid #e3deef;
  border-radius: 16px;
  padding: 1.45rem 1.55rem 1.6rem;
  background:
    radial-gradient(280px circle at 50% 0%, rgba(139, 99, 232, 0.055), transparent 72%),
    rgba(255, 252, 255, 0.74);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 10px 30px -18px rgba(70, 50, 130, 0.12);
  transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
}

.landing-architecture-card:hover {
  transform: translateY(-3px);
  border-color: #c4b6ee;
  box-shadow: inset 0 1px 0 #fff, 0 18px 36px -20px rgba(91, 62, 160, 0.22);
}

.landing-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 14px;
}

.landing-card-number {
  color: #8981b8;
  font-size: 13px;
  font-weight: 700;
}

.landing-card-tag {
  border: 1px solid #e6e0f5;
  border-radius: 999px;
  padding: 4px 9px;
  color: #746d9a;
  background: #fffcff;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  font-weight: 600;
}

.landing-card-diagram {
  display: block;
  width: 100%;
  height: 82px;
  margin-bottom: 14px;
  border: 1px solid #eae4f7;
  border-radius: 11px;
  background: linear-gradient(180deg, rgba(248, 246, 252, 0.75), rgba(255, 255, 255, 0.6));
}

.landing-card-diagram text {
  fill: #4933b8;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 8px;
  font-weight: 700;
}

.landing-architecture-card.in-view .diagram-draw {
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  animation: diagram-line-draw 1.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}

.landing-architecture-card.in-view .diagram-pulse {
  transform-box: fill-box;
  transform-origin: center;
  animation: diagram-pulse 1.8s ease-in-out infinite;
}

.landing-architecture-card.in-view .diagram-pulse.delay-1 { animation-delay: 300ms; }
.landing-architecture-card.in-view .diagram-pulse.delay-2 { animation-delay: 600ms; }
@keyframes diagram-line-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes diagram-pulse {
  0%, 100% { opacity: 0.72; }
  50% { opacity: 1; }
}

.landing-architecture-card h3 {
  margin: 0 0 8px;
  color: #202031;
  font-size: 19px;
  font-weight: 700;
}

.landing-architecture-card p {
  margin: 0;
  color: #626575;
  font-size: 14px;
  line-height: 1.8;
}

.landing-quickstart {
  background: linear-gradient(180deg, #f5f3fc, #faf9fd);
}

.landing-capabilities {
  margin-top: 2.4rem;
  border-top: 1px solid rgba(148, 143, 170, 0.24);
}

.landing-capability {
  display: grid;
  grid-template-columns: 60px 260px minmax(0, 1fr);
  align-items: baseline;
  gap: 0.7rem 1.5rem;
  border-bottom: 1px solid rgba(148, 143, 170, 0.2);
  padding: 1.45rem 0;
}

.landing-capability::before {
  position: absolute;
  top: -1px;
  right: 0;
  left: 0;
  height: 1px;
  background: transparent;
  content: '';
  transition: background-color 180ms ease;
}

.landing-capability:hover {
  background: transparent;
}

.landing-capability:hover::before {
  background: #6547ed;
}

.landing-capability-index {
  color: #8981b8;
  font-size: 13px;
  font-weight: 700;
  transition: color 180ms ease;
}

.landing-capability h3 {
  margin: 0;
  color: #242435;
  font-size: 16px;
  font-weight: 700;
  transition: color 180ms ease;
}

.landing-capability:hover .landing-capability-index,
.landing-capability:hover h3 {
  color: #5b3eff;
}

.landing-capability p {
  margin: 0;
  color: #626575;
  font-size: 14px;
  line-height: 1.75;
}

.landing-capability .landing-capability-tags {
  margin-top: 10px;
  color: #7a748c;
  font-size: 12px;
}

.landing-workstation {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  margin-top: 3rem;
  overflow: hidden;
  border: 1px solid #e2deeb;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 18px 48px -18px rgba(75, 55, 130, 0.12);
}

.landing-workstation-sidebar {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-right: 1px solid #ebe8f0;
  padding: 20px 12px;
  background: rgba(250, 249, 252, 0.82);
}

.landing-workstation-nav {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  padding: 9px 10px;
  color: #5a5868;
  font-size: 13px;
  font-weight: 550;
}

.landing-workstation-nav.active {
  color: #5545b8;
  background: #efecfa;
}

.landing-workstation-main {
  min-width: 0;
  padding: 26px 30px 18px;
}

.landing-workstation-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 18px;
}

.landing-workstation-top h3 {
  margin: 0;
  color: #242435;
  font-size: 20px;
  font-weight: 750;
}

.landing-tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
  border: 1px solid #e5e1ec;
  border-radius: 8px;
  padding: 3px;
  background: #f5f4f8;
}

.landing-tabs button {
  min-height: 30px;
  border: 0;
  border-radius: 5px;
  padding: 0 10px;
  color: #686576;
  background: transparent;
  font-size: 12px;
}

.landing-tabs button.active {
  color: #41369e;
  background: #fff;
  box-shadow: 0 1px 3px rgba(30, 25, 60, 0.12);
}

.landing-code-card {
  overflow: hidden;
  border: 1px solid #e3dfee;
  border-radius: 10px;
  background: #fff;
}

.landing-code-toolbar {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #ece9f1;
  padding: 7px 12px;
}

.landing-code-toolbar .landing-tabs {
  border: 0;
  padding: 0;
  background: transparent;
}

.landing-code-toolbar .landing-tabs button.active { background: #f2f0f8; box-shadow: none; }

.landing-live-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #767284;
  font-size: 11px;
}

.landing-live-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #36b37e;
  box-shadow: 0 0 0 3px rgba(54, 179, 126, 0.12);
}

.landing-code-well {
  position: relative;
  min-height: 240px;
  padding: 20px 56px 20px 22px;
  background: #f8f7fa;
}

.landing-code-well pre {
  margin: 0;
  overflow: auto;
  color: #343244;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1.8;
  tab-size: 4;
}

.code-token-keyword { color: #6547ed; font-weight: 650; }
.code-token-function { color: #333b59; font-weight: 600; }
.code-token-property { color: #a34d18; font-weight: 600; }
.code-token-string { color: #3476bb; }
.code-token-number { color: #c26a35; }
.code-token-comment { color: #718096; font-style: italic; }

.landing-copy-code {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e4e0eb;
  border-radius: 6px;
  color: #716d7e;
  background: #fff;
}

.landing-workstation-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: 12px;
  color: #777384;
  font-size: 11px;
}

.landing-workstation-foot code {
  color: #343244;
  font-family: ui-monospace, monospace;
}

.landing-workstation-foot a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #5548bd;
  font-weight: 600;
}

.landing-model-matrix {
  background: #fff;
}

.landing-model-list {
  margin-top: 2.4rem;
}

.landing-model-row {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: baseline;
  gap: 10px 24px;
  border-top: 1px solid #e5e1ec;
  padding: 24px 0;
}

.landing-model-row h3 {
  margin: 0;
  color: #272536;
  font-size: 16px;
  font-weight: 700;
}

.landing-model-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.landing-model-pill {
  min-height: 28px;
  border-radius: 999px;
  padding: 0 10px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
}

.landing-model-note {
  grid-column: 2;
  margin: 0;
  color: #737080;
  font-size: 13px;
  line-height: 1.65;
}

.landing-model-access-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 2.2rem;
}

.landing-access-card {
  position: relative;
  display: flex;
  min-height: 184px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 16px;
  padding: 2rem 2.2rem;
  color: #fff;
  text-decoration: none;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease;
}

.landing-access-card:hover {
  transform: translateY(-2px);
}

.landing-access-card-violet {
  background: #5b3eff;
  box-shadow: 0 14px 32px -12px rgba(91, 62, 255, 0.32);
}

.landing-access-card-dark {
  background: #13141a;
  box-shadow: 0 14px 32px -12px rgba(19, 20, 26, 0.22);
}

.landing-access-card-copy {
  position: relative;
  z-index: 2;
  max-width: 52%;
}

.landing-access-card h3 {
  margin: 0 0 0.45rem;
  color: #fff;
  font-size: clamp(1.5rem, 2.2vw, 1.85rem);
  font-weight: 780;
  letter-spacing: 0;
}

.landing-access-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.84rem;
  line-height: 1.65;
}

.landing-access-card-arrow {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.9rem;
  font-weight: 600;
}

.landing-access-card-art {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 52%;
  max-width: 280px;
  height: 100%;
  pointer-events: none;
}

.landing-access-card-art path,
.landing-access-card-art rect {
  transition: transform 320ms cubic-bezier(0.19, 1, 0.22, 1);
}

.landing-access-card:hover .landing-access-card-art path {
  transform: translateY(-3px);
}

.landing-access-card:hover .landing-access-card-art rect {
  transform: translateY(-4px);
}

.landing-cta {
  padding-top: 5rem !important;
  padding-bottom: 2.5rem !important;
  background: linear-gradient(180deg, #f4f2fc, transparent 70%);
}

.landing-cta h2 {
  max-width: 22ch;
  margin-inline: auto;
  line-height: 1.2;
}

.landing-cta .landing-section-inner > div:nth-of-type(2) {
  margin-top: 28px;
}

.landing-footer {
  margin-top: 3.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.28);
  padding-top: 1.4rem;
  color: #737080;
  font-size: 0.88rem;
  text-align: left;
}

.landing-footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem 1.4rem;
}

.landing-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.2rem;
}

.landing-footer a {
  color: inherit;
  text-decoration: none;
  transition: color 160ms ease;
}

.landing-footer a:hover {
  color: #13141a;
}

.landing-footer-meta {
  text-align: right;
}

.landing-footer-meta p {
  margin: 0.8rem 0 0;
  font-size: 0.78rem;
}

.landing-page.motion-ready .landing-reveal {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  filter: blur(3px);
  transition:
    opacity 860ms cubic-bezier(0.19, 1, 0.22, 1) var(--stagger, 0ms),
    transform 920ms cubic-bezier(0.19, 1, 0.22, 1) var(--stagger, 0ms),
    filter 760ms cubic-bezier(0.19, 1, 0.22, 1) var(--stagger, 0ms);
}

.landing-page.motion-ready .landing-reveal.in-view {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: blur(0);
}

.dark .landing-architecture-card,
.dark .landing-model-pill,
.dark .landing-workstation,
.dark .landing-code-card {
  border-color: #39364c;
  background-color: #211f31;
}

.dark .landing-architecture-card h3,
.dark .landing-workstation-top h3,
.dark .landing-model-row h3 { color: #f1eff8; }

.dark .landing-architecture-card p,
.dark .landing-capability p { color: #b9b9c9; }

.dark .landing-quickstart { background: linear-gradient(180deg, #171625, #12121b); }
.dark .landing-workstation-sidebar,
.dark .landing-code-well { background: #191827; }
.dark .landing-workstation-sidebar,
.dark .landing-code-toolbar,
.dark .landing-model-row { border-color: #39364c; }
.dark .landing-code-well pre { color: #dedbea; }
.dark .landing-model-matrix { background: #12121b; }
.dark .landing-footer { border-color: #39364c; color: #aaa5bb; }
.dark .landing-footer a:hover { color: #fff; }

@media (max-width: 860px) {
  .landing-architecture-grid { gap: 14px; }
  .landing-architecture-card { padding: 18px; }
  .landing-capability { grid-template-columns: minmax(0, 1fr); gap: 7px; }
  .landing-workstation { grid-template-columns: minmax(0, 1fr); }
  .landing-workstation-sidebar {
    flex-direction: row;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid #ebe8f0;
    padding: 10px 12px;
  }
  .landing-workstation-nav { flex: 0 0 auto; white-space: nowrap; }
  .landing-workstation-main { padding: 20px; }
  .landing-model-row,
  .landing-model-note { grid-column: 1; }
  .landing-access-card { padding: 1.5rem; }
}

@media (max-width: 640px) {
  .landing-content > section { padding: 3.5rem 1rem; }
  .landing-architecture-grid { grid-template-columns: minmax(0, 1fr); }
  .landing-capability { grid-template-columns: 36px minmax(0, 1fr); gap: 6px 10px; }
  .landing-capability h3 { grid-column: 2; }
  .landing-capability > div { grid-column: 2; }
  .landing-workstation { grid-template-columns: minmax(0, 1fr); }
  .landing-workstation-top { align-items: flex-start; flex-direction: column; }
  .landing-code-toolbar { align-items: flex-start; flex-direction: column; }
  .landing-live-status { padding-left: 2px; }
  .landing-code-well { min-height: 210px; padding: 16px 44px 16px 14px; }
  .landing-model-row,
  .landing-model-note { grid-column: 1; }
  .landing-model-access-cards { grid-template-columns: minmax(0, 1fr); }
  .landing-access-card { min-height: 170px; padding: 1.5rem; }
  .landing-access-card-copy { max-width: 66%; }
  .landing-footer-meta { text-align: left; }
  .landing-header.is-scrolled .landing-nav { max-width: calc(100vw - 24px); }
}
</style>
