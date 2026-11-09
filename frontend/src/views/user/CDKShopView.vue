<template>
  <AppLayout>
    <div class="cdk-shop-page">
      <section class="cdk-shop-heading">
        <div class="cdk-shop-copy">
          <p class="cdk-shop-eyebrow">{{ appStore.siteName }} · {{ t('cdkShop.center') }}</p>
          <h2>{{ t('cdkShop.title') }}</h2>
          <p class="cdk-shop-description">{{ t('cdkShop.description') }}</p>
          <p class="cdk-shop-notice">
            <span aria-hidden="true"></span>
            {{ t('cdkShop.notice') }}
          </p>
        </div>

        <div class="cdk-shop-actions">
          <button type="button" class="btn btn-primary btn-sm" @click="openStoreHere">
            <Icon name="externalLink" size="sm" />
            {{ t('cdkShop.openDirect') }}
          </button>
          <router-link to="/redeem" class="btn btn-secondary btn-sm">
            <Icon name="gift" size="sm" />
            {{ t('cdkShop.redeem') }}
          </router-link>
          <button type="button" class="btn btn-secondary btn-sm" @click="copyStoreLink">
            <Icon :name="copied ? 'check' : 'copy'" size="sm" />
            {{ copied ? t('cdkShop.copied') : t('cdkShop.copyLink') }}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" @click="reloadStore">
            <Icon name="refresh" size="sm" />
            {{ t('cdkShop.reload') }}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" @click="openStoreInNewTab">
            <Icon name="externalLink" size="sm" />
            {{ t('cdkShop.openNewTab') }}
          </button>
        </div>
      </section>

      <iframe
        :key="storeFrameKey"
        class="cdk-shop-frame"
        :src="storeUrl"
        :title="t('cdkShop.title')"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/components/layout/AppLayout.vue'
import Icon from '@/components/icons/Icon.vue'
import { useAppStore } from '@/stores'

const storeUrl = 'https://catfk.com/shop/FPTO3LQO'
const { t } = useI18n()
const appStore = useAppStore()
const copied = ref(false)
const storeFrameKey = ref(0)

function openStoreHere() {
  window.location.assign(storeUrl)
}

async function copyStoreLink() {
  try {
    await navigator.clipboard.writeText(storeUrl)
    copied.value = true
    appStore.showSuccess(t('cdkShop.linkCopied'))
    window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    appStore.showError(t('cdkShop.copyFailed'))
  }
}

function reloadStore() {
  storeFrameKey.value += 1
}

function openStoreInNewTab() {
  window.open(storeUrl, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.cdk-shop-page {
  display: flex;
  height: calc(100vh - 8rem);
  min-height: 600px;
  flex-direction: column;
}

.cdk-shop-heading {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 0 20px;
}

.cdk-shop-copy {
  min-width: 0;
}

.cdk-shop-eyebrow {
  color: #6550c8;
  font-size: 12px;
  font-weight: 700;
}

.cdk-shop-copy h2 {
  margin-top: 6px;
  color: #202033;
  font-size: 22px;
  font-weight: 700;
}

.cdk-shop-description,
.cdk-shop-notice {
  margin-top: 6px;
  color: #777786;
  font-size: 12px;
  line-height: 1.5;
}

.cdk-shop-notice {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cdk-shop-notice span {
  width: 8px;
  height: 8px;
  flex: none;
  border: 1px solid #9a9aa8;
  border-radius: 50%;
}

.cdk-shop-actions {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.cdk-shop-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.cdk-shop-frame {
  display: block;
  flex: 1;
  width: 100%;
  min-height: 0;
  border: 0;
  background: white;
}

@media (max-width: 640px) {
  .cdk-shop-page {
    height: calc(100vh - 6rem);
    min-height: 680px;
  }

  .cdk-shop-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .cdk-shop-actions {
    justify-content: flex-start;
  }

  .cdk-shop-frame {
    min-height: 360px;
  }
}

.dark .cdk-shop-copy h2 {
  color: #fff;
}
</style>
