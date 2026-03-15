export type Lang = "zh" | "en" | "ja";

export type Copy = {
  title: string;
  subtitle: string;
  nav: {
    github: string;
    docs: string;
    community: string;
  };
  hero: {
    desc1: string;
    desc2: string;
    downloadNow: string;
    backup1: string;
    backup2: string;
    githubFallback: string;
    loading: string;
    notFound: string;
    fetchFailed: string;
    unsupported: string;
    unsupportedTitle: string;
    githubDisabledTitle: string;
    disabledTip: string;
    requirements: string;
    requirementsWindows: string;
  };
  timelineTitle: string;
  timeline: Array<{ name: string; desc: string; url: string }>;
  usersTitle: string;
  usersSubtitle: string;
  authorTitle: string;
  authorName: string;
  authorRole: string;
  authorDesc: string;
  authorLinks: {
    home: string;
    blog: string;
    bilibili: string;
    github: string;
  };
  contributorsTitle: string;
  partnersTitle: string;
  partnerWebsiteLabel: string;
};

export type Contributor = {
  avatar: string;
  name: string;
  contribution: string;
  link: string;
};

export type Partner = {
  avatar: string;
  name: string;
  description: string;
  link: string;
};

export type PromoEmbed = {
  title: string;
  embedHtml: string;
};

export const DISCORD_LINK = "https://discord.gg/xd2BdYGSYV";
export const QQ_LINK =
  "https://qm.qq.com/cgi-bin/qm/qr?k=k9Oe9nyA2BimwcoUsmdBzJbTIzVP3f8X&jump_from=webapi&authKey=EjAimzgLpcUHf5ypf1mQUYabxwa6nQTeVUzuDSYTSKige1MgTgfDtioILaPSsrrT/";

export const copyByLang: Record<Lang, Copy> = {
  zh: {
    title: "neo-bpsys-wpf 官方网站 - 第五人格BP展示工具",
    subtitle: "neo-bpsys-wpf",
    nav: {
      github: "GitHub",
      docs: "使用文档",
      community: "加入QQ群",
    },
    hero: {
      desc1: "第五人格民间赛专属的直播BP展示工具",
      desc2: "让您的直播效果更加贴近官方",
      downloadNow: "立即下载",
      backup1: "备用线路一",
      backup2: "备用线路二",
      githubFallback: "Github (不推荐)",
      loading: "获取版本中...",
      notFound: "未找到安装程序",
      fetchFailed: "获取失败",
      unsupported: "系统不支持",
      unsupportedTitle: "当前系统不支持下载",
      githubDisabledTitle: "当前无法获取安装包，请稍后再试",
      disabledTip: "下载入口暂不可用，请稍后再试或关注公告",
      requirements: "系统要求：",
      requirementsWindows: "Windows 10 20H2 及以上",
    },
    timelineTitle: "项目前身",
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "最初的BP系统原型，采用易语言制作",
        url: "https://github.com/PLFJY/idv-bp-asg-e",
      },
      {
        name: "idv-fln-bp-e",
        desc: "FLN/JRL赛事定制版，基于idv-bp-asg-e",
        url: "https://github.com/PLFJY/idv-fln-bp-e",
      },
      {
        name: "bp-sys-wpf",
        desc: "WPF进行重写，比起上面两个功能更强大，是这个软件的前身",
        url: "https://github.com/PLFJY/bp-sys-wpf",
      },
    ],
    usersTitle: "庞大的用户群",
    usersSubtitle: "有 {count}+ 个民间赛事团队曾有使用",
    authorTitle: "主要开发者",
    authorName: "零风PLFJY",
    authorRole: "第五人格BP软件开发者 & 技术爱好者",
    authorDesc: "一个第五人格爱好者，专注于为民间赛开发最好的BP软件",
    authorLinks: {
      home: "个人主页",
      blog: "个人博客",
      bilibili: "B站主页",
      github: "GitHub主页",
    },
    contributorsTitle: "贡献者",
    partnersTitle: "合作伙伴",
    partnerWebsiteLabel: "官网",
  },
  en: {
    title: "neo-bpsys-wpf - Identity V BP Display Tool",
    subtitle: "neo-bpsys-wpf",
    nav: {
      github: "GitHub",
      docs: "Documentation",
      community: "Join Discord",
    },
    hero: {
      desc1: "A BP display tool for Identity V community tournaments",
      desc2: "Bring your stream experience closer to official broadcasts",
      downloadNow: "Download Now",
      backup1: "Mirror 1",
      backup2: "Mirror 2",
      githubFallback: "GitHub (Fallback)",
      loading: "Fetching version...",
      notFound: "Installer not found",
      fetchFailed: "Fetch failed",
      unsupported: "Unsupported System",
      unsupportedTitle: "This system is not supported",
      githubDisabledTitle: "Installer unavailable, please try again later",
      disabledTip: "Download is temporarily unavailable. Please retry later.",
      requirements: "System requirements:",
      requirementsWindows: "Windows 10 20H2 or later",
    },
    timelineTitle: "Project Origins",
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "The earliest BP system prototype built with EPL",
        url: "https://github.com/PLFJY/idv-bp-asg-e",
      },
      {
        name: "idv-fln-bp-e",
        desc: "FLN/JRL custom build based on idv-bp-asg-e",
        url: "https://github.com/PLFJY/idv-fln-bp-e",
      },
      {
        name: "bp-sys-wpf",
        desc: "WPF rewrite with richer features and direct predecessor",
        url: "https://github.com/PLFJY/bp-sys-wpf",
      },
    ],
    usersTitle: "Large User Base",
    usersSubtitle: "{count}+ community teams have used it",
    authorTitle: "Lead Developer",
    authorName: "Zero PLFJY",
    authorRole: "Identity V BP software developer & tech enthusiast",
    authorDesc: "An Identity V fan focused on building the best BP tool for community tournaments",
    authorLinks: {
      home: "Homepage",
      blog: "Blog",
      bilibili: "Bilibili",
      github: "GitHub",
    },
    contributorsTitle: "Contributors",
    partnersTitle: "Partners",
    partnerWebsiteLabel: "Website",
  },
  ja: {
    title: "neo-bpsys-wpf - 第五人格BP表示ツール",
    subtitle: "neo-bpsys-wpf",
    nav: {
      github: "GitHub",
      docs: "ドキュメント",
      community: "Discordに参加",
    },
    hero: {
      desc1: "第五人格コミュニティ大会向けのBP表示ツール",
      desc2: "配信体験を公式に近づけるためのツールです",
      downloadNow: "今すぐダウンロード",
      backup1: "ミラー1",
      backup2: "ミラー2",
      githubFallback: "GitHub (代替)",
      loading: "バージョン取得中...",
      notFound: "インストーラが見つかりません",
      fetchFailed: "取得に失敗しました",
      unsupported: "非対応システム",
      unsupportedTitle: "このシステムは非対応です",
      githubDisabledTitle: "インストーラを取得できません。後でお試しください",
      disabledTip: "ダウンロードを一時停止中です。後で再試行してください。",
      requirements: "システム要件：",
      requirementsWindows: "Windows 10 20H2 以上",
    },
    timelineTitle: "プロジェクトの前身",
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "EPLで作られた最初期のBPシステム",
        url: "https://github.com/PLFJY/idv-bp-asg-e",
      },
      {
        name: "idv-fln-bp-e",
        desc: "idv-bp-asg-eを基にしたFLN/JRL大会向け版",
        url: "https://github.com/PLFJY/idv-fln-bp-e",
      },
      {
        name: "bp-sys-wpf",
        desc: "WPFで再構築され、機能が強化された前身",
        url: "https://github.com/PLFJY/bp-sys-wpf",
      },
    ],
    usersTitle: "大規模なユーザー基盤",
    usersSubtitle: "{count}+ のコミュニティチームが使用",
    authorTitle: "メイン開発者",
    authorName: "零風 PLFJY",
    authorRole: "Identity V BPソフト開発者 & 技術愛好家",
    authorDesc: "コミュニティ大会向けの最高のBPツールを目指すIdentity Vファン",
    authorLinks: {
      home: "ホームページ",
      blog: "ブログ",
      bilibili: "Bilibili",
      github: "GitHub",
    },
    contributorsTitle: "貢献者",
    partnersTitle: "パートナー",
    partnerWebsiteLabel: "公式サイト",
  },
};

export const contributors: Contributor[] = [
  {
    avatar: "/assets/avatars/zack.jpg",
    name: "Zack",
    contribution: "测试 对局引导 多语言 使用文档",
    link: "https://github.com/ZackZhao233",
  },
  {
    avatar: "/assets/avatars/tianqi.jpg",
    name: "天启",
    contribution: "插件系统初步",
    link: "https://github.com/tianqiqaq",
  },
  {
    avatar: "/assets/avatars/zhangzhilv.jpg",
    name: "张之律",
    contribution: "提供了 v1.3 版本基于 2025 IVL 秋季赛规则的默认前台 UI",
    link: "",
  },
  {
    avatar: "/assets/avatars/tp.jpg",
    name: "tp",
    contribution: "提供了 v2.0 版本的默认前台 UI",
    link: "",
  },
  {
    avatar: "/assets/avatars/paperwings.PNG",
    name: "paperwings",
    contribution: "提供了强大的 3D 插件 Provide 3D Plugin support"
    link: "https://github.com/jefcrb"
  }
];

export const partners: Partner[] = [
  {
    avatar: "https://idvevent.cn/logo.svg",
    name: "第五人格统一赛事平台",
    description: "面向所有主办方的赛事创建、报名审核、赛程管理一体化平台。",
    link: "https://idvevent.cn/"
  },
  {
    avatar: "https://free.picui.cn/free/2026/01/05/695b7d4c1dea1.jpg",
    name: "第五人格 ASG 赛事",
    description: "让每一个电竞梦都有自己的舞台<br>官方 QQ 群：456414070",
    link: ""
  }
];

export const promoByLang: Record<Lang, PromoEmbed | null> = {
  zh: {
    title: "功能演示",
    embedHtml:
      '<iframe src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1Lq83zQEa2&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
  },
  en: {
    title: "Feature Demo",
    embedHtml:
      '<iframe src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1Lq83zQEa2&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
  },
  ja: {
    title: "機能デモ",
    embedHtml:
      '<iframe src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1Lq83zQEa2&autoplay=false" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
  },
};

export const tournaments = [
  "ASG<br>(本家定制版)",
  "MGF",
  "IZL/CVA<br>(自改版)",
  "FLN/JRL<br>(定制版)",
  "IPL<br>(易语言版)",
  "上海科技大学校内赛",
  "PAL<br>(易语言版)",
  "cew",
  "广西大学杯大众赛",
  "欧美服IEAL",
  "IGL广州初高中联赛",
  "东大第五人格赛事INL<br>(东北大学)",
  "IEL星球杯",
  "北航校内赛",
  "GLIV",
  "济南第五人格高中联赛",
  "QWQ/MCY",
  "NJUPT",
  "上海SHISL第五人格高中生联赛<br>(定制版)",
  "FIAC福州市高中赛",
  "福州大学校内赛",
  "USTC校内赛<br>(中国科学技术大学)",
  "第五人格西区杯",
  "抖音东仔水友赛<br>(UI画面定制)",
  "小甜甜水友赛",
  "ACS档案馆秘闻<br>(自改版)",
  "DZ",
  "中南财经政法大学校内赛",
  "江苏理工校友赛",
  "南京师范大学校内赛",
  "ASU",
  "FEG复旦大学校内赛",
  "第五人格IVF赛事",
  "武汉高校第五人格赛事<br>(华中科技大学)",
  "南通大学第五人格赛事",
  "武汉理工大学校内赛",
  "山艺第五人格赛事",
  "USST上海理工大学校内赛",
  "ICR第五人格联合赛事",
  "第五人格SIV赛事",
  "第五人格KBL赛事<br>(易语言版)",
  "SUL苏大第五人格",
  "第五人格ICU赛事",
  "COH第五人格海湾校赛",
  "EVO 赛事",
  "IVBL",
  "西宁市第五人格校内赛",
  "RCE",
  "SIV",
  "中北大学第五人格赛事",
  "SVA",
  "Tsia M",
  "THC",
  "湖南理工友谊赛",
  "上海海洋大学校内赛",
  "风铃杯 X 青岛平度RE动漫游戏嘉年华",
  "柠檬水赛事ILL, COL",
  "第五人格KCC赛事",
  "RCF第五人格赛事",
  "IVX第五人格赛事",
  "MNIL",
  "第五人格台州市高中生邀请赛",
  "荣漫第五人格水友赛",
  "西南交大第五人格赛事",
  "第五人格FDM赛事",
  "北京大学第五人格赛事<br>PIL",
  "浙工大第五人格赛事",
  "XSL",
  "IQJC",
  "中南大学第五人格赛事",
  "第五人格北京高中联赛",
  "SIL",
  "CSU",
  "SWG",
  "CTCU水友赛",
  "张之律水友赛",
  "齐鲁工业大学校内赛",
  "TMU校内联谊赛",
  "ZUL",
  "ZNJU",
  "西狮电子竞技俱乐部哥特杯",
  "上海海洋大学<br>Shou第五人格赛事",
  "首经贸第五人格杯",
  "武汉大学第五人格校内赛",
  "中国传媒大学（白杨杯）",
  "华政杯",
  "南昌大学校内赛",
  "白杨杯",
  "TIVL",
  "第五人格事务所杯",
  "航母杯",
  "YTS",
  "IIL",
  "遵义市中建拾光荟跨年比赛",
  "第五人格CPL高校宣传赛",
  "星赛事",
  "IFL、IUL",
  "ICL",
  "广东财经大学",
  "温州医科大学校内赛",
  "第五人格湛江市高中邀请赛"
];
