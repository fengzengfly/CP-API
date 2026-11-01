export default {
  batchImageGuide: {
    title: 'Batch Image Generation',
    description: 'Submit multiple prompts in one job and download the generated images when complete'
  },
  // Home Page
  home: {
    landing: {
      navHome: 'Home',
      navConsole: 'Console',
      navChannels: 'Channels',
      navModels: 'Models',
      navGuide: 'Docs',
      navAbout: 'About',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      heroEyebrow: 'ENTERPRISE AI GATEWAY · UNIFIED MODEL INFRASTRUCTURE',
      heroTitle: 'Connect global models,\npower intelligent creation',
      heroLead: 'An enterprise-grade unified AI API gateway built for developers and production teams. Route leading chat, reasoning, and multimodal models through one standard key, with transparent latency, throughput, and usage.',
      eyebrow: 'Unified AI API Gateway · Built for developers and teams',
      quickstartCta: 'Explore integration',
      modelStrip: 'Connect leading models',
      architectureEyebrow: 'ARCHITECTURE & CAPABILITIES',
      architectureTitle: 'An enterprise AI gateway built for production',
      architectureSubtitle: 'Core architecture',
      architectureDescription: 'Connect model providers through a unified protocol, then manage production workflows with group routing, usage audits, and scoped keys.',
      architectureProtocolTitle: 'Unified standard protocol',
      architectureProtocolDescription: 'Compatible with native OpenAI Responses, Chat Completions, and Anthropic Messages APIs. Use one API credential across leading providers and integrate without restructuring your application.',
      architectureRoutingTitle: 'Multi-channel group routing',
      architectureRoutingDescription: 'Bind tokens to dedicated model groups and distribute traffic across upstream channels. Group policies can route requests to backups to reduce single-channel disruptions.',
      architectureAuditTitle: 'End-to-end observability and audit',
      architectureAuditDescription: 'Inspect input and output tokens, first-token latency, and group rates per request. Scoped keys, quota limits, and expiration policies keep usage auditable.',
      quickstartEyebrow: 'DEVELOPER EXPERIENCE · QUICK INTEGRATION',
      quickstartSubtitle: 'Standard integration',
      quickstartTitle: 'Keep your official SDK. Integrate in minutes.',
      quickstartDescription: 'Use familiar official SDKs and REST endpoints. Point the Base URL to your gateway and provide an API key to connect existing apps, agents, and CLI tools.',
      endpointLabel: 'Compatible endpoints',
      capabilityProtocols: 'Native multi-protocol support',
      capabilityProtocolsDesc: 'Use streaming, tool calls, structured JSON, reasoning, and multimodal vision while retaining upstream model capabilities.',
      capabilityRouting: 'Dynamic model routing',
      capabilityRoutingDesc: 'Switch models by changing the request model ID, with backup channels selected by your group routing policy.',
      capabilityBilling: 'Granular usage and cost controls',
      capabilityBillingDesc: 'Inspect tokens, latency, and cost per request. Manage team access with scoped keys, quota limits, and expiration policies.',
      capabilityBillingTags: 'Scoped permissions · Transparent group rates · Live request audit',
      protocolTabs: 'Select an API protocol',
      languageTabs: 'Select a programming language',
      protocolResponses: 'OpenAI Responses',
      protocolMessages: 'Claude Messages',
      protocolChat: 'Chat Completions',
      workbenchTitle: 'Quick integration',
      workbenchQuickstart: 'Quickstart',
      workbenchModels: 'Models',
      workbenchKeys: 'API keys',
      workbenchUsage: 'Usage',
      workbenchLogs: 'Request logs',
      exampleEndpoint: 'Request example',
      copyCode: 'Copy code example',
      gatewayAddress: 'Gateway address',
      gatewayModelNote: 'Choose an online model ID available to your token group',
      engineeringGuide: 'View integration guide',
      modelMatrixEyebrow: 'MODEL ECOSYSTEM · MODEL MATRIX',
      modelMatrixSubtitle: 'Model matrix',
      modelMatrixTitle: 'Frontier models and efficient reasoning, in one catalog',
      modelMatrixDescription: 'Representative model IDs from the public catalog. Availability, groups, supported protocols, and rates depend on the live model plaza and actual responses.',
      modelGroupOpenAI: 'OpenAI frontier and reasoning',
      modelGroupClaude: 'Anthropic Claude',
      modelGroupGoogleXai: 'Google Gemini and xAI Grok',
      modelGroupCn: 'DeepSeek and leading Chinese models',
      modelNoteOpenAI: 'Native Responses and Chat Completions for toolchains and multimodal tasks.',
      modelNoteClaude: 'Native Messages and compatible endpoints across flagship and lightweight models.',
      modelNoteGoogleXai: 'Gemini multimodal models and the Grok reasoning series.',
      modelNoteCn: 'Leading models including DeepSeek, Kimi, and GLM.',
      modelCopy: 'Click to copy model ID',
      modelCopied: 'Copied',
      modelCatalog: 'Open model plaza',
      modelCardTitle: 'Model plaza',
      modelCardDescription: 'Browse online model IDs, protocol support, group multipliers, and standard token billing rules in real time.',
      modelCardAction: 'Browse model plaza',
      docsCardTitle: 'Developer docs',
      docsCardDescription: 'Engineering integration guides for Codex CLI, Claude Code, CC Switch, Cherry Studio, and standard SDKs.',
      docsCardAction: 'Read integration docs',
      faqEyebrow: 'FAQ · SERVICE & POLICIES',
      faqSubtitle: 'Service and policies',
      faqTitle: 'Frequently asked questions',
      faqDescription: 'Answers about the gateway, protocol compatibility, billing, and key security.',
      faq1Question: 'What services does HZAPI provide?',
      faq1Answer: 'HZAPI is a unified large-model API gateway for developers and engineering teams. Standardized protocols and group-based channel routing let applications call leading AI models with one key, with centralized quota management and end-to-end request auditing.',
      faq2Question: 'Where can I check supported models and current rates?',
      faq2Answer: 'Visit Models in the top navigation. The catalog publishes online model IDs, available groups, supported protocols, and precise input and output token rates.',
      faq3Question: 'Do existing projects need to be refactored to migrate to HZAPI?',
      faq3Answer: 'No core business logic changes are needed. HZAPI is natively compatible with the official OpenAI and Anthropic SDKs; replace the Base URL with the instance address and configure an issued API key.',
      faq4Question: 'How are usage and billing reconciled?',
      faq4Answer: 'The platform settles in real time using each model’s published token rates, per-request rates, or image-resolution tiers. Each request’s model, context usage, duration, and charge can be checked in console usage logs.',
      faq5Question: 'How can teams protect keys in production?',
      faq5Answer: 'Never hard-code a primary key in frontend code or a public repository. Create separate sub-keys for environments, services, or team members, with only the required model groups, quotas, and expiration.',
      finalCtaTitle: 'Build your next AI application',
      finalCtaSubtitle: 'Get started',
      finalCtaDescription: 'Issue an API key and connect frontier models with the standard SDK protocols you already use.',
      finalCtaPrimary: 'Create API key',
      finalCtaSecondary: 'Read the developer docs',
      ctaEyebrow: 'GET STARTED',
      footerNavigation: 'Footer navigation',
      footerHome: 'Home',
      footerRegister: 'Register',
      footerModels: 'Models',
      footerGuide: 'Docs',
      footerKeys: 'API keys',
      footerConsole: 'Console',
      footerAbout: 'About us',
      footerTagline: 'Enterprise unified AI API gateway',
      createKey: 'Create API key',
      codeLabel: 'Python · OpenAI SDK',
      codeStatus: 'Routed through Sub2API'
    },
    viewOnGithub: 'View on GitHub',
    viewDocs: 'View Documentation',
    docs: 'Docs',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    dashboard: 'Dashboard',
    login: 'Login',
    getStarted: 'Get Started',
    goToDashboard: 'Go to Dashboard',
    // User-focused value proposition
    heroSubtitle: 'One Key, All AI Models',
    heroDescription: 'No need to manage multiple subscriptions. Access Claude, GPT, Gemini and more with a single API key',
    tags: {
      subscriptionToApi: 'Subscription to API',
      stickySession: 'Session Persistence',
      realtimeBilling: 'Pay As You Go'
    },
    // Pain points section
    painPoints: {
      title: 'Sound Familiar?',
      items: {
        expensive: {
          title: 'High Subscription Costs',
          desc: 'Paying for multiple AI subscriptions that add up every month'
        },
        complex: {
          title: 'Account Chaos',
          desc: 'Managing scattered accounts and API keys across different platforms'
        },
        unstable: {
          title: 'Service Interruptions',
          desc: 'Single accounts hitting rate limits and disrupting your workflow'
        },
        noControl: {
          title: 'No Usage Control',
          desc: "Can't track where your money goes or limit team member usage"
        }
      }
    },
    // Solutions section
    solutions: {
      title: 'We Solve These Problems',
      subtitle: 'Three simple steps to stress-free AI access'
    },
    features: {
      unifiedGateway: 'One-Click Access',
      unifiedGatewayDesc: 'Get a single API key to call all connected AI models. No separate applications needed.',
      multiAccount: 'Always Reliable',
      multiAccountDesc: 'Smart routing across multiple upstream accounts with automatic failover. Say goodbye to errors.',
      balanceQuota: 'Pay What You Use',
      balanceQuotaDesc: 'Usage-based billing with quota limits. Full visibility into team consumption.'
    },
    // Comparison section
    comparison: {
      title: 'Why Choose Us?',
      headers: {
        feature: 'Comparison',
        official: 'Official Subscriptions',
        us: 'Our Platform'
      },
      items: {
        pricing: {
          feature: 'Pricing',
          official: 'Fixed monthly fee, pay even if unused',
          us: 'Pay only for what you use'
        },
        models: {
          feature: 'Model Selection',
          official: 'Single provider only',
          us: 'Switch between models freely'
        },
        management: {
          feature: 'Account Management',
          official: 'Manage each service separately',
          us: 'Unified key, one dashboard'
        },
        stability: {
          feature: 'Stability',
          official: 'Single account rate limits',
          us: 'Multi-account pool, auto-failover'
        },
        control: {
          feature: 'Usage Control',
          official: 'Not available',
          us: 'Quotas & detailed analytics'
        }
      }
    },
    providers: {
      title: 'Supported AI Models',
      description: 'One API, Multiple Choices',
      supported: 'Supported',
      soon: 'Soon',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: 'More'
    },
    // CTA section
    cta: {
      title: 'Ready to Get Started?',
      description: 'Sign up now and get free trial credits to experience seamless AI access',
      button: 'Sign Up Free'
    },
    footer: {
      allRightsReserved: 'All rights reserved.'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key Usage',
    subtitle: 'Enter your API Key to view real-time spending and usage status',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: 'Query',
    querying: 'Querying...',
    privacyNote: 'Your Key is processed locally in the browser and will not be stored',
    dateRange: 'Date Range:',
    dateRangeToday: 'Today',
    dateRange7d: '7 Days',
    dateRange30d: '30 Days',
    dateRange90d: '90 Days',
    dateRangeCustom: 'Custom',
    apply: 'Apply',
    used: 'Used',
    detailInfo: 'Detail Information',
    tokenStats: 'Token Statistics',
    dailyDetail: 'Daily Detail',
    modelStats: 'Model Usage Statistics',
    // Table headers
    date: 'Date',
    model: 'Model',
    requests: 'Requests',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    cacheCreationTokens: 'Cache Creation',
    cacheReadTokens: 'Cache Read',
    cacheWriteTokens: 'Cache Write',
    totalTokens: 'Total Tokens',
    cost: 'Cost',
    // Status
    quotaMode: 'Key Quota Mode',
    walletBalance: 'Wallet Balance',
    // Ring card titles
    totalQuota: 'Total Quota',
    limit5h: '5-Hour Limit',
    limitDaily: 'Daily Limit',
    limit7d: '7-Day Limit',
    limitWeekly: 'Weekly Limit',
    limitMonthly: 'Monthly Limit',
    // Detail rows
    remainingQuota: 'Remaining Quota',
    expiresAt: 'Expires At',
    todayExpires: '(expires today)',
    daysLeft: '({days} days)',
    usedQuota: 'Used Quota',
    resetNow: 'Resetting soon',
    subscriptionType: 'Subscription Type',
    billingType: 'Billing Type',
    subscriptionExpires: 'Subscription Expires',
    // Usage stat cells
    todayRequests: 'Today Requests',
    todayInputTokens: 'Today Input',
    todayOutputTokens: 'Today Output',
    todayTokens: 'Today Tokens',
    todayCacheCreation: 'Today Cache Creation',
    todayCacheRead: 'Today Cache Read',
    todayCost: 'Today Cost',
    rpmTpm: 'RPM / TPM',
    totalRequests: 'Total Requests',
    totalInputTokens: 'Total Input',
    totalOutputTokens: 'Total Output',
    totalTokensLabel: 'Total Tokens',
    totalCacheCreation: 'Total Cache Creation',
    totalCacheRead: 'Total Cache Read',
    totalCost: 'Total Cost',
    avgDuration: 'Avg Duration',
    // Messages
    enterApiKey: 'Please enter an API Key',
    querySuccess: 'Query successful',
    queryFailed: 'Query failed',
    queryFailedRetry: 'Query failed, please try again later',
    noDailyUsage: 'No daily usage data',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API Setup',
    description: 'Configure your Sub2API instance',
    database: {
      title: 'Database Configuration',
      description: 'Connect to your PostgreSQL database',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      databaseName: 'Database Name',
      sslMode: 'SSL Mode',
      passwordPlaceholder: 'Password',
      ssl: {
        disable: 'Disable',
        require: 'Require',
        verifyCa: 'Verify CA',
        verifyFull: 'Verify Full'
      }
    },
    redis: {
      title: 'Redis Configuration',
      description: 'Connect to your Redis server',
      host: 'Host',
      port: 'Port',
      username: 'Username (optional)',
      password: 'Password (optional)',
      database: 'Database',
      usernamePlaceholder: 'Leave empty for default user',
      passwordPlaceholder: 'Password',
      enableTls: 'Enable TLS',
      enableTlsHint: 'Use TLS when connecting to Redis (public CA certs)'
    },
    admin: {
      title: 'Admin Account',
      description: 'Create your administrator account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordPlaceholder: 'Min 8 characters',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordMismatch: 'Passwords do not match'
    },
    ready: {
      title: 'Ready to Install',
      description: 'Review your configuration and complete setup',
      database: 'Database',
      redis: 'Redis',
      adminEmail: 'Admin Email'
    },
    status: {
      testing: 'Testing...',
      success: 'Connection Successful',
      testConnection: 'Test Connection',
      installing: 'Installing...',
      completeInstallation: 'Complete Installation',
      completed: 'Installation completed!',
      redirecting: 'Redirecting to login page...',
      restarting: 'Service is restarting, please wait...',
      timeout: 'Service restart is taking longer than expected. Please refresh the page manually.'
    }
  },

  // Common
}
