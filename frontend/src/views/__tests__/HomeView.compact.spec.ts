import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'

import HomeView from '../HomeView.vue'

const { appStore, authStore } = vi.hoisted(() => ({
  appStore: {
    cachedPublicSettings: {} as Record<string, unknown>,
    siteName: 'Fallback site',
    siteLogo: '',
    docUrl: '',
    publicSettingsLoaded: true,
    fetchPublicSettings: vi.fn(),
  },
  authStore: {
    isAuthenticated: false,
    isAdmin: false,
    user: null as { email?: string } | null,
    checkAuth: vi.fn(),
  },
}))

vi.mock('@/stores', () => ({
  useAppStore: () => appStore,
  useAuthStore: () => authStore,
}))

vi.mock('@/stores/app', () => ({
  useAppStore: () => appStore,
}))

vi.mock('vue-i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-i18n')>()
  return {
    ...actual,
    useI18n: () => ({ t: (key: string) => key }),
  }
})

function mountHome(settings: Record<string, unknown> = {}) {
  appStore.cachedPublicSettings = {
    site_name: 'Test site',
    site_subtitle: 'Test subtitle',
    ...settings,
  }

  return mount(HomeView, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        LocaleSwitcher: { template: '<div data-testid="locale-switcher" />' },
        Icon: { template: '<span data-testid="icon" />' },
      },
    },
  })
}

function compactDestination(wrapper: ReturnType<typeof mountHome>) {
  return wrapper.get('[data-testid="compact-home"]').findComponent(RouterLinkStub).props('to')
}

function modelPlazaDestination(wrapper: ReturnType<typeof mountHome>) {
  return wrapper
    .findAllComponents(RouterLinkStub)
    .find((link) => link.props('to') === '/model-plaza')
    ?.props('to')
}

describe('HomeView compact mode', () => {
  beforeEach(() => {
    authStore.isAuthenticated = false
    authStore.isAdmin = false
    authStore.user = null
    authStore.checkAuth.mockClear()
    appStore.fetchPublicSettings.mockClear()
    localStorage.clear()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
  })

  it('renders custom HTML ahead of compact mode', () => {
    const wrapper = mountHome({
      compact_home_enabled: true,
      home_content: '<section id="custom-home">Custom home</section>',
    })

    expect(wrapper.get('#custom-home').text()).toBe('Custom home')
    expect(wrapper.find('[data-testid="compact-home"]').exists()).toBe(false)
  })

  it('renders custom URL content ahead of compact mode', () => {
    const wrapper = mountHome({
      compact_home_enabled: true,
      home_content: ' https://example.com/home ',
    })

    expect(wrapper.get('iframe').attributes('src')).toBe('https://example.com/home')
    expect(wrapper.find('[data-testid="compact-home"]').exists()).toBe(false)
  })

  it('treats whitespace-only custom content as empty and selects compact mode', () => {
    const wrapper = mountHome({ compact_home_enabled: true, home_content: ' \n\t ' })

    expect(wrapper.get('[data-testid="compact-home"]').text()).toContain('Test site')
  })

  it.each([undefined, false])('selects the default home when compact mode is %s', (enabled) => {
    const settings = enabled === undefined ? {} : { compact_home_enabled: enabled }
    const wrapper = mountHome(settings)

    expect(wrapper.find('[data-testid="compact-home"]').exists()).toBe(false)
    expect(wrapper.find('.orbit-hero').exists()).toBe(true)
    expect(wrapper.find('.orbit-system animateMotion').exists()).toBe(true)
    expect(wrapper.find('.hero-model-orbit animateMotion').exists()).toBe(true)
    expect(wrapper.find('.hero-model-badge').exists()).toBe(true)
    expect(wrapper.find('.hero-model-badge').text()).toContain('OpenAI')
  })

  it('renders the model matrix without the FAQ section', () => {
    const wrapper = mountHome()

    expect(wrapper.get('#models').findAll('.landing-model-pill')).toHaveLength(16)
    expect(wrapper.find('#faq').exists()).toBe(false)
    expect(wrapper.get('#models').findAll('.landing-access-card')).toHaveLength(2)
    expect(wrapper.get('.landing-footer-nav').findAll('a, a[href]')).toHaveLength(7)
    expect(wrapper.findAll('.orbit-brand-icon')).toHaveLength(8)
  })

  it('uses the shared content container to align landing section headings', () => {
    const wrapper = mountHome()

    for (const section of ['#architecture', '#quickstart', '#models']) {
      expect(wrapper.get(`${section} > .landing-section-inner`).find('h2').exists()).toBe(true)
    }
  })

  it('morphs the landing navigation into a centered pill after scrolling', async () => {
    const wrapper = mountHome()

    expect(wrapper.get('.landing-header').classes()).toContain('fixed')
    expect(wrapper.get('.landing-header').classes()).not.toContain('is-scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 21 })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.landing-header').classes()).toContain('is-scrolled')
  })

  it.each([
    { authenticated: false, admin: false, destination: '/login' },
    { authenticated: true, admin: false, destination: '/dashboard' },
    { authenticated: true, admin: true, destination: '/admin/dashboard' },
  ])('keeps the header action on one line for $destination after scrolling', async ({
    authenticated,
    admin,
    destination,
  }) => {
    authStore.isAuthenticated = authenticated
    authStore.isAdmin = admin
    const wrapper = mountHome()

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 100 })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.landing-header').classes()).toContain('is-scrolled')
    expect(wrapper.get('.landing-nav-right').classes()).toContain('shrink-0')
    const action = wrapper.get('.landing-nav-actions').getComponent(RouterLinkStub)
    expect(action.classes()).toEqual(expect.arrayContaining(['shrink-0', 'whitespace-nowrap']))
    expect(action.props('to')).toBe(destination)
  })

  it('keeps the model badges visible without motion when reduced motion is preferred', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)

    const wrapper = mountHome()

    expect(wrapper.find('.hero-model-orbit animateMotion').exists()).toBe(false)
    expect(wrapper.findAll('.hero-model-orbit g[transform^="translate("]')).toHaveLength(8)
  })

  it('links unauthenticated visitors to login', () => {
    expect(compactDestination(mountHome({ compact_home_enabled: true }))).toBe('/login')
  })

  it('links authenticated users to their dashboard', () => {
    authStore.isAuthenticated = true

    expect(compactDestination(mountHome({ compact_home_enabled: true }))).toBe('/dashboard')
  })

  it('links administrators to the admin dashboard', () => {
    authStore.isAuthenticated = true
    authStore.isAdmin = true

    const wrapper = mountHome({ compact_home_enabled: true })
    expect(compactDestination(wrapper)).toBe('/admin/dashboard')
    expect(authStore.checkAuth).toHaveBeenCalledOnce()
    expect(appStore.fetchPublicSettings).not.toHaveBeenCalled()
  })

  it('shows the model plaza link to anonymous visitors when public access is enabled', () => {
    const wrapper = mountHome({
      compact_home_enabled: true,
      model_plaza_enabled: true,
      model_plaza_require_auth: false,
    })

    expect(modelPlazaDestination(wrapper)).toBe('/model-plaza')
  })

  it('hides the model plaza link from anonymous visitors when sign-in is required', () => {
    const wrapper = mountHome({
      compact_home_enabled: true,
      model_plaza_enabled: true,
      model_plaza_require_auth: true,
    })

    expect(modelPlazaDestination(wrapper)).toBeUndefined()
  })

  it('shows the model plaza link to authenticated visitors when sign-in is required', () => {
    authStore.isAuthenticated = true

    const wrapper = mountHome({
      compact_home_enabled: true,
      model_plaza_enabled: true,
      model_plaza_require_auth: true,
    })

    expect(modelPlazaDestination(wrapper)).toBe('/model-plaza')
  })

  it('shows the model plaza link in the default home header', () => {
    const wrapper = mountHome({
      model_plaza_enabled: true,
      model_plaza_require_auth: false,
    })

    expect(modelPlazaDestination(wrapper)).toBe('/model-plaza')
  })

  it('hides the model plaza link when the feature is disabled', () => {
    const wrapper = mountHome({
      compact_home_enabled: true,
      model_plaza_enabled: false,
      model_plaza_require_auth: false,
    })

    expect(modelPlazaDestination(wrapper)).toBeUndefined()
  })
})
