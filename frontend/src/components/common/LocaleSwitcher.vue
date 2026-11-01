<template>
  <div v-if="mode === 'toggle'" class="relative">
    <button
      type="button"
      class="locale-toggle"
      :disabled="switching"
      :aria-label="`Switch language to ${currentLocaleCode === 'zh' ? 'English' : 'Chinese'}`"
      :title="`Switch language to ${currentLocaleCode === 'zh' ? 'English' : 'Chinese'}`"
      @click="selectLocale(currentLocaleCode === 'zh' ? 'en' : 'zh')"
    >
      <span :class="{ 'locale-toggle-active': currentLocaleCode === 'zh' }">中</span>
      <span class="locale-toggle-divider">/</span>
      <span :class="{ 'locale-toggle-active': currentLocaleCode === 'en' }">EN</span>
    </button>
  </div>
  <div v-else class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      :disabled="switching"
      class="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700"
      :title="currentLocale?.name"
    >
      <span class="text-base">{{ currentLocale?.flag }}</span>
      <span class="hidden sm:inline">{{ currentLocale?.code.toUpperCase() }}</span>
      <Icon
        name="chevronDown"
        size="xs"
        class="text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-1 w-32 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-dark-700 dark:bg-dark-800"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          :disabled="switching"
          @click="selectLocale(locale.code)"
          class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-700"
          :class="{
            'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400':
              locale.code === currentLocaleCode
          }"
        >
          <span class="text-base">{{ locale.flag }}</span>
          <span>{{ locale.name }}</span>
          <Icon v-if="locale.code === currentLocaleCode" name="check" size="sm" class="ml-auto text-primary-500" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { setLocale, availableLocales } from '@/i18n'

withDefaults(defineProps<{ mode?: 'dropdown' | 'toggle' }>(), { mode: 'dropdown' })

const { locale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const switching = ref(false)

const currentLocaleCode = computed(() => locale.value)
const currentLocale = computed(() => availableLocales.find((l) => l.code === locale.value))

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

async function selectLocale(code: string) {
  if (switching.value || code === currentLocaleCode.value) {
    isOpen.value = false
    return
  }
  switching.value = true
  try {
    await setLocale(code)
    isOpen.value = false
    // 分组名称等内容由后端按请求语言返回，整页刷新让已加载的数据换成新语言
    window.location.reload()
  } finally {
    switching.value = false
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.locale-toggle {
  display: inline-flex;
  min-width: 92px;
  height: 36px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #d7d5e7;
  border-radius: 8px;
  padding: 0 12px;
  color: #626274;
  background: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 600;
  transition: border-color 150ms ease, background 150ms ease;
}

.locale-toggle:hover:not(:disabled) {
  border-color: #aaa2d2;
  background: #fff;
}

.locale-toggle:disabled {
  cursor: wait;
  opacity: 0.65;
}

.locale-toggle-active {
  color: #5145cd;
}

.locale-toggle-divider {
  color: #c4c0d1;
}

.dark .locale-toggle {
  border-color: #403d56;
  color: #c3bfd0;
  background: rgba(30, 29, 44, 0.72);
}

.dark .locale-toggle:hover:not(:disabled) {
  background: #252337;
}

.dark .locale-toggle-active {
  color: #b9adff;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}
</style>
