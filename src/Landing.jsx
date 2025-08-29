import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Clock, Shield, Star, Play, Wand2, MessageCircle, Mail, Phone, ChevronRight } from "lucide-react";

// === Настройки бренда ===
const BRAND = "StorySpark AI";
const PHONE = "+7 (999) 000‑00‑00";
const TELEGRAM = "https://t.me/otkazanoo";
const WHATSAPP = "https://wa.me/79990000000";
const EMAIL = "hello@storyspark.ai";

export default function Landing() {
  // Калькулятор
  const [duration, setDuration] = useState(60); // сек
  const [characters, setCharacters] = useState(2);
  const [voice, setVoice] = useState(true);
  const [styleLevel, setStyleLevel] = useState(2); // 1=готовый, 2=уникальный, 3=кастом‑персонажи
  const [rush, setRush] = useState(false);

  const price = useMemo(() => {
    let base = duration <= 60 ? 7000 : duration <= 120 ? 14000 : 24000; // ₽
    base += (characters - 2) * 1500;
    if (voice) base += 3000;
    if (styleLevel === 2) base += 4000;
    if (styleLevel === 3) base += 9000;
    if (rush) base *= 1.25; // срочно 72ч
    return Math.max(5000, Math.round(base));
  }, [duration, characters, voice, styleLevel, rush]);

  function submitLead(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const subject = encodeURIComponent("Заявка на AI‑мультфильм");
    const body = encodeURIComponent(
      `Имя: ${payload.name}\nКонтакт: ${payload.contact}\nСообщение: ${payload.note}\nПараметры: ${duration}s, персонажей: ${characters}, озвучка: ${voice?'да':'нет'}, стиль: ${styleLevel}, срочно: ${rush?'да':'нет'}\nОценка: ~${price.toLocaleString('ru-RU')} ₽`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  // Портфолио‑заглушки
  const portfolioCases = [
    {title: "Свадебное поздравление", desc: "Трогательный ролик с историей пары и пожеланиями от друзей.", length: "1:20"},
    {title: "Детский день рождения", desc: "Весёлый мультфильм с именинником в роли супергероя.", length: "0:45"},
    {title: "Юбилей компании", desc: "Корпоративный ролик с персонажами‑сотрудниками.", length: "2:00"},
    {title: "Предложение руки и сердца", desc: "Романтический мультфильм о знакомстве и пути пары.", length: "1:10"},
    {title: "Подарок для родителей", desc: "История семьи в стиле сказки, посвящённая годовщине.", length: "1:30"},
    {title: "Поздравление коллеги", desc: "Юморной ролик для рабочего чата, лёгкий и забавный.", length: "0:50"}
  ];

  // Мини‑тесты (консоль)
  useEffect(() => {
    const p1 = price;
    const p2 = (() => { // дороже при апгрейде
      let d=120,c=3,v=true,s=3,r=true; let base = d<=60?7000:d<=120?14000:24000; base+=(c-2)*1500; if(v) base+=3000; if(s===2) base+=4000; if(s===3) base+=9000; if(r) base*=1.25; return Math.max(5000, Math.round(base));
    })();
    console.assert(Number.isFinite(p1) && p1>0, 'p1 invalid', p1);
    console.assert(p2>p1, 'pricing should increase with options', {p1,p2});
    console.assert(/^https:\/\/t\.me\//.test(TELEGRAM), 'telegram url invalid', TELEGRAM);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-fuchsia-500/40">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500"/>
            <span className="font-semibold tracking-tight">{BRAND}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#portfolio" className="hover:text-white">Портфолио</a>
            <a href="#how" className="hover:text-white">Как работаем</a>
            <a href="#pricing" className="hover:text-white">Цены</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TELEGRAM} className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5"><MessageCircle size={16}/> Telegram</a>
            <a href="#lead" className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white/90"><Sparkles size={16}/> Бриф</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(168,85,247,.35),transparent),radial-gradient(60%_40%_at_20%_120%,rgba(79,70,229,.25),transparent)]"/>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Персональные <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">AI‑мультфильмы</span> на заказ
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-xl">Превратим вашу семейную историю в короткий мультфильм за 3–7 дней: сценарий, стиль, озвучка и монтаж. Идеально для дня рождения, свадьбы, юбилея.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#lead" className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-white/90"><Wand2 size={18}/> Получить бесплатный сценарий за 24 часа</a>
                <a href="#portfolio" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 hover:bg-white/5"><Play size={18}/> Смотреть примеры</a>
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[{k:"3–7 дней",v:"срок"},{k:"4.9/5",v:"оценка"},{k:"100+",v:"историй"}].map((i,idx)=> (
                  <div key={idx} className="rounded-xl border border-white/10 p-4">
                    <dt className="text-2xl font-bold">{i.k}</dt>
                    <dd className="text-xs text-white/70">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* Lead + Калькулятор */}
            <motion.div id="lead" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6, delay:.1}} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Sparkles size={18}/> Экспресс‑расчёт и заявка</h3>
              <p className="text-sm text-white/70 mt-1">Точная смета после короткого брифа</p>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <label className="block text-sm">Длительность: {duration} сек
                  <input type="range" min={30} max={300} step={30} value={duration} onChange={(e)=>setDuration(+e.target.value)} className="mt-2 w-full"/>
                </label>
                <label className="block text-sm">Персонажей: {characters}
                  <input type="range" min={1} max={6} value={characters} onChange={(e)=>setCharacters(+e.target.value)} className="mt-2 w-full"/>
                </label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={voice} onChange={()=>setVoice(v=>!v)}/> Озвучка диктором</label>
                <label className="block text-sm">Стиль:
                  <select value={styleLevel} onChange={(e)=>setStyleLevel(+e.target.value)} className="mt-2 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2">
                    <option value={1}>Готовый</option>
                    <option value={2}>Уникальный</option>
                    <option value={3}>Кастом‑персонажи</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={rush} onChange={()=>setRush(r=>!r)}/> Срочно (до 72 ч)</label>
                <div className="rounded-xl bg-neutral-800/80 p-4">
                  <div className="text-xs text-white/70">Ориентировочно</div>
                  <div className="text-3xl font-bold">≈ {price.toLocaleString('ru-RU')} ₽</div>
                </div>
              </div>

              <form onSubmit={submitLead} className="mt-6 space-y-3">
                <input name="name" required placeholder="Ваше имя" className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500"/>
                <input name="contact" required placeholder="Телефон, Telegram или email" className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500"/>
                <textarea name="note" rows={4} placeholder="Коротко о вашей истории (событие, герои, срок)" className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500"/>
                <button className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-3 font-semibold hover:opacity-90">Получить сценарий и смету</button>
                <p className="text-xs text-white/60">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-white/10 bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-4">
          {[{icon:Clock, t:"3–7 дней", s:"срок производства"},{icon:Shield,t:"Безопасно", s:"конфиденциальность материалов"},{icon:Star,t:"2 правки", s:"включены в стоимость"},{icon:Wand2,t:"Custom‑стиль", s:"под ваши фото"}].map((b,idx)=> (
            <div key={idx} className="rounded-2xl border border-white/10 bg-neutral-950/60 p-5 flex items-start gap-3">
              <b.icon className="mt-0.5" size={20}/>
              <div><div className="font-semibold">{b.t}</div><div className="text-sm text-white/70">{b.s}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold">Примеры работ</h2>
        <p className="mt-2 text-white/70">Стили подбираем под событие и возраст аудитории</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioCases.map((c,i)=> (
            <motion.div whileHover={{scale:1.01}} key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
              <div className="aspect-video w-full bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-indigo-500/10 to-transparent" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{c.title}</h3>
                  <span className="text-xs text-white/60">{c.length}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-white/10 bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Как это работает</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[{t:"Бриф",d:"2‑минутная форма или голос"},{t:"Сценарий",d:"2–3 варианта на выбор"},{t:"Анимация",d:"персонажи, фоны, озвучка"},{t:"Сдача",d:"монтаж, титры, экспорт"}].map((s,idx)=> (
              <div key={idx} className="rounded-2xl border border-white/10 bg-neutral-950/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-bold">{idx+1}</div>
                <h3 className="mt-4 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold">Пакеты и цены</h2>
        <p className="mt-2 text-white/70">Фикс для типовых задач. Индивидуальная смета — по запросу.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[{name:"Lite",price:"от 7 000 ₽",featured:false,pts:["30–60 сек","Готовый стиль","Музыка","1 правка"]},{name:"Standard",price:"от 14 000 ₽",featured:true,pts:["60–180 сек","Уникальный стиль","Озвучка диктором","2 правки","Титры и субтитры"]},{name:"Premium",price:"от 24 000 ₽",featured:false,pts:["до 5 минут","Кастом‑персонажи","Интерактивные ветвления","3 правки","Исходники по запросу"]}].map((p,idx)=> (
            <div key={idx} className={`rounded-2xl p-6 border ${p.featured?"border-fuchsia-400/40 bg-gradient-to-b from-fuchsia-500/10 to-transparent":"border-white/10 bg-neutral-900/40"}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="text-lg font-bold">{p.price}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.pts.map((t,i)=> (
                  <li key={i} className="flex items-start gap-2"><Check size={16}/> {t}</li>
                ))}
              </ul>
              <a href="#lead" className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold ${p.featured?"bg-white text-neutral-900 hover:bg-white/90":"border border-white/15 hover:bg-white/5"}`}>{p.featured?"Заказать Standard":"Оставить заявку"}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Частые вопросы</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[{q:"Можно ли сделать персонажей похожими на нас?",a:"Да. Стилизуем под ваши фото и выберем визуальный стиль."},{q:"Сколько правок включено?",a:"Включено 2 раунда правок. Дополнительные — по договорённости."},{q:"Какие форматы выдаёте?",a:"MP4 (H.264) для соцсетей и экрана, Full HD. Другие — по запросу."},{q:"Можно ли срочно?",a:"Есть ускоренное производство до 72 часов (+25% к бюджету)."}].map((f,idx)=> (
              <div key={idx} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
                <div className="font-semibold">{f.q}</div>
                <div className="mt-1 text-sm text-white/70">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-white/10 bg-gradient-to-r from-fuchsia-600/10 via-indigo-600/10 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="text-2xl font-bold flex items-center gap-2"><Sparkles size={20}/> Готовы превратить историю в мультфильм?</div>
            <div className="text-white/80">Получите бесплатный черновик сценария в течение 24 часов</div>
          </div>
          <a href="#lead" className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-white/90">Заполнить бриф <ChevronRight size={18}/></a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-6 text-sm text-white/80">
          <div>
            <div className="font-semibold">{BRAND}</div>
            <div className="mt-2 text-white/60">AI‑мультфильмы на заказ. Семейные истории, поздравления, презентации.</div>
          </div>
          <div>
            <div className="font-semibold">Контакты</div>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center gap-2"><Phone size={14}/> {PHONE}</li>
              <li className="flex items-center gap-2"><MessageCircle size={14}/> <a href={TELEGRAM} className="hover:text-white">Telegram</a></li>
              <li className="flex items-center gap-2"><MessageCircle size={14}/> <a href={WHATSAPP} className="hover:text-white">WhatsApp</a></li>
              <li className="flex items-center gap-2"><Mail size={14}/> <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Гарантии</div>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center gap-2"><Shield size={14}/> Конфиденциальность материалов</li>
              <li className="flex items-center gap-2"><Star size={14}/> 2 раунда правок включены</li>
              <li className="flex items-center gap-2"><Clock size={14}/> Фиксированные сроки</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Документы</div>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-white" href="#">Договор‑оферта (по запросу)</a></li>
              <li><a className="hover:text-white" href="#">Политика обработки данных</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">© {new Date().getFullYear()} {BRAND}. Все права защищены.</div>
      </footer>
    </div>
  );
}
