"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does the monthly draw work?",
    answer: "Once per month, we draw 5 random Stableford score numbers. If your active top-5 scores match any of these (in any order), you win the corresponding tier prize. Results are announced on your dashboard."
  },
  {
    question: "Do I need to play golf every day?",
    answer: "Not at all. You just need 5 scores in your rolling history to be eligible. Play at your own pace — weekend rounds, occasional games, whatever works for you."
  },
  {
    question: "How do charities receive the money?",
    answer: "A guaranteed minimum of 10% of every subscription goes directly to your selected charity partner. All transactions are transparent and auditable through your dashboard."
  },
  {
    question: "Can I change my charity selection?",
    answer: "Absolutely. You can switch your chosen charity anytime from your dashboard. The change applies from the next billing cycle."
  },
  {
    question: "What happens if I win?",
    answer: "Winners are notified immediately on their dashboard. Claims are processed within 48 hours, and funds are deposited directly into your linked account."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 bg-premium-dark relative overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            Questions?{" "}
            <span className="text-gradient-aurora">Answered.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 font-medium max-w-md mx-auto"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:bg-white/[0.04] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left group"
              >
                <span className="text-base md:text-lg font-semibold text-white/80 group-hover:text-white transition-colors pr-4">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${openIndex === i ? 'bg-primary/20 border-primary/30 rotate-0' : 'bg-white/[0.04] border-white/[0.08]'}`}>
                  {openIndex === i ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-white/40" />
                  )}
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-7 pb-6 md:pb-7 text-white/40 font-medium leading-relaxed text-[15px]">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
