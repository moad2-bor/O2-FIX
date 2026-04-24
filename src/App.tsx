import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  MonitorSmartphone, Battery, Droplet, 
  Cpu, Headphones, Shield, Phone, Mail, MapPin, 
  CheckCircle2, Clock, ChevronRight, ChevronLeft, Menu, X, Hammer,
  Sparkles, ArrowRight, MessageCircle
} from 'lucide-react';

const SERVICE_ICONS: Record<string, any> = {
  screen: MonitorSmartphone,
  battery: Battery,
  water: Droplet,
  logic: Cpu
};

const ACCESSORY_ICONS: Record<string, any> = {
  cases: Shield,
  audio: Headphones,
  charging: Battery
};

const translations = {
  en: {
    nav: { services: 'Services', accessories: 'Accessories', pricing: 'Pricing', contact: 'Contact', book: 'Book a Repair', lang: 'عربي' },
    hero: {
      badge: '#1 Rated Phone Repair',
      title1: 'We fix it right,',
      title2: 'fast & affordably.',
      desc: 'Expert repairs for iPhones, Androids, and tablets. Most screen and battery replacements done in under 45 minutes with premium quality parts.',
      bookBtn: 'Book a Repair',
      warranty: 'Lifetime Warranty',
      diagnostics: 'Free Diagnostics',
      turnaroundTitle: 'Quick Turnaround',
      turnaroundDesc: 'Most repairs under 45 mins'
    },
    services: {
      title: 'Our Repair Services',
      subtitle: 'From shattered screens to silent speakers, our certified technicians fix almost any issue.',
      items: [
        { id: 'screen', title: 'Screen Repair', desc: 'Fast, reliable screen replacement using premium parts for all major manufacturers.', price: 'From $79' },
        { id: 'battery', title: 'Battery Replacement', desc: 'Restore your phone\'s battery life back to 100% capacity in under 30 minutes.', price: 'From $49' },
        { id: 'water', title: 'Water Damage', desc: 'Liquid damage diagnostics, ultrasonic cleaning, and intensive logic board repair.', price: 'Free Diag.' },
        { id: 'logic', title: 'Logic Board Repair', desc: 'Advanced micro-soldering and component-level repairs including charge ICs.', price: 'Quote' },
      ]
    },
    accessories: {
      tag: 'Best Selling Accessories',
      title: 'Premium Accessories in Stock',
      desc: 'Protect your newly repaired device with our top-tier accessories.',
      items: [
        { id: 'cases', title: 'Premium Cases', desc: 'Drop-tested protective cases from top trusted brands.', price: 'From $15' },
        { id: 'audio', title: 'Audio & Wearables', desc: 'Wireless earbuds, headphones, and audio adapters.', price: 'From $25' },
        { id: 'charging', title: 'Fast Chargers', desc: 'Durable cables, high-capacity power banks, and fast chargers.', price: 'From $12' },
      ]
    },
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'Sample pricing for our most common repairs. Contact us for a quote.',
      headers: ['Device Model', 'Screen', 'Battery', 'Port'],
      warrantyText: 'All repairs include our Lifetime Warranty on parts and labor.',
      items: [
        { model: 'iPhone 15 Pro Max', screen: '$329', battery: '$99', port: '$109' },
        { model: 'iPhone 14 Pro', screen: '$279', battery: '$89', port: '$99' },
        { model: 'iPhone 13 / 13 Pro', screen: '$149', battery: '$79', port: '$89' },
        { model: 'Samsung S24 Ultra', screen: '$349', battery: '$109', port: '$119' },
        { model: 'Samsung S23 / S23+', screen: '$229', battery: '$99', port: '$109' },
        { model: 'Google Pixel 8 Pro', screen: '$249', battery: '$99', port: '$109' },
      ]
    },
    contact: {
      desc: 'Your trusted local experts for mobile device repairs, accessories, and data recovery. Certified components only.',
      title: 'Contact Us',
      address: '123 Repair Street, Tech City',
      hours: 'Business Hours',
      monFri: 'Mon - Fri',
      sat: 'Saturday',
      sun: 'Sunday',
      closed: 'Closed',
      footerDesc: 'Fast Turnaround — 90 Day Warranty — Original Parts',
      rights: '© {year} O2 FIX'
    },
    modal: {
      title: 'Book Appointment',
      subtitle: 'Secure your slot',
      success: 'Request Received!',
      successDesc: "We'll call you shortly to confirm your appointment time.",
      name: 'Full Name',
      namePlac: 'John Doe',
      phone: 'Phone Number',
      phonePlac: '(555) 000-0000',
      device: 'Device Model',
      devicePlaceholder: 'e.g. iPhone 15 Pro, Pixel 8...',
      issue: 'Repair Type',
      issueDefault: 'Select an issue...',
      issueOptions: [
        { val: 'screen', label: 'Screen Damage' },
        { val: 'battery', label: 'Battery Issue' },
        { val: 'charging', label: 'Charge Port' },
        { val: 'water', label: 'Water Damage' },
        { val: 'other', label: 'Software / Other' }
      ],
      date: 'Preferred Date (Optional)',
      submit: 'Secure My Slot',
      submitting: 'Submitting...',
      walkIns: 'Walk-ins are also welcome'
    }
  },
  ar: {
    nav: { services: 'الخدمات', accessories: 'الإكسسوارات', pricing: 'الأسعار', contact: 'اتصل بنا', book: 'احجز موعداً', lang: 'EN' },
    hero: {
      badge: 'المركز الأول في إصلاح الهواتف',
      title1: 'نصلحها بمهارة،',
      title2: 'بسرعة وبأسعار مناسبة.',
      desc: 'إصلاح احترافي لهواتف آيفون، أندرويد، والأجهزة اللوحية. معظم عمليات تغيير الشاشة والبطارية تتم في أقل من 45 دقيقة بقطع غيار أصلية.',
      bookBtn: 'احجز موعداً',
      warranty: 'ضمان مدى الحياة',
      diagnostics: 'فحص مجاني',
      turnaroundTitle: 'إنجاز سريع',
      turnaroundDesc: 'أغلب الأعطال تصلح في 45 دقيقة'
    },
    services: {
      title: 'خدمات الإصلاح لدينا',
      subtitle: 'من الشاشات المحطمة إلى مكبرات الصوت الصامتة، فنيونا المعتمدون ينجزون المهمة.',
      items: [
        { id: 'screen', title: 'إصلاح الشاشة', desc: 'استبدال سريع وموثوق للشاشة باستخدام قطع غيار أصلية معتمدة عبر فنيينا المختصين.', price: 'من $79' },
        { id: 'battery', title: 'تغيير البطارية', desc: 'استعد أداء بطاريتك إلى 100% في أقل من 30 دقيقة وانتظر في استراحتنا.', price: 'من $49' },
        { id: 'water', title: 'أضرار المياه', desc: 'فحص التلف الناتج عن السوائل، وتنظيف دقيق للصنيّات، وإصلاح اللوحة الأم.', price: 'مجانًا' },
        { id: 'logic', title: 'إصلاح اللوحة الأم', desc: 'توصيل دقيق وإصلاح على مستوى المكونات الدقيقة، بما في ذلك رقائق الشحن.', price: 'تسعيرة' },
      ]
    },
    accessories: {
      tag: 'الإكسسوارات الأكثر مبيعاً',
      title: 'إكسسوارات مميزة متوفرة',
      desc: 'احمِ جهازك الذي تم إصلاحه باستخدام أفضل الإكسسوارات لدينا من كبرى الشركات.',
      items: [
        { id: 'cases', title: 'أغطية حماية', desc: 'أغطية حماية مختبرة ضد السقوط من أفضل العلامات التجارية الموثوقة.', price: 'السعر من $15' },
        { id: 'audio', title: 'صوتيات وملبوسات', desc: 'سماعات أذن لاسلكية، سماعات رأس، ومحولات صوتية متطورة.', price: 'السعر من $25' },
        { id: 'charging', title: 'شواحن سريعة', desc: 'كابلات متينة، بنوك طاقة عالية السعة، ومكعبات شحن سريعة فعالة.', price: 'السعر من $12' },
      ]
    },
    pricing: {
      title: 'أسعار شفافة',
      subtitle: 'أسعار تقديرية لأكثر الإصلاحات شيوعًا. تواصل معنا للحصول على تسعيرة لغيرها.',
      headers: ['نوع الجهاز', 'الشاشة', 'البطارية', 'منفذ الشحن'],
      warrantyText: 'جميع الإصلاحات تشمل ضماننا مدى الحياة على قطع الغيار والعمالة المنجزة.',
      items: [
        { model: 'iPhone 15 Pro Max', screen: '$329', battery: '$99', port: '$109' },
        { model: 'iPhone 14 Pro', screen: '$279', battery: '$89', port: '$99' },
        { model: 'iPhone 13 / 13 Pro', screen: '$149', battery: '$79', port: '$89' },
        { model: 'Samsung S24 Ultra', screen: '$349', battery: '$109', port: '$119' },
        { model: 'Samsung S23 / S23+', screen: '$229', battery: '$99', port: '$109' },
        { model: 'Google Pixel 8 Pro', screen: '$249', battery: '$99', port: '$109' },
      ]
    },
    contact: {
      desc: 'خبراؤك المحليون الموثوقون لإصلاح الهواتف والأجهزة اللوحية، الإكسسوارات، واستعادة البيانات.',
      title: 'اتصل بنا',
      address: 'شارع الإصلاح رقم 123 ، مدينة التكنولوجيا',
      hours: 'ساعات العمل',
      monFri: 'الاثنين - الجمعة',
      sat: 'السبت',
      sun: 'الأحد',
      closed: 'مغلق',
      footerDesc: 'إنجاز سريع — ضمان 90 يومًا — قطع أصلية',
      rights: '© {year} O2 FIX. جميع الحقوق محفوظة.'
    },
    modal: {
      title: 'حجز موعد',
      subtitle: 'احجز وقتك مقدمًا',
      success: 'تم استلام الطلب!',
      successDesc: 'سنتصل بك قريباً لتأكيد موعدك لدينا.',
      name: 'الاسم الكامل',
      namePlac: 'أحمد محمود',
      phone: 'رقم الهاتف',
      phonePlac: '050 000 0000',
      device: 'نوع الجهاز',
      devicePlaceholder: 'مثال: iPhone 15 Pro, Pixel 8...',
      issue: 'نوع الإصلاح',
      issueDefault: 'اختر مشكلة...',
      issueOptions: [
        { val: 'screen', label: 'كسر الشاشة' },
        { val: 'battery', label: 'مشكلة في البطارية' },
        { val: 'charging', label: 'منفذ الشحن' },
        { val: 'water', label: 'أضرار المياه' },
        { val: 'other', label: 'برمجيات / أخرى' }
      ],
      date: 'التاريخ المفضل (اختياري)',
      submit: 'احجز الموعد الآن',
      submitting: 'جاري الإرسال...',
      walkIns: 'نرحب بزيارتكم في المعرض في أي وقت'
    }
  }
};

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', device: '', issue: '', date: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingStatus('idle');
        setBookingForm({ name: '', phone: '', device: '', issue: '', date: '' });
      }, 2500);
    }, 1500);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen selection:bg-teal-500 selection:text-white flex flex-col relative w-full overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX, transformOrigin: lang === 'ar' ? 'right' : 'left' }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-sky-500 z-[100]"
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-50 w-14 h-14 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_30px_rgba(20,184,166,0.3)] hover:scale-110 active:scale-95 transition-transform duration-300"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-20 bg-[#020617]"></div>
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-grid-pattern opacity-[0.15]"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] sm:top-[-5%] start-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-teal-500/20 rounded-full blur-[100px] sm:blur-[120px] -z-10 animate-pulse mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] end-[-10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl py-2 shadow-black/50' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
              <img 
                src="https://drive.google.com/thumbnail?id=1YcSWdfRoDtwjH2CcH4l11Sh900lQ9So5&sz=w1000" 
                alt="O2 FIX Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <h1 className="text-2xl font-bold tracking-tight text-glow uppercase hidden sm:block">
                O2 <span className="text-teal-400">FIX</span>
              </h1>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['services', 'accessories', 'pricing', 'contact'].map((id) => (
                <button 
                  key={id}
                  onClick={() => scrollToSection(id)} 
                  className="relative text-xs font-semibold uppercase tracking-widest text-slate-100 hover:text-white transition-colors group py-2"
                >
                  {t.nav[id as keyof typeof t.nav]}
                  <span className="absolute bottom-0 inset-x-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform ltr:origin-left rtl:origin-right rounded-full"></span>
                </button>
              ))}
              
              <div className="w-px h-6 bg-slate-700/50"></div>
              
              <button onClick={toggleLanguage} className="text-xs font-bold uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1">
                {t.nav.lang}
              </button>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="accent-gradient text-white px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95"
              >
                {t.nav.book}
              </button>
            </div>

            {/* Mobile Menu Button & Lang Toggle */}
            <div className="flex md:hidden items-center gap-4">
              <button onClick={toggleLanguage} className="text-xs font-bold uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors">
                 {t.nav.lang}
              </button>
              <button 
                className="p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass border-t border-slate-800/50 mt-2"
            >
              <div className="px-4 py-6 flex flex-col gap-2">
                 {['services', 'accessories', 'pricing', 'contact'].map((id) => (
                    <button 
                      key={id}
                      onClick={() => scrollToSection(id)} 
                      className="text-start text-sm uppercase tracking-widest text-slate-300 py-3 px-4 hover:bg-slate-800/50 hover:text-teal-400 rounded-lg transition-colors"
                    >
                      {t.nav[id as keyof typeof t.nav]}
                    </button>
                 ))}
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                  className="accent-gradient text-white px-5 py-4 rounded-lg text-center font-bold uppercase tracking-widest mt-4 shadow-lg shadow-teal-500/20 active:scale-95"
                >
                  {t.nav.book}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight text-balance">
                {t.hero.title1} <br/>
                <span className="font-bold text-teal-400 text-glow">{t.hero.title2}</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed text-balance">
                {t.hero.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="relative group overflow-hidden accent-gradient text-white px-8 py-4 lg:py-5 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 active:scale-95 flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">{t.hero.bookBtn}</span>
                  {lang === 'ar' ? <ChevronLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                  <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 ltr:origin-left rtl:origin-right transition-transform duration-500 ease-out z-0"></div>
                </button>
                <div 
                  className="flex items-center justify-center gap-3 px-8 py-4 lg:py-5 rounded-xl glass-card text-slate-200 font-medium whitespace-nowrap hover:bg-slate-800/80 transition-all cursor-pointer group active:scale-95" 
                  onClick={() => scrollToSection('contact')}
                >
                  <Phone className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform" />
                  <span dir="ltr" className="tracking-wide">(555) 123-4567</span>
                </div>
              </div>
              
              <div className="mt-12 flex flex-wrap items-center gap-8 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-500" /> {t.hero.warranty}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-500" /> {t.hero.diagnostics}</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none lg:ps-10"
            >
              <div className="relative">
                {/* Floating Elements Background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-sky-500 rounded-[2rem] blur opacity-20 animate-pulse"></div>
                <div className="glass-card rounded-[2rem] overflow-hidden p-3 relative h-[500px]">
                   <div className="absolute inset-0 top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] z-10"></div>
                   <div className="rounded-[1.5rem] overflow-hidden relative w-full h-full">
                    <motion.img 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                      src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80" 
                      alt="Technician repairing mobile phone" 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent flex flex-col justify-end p-8">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="glass rounded-xl p-5 flex items-center gap-5 text-white border border-white/10 shadow-xl"
                      >
                        <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/30">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-sm uppercase tracking-widest text-teal-400 mb-1">{t.hero.turnaroundTitle}</p>
                          <p className="text-slate-300 text-sm">{t.hero.turnaroundDesc}</p>
                        </div>
                      </motion.div>
                    </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10">
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-3xl -z-10 border-t border-slate-800/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-start flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-px bg-teal-500/50"></span>
                {t.services.title}
              </h2>
              <p className="text-3xl text-slate-200 font-light text-balance">{t.services.subtitle}</p>
            </div>
            <button className="hidden lg:flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-slate-400 hover:text-teal-400 transition-colors group" onClick={() => setIsBookingModalOpen(true)}>
              {t.nav.book} 
              {lang === 'ar' ? <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.services.items.map((s) => {
              const Icon = SERVICE_ICONS[s.id];
              return (
                <motion.div 
                  variants={fadeUpItem}
                  key={s.id}
                  className="group glass-card rounded-2xl p-8 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(45,212,191,0.1)] flex flex-col justify-between h-[320px]"
                >
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-slate-900 border border-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-teal-500/10 transition-colors shadow-inner">
                        <Icon className="w-7 h-7 text-teal-400" />
                      </div>
                      <span className="text-slate-400 bg-slate-900/50 border border-slate-800 px-3 py-1 rounded-full text-xs font-mono font-medium">{s.price}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-3">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center text-xs uppercase tracking-widest text-teal-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === 'ar' ? 'اعرف المزيد ←' : 'Learn More →'}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Accessories Section */}
      <section id="accessories" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#020617] -z-10 border-t border-slate-800/50"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-teal-900/5 blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-px bg-teal-500/50"></span>
                {t.accessories.tag}
              </h2>
               <h3 className="text-4xl text-white font-light mb-8 leading-tight text-balance">
                {t.accessories.title}
              </h3>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed text-balance">
                {t.accessories.desc}
              </p>
              
              <div className="space-y-4">
                {t.accessories.items.map((a, i) => {
                  const Icon = ACCESSORY_ICONS[a.id];
                  return (
                    <motion.div 
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex gap-5 p-5 rounded-xl glass-card hover:bg-slate-800/80 transition-all duration-300 border border-slate-700/50 hover:border-teal-500/30 group"
                    >
                      <div className="w-12 h-12 shrink-0 bg-slate-900 border border-slate-700 group-hover:border-teal-500/50 rounded-lg flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-semibold text-slate-200 text-base">{a.title}</h4>
                          <span className="text-sm font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">{a.price}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{a.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 relative h-[600px] group"
            >
              <div className="absolute inset-x-0 top-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] z-10"></div>
              <div className="glass-card h-full rounded-[2rem] overflow-hidden p-3 relative border border-white/5">
                <img 
                  src="https://drive.google.com/thumbnail?id=1PYaWXfmpWEtp-s3t5J5Cv2pTKXymOALp&sz=w1000" 
                  alt="Phone cases and accessories" 
                  className="rounded-[1.5rem] w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 pointer-events-none ${lang === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#020617]/80 via-transparent to-transparent`} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-3xl -z-10 border-t border-slate-800/50"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16 text-center">
             <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-px bg-teal-500/50"></span>
                {t.pricing.title}
                <span className="w-8 h-px bg-teal-500/50 hidden sm:block"></span>
              </h2>
            <p className="text-3xl text-slate-200 font-light max-w-2xl mx-auto text-balance">{t.pricing.subtitle}</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[2rem] border border-slate-700/50 overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md">
                    {t.pricing.headers.map((h, i) => (
                       <th key={i} className="py-5 px-6 lg:px-8 text-xs text-slate-400 uppercase tracking-widest font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {t.pricing.items.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-5 px-6 lg:px-8 font-medium text-slate-200 whitespace-nowrap group-hover:text-teal-300 transition-colors">{row.model}</td>
                      <td className="py-5 px-6 lg:px-8 text-teal-400/90 font-mono text-sm whitespace-nowrap"><span className="bg-slate-900 border border-slate-700 px-3 py-1 rounded">{row.screen}</span></td>
                      <td className="py-5 px-6 lg:px-8 text-teal-400/90 font-mono text-sm whitespace-nowrap"><span className="bg-slate-900 border border-slate-700 px-3 py-1 rounded">{row.battery}</span></td>
                      <td className="py-5 px-6 lg:px-8 text-teal-400/90 font-mono text-sm whitespace-nowrap"><span className="bg-slate-900 border border-slate-700 px-3 py-1 rounded">{row.port}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-teal-500/10 p-5 text-center border-t border-teal-500/20 backdrop-blur-md">
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {t.pricing.warrantyText}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section / Footer */}
      <footer id="contact" className="relative border-t border-slate-800 bg-[#000000] pt-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6 pe-0 lg:pe-12">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://drive.google.com/thumbnail?id=1YcSWdfRoDtwjH2CcH4l11Sh900lQ9So5&sz=w1000" 
                  alt="O2 FIX Logo"
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <h2 className="text-3xl font-bold tracking-tight text-glow uppercase">O2 <span className="text-teal-400">FIX</span></h2>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                {t.contact.desc}
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-6">{t.contact.title}</h4>
              <div className="space-y-4">
                 <div className="flex items-start gap-4 border-b border-slate-800/80 pb-4">
                  <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 text-teal-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-300 pt-1 leading-snug">{t.contact.address}</span>
                </div>
                <div className="flex items-center gap-4 border-b border-slate-800/80 pb-4">
                  <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 text-teal-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-300 font-mono tracking-wider" dir="ltr">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 text-teal-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-300">hello@o2fix.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-6">{t.contact.hours}</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex justify-between border-b border-slate-800/80 pb-3">
                  <span className="font-medium">{t.contact.monFri}</span>
                  <span className="text-slate-200">9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-3">
                  <span className="font-medium">{t.contact.sat}</span>
                  <span className="text-slate-200">10:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t.contact.sun}</span>
                  <span className="text-slate-400 bg-slate-900 px-3 py-1 rounded text-xs">{t.contact.closed}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{t.contact.footerDesc}</p>
            <div className="flex gap-4 items-center">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse hidden sm:block shadow-[0_0_8px_#14b8a6]"></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                {t.contact.rights.replace('{year}', new Date().getFullYear().toString())}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className="glass-card rounded-2xl w-full max-w-xl relative overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(45,212,191,0.1)] border-white/10"
            >
              <div className="absolute top-0 inset-x-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] z-10"></div>
              
              <div className="p-6 sm:p-8 flex-shrink-0 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60 sticky top-0 z-10 pt-7">
                <div>
                  <h3 className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">{t.modal.title}</h3>
                  <p className="text-2xl text-slate-100 font-light">{t.modal.subtitle}</p>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-10 h-10 shrink-0 bg-slate-800/80 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700/50"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                {bookingStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center h-full"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                      className="w-24 h-24 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center mb-6 border-2 border-teal-500/20 shadow-[0_0_30px_rgba(45,212,191,0.2)]"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h4 className="text-3xl font-light text-slate-100 mb-3">{t.modal.success}</h4>
                    <p className="text-base text-slate-400 max-w-xs leading-relaxed">{t.modal.successDesc}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest font-semibold ms-1">{t.modal.name}</label>
                        <input 
                          required
                          type="text" 
                          value={bookingForm.name}
                          onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full bg-[#020617]/50 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-white placeholder-slate-600 shadow-inner block"
                          placeholder={t.modal.namePlac}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest font-semibold ms-1">{t.modal.phone}</label>
                        <input 
                          required
                          type="tel" 
                          value={bookingForm.phone}
                          onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full bg-[#020617]/50 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-white placeholder-slate-600 outline-none text-start shadow-inner block"
                          placeholder={t.modal.phonePlac}
                          dir="ltr"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest font-semibold ms-1">{t.modal.device}</label>
                      <input 
                        required
                        type="text" 
                        value={bookingForm.device}
                        onChange={e => setBookingForm({...bookingForm, device: e.target.value})}
                        className="w-full bg-[#020617]/50 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-white placeholder-slate-600 shadow-inner block"
                        placeholder={t.modal.devicePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest font-semibold ms-1">{t.modal.issue}</label>
                      <div className="relative">
                        <select 
                          required
                          value={bookingForm.issue}
                          onChange={e => setBookingForm({...bookingForm, issue: e.target.value})}
                          className="w-full bg-[#020617]/50 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-white appearance-none shadow-inner block"
                        >
                          <option value="" disabled className="text-slate-400">{t.modal.issueDefault}</option>
                          {t.modal.issueOptions.map((opt: any) => (
                             <option key={opt.val} value={opt.val} className="bg-slate-900">{opt.label}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                          <ChevronLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-90 right-auto left-4' : '-rotate-90'}`} />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-5 mt-3">
                       <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest font-semibold ms-1">{t.modal.date}</label>
                        <input 
                          type="date" 
                          value={bookingForm.date}
                          onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full bg-[#020617]/50 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-300 shadow-inner block [color-scheme:dark]"
                        />
                    </div>

                    <button 
                      disabled={bookingStatus === 'submitting'}
                      type="submit"
                      className="w-full accent-gradient text-white font-bold py-4 text-sm tracking-widest uppercase rounded-xl mt-4 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all flex justify-center items-center gap-2 disabled:opacity-70 active:scale-[0.98]"
                    >
                      {bookingStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : t.modal.submit}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-medium">
                      {t.modal.walkIns}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
