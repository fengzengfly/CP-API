export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  // Home Page
  home: {
    landing: {
      navHome: '首页',
      navConsole: '控制台',
      navChannels: '渠道状态',
      navModels: '模型广场',
      navGuide: '使用指南',
      navAbout: '关于',
      openMenu: '展开导航',
      closeMenu: '收起导航',
      heroEyebrow: 'ENTERPRISE AI GATEWAY · 统一大模型基础设施',
      heroTitle: '连接全球模型，\n驱动智能创造',
      heroLead: '面向开发者与生产团队的企业级统一 AI API 网关。通过单一标准密钥与分组通道路由，无缝调用全球主流对话、推理与多模态大模型，全链路延时、吞吐与账单透明可控。',
      eyebrow: '统一 AI API 网关 · 面向开发者与团队',
      quickstartCta: '查看接入方式',
      modelStrip: '连接主流模型',
      architectureEyebrow: 'ARCHITECTURE & CAPABILITIES',
      architectureTitle: '为生产环境打造的企业级大模型网关底座',
      architectureSubtitle: '核心架构',
      architectureDescription: '兼容主流模型协议，以统一凭证连接多厂商模型，并通过分组路由、用量审计与子密钥管理支撑生产工作流。',
      architectureProtocolTitle: '统一标准协议',
      architectureProtocolDescription: '全面兼容 OpenAI Responses、Chat Completions 与 Anthropic Messages 原生接口规范。一套 API 凭证即可跨厂商调用全球主流旗舰模型，具体能力以所选模型与端点为准。',
      architectureRoutingTitle: '多通道分组路由',
      architectureRoutingDescription: '支持按令牌绑定独立模型分组与多上游通道权重分配，可根据后台通道策略在同组备用线路间调度请求，降低单一线路波动影响。',
      architectureAuditTitle: '全链路可观测与审计',
      architectureAuditDescription: '提供细粒度至单次请求的输入输出 Token 计量、耗时记录与分组费率核算。支持多套独立令牌、子额度上限与过期策略，研发成本清晰可审计。',
      quickstartEyebrow: 'DEVELOPER EXPERIENCE · 标准接入',
      quickstartSubtitle: '标准接入',
      quickstartTitle: '官方 SDK 零改造，两行代码即时接入',
      quickstartDescription: '完全遵循主流官方 SDK 与 REST 接口规范。只需将 Base URL 指向网关并填入平台签发的 API 密钥，即可在现有应用、Agent 工作流与终端工具中直接发起调用。',
      endpointLabel: '兼容接口',
      capabilityProtocols: '多协议原生支持',
      capabilityProtocolsDesc: '完整支持深度推理（Reasoning）、流式生成（SSE）、工具调用（Function Calling）、结构化 JSON 输出及多模态视觉输入，具体支持能力取决于所选模型与通道。',
      capabilityRouting: '跨模型动态调度',
      capabilityRoutingDesc: '在相同网关地址下，仅需变更请求体中的 model 标识符即可在 GPT、Claude、Gemini、DeepSeek 等模型间切换（需匹配模型支持的协议），免去维护多套上游 SDK 与海外账单的繁琐成本。',
      capabilityBilling: '精细化令牌与财务管控',
      capabilityBillingDesc: '支持按研发项目、微服务或团队成员签发独立令牌，灵活绑定专属模型分组与配额阈值，所有调用明细均实时归档至控制台日志中心。',
      capabilityBillingTags: '令牌权限隔离 · 分组倍率透明公示 · 实时调用审计',
      protocolTabs: '选择 API 协议',
      languageTabs: '选择编程语言',
      protocolResponses: 'OpenAI Responses',
      protocolMessages: 'Claude Messages',
      protocolChat: 'Chat Completions',
      workbenchTitle: '快速接入',
      workbenchQuickstart: '快速接入',
      workbenchModels: '模型管理',
      workbenchKeys: 'API 密钥',
      workbenchUsage: '用量统计',
      workbenchLogs: '日志查询',
      exampleEndpoint: '请求示例',
      copyCode: '复制代码示例',
      gatewayAddress: '网关地址',
      gatewayModelNote: '请结合令牌分组选择在线模型标识符',
      engineeringGuide: '查看工程化配置指南',
      modelMatrixEyebrow: 'MODEL ECOSYSTEM · 模型矩阵',
      modelMatrixSubtitle: '模型矩阵',
      modelMatrixTitle: '覆盖全球前沿旗舰与高性价比推理模型',
      modelMatrixDescription: '下方为公开目录代表性模型标识符示例（点击可复制）。未登录公开态与登录态可见的模型及分组范围不同，实际可用状态、支持端点与计费倍率请以模型广场实时返回数据及实际调用结果为准。',
      modelGroupOpenAI: 'OpenAI 旗舰与推理系列',
      modelGroupClaude: 'Anthropic Claude 系列',
      modelGroupGoogleXai: 'Google Gemini 与 xAI Grok',
      modelGroupCn: 'DeepSeek 与国产大模型生态',
      modelNoteOpenAI: '原生 Responses / Chat Completions / 4K 多模态生图 · 全面适配 Codex CLI 与深度工具链调用',
      modelNoteClaude: 'Messages 原生与兼容协议 · 深度扩展思考（Extended Thinking） · 复杂工程与 Agent 研发首选',
      modelNoteGoogleXai: '百万级超长上下文窗口、多模态视觉推理与高速实时代码构建',
      modelNoteCn: '高吞吐低延迟推理、思维链深度分析与中英双语高频生成',
      modelCopy: '点击复制模型 ID',
      modelCopied: '已复制',
      modelCatalog: '打开模型广场',
      modelCardTitle: '模型广场',
      modelCardDescription: '实时查询平台全量在线模型 ID、协议支持矩阵、分组倍率与标准 Token 计费准则。',
      modelCardAction: '浏览模型广场',
      docsCardTitle: '开发文档',
      docsCardDescription: '涵盖 Codex CLI、Claude Code、CC Switch、Cherry Studio 与标准 SDK 的完整工程化接入文档。',
      docsCardAction: '阅读接入文档',
      faqEyebrow: 'FAQ · 服务与规范',
      faqSubtitle: '服务与规范',
      faqTitle: '常见问题解答',
      faqDescription: '关于平台定位、协议兼容、用量计费与密钥安全的常见说明。',
      faq1Question: 'HZAPI 提供什么样的服务？',
      faq1Answer: 'HZAPI 是面向开发者与研发团队的统一大模型 API 网关平台。通过标准化的接口协议与按分组配置的通道路由，帮助应用以单一密钥稳定调用全球主流 AI 模型，并提供统一的额度管理与全链路调用审计。',
      faq2Question: '如何查询当前支持的模型列表与实时费率？',
      faq2Answer: '请访问顶部导航栏的模型广场。广场内实时公示平台所有在线模型的标准标识符（Model ID）、可用分组、支持协议以及输入/输出 Token 的精确计费标准。',
      faq3Question: '现有项目迁移至 HZAPI 需要重构代码吗？',
      faq3Answer: '无需修改核心业务逻辑。HZAPI 原生兼容 OpenAI 与 Anthropic 官方 SDK，只需在初始化客户端时将接口地址（Base URL）替换为实例地址，并配置平台签发的 API 密钥即可平滑迁移。',
      faq4Question: '平台如何进行用量计费与账单核对？',
      faq4Answer: '平台严格按照各模型公示的按量 Token 费率、按次标准或图像分辨率档位实时结算。每次 API 调用的模型名称、上下文消耗、响应耗时与扣费金额均可在控制台使用日志中逐条核查。',
      faq5Question: '团队协作与生产环境下如何保障密钥安全？',
      faq5Answer: '请勿在前端代码或公开仓库中硬编码主密钥。建议在控制台为不同开发环境、微服务或团队成员分别创建独立子令牌，并配置最小所需的模型分组权限、配额上限与过期时间。',
      finalCtaTitle: '现在，构建你的下一代 AI 应用',
      finalCtaSubtitle: '立即接入',
      finalCtaDescription: '签发专属 API 密钥，沿用标准 SDK 协议，即刻接入全球前沿大模型能力。',
      finalCtaPrimary: '创建 API 密钥',
      finalCtaSecondary: '阅读开发文档',
      ctaEyebrow: 'GET STARTED',
      footerNavigation: '页脚导航',
      footerHome: '首页',
      footerRegister: '注册',
      footerModels: '模型广场',
      footerGuide: '使用指南',
      footerKeys: '令牌管理',
      footerConsole: '控制台',
      footerAbout: '关于我们',
      footerTagline: '企业级统一大模型 API 网关',
      createKey: '创建 API 密钥',
      codeLabel: 'Python · OpenAI SDK',
      codeStatus: '由 Sub2API 统一路由'
    },
    viewOnGithub: '在 GitHub 上查看',
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    // 新增：面向用户的价值主张
    heroSubtitle: '一个密钥，畅用多个 AI 模型',
    heroDescription: '无需管理多个订阅账号，一站式接入 Claude、GPT、Gemini 等主流 AI 服务',
    tags: {
      subscriptionToApi: '订阅转 API',
      stickySession: '会话保持',
      realtimeBilling: '按量计费'
    },
    // 用户痛点区块
    painPoints: {
      title: '你是否也遇到这些问题？',
      items: {
        expensive: {
          title: '订阅费用高',
          desc: '每个 AI 服务都要单独订阅，每月支出越来越多'
        },
        complex: {
          title: '多账号难管理',
          desc: '不同平台的账号、密钥分散各处，管理起来很麻烦'
        },
        unstable: {
          title: '服务不稳定',
          desc: '单一账号容易触发限制，影响正常使用'
        },
        noControl: {
          title: '用量无法控制',
          desc: '不知道钱花在哪了，也无法限制团队成员的使用'
        }
      }
    },
    // 解决方案区块
    solutions: {
      title: '我们帮你解决',
      subtitle: '简单三步，开始省心使用 AI'
    },
    features: {
      unifiedGateway: '一键接入',
      unifiedGatewayDesc: '获取一个 API 密钥，即可调用所有已接入的 AI 模型，无需分别申请。',
      multiAccount: '稳定可靠',
      multiAccountDesc: '智能调度多个上游账号，自动切换和负载均衡，告别频繁报错。',
      balanceQuota: '用多少付多少',
      balanceQuotaDesc: '按实际使用量计费，支持设置配额上限，团队用量一目了然。'
    },
    // 优势对比
    comparison: {
      title: '为什么选择我们？',
      headers: {
        feature: '对比项',
        official: '官方订阅',
        us: '本平台'
      },
      items: {
        pricing: {
          feature: '付费方式',
          official: '固定月费，用不完也付',
          us: '按量付费，用多少付多少'
        },
        models: {
          feature: '模型选择',
          official: '单一服务商',
          us: '多模型随意切换'
        },
        management: {
          feature: '账号管理',
          official: '每个服务单独管理',
          us: '统一密钥，一站管理'
        },
        stability: {
          feature: '服务稳定性',
          official: '单账号易触发限制',
          us: '多账号池，自动切换'
        },
        control: {
          feature: '用量控制',
          official: '无法限制',
          us: '可设配额、查明细'
        }
      }
    },
    providers: {
      title: '已支持的 AI 模型',
      description: '一个 API，多种选择',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多'
    },
    // CTA 区块
    cta: {
      title: '准备好开始了吗？',
      description: '注册即可获得免费试用额度，体验一站式 AI 服务',
      button: '免费注册'
    },
    footer: {
      allRightsReserved: '保留所有权利。'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    // Table headers
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    // Status
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    // Ring card titles
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    // Detail rows
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    billingType: '计费方式',
    subscriptionExpires: '订阅到期',
    // Usage stat cells
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    // Messages
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API 安装向导',
    description: '配置您的 Sub2API 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      username: '用户名（可选）',
      password: '密码（可选）',
      database: '数据库',
      usernamePlaceholder: '默认用户留空',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  },

  // Common
}
