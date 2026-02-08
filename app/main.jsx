const { useEffect, useMemo, useState } = React;

const content = {
  en: {
    dir: 'ltr',
    brand: 'NovaReach',
    nav: ['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'Blog', 'Contact'],
    hero: {
      badge: 'Performance-Driven Digital Marketing',
      title: 'Scale Faster with Strategic Marketing That Converts',
      subtitle:
        'We blend data, design, and storytelling to help ambitious brands attract quality leads and maximize ROI.',
      ctaPrimary: 'Book a Strategy Call',
      ctaSecondary: 'View Case Studies'
    },
    servicesPreviewTitle: 'Services that move your metrics',
    whyTitle: 'Why high-growth brands choose us',
    whyItems: [
      { title: 'ROI-first execution', text: 'Every campaign is tied to measurable business outcomes.' },
      { title: 'Full-funnel expertise', text: 'From awareness to retention, we optimize each touchpoint.' },
      { title: 'Transparent reporting', text: 'Live dashboards and clear weekly insights.' }
    ],
    trusted: 'Trusted by forward-thinking teams',
    about: {
      title: 'About NovaReach',
      overview:
        'We are a digital marketing agency helping startups and enterprises build strong digital presence through growth strategies, paid media, and creative content.',
      mission: 'Deliver measurable growth with ethical and innovative digital strategies.',
      vision: 'To become the most trusted bilingual growth partner in MENA and beyond.'
    },
    servicesTitle: 'Our core services',
    portfolioTitle: 'Case studies and portfolio',
    portfolioFilter: ['All', 'SEO', 'Paid Media', 'Branding', 'Content'],
    pricingTitle: 'Simple pricing built for growth',
    blogTitle: 'Marketing insights and trends',
    contactTitle: 'Let’s build your next growth chapter',
    contact: {
      name: 'Full Name',
      email: 'Work Email',
      company: 'Company',
      message: 'Project Goals',
      submit: 'Send Message'
    },
    whatsapp: 'Chat on WhatsApp',
    map: 'Interactive map placeholder',
    testimonialsTitle: 'What our clients say',
    footer: '© 2026 NovaReach. All rights reserved.',
    blogDetailsHeading: 'Blog details layout',
    readMore: 'Read More',
    languageLabel: 'AR'
  },
  ar: {
    dir: 'rtl',
    brand: 'نوفا ريتش',
    nav: ['الرئيسية', 'من نحن', 'الخدمات', 'الأعمال', 'الأسعار', 'المدونة', 'اتصل بنا'],
    hero: {
      badge: 'تسويق رقمي قائم على الأداء',
      title: 'نمِّ أعمالك بسرعة عبر تسويق استراتيجي يحقق التحويل',
      subtitle:
        'نجمع بين البيانات والتصميم والسرد الإبداعي لمساعدة العلامات الطموحة على جذب عملاء مؤهلين وتعظيم العائد.',
      ctaPrimary: 'احجز جلسة استراتيجية',
      ctaSecondary: 'شاهد دراسات الحالة'
    },
    servicesPreviewTitle: 'خدمات ترفع مؤشرات نموك',
    whyTitle: 'لماذا تختارنا العلامات سريعة النمو',
    whyItems: [
      { title: 'تنفيذ يركز على العائد', text: 'كل حملة مرتبطة بنتائج أعمال قابلة للقياس.' },
      { title: 'خبرة على كامل القمع', text: 'من الوعي إلى الولاء، نحسن كل نقطة تواصل.' },
      { title: 'تقارير شفافة', text: 'لوحات تحكم مباشرة ورؤى أسبوعية واضحة.' }
    ],
    trusted: 'موثوقون من قبل فرق رائدة',
    about: {
      title: 'عن نوفا ريتش',
      overview:
        'نحن وكالة تسويق رقمي تساعد الشركات الناشئة والمؤسسات على بناء حضور قوي عبر استراتيجيات النمو والإعلانات والمحتوى الإبداعي.',
      mission: 'تحقيق نمو ملموس عبر استراتيجيات رقمية أخلاقية ومبتكرة.',
      vision: 'أن نكون الشريك الأكثر ثقة للنمو ثنائي اللغة في المنطقة وخارجها.'
    },
    servicesTitle: 'خدماتنا الأساسية',
    portfolioTitle: 'دراسات الحالة والأعمال',
    portfolioFilter: ['الكل', 'SEO', 'إعلانات', 'الهوية', 'المحتوى'],
    pricingTitle: 'أسعار واضحة مصممة للنمو',
    blogTitle: 'رؤى واتجاهات التسويق',
    contactTitle: 'لنصنع فصل نموك القادم',
    contact: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      company: 'الشركة',
      message: 'أهداف المشروع',
      submit: 'إرسال الرسالة'
    },
    whatsapp: 'تواصل عبر واتساب',
    map: 'مكان مخصص للخريطة التفاعلية',
    testimonialsTitle: 'ماذا يقول عملاؤنا',
    footer: '© 2026 نوفا ريتش. جميع الحقوق محفوظة.',
    blogDetailsHeading: 'تصميم صفحة تفاصيل المقال',
    readMore: 'اقرأ المزيد',
    languageLabel: 'EN'
  }
};

const services = [
  { icon: '📈', titleEn: 'SEO Growth', titleAr: 'نمو SEO', descEn: 'Technical + content SEO to dominate rankings.', descAr: 'تحسين تقني ومحتوى لتصدر نتائج البحث.' },
  { icon: '🎯', titleEn: 'Paid Media', titleAr: 'الإعلانات المدفوعة', descEn: 'Data-backed campaigns across Google and Meta.', descAr: 'حملات قائمة على البيانات عبر جوجل وميتا.' },
  { icon: '🧠', titleEn: 'Brand Strategy', titleAr: 'استراتيجية العلامة', descEn: 'Positioning and messaging that drive recall.', descAr: 'تموضع ورسائل تعزز تذكر العلامة.' },
  { icon: '✍️', titleEn: 'Content Marketing', titleAr: 'تسويق المحتوى', descEn: 'Editorial systems that create trust and leads.', descAr: 'أنظمة محتوى تبني الثقة وتولد العملاء.' }
];

const portfolioItems = [
  { category: 'SEO', categoryAr: 'SEO', titleEn: 'B2B SaaS Organic Lift', titleAr: 'قفزة عضوية لشركة SaaS', impactEn: '+220% organic leads', impactAr: '+220٪ في العملاء العضويين' },
  { category: 'Paid Media', categoryAr: 'إعلانات', titleEn: 'E-commerce ROAS Boost', titleAr: 'رفع عائد متجر إلكتروني', impactEn: '4.8x ROAS', impactAr: 'عائد 4.8x' },
  { category: 'Branding', categoryAr: 'الهوية', titleEn: 'FinTech Rebrand', titleAr: 'إعادة بناء علامة تقنية مالية', impactEn: '+41% direct traffic', impactAr: '+41٪ زيارات مباشرة' },
  { category: 'Content', categoryAr: 'المحتوى', titleEn: 'Thought Leadership Hub', titleAr: 'منصة قيادة فكرية', impactEn: '65 qualified leads/month', impactAr: '65 عميلًا مؤهلًا/شهريًا' }
];

const testimonials = [
  {
    en: 'NovaReach transformed our pipeline in 90 days. Their reporting clarity is unmatched.',
    ar: 'غيّرت نوفا ريتش خط المبيعات لدينا خلال 90 يومًا. وضوح التقارير لا مثيل له.',
    nameEn: 'Lina K.',
    nameAr: 'لينا ك.'
  },
  {
    en: 'The bilingual campaigns helped us expand into new GCC markets effectively.',
    ar: 'ساعدتنا الحملات ثنائية اللغة على التوسع بفعالية في أسواق خليجية جديدة.',
    nameEn: 'Ahmed R.',
    nameAr: 'أحمد ر.'
  },
  {
    en: 'Creative, strategic, and deeply analytical. Exactly what a growth team needs.',
    ar: 'إبداعي واستراتيجي وتحليلي بعمق. هذا ما يحتاجه أي فريق نمو.',
    nameEn: 'Marta P.',
    nameAr: 'مارتا ب.'
  }
];

const pricing = [
  { nameEn: 'Starter', nameAr: 'بداية', price: '$899', featuresEn: ['1 channel', 'Monthly reporting', 'Email support'], featuresAr: ['قناة واحدة', 'تقارير شهرية', 'دعم عبر البريد'], recommended: false },
  { nameEn: 'Growth', nameAr: 'نمو', price: '$1,899', featuresEn: ['3 channels', 'Weekly optimization', 'Strategy workshops'], featuresAr: ['3 قنوات', 'تحسين أسبوعي', 'ورش استراتيجية'], recommended: true },
  { nameEn: 'Scale', nameAr: 'توسّع', price: '$3,499', featuresEn: ['Omnichannel', 'Advanced analytics', 'Dedicated manager'], featuresAr: ['حملات متعددة', 'تحليلات متقدمة', 'مدير حساب مخصص'], recommended: false }
];

const blogs = [
  { titleEn: 'How to Reduce CAC with Better Landing Pages', titleAr: 'كيف تقلل تكلفة اكتساب العميل عبر صفحات هبوط أفضل', excerptEn: 'Practical CRO principles to convert more paid traffic.', excerptAr: 'مبادئ عملية لرفع التحويل من الزيارات المدفوعة.' },
  { titleEn: '2026 SEO Playbook for Competitive Niches', titleAr: 'دليل SEO لعام 2026 للأسواق التنافسية', excerptEn: 'Build authority and rank for high-intent keywords.', excerptAr: 'ابنِ موثوقية وتصدر الكلمات ذات النية الشرائية.' },
  { titleEn: 'Building a Full-Funnel Content Engine', titleAr: 'بناء منظومة محتوى متكاملة على كامل القمع', excerptEn: 'From awareness content to sales enablement assets.', excerptAr: 'من محتوى الوعي حتى مواد دعم المبيعات.' }
];

function App() {
  const [lang, setLang] = useState('en');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [filter, setFilter] = useState('All');
  const [activeBlog, setActiveBlog] = useState(0);

  const t = content[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.body.classList.toggle('rtl', isRTL);
  }, [lang]);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);

  const filteredPortfolio = useMemo(() => {
    if ((lang === 'en' && filter === 'All') || (lang === 'ar' && filter === 'الكل')) return portfolioItems;
    return portfolioItems.filter((item) => (lang === 'en' ? item.category === filter : item.categoryAr === filter));
  }, [filter, lang]);

  return (
    <div className={`min-h-screen ${isRTL ? 'font-ar' : 'font-en'}`}>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-primary">{t.brand}</h1>
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {t.nav.map((item, idx) => (
              <li key={item}><a href={`#s-${idx}`} className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
          <button
            aria-label="Switch language"
            className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm hover:bg-primary transition"
            onClick={() => {
              const next = lang === 'en' ? 'ar' : 'en';
              setLang(next);
              setFilter(next === 'en' ? 'All' : 'الكل');
            }}
          >
            {t.languageLabel}
          </button>
        </nav>
      </header>

      <main>
        <section id="s-0" className="max-w-7xl mx-auto px-4 pt-14 pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold">{t.hero.badge}</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">{t.hero.title}</h2>
            <p className="text-lg text-slate-600">{t.hero.subtitle}</p>
            <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-start' : ''}`}>
              <button className="px-6 py-3 bg-primary text-white rounded-xl shadow-soft hover:-translate-y-0.5 transition">{t.hero.ctaPrimary}</button>
              <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl hover:border-primary hover:text-primary transition">{t.hero.ctaSecondary}</button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-secondary rounded-3xl p-8 text-white shadow-soft animate-float">
            <h3 className="text-2xl font-bold mb-4">{t.servicesPreviewTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((item) => (
                <article key={item.titleEn} className="bg-white/15 rounded-2xl p-4 backdrop-blur">
                  <p className="text-2xl">{item.icon}</p>
                  <h4 className="font-bold mt-2">{lang === 'en' ? item.titleEn : item.titleAr}</h4>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="s-1" className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="section-title">{t.about.title}</h3>
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <article className="card lg:col-span-2"><p>{t.about.overview}</p></article>
            <article className="card"><h4 className="font-bold mb-2">Mission</h4><p>{t.about.mission}</p></article>
            <article className="card"><h4 className="font-bold mb-2">Vision</h4><p>{t.about.vision}</p></article>
            <article className="card">
              <h4 className="font-bold mb-4">Team</h4>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                {['Strategist', 'Designer', 'Analyst'].map((role, idx) => (
                  <div key={idx} className="bg-slate-100 rounded-xl p-3">
                    <div className="w-10 h-10 mx-auto rounded-full bg-slate-300 mb-2" aria-hidden="true"></div>
                    {lang === 'en' ? role : ['استراتيجي', 'مصمم', 'محلل'][idx]}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="s-2" className="bg-white py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="section-title">{t.servicesTitle}</h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
              {services.map((item) => (
                <article key={item.titleEn} className="card hover:-translate-y-1 hover:shadow-soft transition-all">
                  <span className="text-3xl">{item.icon}</span>
                  <h4 className="font-bold mt-3">{lang === 'en' ? item.titleEn : item.titleAr}</h4>
                  <p className="text-slate-600 mt-2">{lang === 'en' ? item.descEn : item.descAr}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="s-3" className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="section-title">{t.portfolioTitle}</h3>
          <div className="flex flex-wrap gap-3 mt-6">
            {t.portfolioFilter.map((f) => (
              <button key={f} className={`px-4 py-2 rounded-full border ${filter === f ? 'bg-dark text-white' : 'bg-white'}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {filteredPortfolio.map((item) => (
              <article key={item.titleEn} className="card">
                <p className="text-sm text-primary font-semibold">{lang === 'en' ? item.category : item.categoryAr}</p>
                <h4 className="font-bold text-xl mt-2">{lang === 'en' ? item.titleEn : item.titleAr}</h4>
                <p className="text-slate-600 mt-2">{lang === 'en' ? item.impactEn : item.impactAr}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-8">{t.testimonialsTitle}</h3>
            <article className="bg-white/10 rounded-2xl p-8 min-h-[180px] flex flex-col justify-center">
              <p className="text-lg">“{lang === 'en' ? testimonials[activeTestimonial].en : testimonials[activeTestimonial].ar}”</p>
              <p className="mt-4 text-blue-200">— {lang === 'en' ? testimonials[activeTestimonial].nameEn : testimonials[activeTestimonial].nameAr}</p>
            </article>
            <div className="flex justify-center gap-2 mt-4" aria-label="Testimonial slider indicators">
              {testimonials.map((_, i) => <button key={i} className={`w-2.5 h-2.5 rounded-full ${i===activeTestimonial?'bg-white':'bg-white/40'}`} onClick={()=>setActiveTestimonial(i)}></button>)}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="section-title text-center">{t.trusted}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {['Aster', 'BlueJet', 'Nexa', 'Optimo', 'Vertex'].map((logo) => (
              <div key={logo} className="card text-center font-semibold text-slate-500">{logo}</div>
            ))}
          </div>
        </section>

        <section id="s-4" className="bg-white border-y border-slate-200 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="section-title">{t.pricingTitle}</h3>
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {pricing.map((plan) => (
                <article key={plan.nameEn} className={`card ${plan.recommended ? 'ring-2 ring-primary relative' : ''}`}>
                  {plan.recommended && <span className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 text-xs rounded-full">Popular</span>}
                  <h4 className="font-bold text-xl">{lang === 'en' ? plan.nameEn : plan.nameAr}</h4>
                  <p className="text-3xl font-extrabold my-4">{plan.price}</p>
                  <ul className="space-y-2 text-slate-600">
                    {(lang === 'en' ? plan.featuresEn : plan.featuresAr).map((feature) => <li key={feature}>• {feature}</li>)}
                  </ul>
                  <button className="mt-6 w-full py-2 rounded-lg bg-slate-900 text-white hover:bg-primary transition">Choose Plan</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="s-5" className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="section-title">{t.blogTitle}</h3>
          <div className="grid lg:grid-cols-3 gap-5 mt-8">
            {blogs.map((post, idx) => (
              <article key={post.titleEn} className="card">
                <div className="h-36 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 mb-4"></div>
                <h4 className="font-bold text-lg">{lang === 'en' ? post.titleEn : post.titleAr}</h4>
                <p className="text-slate-600 mt-2">{lang === 'en' ? post.excerptEn : post.excerptAr}</p>
                <button className="mt-4 text-primary font-semibold" onClick={() => setActiveBlog(idx)}>{t.readMore} →</button>
              </article>
            ))}
          </div>
          <article className="card mt-8">
            <h4 className="font-bold text-2xl mb-3">{t.blogDetailsHeading}</h4>
            <h5 className="font-semibold text-lg">{lang === 'en' ? blogs[activeBlog].titleEn : blogs[activeBlog].titleAr}</h5>
            <p className="mt-3 text-slate-600">{lang === 'en' ? blogs[activeBlog].excerptEn : blogs[activeBlog].excerptAr} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
          </article>
        </section>

        <section id="s-6" className="bg-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="section-title">{t.contactTitle}</h3>
              <form className="card mt-6 space-y-4" aria-label="Contact form">
                {[t.contact.name, t.contact.email, t.contact.company].map((placeholder) => (
                  <input key={placeholder} className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder={placeholder} aria-label={placeholder} />
                ))}
                <textarea className="w-full border border-slate-300 rounded-lg px-4 py-3 min-h-32" placeholder={t.contact.message} aria-label={t.contact.message}></textarea>
                <button type="button" className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition">{t.contact.submit}</button>
              </form>
            </div>
            <div className="space-y-5">
              <div className="card min-h-64 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600">{t.map}</div>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white shadow-soft">💬 {t.whatsapp}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark text-slate-300 py-6 text-center text-sm">{t.footer}</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
