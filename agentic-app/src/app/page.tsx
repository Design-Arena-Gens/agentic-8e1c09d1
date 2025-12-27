"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type Stage = {
  id: string;
  title: string;
  ageRange: string;
  summary: string;
  signal: string;
  focus: string[];
};

type Milestone = {
  threshold: number;
  title: string;
  description: string;
};

type AutoLesson = {
  title: string;
  resource: string;
  duration: string;
  outcome: string;
  mentorPersona: string;
  focusSkill: string;
};

type SkillIndicator = {
  label: string;
  value: number;
  description: string;
};

type Resource = {
  title: string;
  type: string;
  summary: string;
  highlights: string[];
  href: string;
  duration: string;
};

const STAGES: Stage[] = [
  {
    id: "curiosity",
    title: "کنجکاوی روشن",
    ageRange: "۳ تا ۶ سال",
    summary:
      "نوآموز با بازی‌های حسی و داستان‌های کوتاه صداها، رنگ‌ها و شکل‌ها را کشف می‌کند و واژگان پایه را می‌آموزد.",
    signal: "آماده برای خواندن مشترک",
    focus: [
      "آواشناسی شاد",
      "هماهنگی چشم و دست",
      "هوش هیجانی و بیان احساس",
    ],
  },
  {
    id: "discovery",
    title: "اکتشاف هدفمند",
    ageRange: "۶ تا ۹ سال",
    summary:
      "تمرکز بر ساختن تمرین‌های خودکار خواندن، ریاضی تصویری و پروژه‌های علمی کوچک با بازخورد لحظه‌ای.",
    signal: "تهیه گزارش روزانهٔ ساده",
    focus: [
      "خواندن مستقل و خلاصه‌نویسی",
      "درک عدد و الگو",
      "آزمایش‌های سادهٔ علوم",
    ],
  },
  {
    id: "explore",
    title: "کاوش خلاق",
    ageRange: "۹ تا ۱۲ سال",
    summary:
      "طراحی پژوهش‌های کوچک، ساخت پروژه در Scratch و نگارش گزارش‌های ساختاریافته با استفاده از منابع معتبر.",
    signal: "ارائهٔ پروژهٔ تعاملی",
    focus: [
      "تفکر محاسباتی",
      "حل مسئله چند مرحله‌ای",
      "تفکر نقاد و تحلیل منابع",
    ],
  },
  {
    id: "innovate",
    title: "نوجویی مستقل",
    ageRange: "۱۲+",
    summary:
      "نوآموز به یک همیار خودگردان تبدیل می‌شود که اهداف یادگیری را تعیین می‌کند و روی پروژه‌های میان‌رشته‌ای کار می‌کند.",
    signal: "مربی‌گری همسالان و گزارش پیشرفته",
    focus: [
      "برنامه‌ریزی هدفمند بلندمدت",
      "پژوهش داده‌محور",
      "کار تیمی و ارائهٔ حرفه‌ای",
    ],
  },
];

const MILESTONES: Milestone[] = [
  {
    threshold: 35,
    title: "پیش‌خواندن کامل",
    description:
      "نوآموز داستان‌های مصور را با همراهی کم می‌خواند و واژگان تازه را در بازی‌های روزانه تمرین می‌کند.",
  },
  {
    threshold: 55,
    title: "پژوهشگر کوچک",
    description:
      "یادگیرنده می‌تواند یک سؤال علمی را طرح کند، دادهٔ ساده جمع‌آوری کند و نتیجه را توضیح دهد.",
  },
  {
    threshold: 75,
    title: "سازندهٔ خلاق",
    description:
      "پروژه‌های دیجیتال و دست‌ساز را ترکیب می‌کند تا ایده‌هایش را به نمایش بگذارد و بازخورد می‌گیرد.",
  },
  {
    threshold: 95,
    title: "همیار هوشمند",
    description:
      "اهداف یادگیری جدید را خودش تعریف می‌کند، منابع درست را انتخاب می‌کند و به دیگران کمک می‌کند.",
  },
];

const AUTO_LESSONS: AutoLesson[] = [
  {
    title: "ماجراجویی الفبا با Khan Academy Kids",
    resource: "https://learn.khanacademy.org/khan-academy-kids/",
    duration: "۱۵ دقیقه تمرین هدایت‌شده",
    outcome: "شناخت ۷ صدای تازه و بازی تشخیص واژه",
    mentorPersona: "همراه شنیداری لطیف",
    focusSkill: "خواندن پایه",
  },
  {
    title: "ریاضی نوآموز با DreamBox",
    resource: "https://www.dreambox.com/",
    duration: "۲۰ دقیقه مسیر تطبیقی",
    outcome: "درک جمع و تفریق با نمایش تصویری و بازخورد فوری",
    mentorPersona: "روبات مربی صبور",
    focusSkill: "درک عدد و الگو",
  },
  {
    title: "آزمایش حباب‌های علمی",
    resource: "https://mysteryscience.com/",
    duration: "۲۵ دقیقه جست‌وجو و آزمایش",
    outcome: "طراحی جدول مشاهده و توضیح دلیل پدیده",
    mentorPersona: "دانشمند کنجکاو",
    focusSkill: "علوم تجربی",
  },
  {
    title: "داستان‌سازی تعاملی در Scratch",
    resource: "https://scratch.mit.edu/",
    duration: "۳۰ دقیقه پروژهٔ خلاق",
    outcome: "ساخت روایت تعاملی با حلقه و شرط ساده",
    mentorPersona: "راهنمای خلاق",
    focusSkill: "تفکر محاسباتی",
  },
];

const SKILLS: SkillIndicator[] = [
  {
    label: "خواندن و سواد پایه",
    value: 72,
    description: "روایت داستان‌های کوتاه، استخراج ایدهٔ اصلی و واژه‌سازی نو.",
  },
  {
    label: "ریاضی مفهومی",
    value: 58,
    description: "حل مسئله با نمایش تصویری، تشخیص الگو و توضیح دلیل.",
  },
  {
    label: "علوم تجربی",
    value: 46,
    description: "اجرای آزمایش ساده، ثبت داده و بیان فرضیه به زبان کودکانه.",
  },
  {
    label: "خلاقیت و سازندگی",
    value: 64,
    description: "ترکیب هنر و کدنویسی تصویری برای ساخت پروژه‌های تعاملی.",
  },
];

const RESOURCE_LIBRARY: Resource[] = [
  {
    title: "داستان‌های تعاملی Vooks",
    type: "روایت دیجیتال",
    summary:
      "کتابخانه‌ای از داستان‌های تصویری و دوبله‌شده که واژگان را به شکل طبیعی در ذهن می‌نشاند.",
    highlights: ["زیرنویس همزمان", "پخش کنترل‌شده برای والدین", "تمرین واژگان"],
    href: "https://www.vooks.com/",
    duration: "۱۰ دقیقه تجربهٔ هدایت‌شده",
  },
  {
    title: "کلاس بازی‌های سواد رسانه‌ای",
    type: "بازی آموزشی",
    summary:
      "مجموعه‌ای از مأموریت‌ها برای تشخیص واقعیت از شایعه و تقویت تفکر نقاد در فضای دیجیتال.",
    highlights: ["سنجش لحظه‌ای", "گفت‌وگوی راهنما", "گزارش برای والدین"],
    href: "https://www.commonsense.org/education/digital-citizenship",
    duration: "۱۵ دقیقه در هر مأموریت",
  },
  {
    title: "کتاب کار تعادل احساس",
    type: "سلامت هیجانی",
    summary:
      "فعالیت‌های تصویری برای نام‌گذاری احساسات، تنفس عمیق و حل تعارض به زبان ساده.",
    highlights: ["چاپ‌پذیر", "برنامهٔ روزانه سه‌مرحله‌ای", "پیشنهاد گفت‌وگو با خانواده"],
    href: "https://www.positiveaction.net/ebooks",
    duration: "۵ دقیقه تمرین روزانه",
  },
  {
    title: "آزمایشگاه میکرو:بیت",
    type: "پروژهٔ مهندسی",
    summary:
      "نقشهٔ ساخت پروژه‌های هیجان‌انگیز با micro:bit برای یادگیری الکترونیک و کدنویسی بلاکی.",
    highlights: ["کد آمادهٔ تست", "بخش توسعهٔ چالش", "پیشنهاد ارتقاء پروژه"],
    href: "https://microbit.org/projects/",
    duration: "۳۰ دقیقه ساخت و آزمون",
  },
  {
    title: "تور مجازی موزه علوم لندن",
    type: "کاوش علمی",
    summary:
      "تور هدایت‌شده از نمایشگاه‌های علمی با پرسش‌های تعاملی و دفترچهٔ یادداشت آماده.",
    highlights: ["پرسشنامهٔ دیجیتال", "واژگان کلیدی", "پیشنهاد فعالیت خانگی"],
    href: "https://learning.sciencemuseumgroup.org.uk/resources/online-exhibitions/",
    duration: "۲۰ دقیقه کاوش فعال",
  },
  {
    title: "راهنمای والدین برای آموزش خودکار",
    type: "پشتیبانی والدین",
    summary:
      "چک‌لیست هفتگی برای همگام‌سازی والدین و نوآموز، شامل تحلیل داده و پیشنهاد فعالیت مشترک.",
    highlights: ["الگوی گزارش پیشرفت", "پرسش‌های گفت‌وگو", "جدول تنظیم عادت"],
    href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports",
    duration: "۱۵ دقیقه مرور هفتگی",
  },
];

const BASELINE_PROGRESS = 24;
const START_DATE = new Date("2024-01-12T08:00:00Z");

export default function Home() {
  const [progress, setProgress] = useState<number>(BASELINE_PROGRESS);
  const [activityIndex, setActivityIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) {
          return prev;
        }
        const increment = 1 + Math.floor(Math.random() * 3);
        return Math.min(prev + increment, 94);
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!AUTO_LESSONS.length) {
      return undefined;
    }

    const rotation = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % AUTO_LESSONS.length);
    }, 7000);

    return () => clearInterval(rotation);
  }, []);

  const nextMilestone = useMemo<Milestone>(() => {
    const upcoming =
      MILESTONES.find((milestone) => milestone.threshold > progress) ??
      MILESTONES[MILESTONES.length - 1];
    return upcoming;
  }, [progress]);

  const activeLesson = AUTO_LESSONS[activityIndex] ?? AUTO_LESSONS[0];

  const [daysActive] = useState(() => {
    const diff =
      (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.floor(diff));
  });

  const [today] = useState(() => {
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "long",
      }).format(new Date());
    } catch {
      return new Date().toLocaleDateString("fa-IR");
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <header className={styles.heroCard}>
          <div className={styles.heroBadge}>یار یادگیری خودکار</div>
          <h1 className={styles.heroTitle}>
            نوآموزی که خودش از وب می‌آموزد و هر روز بزرگ‌تر می‌شود
          </h1>
          <p className={styles.heroDescription}>
            این داشبورد مسیر یک کودک کنجکاو را دنبال می‌کند که با کمک
            درس‌های تعاملی و مربیان دیجیتال، گام‌به‌گام سواد، تفکر نقاد و
            خلاقیت را می‌آموزد.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#journey">
              مشاهدهٔ مسیر رشد
            </a>
            <a className={styles.secondaryAction} href="#resources">
              کتابخانهٔ منابع
            </a>
          </div>
          <div className={styles.heroMetrics}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>پیشرفت کلی رشد</span>
              <span className={styles.metricValue}>{progress}%</span>
              <span className={styles.metricHint}>
                به‌روزرسانی هوشمند هر ۶ دقیقه
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>روزهای فعالیت</span>
              <span className={styles.metricValue}>{daysActive}+</span>
              <span className={styles.metricHint}>
                از {today} در حال یادگیری فعال
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>تمرکز امروز</span>
              <span className={styles.metricValue}>
                {activeLesson?.focusSkill}
              </span>
              <span className={styles.metricHint}>
                مربی فعال: {activeLesson?.mentorPersona}
              </span>
            </div>
          </div>
        </header>

        <section className={styles.section} id="journey">
          <div className={styles.sectionHeader}>
            <h2>مسیر رشد نوآموز خودکار</h2>
            <p>
              مراحل یادگیری خودران از کنجکاوی تا استقلال کامل طراحی شده‌اند؛
              هر مرحله تمرین‌ها، عادات و نشانه‌های خودش را دارد.
            </p>
          </div>
          <div className={styles.stageGrid}>
            {STAGES.map((stage) => (
              <article key={stage.id} className={styles.stageCard}>
                <header className={styles.stageHeader}>
                  <div>
                    <span className={styles.stageBadge}>{stage.ageRange}</span>
                    <h3 className={styles.stageTitle}>{stage.title}</h3>
                  </div>
                  <span className={styles.stageSignal}>{stage.signal}</span>
                </header>
                <p className={styles.stageSummary}>{stage.summary}</p>
                <ul className={styles.stageList}>
                  {stage.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="control">
          <div className={styles.sectionHeader}>
            <h2>اتاق کنترل خودآموز</h2>
            <p>
              موتور هدایت مسیر، درس‌های خودکار و وضعیت بعدی را نشان می‌دهد
              تا نوآموز بداند گام بعد چیست.
            </p>
          </div>

          <div className={styles.consoleGrid}>
            <article className={styles.consoleCard}>
              <h3>پایش رشد لحظه‌ای</h3>
              <div className={styles.consoleStatRow}>
                <div className={styles.consoleStat}>
                  <span className={styles.consoleLabel}>گام بعدی</span>
                  <strong className={styles.consoleValue}>
                    {nextMilestone.title}
                  </strong>
                  <p className={styles.consoleHint}>
                    {nextMilestone.description}
                  </p>
                </div>
                <div className={styles.consoleProgress}>
                  <div className={styles.progressTrack}>
                    <span
                      className={styles.progressValue}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={styles.progressMeta}>
                    <span>پیشرفت فعلی</span>
                    <span>{progress}%</span>
                  </div>
                  <div className={styles.progressMeta}>
                    <span>آستانهٔ مرحلهٔ بعد</span>
                    <span>{nextMilestone.threshold}%</span>
                  </div>
                </div>
              </div>
              <div className={styles.consoleHighlights}>
                <span>میانگین تمرین روزانه: ۴۲ دقیقه</span>
                <span>ضریب استقلال امروز: ۸۳٪</span>
                <span>جلسات تکمیل‌شده این هفته: ۱۲</span>
              </div>
            </article>

            <article className={styles.consoleCard}>
              <h3>حلقهٔ یادگیری فعال</h3>
              <div className={styles.activeLesson}>
                <div>
                  <span className={styles.lessonTag}>
                    تمرکز: {activeLesson.focusSkill}
                  </span>
                  <h4 className={styles.lessonTitle}>
                    {activeLesson.title}
                  </h4>
                </div>
                <p className={styles.lessonOutcome}>{activeLesson.outcome}</p>
                <div className={styles.lessonMeta}>
                  <span>{activeLesson.duration}</span>
                  <a
                    href={activeLesson.resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.lessonLink}
                  >
                    شروع خودکار
                  </a>
                </div>
              </div>
              <ul className={styles.lessonTimeline}>
                {AUTO_LESSONS.map((lesson, index) => (
                  <li
                    key={lesson.title}
                    className={
                      index === activityIndex
                        ? styles.lessonItemActive
                        : styles.lessonItem
                    }
                  >
                    <span className={styles.lessonIndex}>
                      {index + 1 < 10 ? `۰${index + 1}` : index + 1}
                    </span>
                    <div className={styles.lessonCopy}>
                      <strong>{lesson.title}</strong>
                      <span>{lesson.focusSkill}</span>
                    </div>
                    <span className={styles.lessonDuration}>
                      {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section} id="skills">
          <div className={styles.sectionHeader}>
            <h2>شاخص‌های مهارتی</h2>
            <p>
              دماسنج رشد مهارت نشان می‌دهد نوآموز در هر حوزه چقدر پیش رفته و
              چه چیزی باید تقویت شود.
            </p>
          </div>
          <div className={styles.skillGrid}>
            {SKILLS.map((skill) => (
              <article key={skill.label} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <span>{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className={styles.skillBar}>
                  <span style={{ width: `${skill.value}%` }} />
                </div>
                <p className={styles.skillSummary}>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="resources">
          <div className={styles.sectionHeader}>
            <h2>کتابخانهٔ منابع پیشنهادی</h2>
            <p>
              مجموعه‌ای از درس‌ها و فعالیت‌ها که نوآموز به شکل خودگردان سر
              می‌زند تا مهارت‌های تازه بسازد و بزرگ‌تر شود.
            </p>
          </div>
          <div className={styles.resourceGrid}>
            {RESOURCE_LIBRARY.map((resource) => (
              <article key={resource.title} className={styles.resourceCard}>
                <span className={styles.resourceType}>{resource.type}</span>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <p className={styles.resourceSummary}>{resource.summary}</p>
                <ul className={styles.resourceList}>
                  {resource.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className={styles.resourceFooter}>
                  <span className={styles.resourceDuration}>
                    {resource.duration}
                  </span>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                  >
                    مشاهدهٔ منبع
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            نوآموز هر روز کمی مستقل‌تر می‌شود. با دنبال‌کردن عادت‌های پایدار،
            او می‌تواند خودش مسیر یادگیری را کشف کند و با دیگران به اشتراک
            بگذارد.
          </p>
        </footer>
      </div>
    </div>
  );
}
