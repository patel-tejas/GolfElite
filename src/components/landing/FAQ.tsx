"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { 
    question: "How many draws?", 
    answer: "One per month. The draw date is typically mid-month and results are announced on your Digital Clubhouse dashboard." 
  },
  { 
    question: "Do I need to play daily?", 
    answer: "No. You only need 5 scores in your rolling history to be eligible. You can play at your own pace." 
  },
  { 
    question: "How do I win?", 
    answer: "We draw 5 unique Stableford score numbers. If your active 5 scores match any of these (in any order), you win a corresponding tier prize." 
  },
  { 
    question: "Where does money go?", 
    answer: "The prize pool receives the majority of membership funds, with a minimum of 10% guaranteed for your chosen charity. The rest covers operational costs." 
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-black relative border-y border-white/5 items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Common Questions
          </motion.h2>
          <p className="text-zinc-500 font-medium">Everything you need to know</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-card border-white/5 overflow-hidden"
             >
               <button 
                 onClick={() => setOpenIndex(openIndex === i ? null : i)}
                 className="w-full flex items-center justify-between p-8 text-left hover:bg-white/[0.02] transition-colors"
               >
                 <span className="text-xl font-bold text-white">{faq.question}</span>
                 {openIndex === i ? (
                   <Minus className="w-5 h-5 text-accent" />
                 ) : (
                   <Plus className="w-5 h-5 text-accent" />
                 )}
               </button>
               {openIndex === i && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   className="px-8 pb-8 text-zinc-400 font-medium leading-relaxed italic"
                 >
                   {faq.answer}
                 </motion.div>
               )}
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
