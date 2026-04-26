(function () {
  "use strict";

  const STORAGE_KEY = "first_resume_flow_state_v4";
  const STEPS = [
    { id: "status", title: "状态选择", file: "step1-status.html" },
    { id: "role", title: "岗位方向", file: "step2-role.html" },
    { id: "experience", title: "经历挖掘", file: "step3-experience.html" },
    { id: "translate", title: "经历转译", file: "step4-translate.html" },
    { id: "task", title: "补经历任务", file: "step5-task.html" },
    { id: "resume", title: "简历草稿", file: "step6-resume.html" },
    { id: "interview", title: "面试叙事", file: "step7-interview.html" },
    { id: "loop", title: "成长闭环", file: "step8-loop.html" }
  ];

  const STATUS_OPTIONS = [
    { id: "blank", label: "我完全不知道简历写什么", hint: "从空白开始，先找第一条可写经历。" },
    { id: "small", label: "我有一些小经历，但觉得不值一提", hint: "重点做经历转译，不需要硬编。" },
    { id: "course", label: "我没有实习，但有课程或生活经历", hint: "把课堂、社团、生活项目整理成结构化表达。" },
    { id: "intern", label: "我想申请实习", hint: "按目标岗位来调整表达重点。" },
    { id: "general", label: "我想先做一份通用版第一份简历", hint: "先拿到一版能投递的基础简历。" },
    { id: "emptyResume", label: "我已经有简历，但内容很空", hint: "重点做具体化和可信度修正。" }
  ];

  const ROLE_OPTIONS = [
    "通用实习",
    "新媒体运营",
    "产品助理",
    "行政助理",
    "市场营销",
    "电商运营",
    "教育培训",
    "人力资源",
    "设计助理",
    "前端开发入门",
    "数据分析入门",
    "外贸/跨境电商",
    "文案策划",
    "校园大使",
    "暂时不知道"
  ];

  const QUICK_TAGS = [
    "小组作业",
    "课堂展示",
    "社团活动",
    "兼职",
    "志愿活动",
    "自学技能",
    "帮别人做事",
    "内容创作",
    "旅游攻略",
    "问卷调研",
    "真的没有"
  ];

  const ROLE_FOCUS = {
    "通用实习": "执行力、信息整理、沟通与协作",
    "新媒体运营": "内容选题、文案表达、数据复盘",
    "产品助理": "用户问题理解、需求拆解、结构化思考",
    "行政助理": "文档规范、沟通协调、细节执行",
    "市场营销": "活动协同、传播意识、反馈分析",
    "电商运营": "商品信息处理、页面优化、转化意识",
    "教育培训": "表达清晰、内容设计、耐心引导",
    "人力资源": "沟通记录、流程管理、信息准确性",
    "设计助理": "审美执行、迭代修改、交付协作",
    "前端开发入门": "页面实现、问题排查、代码规范",
    "数据分析入门": "数据整理、基础统计、结论表达",
    "外贸/跨境电商": "资料检索、跨平台信息对比、流程跟进",
    "文案策划": "观点提炼、结构表达、用户语境",
    "校园大使": "社群触达、活动执行、反馈回收",
    "暂时不知道": "先做通用能力：信息整理、表达、执行"
  };

  const TASK_LIBRARY = [
    {
      id: "survey-cafe",
      duration: "3天",
      difficulty: "低",
      roleTags: ["generic", "product", "marketing", "newmedia"],
      title: "校园咖啡消费小调研",
      deliverable: "1页结论PPT + 300字分析",
      steps: [
        "Day1：设计8个问题，访谈5位同学，记录原始回答",
        "Day2：整理成表格，归纳3类消费偏好",
        "Day3：输出一页图文总结并复盘"
      ],
      bullets: [
        "独立设计并执行校园咖啡消费小调研，完成5位同学访谈与需求记录",
        "使用表格整理反馈并归纳价格敏感、场景需求、品牌偏好等3类结论",
        "输出图文结论页，完成一次从访谈到结构化表达的完整闭环"
      ],
      interviewStory: "这个项目很小，但它是我主动完成的一次真实调研。我从提问、记录到整理结论都自己做了一遍，第一次理解了什么叫把感受变成可讨论的信息。"
    },
    {
      id: "xhs-week",
      duration: "7天",
      difficulty: "中",
      roleTags: ["newmedia", "marketing", "ecom", "copy", "generic"],
      title: "7天内容实验",
      deliverable: "3篇内容发布记录 + 数据复盘表",
      steps: [
        "选一个细分主题，确定3个选题",
        "连续发布3篇图文或短内容",
        "记录浏览、点赞、收藏并总结规律"
      ],
      bullets: [
        "围绕细分主题完成7天内容实验，发布3篇图文并建立发布节奏",
        "记录浏览量、互动率等基础数据，复盘标题和封面对点击的影响",
        "形成内容选题-发布-复盘的最小运营流程"
      ],
      interviewStory: "我没有等机会，而是先自己做了一个小规模内容实验。虽然数据不大，但它让我知道运营不是靠感觉，而是要记录、对比、复盘。"
    },
    {
      id: "excel-clean",
      duration: "1天",
      difficulty: "低",
      roleTags: ["admin", "hr", "data", "generic"],
      title: "Excel信息整理任务",
      deliverable: "规范化信息表1份",
      steps: [
        "收集30条公开岗位信息或活动信息",
        "按字段标准化：名称、时间、要求、来源",
        "补充筛选条件并输出可检索表格"
      ],
      bullets: [
        "独立完成30条信息的字段标准化与分类整理，输出可检索表格",
        "建立时间、来源、要求等统一字段，提升信息准确性和可维护性",
        "在整理过程中补充筛选逻辑，提升后续决策效率"
      ],
      interviewStory: "这个任务看起来基础，但它体现了我做事的细节感。我会先定标准再整理，最后保证别人接手也能快速看懂。"
    },
    {
      id: "front-page",
      duration: "7天",
      difficulty: "中",
      roleTags: ["frontend", "design", "product"],
      title: "单页产品介绍页实作",
      deliverable: "可访问网页 + 需求说明",
      steps: [
        "Day1-2：确定主题和页面信息结构",
        "Day3-5：完成移动端优先页面实现",
        "Day6-7：补充交互状态与可用性修正"
      ],
      bullets: [
        "独立完成移动端优先单页产品页面实现，包含信息结构与视觉层级设计",
        "补充空状态、按钮反馈和基础交互，提升页面可用性",
        "输出需求说明与迭代记录，形成从想法到交付的完整样例"
      ],
      interviewStory: "这个项目让我把课程里学过的知识真正落地。过程中我反复改结构和文案，理解了前端实现不只是写代码，更是组织信息。"
    },
    {
      id: "jd-analysis",
      duration: "3天",
      difficulty: "低",
      roleTags: ["generic", "product", "hr", "admin", "data"],
      title: "岗位JD拆解任务",
      deliverable: "目标岗位能力地图1份",
      steps: [
        "收集10条目标岗位JD",
        "提取高频关键词并归类",
        "输出能力地图和补齐计划"
      ],
      bullets: [
        "整理并拆解10条目标岗位JD，提取高频能力关键词",
        "建立岗位能力地图并识别个人短板",
        "制定1-2周可执行的补齐计划，提升投递针对性"
      ],
      interviewStory: "我先从岗位要求反推自己缺什么，再决定补什么，而不是盲目投递。这个过程让我对目标岗位更清楚。"
    },
    {
      id: "campus-visit",
      duration: "1天",
      difficulty: "低",
      roleTags: ["marketing", "campus", "newmedia", "generic"],
      title: "校园观察与用户记录",
      deliverable: "观察记录卡10条",
      steps: [
        "选一个校园场景：食堂/图书馆/快递点",
        "记录10条用户行为和痛点",
        "归纳3个可优化机会"
      ],
      bullets: [
        "围绕校园场景完成10条行为观察记录，识别用户痛点",
        "将零散观察归纳为3类机会点并形成结构化记录",
        "训练问题发现和信息提炼能力"
      ],
      interviewStory: "我希望先锻炼发现问题的能力，所以做了这个观察任务。它让我意识到，很多问题都藏在日常场景里。"
    }
  ];

  function defaultState() {
    return {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userStage: "",
      targetRole: "",
      rawExperience: "",
      selectedTag: "",
      noExperience: false,
      translated: null,
      generatedTasks: [],
      resume: {
        name: "",
        phone: "",
        email: "",
        objective: "",
        education: "",
        summary: "",
        experiences: [],
        skills: ["信息整理", "沟通协作", "基础办公软件"],
        projects: []
      },
      dataset: {
        logs: []
      },
      feedbackLogs: []
    };
  }

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? safeParse(raw) : null;
    if (!parsed) {
      return defaultState();
    }

    const baseline = defaultState();
    return {
      ...baseline,
      ...parsed,
      resume: {
        ...baseline.resume,
        ...(parsed.resume || {}),
        experiences: Array.isArray(parsed?.resume?.experiences) ? parsed.resume.experiences : baseline.resume.experiences,
        skills: Array.isArray(parsed?.resume?.skills) ? parsed.resume.skills : baseline.resume.skills
      },
      dataset: {
        logs: Array.isArray(parsed?.dataset?.logs) ? parsed.dataset.logs : []
      },
      feedbackLogs: Array.isArray(parsed.feedbackLogs) ? parsed.feedbackLogs : []
    };
  }

  let state = loadState();

  function persist() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function toast(message) {
    const toastEl = document.getElementById("toast");
    if (!toastEl) {
      return;
    }
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 1700);
  }

  function currentStepId() {
    return document.body.getAttribute("data-step") || "status";
  }

  function stepIndex(stepId) {
    const idx = STEPS.findIndex(function (step) {
      return step.id === stepId;
    });
    return idx < 0 ? 0 : idx;
  }

  function goStep(stepId) {
    const step = STEPS.find(function (item) {
      return item.id === stepId;
    });
    if (!step) {
      return;
    }
    window.location.href = "./" + step.file;
  }

  function renderProgress(stepId) {
    const idx = stepIndex(stepId);
    const meta = document.getElementById("progressMeta");
    const track = document.getElementById("progressTrack");
    if (!meta || !track) {
      return;
    }

    const step = STEPS[idx];
    meta.innerHTML = "<strong>第" + (idx + 1) + "步 · " + step.title + "</strong><span>完成当前卡片后进入下一页</span>";
    track.innerHTML = STEPS.map(function (_, index) {
      const classNames = ["progress-seg"];
      if (index < idx) {
        classNames.push("done");
      }
      if (index === idx) {
        classNames.push("current");
      }
      return "<span class='" + classNames.join(" ") + "'></span>";
    }).join("");
  }

  function initTopActions() {
    const saveBtn = document.getElementById("saveBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        persist();
        toast("已保存草稿（本地）");
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        const yes = window.confirm("确认重置当前流程吗？会清空本轮输入，但保留历史反馈日志。");
        if (!yes) {
          return;
        }
        const oldLogs = Array.isArray(state.dataset.logs) ? state.dataset.logs.slice() : [];
        const oldFeedback = Array.isArray(state.feedbackLogs) ? state.feedbackLogs.slice() : [];
        state = defaultState();
        state.dataset.logs = oldLogs;
        state.feedbackLogs = oldFeedback;
        persist();
        toast("已重置，回到第一步");
        goStep("status");
      });
    }
  }

  function guardRoute(stepId) {
    if (stepId === "role" && !state.userStage) {
      goStep("status");
      return false;
    }

    if (stepId === "experience" && (!state.userStage || !state.targetRole)) {
      goStep(state.targetRole ? "status" : "role");
      return false;
    }

    if (stepId === "translate") {
      if (state.noExperience) {
        goStep("task");
        return false;
      }
      if (!state.rawExperience || !state.rawExperience.trim()) {
        goStep("experience");
        return false;
      }
    }

    if ((stepId === "task" || stepId === "resume" || stepId === "interview" || stepId === "loop") && !state.targetRole) {
      goStep("role");
      return false;
    }

    return true;
  }

  function inferCategory(rawText, selectedTag) {
    if (selectedTag && selectedTag !== "真的没有") {
      const map = {
        "小组作业": "课程项目",
        "课堂展示": "课程项目",
        "社团活动": "校园经历",
        "兼职": "兼职经历",
        "志愿活动": "志愿经历",
        "自学技能": "技能学习",
        "帮别人做事": "生活项目",
        "内容创作": "内容创作",
        "旅游攻略": "生活项目",
        "问卷调研": "个人项目"
      };
      return map[selectedTag] || "个人项目";
    }

    const text = (rawText || "").toLowerCase();
    if (text.includes("ppt") || text.includes("汇报") || text.includes("课程")) return "课程项目";
    if (text.includes("社团") || text.includes("班委")) return "校园经历";
    if (text.includes("兼职") || text.includes("家教")) return "兼职经历";
    if (text.includes("志愿")) return "志愿经历";
    if (text.includes("账号") || text.includes("小红书") || text.includes("公众号") || text.includes("视频")) return "内容创作";
    if (text.includes("旅游") || text.includes("攻略") || text.includes("预算")) return "生活项目";
    if (text.includes("调研") || text.includes("问卷") || text.includes("访谈")) return "个人项目";
    if (text.includes("自学") || text.includes("练习") || text.includes("学习")) return "技能学习";
    return "个人项目";
  }

  function inferTitle(rawText, category) {
    const text = rawText || "";
    if (text.includes("旅游") || text.includes("攻略")) return "校园旅行路线规划小项目";
    if (text.toLowerCase().includes("ppt") || text.includes("汇报")) return "课程小组展示项目";
    if (text.includes("问卷") || text.includes("调研") || text.includes("访谈")) return "用户调研小项目";
    if (text.includes("账号") || text.includes("小红书") || text.includes("公众号")) return "内容运营实践";
    if (text.includes("兼职") || text.includes("家教")) return "兼职服务与沟通实践";
    if (category === "课程项目") return "课程任务执行项目";
    if (category === "校园经历") return "校园活动协同项目";
    return "个人实践项目";
  }

  function buildBullets(rawText, role, category) {
    const focus = ROLE_FOCUS[role] || ROLE_FOCUS["通用实习"];
    const text = rawText || "";
    const hasNumber = /\d/.test(text);
    const countText = hasNumber ? "结合已有数据细节完成" : "在有限信息下完成";

    const bullets = [
      "围绕" + inferTitle(rawText, category) + "，" + countText + "资料整理、结构搭建与输出表达，体现" + focus + "。",
      "将原始信息拆分为背景、问题、行动、结果四段，形成可投递的简历表达，避免空泛描述。",
      "在执行过程中主动与同学/老师/使用方沟通反馈，持续修正内容并保证最终交付可复述、可验证。"
    ];

    if (text.includes("旅游") || text.includes("攻略")) {
      bullets[0] = "基于预算、时间与路线约束制定旅行方案，完成景点、住宿、交通信息整合并输出结构化行程表。";
      bullets[1] = "根据同行者偏好调整路线优先级，平衡体验与成本，体现需求理解和方案取舍能力。";
      bullets[2] = "将规划过程沉淀为可复用模板，便于后续快速迭代，提升执行效率与沟通清晰度。";
    }

    if (text.toLowerCase().includes("ppt") || text.includes("汇报")) {
      bullets[0] = "负责课程小组项目的资料梳理、PPT制作与课堂汇报，搭建清晰展示结构并完成重点表达。";
      bullets[1] = "与组员协作分工，推进选题分析和内容整合，在周期内完成演示材料与现场讲述。";
      bullets[2] = "通过一次完整展示训练信息提炼和公开表达能力，形成可在面试中复述的项目叙事。";
    }

    return bullets;
  }

  function buildInterviewStory(title, bullets) {
    return {
      short: "这个经历来自" + title + "。我主要负责关键执行环节，先把零散信息整理成结构，再推进输出，最后拿到可展示结果。它让我学会了先拆解问题，再做表达。",
      long: "当时场景并不复杂，但信息很散。我先明确目标和交付，再把任务拆成资料收集、结构整理、输出呈现三步。执行中我持续根据反馈调整内容，最终形成了可以落在简历里的真实结果。这个过程让我理解到：即使是小任务，只要讲清楚行动和产出，也能体现能力。",
      followups: [
        { q: "如果再做一次，你会先优化哪里？", a: "我会更早定义评价标准，比如时间节点和结果格式，减少后期返工。" },
        { q: "你在这个过程中最难的点是什么？", a: "最难的是把零散信息变成结构化表达，我通过先列框架再填内容解决了这个问题。" }
      ],
      dontSay: [
        "不要虚构不存在的数据或头衔。",
        "不要把团队成果全部说成自己独立完成。",
        "不要使用无法解释的宏大词汇。"
      ],
      detailTips: [
        "补充时间范围（例如：3天内完成）。",
        "补充参与人数和分工。",
        "补充工具（如 Excel/Canva/PowerPoint）。",
        "补充一个结果细节（如输出页数、访谈人数）。"
      ]
    };
  }

  function generateTranslation(rawText, role, selectedTag) {
    const category = inferCategory(rawText, selectedTag);
    const title = inferTitle(rawText, category);
    const bullets = buildBullets(rawText, role, category);
    const credibility = calcCredibility(rawText, bullets);
    const interviewStory = buildInterviewStory(title, bullets);
    const warnings = [];

    if (!/\d/.test(rawText)) {
      warnings.push("建议补充一个数字细节（人数、时长、页数或样本量）。");
    }
    if (!(rawText.includes("天") || rawText.includes("周") || rawText.includes("月"))) {
      warnings.push("建议补充发生时间，提升可信度。");
    }
    if (!/(Excel|PPT|PowerPoint|Canva|Notion|Figma|表格|问卷|Python|JavaScript)/i.test(rawText)) {
      warnings.push("建议补充使用过的工具或方法，方便面试追问。");
    }
    if (warnings.length === 0) {
      warnings.push("这段已经较真实，优先准备一个面试里的追问细节。");
    }

    return {
      id: "exp_" + Date.now(),
      sourceRaw: rawText,
      title: title,
      category: category,
      module: category,
      resumeBullets: bullets,
      improvedDetails: ["时间", "人数", "工具", "数据", "结果", "反馈"],
      credibilityScore: credibility,
      interviewStory: interviewStory,
      riskWarnings: warnings,
      targetRole: role,
      createdAt: new Date().toISOString()
    };
  }

  function calcCredibility(rawText, bullets) {
    let score = 68;
    score += Math.min(14, Math.floor((rawText || "").length / 10));
    if (/\d/.test(rawText)) score += 7;
    if (/(Excel|PPT|PowerPoint|Canva|Figma|Notion|问卷|Python|JavaScript|表格)/i.test(rawText)) score += 5;
    if ((rawText || "").includes("负责")) score += 2;
    if ((rawText || "").includes("非常") || (rawText || "").includes("特别")) score -= 2;
    if (!bullets || bullets.length < 3) score -= 5;
    return Math.max(58, Math.min(95, score));
  }

  function addDatasetLog(type, payload) {
    const row = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
      type: type,
      payload: payload,
      createdAt: new Date().toISOString()
    };
    state.dataset.logs.push(row);
    persist();
  }

  function addExperienceToResume(exp, source) {
    const exists = state.resume.experiences.some(function (item) {
      return item.title === exp.title && item.category === exp.category;
    });
    if (exists) {
      toast("这段经历已经在简历里了");
      return false;
    }

    const row = {
      id: "resume_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      title: exp.title,
      category: exp.category,
      bullets: exp.resumeBullets.slice(),
      source: source || "translation",
      createdAt: new Date().toISOString()
    };

    state.resume.experiences.push(row);
    addDatasetLog("experience", {
      source: source || "translation",
      title: row.title,
      category: row.category,
      bullets: row.bullets
    });
    persist();
    toast("已加入简历草稿");
    return true;
  }

  function roleTagFromRole(role) {
    if (!role) return "generic";
    if (role.includes("新媒体")) return "newmedia";
    if (role.includes("产品")) return "product";
    if (role.includes("行政")) return "admin";
    if (role.includes("市场")) return "marketing";
    if (role.includes("电商") || role.includes("跨境")) return "ecom";
    if (role.includes("教育")) return "generic";
    if (role.includes("人力")) return "hr";
    if (role.includes("设计")) return "design";
    if (role.includes("前端")) return "frontend";
    if (role.includes("数据")) return "data";
    if (role.includes("文案")) return "copy";
    if (role.includes("校园")) return "campus";
    return "generic";
  }

  function pickTasks(role) {
    const tag = roleTagFromRole(role);
    const pool = TASK_LIBRARY.filter(function (task) {
      return task.roleTags.includes(tag) || task.roleTags.includes("generic");
    });

    const byDuration = { "1天": null, "3天": null, "7天": null };
    pool.forEach(function (task) {
      if (!byDuration[task.duration]) {
        byDuration[task.duration] = task;
      }
    });

    const result = [];
    ["1天", "3天", "7天"].forEach(function (duration) {
      if (byDuration[duration]) {
        result.push(byDuration[duration]);
      }
    });

    if (result.length < 3) {
      pool.forEach(function (task) {
        if (!result.find(function (x) { return x.id === task.id; })) {
          result.push(task);
        }
      });
    }

    return result.slice(0, 3);
  }

  function taskToExperience(task) {
    return {
      title: task.title,
      category: "个人项目",
      resumeBullets: task.bullets,
      interviewStory: {
        short: task.interviewStory,
        long: task.interviewStory + " 我把过程拆成可执行步骤，这让我更有行动感。",
        followups: [
          { q: "这个任务最大的收获是什么？", a: "最大的收获是把模糊想法变成了可交付结果。" }
        ],
        dontSay: ["不要把实验数据夸大成商业级结果。"],
        detailTips: ["保留过程截图和原始记录，面试时更有说服力。"]
      }
    };
  }

  function renderStatusPage(main) {
    const optionsHtml = STATUS_OPTIONS.map(function (item) {
      const activeClass = state.userStage === item.id ? "active" : "";
      return "<article class='status-card " + activeClass + "' data-stage='" + item.id + "'><h3>" + item.label + "</h3><p>" + item.hint + "</p></article>";
    }).join("");

    main.innerHTML = ""
      + "<section class='board-scene'>"
      + "  <article class='outer-acrylic hero-board'>"
      + "    <div class='board-kicker'>FIRST RESUME / STEP 01</div>"
      + "    <h2 class='hero-title'>你的第一份简历，不该从“我没经历”开始。</h2>"
      + "    <p class='hero-subtitle'>输入你觉得不值一提的小事，我们把它翻译成可信、可投递、可面试复述的表达。真的没经历，也能从 1 个小任务开始补出来。</p>"
      + "    <section class='inner-acrylic question-board'>"
      + "      <div class='board-head'>"
      + "        <h3 class='board-question'>先选你现在的状态</h3>"
      + "        <p class='board-caption'>完成这一页后，系统会自动进入下一页。先不用想自己够不够好，选最接近你现在的一项就可以。</p>"
      + "      </div>"
      + "      <div class='option-group'>" + optionsHtml + "</div>"
      + "    </section>"
      + "    <div class='support-strip'>"
      + "      <article class='value-card support-note'><strong>小经历转译</strong><p>把课程作业、课堂展示、兼职、帮忙任务翻成简历语言。</p></article>"
      + "      <article class='value-card support-note'><strong>真实经历补齐</strong><p>不造假，给你 1 天 / 3 天 / 7 天能完成的起步任务。</p></article>"
      + "      <article class='value-card support-note'><strong>面试讲得出来</strong><p>每段经历都配 30 秒和 1 分钟讲法，减少空话。</p></article>"
      + "    </div>"
      + "    <p class='helper board-helper'>不夸大，不造假，不写空话。目标是让你从羞耻感走到行动感。</p>"
      + "  </article>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='btn' id='nextStatus' disabled>开始下一步：选择岗位</button></div></section>";

    const cards = main.querySelectorAll("[data-stage]");
    const nextBtn = main.querySelector("#nextStatus");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        const stage = card.getAttribute("data-stage");
        state.userStage = stage || "";
        persist();
        cards.forEach(function (item) { item.classList.remove("active"); });
        card.classList.add("active");
        nextBtn.disabled = !state.userStage;
      });
    });

    nextBtn.disabled = !state.userStage;
    nextBtn.addEventListener("click", function () {
      if (!state.userStage) {
        return;
      }
      goStep("role");
    });
  }

  function renderRolePage(main) {
    const roleHtml = ROLE_OPTIONS.map(function (role) {
      const activeClass = state.targetRole === role ? "active" : "";
      return "<article class='role-card " + activeClass + "' data-role='" + role + "'><h3>" + role + "</h3><p>重点能力：" + (ROLE_FOCUS[role] || ROLE_FOCUS["通用实习"]) + "</p></article>";
    }).join("");

    main.innerHTML = ""
      + "<section class='board-scene'>"
      + "  <article class='outer-acrylic hero-board compact-board'>"
      + "    <div class='board-kicker'>FIRST RESUME / STEP 02</div>"
      + "    <h2 class='section-title board-title'>先选目标方向</h2>"
      + "    <p class='section-subtitle board-subtitle'>岗位不是绑定死的，先选一个方向，方便我们调整简历表达重点。</p>"
      + "    <section class='inner-acrylic question-board'>"
      + "      <div class='board-head'>"
      + "        <h3 class='board-question'>你最想先投哪个方向？</h3>"
      + "        <p class='board-caption'>选一个最接近的，我们后面会自动调整简历表达重点。如果暂时不确定，也可以先选“暂时不知道”。</p>"
      + "      </div>"
      + "      <div class='option-group'>" + roleHtml + "</div>"
      + "    </section>"
      + "  </article>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backRole'>上一步</button><button class='btn' id='nextRole' disabled>下一步：挖掘经历</button></div></section>";

    const cards = main.querySelectorAll("[data-role]");
    const nextBtn = main.querySelector("#nextRole");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        const role = card.getAttribute("data-role") || "";
        state.targetRole = role;
        if (!state.resume.objective) {
          state.resume.objective = role;
        }
        persist();
        cards.forEach(function (item) { item.classList.remove("active"); });
        card.classList.add("active");
        nextBtn.disabled = !state.targetRole;
      });
    });

    nextBtn.disabled = !state.targetRole;

    main.querySelector("#backRole").addEventListener("click", function () {
      goStep("status");
    });

    nextBtn.addEventListener("click", function () {
      if (!state.targetRole) {
        return;
      }
      goStep("experience");
    });
  }

  function renderExperiencePage(main) {
    const chips = QUICK_TAGS.map(function (tag) {
      const activeClass = state.selectedTag === tag ? "active" : "";
      return "<button class='quick-chip " + activeClass + "' data-tag='" + tag + "' type='button'>" + tag + "</button>";
    }).join("");

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第3步 · 你不是没经历，只是还没翻译出来</h2>"
      + "  <p class='section-subtitle'>先不用想这能不能写进简历。只要告诉我：你做过什么就好。</p>"
      + "  <div style='margin-top:12px;'>"
      + "    <label for='rawExp'>输入你觉得不值一提的小经历</label>"
      + "    <textarea id='rawExp' placeholder='比如：我帮小组做了一次PPT，然后上台讲了，但感觉没什么含金量。'>" + escapeHtml(state.rawExperience || "") + "</textarea>"
      + "    <p class='helper'>越接近日常越好，不需要一开始就写得专业。</p>"
      + "  </div>"
      + "  <div style='margin-top:12px;'>"
      + "    <label>快捷标签</label>"
      + "    <div class='quick-wrap'>" + chips + "</div>"
      + "  </div>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backExp'>上一步</button><button class='warn-btn' id='noExp'>我真的没有经历</button><button class='btn' id='nextExp'>帮我转译成简历语言</button></div></section>";

    const textarea = main.querySelector("#rawExp");
    const chipNodes = main.querySelectorAll("[data-tag]");

    chipNodes.forEach(function (chip) {
      chip.addEventListener("click", function () {
        const tag = chip.getAttribute("data-tag") || "";
        state.selectedTag = tag;
        persist();
        chipNodes.forEach(function (item) { item.classList.remove("active"); });
        chip.classList.add("active");
        if (tag === "真的没有") {
          textarea.value = "";
        }
      });
    });

    main.querySelector("#backExp").addEventListener("click", function () {
      goStep("role");
    });

    main.querySelector("#noExp").addEventListener("click", function () {
      state.noExperience = true;
      state.rawExperience = "";
      state.selectedTag = "真的没有";
      state.translated = null;
      persist();
      goStep("task");
    });

    main.querySelector("#nextExp").addEventListener("click", function () {
      const raw = (textarea.value || "").trim();
      if (!raw) {
        toast("先写一句你做过的小事就行");
        return;
      }
      state.noExperience = false;
      state.rawExperience = raw;
      state.translated = null;
      persist();
      goStep("translate");
    });
  }

  function ensureTranslation() {
    if (!state.translated || state.translated.sourceRaw !== state.rawExperience || state.translated.targetRole !== state.targetRole) {
      state.translated = generateTranslation(state.rawExperience, state.targetRole, state.selectedTag);
      persist();
    }
    return state.translated;
  }

  function renderTranslatePage(main) {
    const translated = ensureTranslation();
    const warningsHtml = translated.riskWarnings.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");

    const bulletsHtml = translated.resumeBullets.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");

    const detailsHtml = translated.improvedDetails.map(function (item) {
      return "<span class='badge'>" + item + "</span>";
    }).join("");

    const scoreClass = translated.credibilityScore >= 80 ? "score-pill" : "score-pill warn";

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第4步 · 这件小事，可以这样写进简历</h2>"
      + "  <p class='section-subtitle'>我们只做真实转译，不做虚构包装。</p>"
      + "  <div class='translation-grid' style='margin-top:12px;'>"
      + "    <article class='translation-box card'>"
      + "      <h3 style='margin:0;font-size:15px;'>原始经历</h3>"
      + "      <p class='helper'>" + escapeHtml(state.rawExperience) + "</p>"
      + "      <h3 style='margin:12px 0 0;font-size:15px;'>标题建议</h3>"
      + "      <p class='meta'>" + translated.title + " · 可放入 " + translated.category + "</p>"
      + "      <h3 style='margin:12px 0 0;font-size:15px;'>简历表达（3条）</h3>"
      + "      <ul>" + bulletsHtml + "</ul>"
      + "    </article>"
      + "    <article class='translation-box card'>"
      + "      <div class='" + scoreClass + "'>可信度 " + translated.credibilityScore + " / 100</div>"
      + "      <h3 style='margin:12px 0 0;font-size:15px;'>可补充细节</h3>"
      + "      <div class='quick-wrap'>" + detailsHtml + "</div>"
      + "      <h3 style='margin:12px 0 0;font-size:15px;'>可信度提醒</h3>"
      + "      <ul>" + warningsHtml + "</ul>"
      + "      <h3 style='margin:12px 0 0;font-size:15px;'>30秒面试讲法</h3>"
      + "      <p class='helper'>" + translated.interviewStory.short + "</p>"
      + "    </article>"
      + "  </div>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backTrans'>上一步</button><button class='soft-btn' id='rewrite'>再写一段经历</button><button class='btn' id='addResume'>加入简历</button><button class='btn' id='nextTrans'>下一步：补经历任务</button></div></section>";

    main.querySelector("#backTrans").addEventListener("click", function () {
      goStep("experience");
    });

    main.querySelector("#rewrite").addEventListener("click", function () {
      goStep("experience");
    });

    main.querySelector("#addResume").addEventListener("click", function () {
      addExperienceToResume(translated, "translation");
    });

    main.querySelector("#nextTrans").addEventListener("click", function () {
      addExperienceToResume(translated, "translation");
      goStep("task");
    });
  }

  function renderTaskPage(main) {
    const tasks = pickTasks(state.targetRole);
    state.generatedTasks = tasks;
    persist();

    const taskHtml = tasks.map(function (task, index) {
      const bullets = task.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("");
      const steps = task.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("");
      return ""
        + "<article class='task-card' data-task-id='" + task.id + "'>"
        + "  <div class='task-head'><h3>" + (index + 1) + ". " + task.title + "</h3><div style='display:flex;gap:6px;'><span class='badge'>" + task.duration + "</span><span class='badge " + (task.difficulty === "低" ? "green" : "red") + "'>" + task.difficulty + "难度</span></div></div>"
        + "  <p>适合方向：" + state.targetRole + "</p>"
        + "  <h4 style='margin:10px 0 0;font-size:13px;'>完成步骤</h4><ul>" + steps + "</ul>"
        + "  <h4 style='margin:10px 0 0;font-size:13px;'>最终产物</h4><p class='helper'>" + task.deliverable + "</p>"
        + "  <h4 style='margin:10px 0 0;font-size:13px;'>可写进简历</h4><ul>" + bullets + "</ul>"
        + "  <h4 style='margin:10px 0 0;font-size:13px;'>面试讲法</h4><p class='helper'>" + task.interviewStory + "</p>"
        + "  <div class='actions'><button class='soft-btn' data-convert='" + task.id + "'>把这个任务转成经历</button></div>"
        + "</article>";
    }).join("");

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第5步 · 真的没有经历，也能从任务补出来</h2>"
      + "  <p class='section-subtitle'>每个任务都能在1-7天完成，且能写进简历。做小但真实，比写大而空更有用。</p>"
      + "  <div class='tasks-grid' style='margin-top:12px;'>" + taskHtml + "</div>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backTask'>上一步</button><button class='btn' id='nextTask'>下一步：查看简历草稿</button></div></section>";

    main.querySelectorAll("[data-convert]").forEach(function (button) {
      button.addEventListener("click", function () {
        const id = button.getAttribute("data-convert");
        const task = tasks.find(function (item) { return item.id === id; });
        if (!task) {
          return;
        }
        const exp = taskToExperience(task);
        addExperienceToResume(exp, "task");
      });
    });

    main.querySelector("#backTask").addEventListener("click", function () {
      if (state.noExperience) {
        goStep("experience");
      } else {
        goStep("translate");
      }
    });

    main.querySelector("#nextTask").addEventListener("click", function () {
      goStep("resume");
    });
  }

  function sanitizeBullet(text) {
    return text
      .replace(/极大提升/g, "提升")
      .replace(/显著提升/g, "提升")
      .replace(/全面负责/g, "参与并负责")
      .replace(/独立主导/g, "独立完成")
      .replace(/全链路/g, "完整流程");
  }

  function renderResumePage(main) {
    if (!state.resume.objective) {
      state.resume.objective = state.targetRole;
    }
    if (!state.resume.education) {
      state.resume.education = "某某大学 · 本科在读";
    }
    if (!state.resume.summary) {
      state.resume.summary = "对" + state.targetRole + "方向有明确兴趣，能够把小任务拆解并落成可交付结果，重视真实表达和持续迭代。";
    }
    persist();

    const renderExperienceList = function () {
      if (!state.resume.experiences.length) {
        return "<div class='empty-state'>你还没有加入经历。可以回到上一步把转译结果或补经历任务加入简历。</div>";
      }
      return state.resume.experiences.map(function (exp) {
        const bullets = exp.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("");
        return "<article class='resume-line'><h3>" + exp.title + "</h3><p class='meta'>" + exp.category + " · 来源：" + (exp.source === "task" ? "补经历任务" : "经历转译") + "</p><ul>" + bullets + "</ul></article>";
      }).join("");
    };

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第6步 · 你的第一份简历草稿</h2>"
      + "  <p class='section-subtitle'>先生成一页能投递、能讲清楚的版本，再逐步打磨。</p>"
      + "  <div class='resume-grid' style='margin-top:12px;'>"
      + "    <article class='card' style='padding:14px;'>"
      + "      <label>姓名<input id='nameInput' value='" + escapeAttr(state.resume.name) + "' placeholder='例如：张同学' /></label>"
      + "      <label>联系方式<input id='phoneInput' value='" + escapeAttr(state.resume.phone) + "' placeholder='手机或微信' /></label>"
      + "      <label>邮箱<input id='mailInput' value='" + escapeAttr(state.resume.email) + "' placeholder='example@school.edu.cn' /></label>"
      + "      <label>教育背景<input id='eduInput' value='" + escapeAttr(state.resume.education) + "' /></label>"
      + "      <label>求职方向<input id='objInput' value='" + escapeAttr(state.resume.objective || state.targetRole) + "' /></label>"
      + "      <label>个人摘要<textarea id='summaryInput'>" + escapeHtml(state.resume.summary) + "</textarea></label>"
      + "      <div class='actions'>"
      + "        <button class='soft-btn' id='toneStudent'>一键更学生化</button>"
      + "        <button class='soft-btn' id='tonePro'>一键更专业</button>"
      + "        <button class='warn-btn' id='toneSafe'>一键弱化夸张表达</button>"
      + "      </div>"
      + "      <div class='actions'>"
      + "        <button class='ghost-btn' id='downloadJson'>导出JSON草稿</button>"
      + "        <button class='ghost-btn' id='printPdf'>导出PDF（打印）</button>"
      + "      </div>"
      + "    </article>"
      + "    <article class='resume-paper' id='resumePaper'></article>"
      + "  </div>"
      + "  <div style='margin-top:10px;display:grid;gap:8px;'>" + renderExperienceList() + "</div>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backResume'>上一步</button><button class='btn' id='nextResume'>下一步：面试讲法</button></div></section>";

    function syncResumePaper() {
      const paper = main.querySelector("#resumePaper");
      if (!paper) return;
      const expHtml = state.resume.experiences.length
        ? state.resume.experiences.map(function (exp) {
            return "<li><strong>" + exp.title + "</strong>｜" + exp.bullets[0] + "</li>";
          }).join("")
        : "<li>暂无经历，先去上一步加入一段转译经历或任务经历。</li>";

      paper.innerHTML = ""
        + "<h3>" + (escapeHtml(state.resume.name || "你的名字")) + "</h3>"
        + "<p class='meta'>" + escapeHtml(state.resume.phone || "联系方式") + " · " + escapeHtml(state.resume.email || "邮箱") + "</p>"
        + "<div class='resume-sec'><h4>求职方向</h4><p class='meta'>" + escapeHtml(state.resume.objective || state.targetRole) + "</p></div>"
        + "<div class='resume-sec'><h4>教育背景</h4><p class='meta'>" + escapeHtml(state.resume.education || "某某大学 · 本科在读") + "</p></div>"
        + "<div class='resume-sec'><h4>个人优势摘要</h4><p class='meta'>" + escapeHtml(state.resume.summary || "") + "</p></div>"
        + "<div class='resume-sec'><h4>经历亮点</h4><ul>" + expHtml + "</ul></div>"
        + "<div class='resume-sec'><h4>技能</h4><p class='meta'>" + escapeHtml(state.resume.skills.join(" / ")) + "</p></div>";
    }

    const fields = [
      ["#nameInput", "name"],
      ["#phoneInput", "phone"],
      ["#mailInput", "email"],
      ["#eduInput", "education"],
      ["#objInput", "objective"],
      ["#summaryInput", "summary"]
    ];

    fields.forEach(function (pair) {
      const el = main.querySelector(pair[0]);
      const key = pair[1];
      if (!el) return;
      el.addEventListener("input", function () {
        state.resume[key] = el.value.trim();
        persist();
        syncResumePaper();
      });
    });

    main.querySelector("#toneStudent").addEventListener("click", function () {
      state.resume.summary = "目前处于" + state.targetRole + "方向起步阶段，愿意从基础任务做起，做事认真，能持续复盘改进。";
      persist();
      main.querySelector("#summaryInput").value = state.resume.summary;
      syncResumePaper();
      toast("已调整为更学生化表达");
    });

    main.querySelector("#tonePro").addEventListener("click", function () {
      state.resume.summary = "关注" + state.targetRole + "方向，具备信息整理、任务拆解与基础交付能力，能在反馈中快速迭代。";
      persist();
      main.querySelector("#summaryInput").value = state.resume.summary;
      syncResumePaper();
      toast("已调整为更专业表达");
    });

    main.querySelector("#toneSafe").addEventListener("click", function () {
      state.resume.experiences = state.resume.experiences.map(function (exp) {
        return {
          ...exp,
          bullets: exp.bullets.map(sanitizeBullet)
        };
      });
      persist();
      renderResumePage(main);
      toast("已弱化夸张词，保持真实可信");
    });

    main.querySelector("#downloadJson").addEventListener("click", function () {
      const payload = {
        exportedAt: new Date().toISOString(),
        targetRole: state.targetRole,
        resume: state.resume,
        translated: state.translated,
        datasetSize: state.dataset.logs.length
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "first-resume-draft.json";
      link.click();
      URL.revokeObjectURL(url);
      toast("已导出 JSON 草稿");
    });

    main.querySelector("#printPdf").addEventListener("click", function () {
      window.print();
    });

    main.querySelector("#backResume").addEventListener("click", function () {
      goStep("task");
    });

    main.querySelector("#nextResume").addEventListener("click", function () {
      goStep("interview");
    });

    syncResumePaper();
  }

  function storyFromExperience(exp) {
    if (state.translated && exp.title === state.translated.title) {
      return state.translated.interviewStory;
    }
    return buildInterviewStory(exp.title, exp.bullets);
  }

  function renderInterviewPage(main) {
    const stories = state.resume.experiences.map(function (exp) {
      const story = storyFromExperience(exp);
      const followupHtml = story.followups.map(function (pair) {
        return "<li><strong>追问：</strong>" + pair.q + "<br/><strong>可答：</strong>" + pair.a + "</li>";
      }).join("");
      const dontSayHtml = story.dontSay.map(function (line) {
        return "<li>" + line + "</li>";
      }).join("");
      const tipsHtml = story.detailTips.map(function (line) {
        return "<li>" + line + "</li>";
      }).join("");

      return ""
        + "<article class='story-card'>"
        + "  <h3>" + exp.title + "</h3>"
        + "  <p class='meta'>30秒版本</p><p class='helper'>" + story.short + "</p>"
        + "  <p class='meta'>1分钟版本</p><p class='helper'>" + story.long + "</p>"
        + "  <p class='meta'>面试官可能追问</p><ul>" + followupHtml + "</ul>"
        + "  <p class='meta'>哪些地方不能乱说</p><ul>" + dontSayHtml + "</ul>"
        + "  <p class='meta'>可补充的真实细节</p><ul>" + tipsHtml + "</ul>"
        + "</article>";
    }).join("");

    const bodyHtml = state.resume.experiences.length
      ? "<div class='story-grid' style='margin-top:12px;'>" + stories + "</div>"
      : "<div class='empty-state'>还没有经历可讲。先回到上一页加入至少一段经历，再来生成面试讲法。<div class='actions'><button class='soft-btn' id='toResume'>回到简历草稿</button></div></div>";

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第7步 · 简历写上去，也要讲得出来</h2>"
      + "  <p class='section-subtitle'>每段内容都给你自然语言讲法，不是死板STAR套句。</p>"
      + bodyHtml
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backInterview'>上一步</button><button class='btn' id='nextInterview'>下一步：成长闭环</button></div></section>";

    const toResume = main.querySelector("#toResume");
    if (toResume) {
      toResume.addEventListener("click", function () {
        goStep("resume");
      });
    }

    main.querySelector("#backInterview").addEventListener("click", function () {
      goStep("resume");
    });

    main.querySelector("#nextInterview").addEventListener("click", function () {
      goStep("loop");
    });
  }

  function renderLoopPage(main) {
    const recommended = pickTasks(state.targetRole);
    const recommendHtml = recommended.map(function (task) {
      return "<article class='task-card'><h3>" + task.title + "</h3><p>" + task.duration + " · " + task.difficulty + "难度</p><ul>" + task.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul></article>";
    }).join("");

    const expCount = state.resume.experiences.length;
    const taskCount = state.resume.experiences.filter(function (exp) { return exp.source === "task"; }).length;
    const feedbackCount = state.feedbackLogs.length;
    const datasetCount = state.dataset.logs.length;

    const feedbackList = state.feedbackLogs.slice(-3).reverse().map(function (item) {
      return "<article class='feedback-card'><p class='meta'>" + formatDate(item.createdAt) + "</p><p class='helper'>" + escapeHtml(item.text) + "</p></article>";
    }).join("");

    main.innerHTML = ""
      + "<section class='panel'>"
      + "  <h2 class='section-title'>第8步 · 形成闭环：经历 -> 投递表达 -> 面试反馈</h2>"
      + "  <p class='section-subtitle'>你已经完成第一轮起步。现在把反馈沉淀下来，下一轮会更稳。</p>"
      + "  <div class='metric-grid' style='margin-top:12px;'>"
      + "    <article class='metric-card'><strong>" + expCount + "</strong><p>简历经历条数</p></article>"
      + "    <article class='metric-card'><strong>" + taskCount + "</strong><p>由任务补齐的经历</p></article>"
      + "    <article class='metric-card'><strong>" + feedbackCount + "</strong><p>面试反馈条数</p></article>"
      + "    <article class='metric-card'><strong>" + datasetCount + "</strong><p>本地沉淀数据</p></article>"
      + "  </div>"
      + "</section>"
      + "<section class='panel'>"
      + "  <h3 class='section-title'>记录一次面试反馈</h3>"
      + "  <p class='section-subtitle'>写下你被问住的点或新的证据细节，下一轮简历会更可信。</p>"
      + "  <label for='feedbackText'>反馈内容</label>"
      + "  <textarea id='feedbackText' placeholder='例如：面试官追问我具体做了多少页PPT，我当时说不清。下次要补齐页数和分工细节。'></textarea>"
      + "  <div class='actions'><button class='btn' id='saveFeedback'>保存反馈</button></div>"
      + "  <div style='margin-top:10px;display:grid;gap:8px;'>" + (feedbackList || "<div class='empty-state'>还没有反馈记录，先写一条，闭环就建立起来了。</div>") + "</div>"
      + "</section>"
      + "<section class='panel'>"
      + "  <h3 class='section-title'>下一段经历，可以这样补</h3>"
      + "  <div class='tasks-grid' style='margin-top:12px;'>" + recommendHtml + "</div>"
      + "</section>"
      + "<section class='sticky-actions action-card'><div class='actions'><button class='ghost-btn' id='backLoop'>上一步</button><button class='soft-btn' id='restartFlow'>开始新一轮</button></div></section>";

    main.querySelector("#saveFeedback").addEventListener("click", function () {
      const text = (main.querySelector("#feedbackText").value || "").trim();
      if (!text) {
        toast("先写一句真实反馈");
        return;
      }
      const row = { id: "fb_" + Date.now(), text: text, createdAt: new Date().toISOString() };
      state.feedbackLogs.push(row);
      addDatasetLog("feedback", { text: text });
      persist();
      renderLoopPage(main);
      toast("反馈已保存，本地数据集已更新");
    });

    main.querySelector("#backLoop").addEventListener("click", function () {
      goStep("interview");
    });

    main.querySelector("#restartFlow").addEventListener("click", function () {
      const keepDataset = window.confirm("开始新一轮会清空当前简历内容，保留历史数据沉淀，是否继续？");
      if (!keepDataset) {
        return;
      }
      const logs = state.dataset.logs.slice();
      const feedback = state.feedbackLogs.slice();
      state = defaultState();
      state.dataset.logs = logs;
      state.feedbackLogs = feedback;
      persist();
      goStep("status");
    });
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/`/g, "");
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return y + "-" + m + "-" + day + " " + h + ":" + min;
  }

  function renderCurrentPage(stepId) {
    const main = document.getElementById("appMain");
    if (!main) {
      return;
    }

    renderProgress(stepId);

    if (stepId === "status") {
      renderStatusPage(main);
      return;
    }
    if (stepId === "role") {
      renderRolePage(main);
      return;
    }
    if (stepId === "experience") {
      renderExperiencePage(main);
      return;
    }
    if (stepId === "translate") {
      renderTranslatePage(main);
      return;
    }
    if (stepId === "task") {
      renderTaskPage(main);
      return;
    }
    if (stepId === "resume") {
      renderResumePage(main);
      return;
    }
    if (stepId === "interview") {
      renderInterviewPage(main);
      return;
    }
    if (stepId === "loop") {
      renderLoopPage(main);
      return;
    }

    renderStatusPage(main);
  }

  function init() {
    initTopActions();
    const stepId = currentStepId();
    if (!guardRoute(stepId)) {
      return;
    }
    renderCurrentPage(stepId);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
