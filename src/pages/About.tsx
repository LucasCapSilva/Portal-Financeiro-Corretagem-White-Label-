import type { FormEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BriefcaseBusiness, CheckCircle2, Mail, PhoneCall, ShieldCheck, Star } from 'lucide-react';

const certifications = [
  'CNPI - Certificação Nacional do Profissional de Investimento',
  'CPA-20 - Certificação Profissional ANBIMA',
  'Especialização em Gestão de Risco de Mercado',
];

const specialties = [
  'Planejamento financeiro e sucessório',
  'Renda fixa, variável e internacional',
  'Alocação estratégica para perfis conservador, moderado e arrojado',
  'Estruturação de carteiras para alta renda',
];

const testimonials = [
  {
    name: 'Fernanda Ribeiro',
    role: 'Empresária',
    text: 'A consultoria transformou meu planejamento financeiro em uma estratégia clara, segura e rentável.',
    rating: 5,
  },
  {
    name: 'Carlos Matos',
    role: 'Diretor Comercial',
    text: 'Com a mentoria personalizada, consegui diversificar meu patrimônio com muito mais confiança.',
    rating: 5,
  },
];

const About = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 gap-6 p-5 md:p-6 lg:grid-cols-[340px_1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-[340px]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
              alt="Especialista financeiro em ambiente corporativo"
              loading="eager"
              fetchPriority="high"
              className="h-[360px] w-full rounded-2xl object-cover shadow-xl"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-4">
            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              Sobre o profissional
            </span>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Rafael Andrade, especialista em estratégia financeira e gestão patrimonial
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Com mais de 12 anos no mercado financeiro, atua na construção de soluções personalizadas para investidores, famílias e empresas que buscam crescimento sustentável, proteção de patrimônio e decisões orientadas por dados.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800/70">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">R$ 480M+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">em patrimônio assessorado</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800/70">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">1.200+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">clientes atendidos</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800/70">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">98%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">satisfação recorrente</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Qualificações e Certificações</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {certifications.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <BriefcaseBusiness className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Áreas de Especialização</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {specialties.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Depoimentos de Clientes</h2>
          <div className="space-y-4">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-xl border border-gray-200/70 bg-white/70 p-4 dark:border-gray-700/70 dark:bg-gray-800/60">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={`${item.name}-${idx}`} size={15} className="fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                <div className="mt-3">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Fale com o Especialista</h2>
          <form onSubmit={handleSubmit} className="space-y-3" aria-label="Formulário de contato profissional">
            <input
              type="text"
              required
              placeholder="Seu nome"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <textarea
              required
              placeholder="Mensagem"
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Enviar contato
            </button>
            {sent && <p className="text-sm font-medium text-green-600 dark:text-green-400">Mensagem enviada com sucesso.</p>}
          </form>
          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-brand-500" />
              rafael.andrade@corretora.com.br
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall size={16} className="text-brand-500" />
              +55 (11) 98888-0022
            </p>
          </div>
        </motion.article>
      </section>
    </div>
  );
};

export default About;
