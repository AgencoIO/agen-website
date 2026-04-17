import { getFaqs } from '@/lib/queries'
import { FaqSectionClient } from './faq-section-client'

// Default FAQs (shown if Sanity has no FAQ document yet)
const defaultFaqs = {
  heading: 'Get answers to the most asked questions',
  badge: 'FAQs',
  items: [
    {
      question: 'What kind of e-commerce businesses do you work with?',
      answer:
        'We work with Shopify stores, multi-channel brands, Amazon sellers, and D2C companies doing $500K+ in annual revenue. Whether you sell on one platform or ten, we can help.',
    },
    {
      question: 'How long does it take to set up a data pipeline?',
      answer:
        "Most pipelines are live within 2–4 weeks. We start with a free data audit (1–2 days), then design and deploy your custom pipeline. You'll see initial insights within the first week of setup.",
    },
    {
      question: 'Do I need a technical team to use Agenco?',
      answer:
        'No. We handle all the technical work — pipeline building, data engineering, and maintenance. Your team gets clean dashboards and alerts they can act on immediately.',
    },
    {
      question: 'What data sources can you connect?',
      answer:
        'Shopify, Amazon, TikTok Shop, WooCommerce, BigCommerce, Google Analytics, Meta Ads, and virtually any platform with an API. We also handle custom integrations.',
    },
    {
      question: 'How is this different from tools like Google Analytics or Shopify Reports?',
      answer:
        'Those tools show you what happened. We show you what to do about it. Our pipelines combine data across all your channels, enrich it with competitor intelligence, and surface actionable insights — not just charts.',
    },
    {
      question: 'What does the free data audit include?',
      answer:
        'We analyze your existing data sources, identify gaps and inconsistencies, estimate revenue leakage, and recommend specific pipeline improvements. No obligation, and you keep the findings.',
    },
  ],
}

export async function FaqSection() {
  const faqData = await getFaqs()
  const d = {
    heading: faqData?.heading || defaultFaqs.heading,
    badge: faqData?.badge || defaultFaqs.badge,
    items:
      faqData?.items && faqData.items.length > 0
        ? faqData.items
        : defaultFaqs.items,
  }

  return (
    <FaqSectionClient heading={d.heading} badge={d.badge} items={d.items} />
  )
}
