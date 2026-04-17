import { Metadata } from 'next'
import { getFaqs } from '@/lib/queries'
import { FaqSectionClient } from '@/components/faq-section-client'

export const metadata: Metadata = {
  title: 'FAQ | Agenco',
  description:
    'Frequently asked questions about Agenco — data pipelines, e-commerce analytics, and more.',
}

export const revalidate = 60

const defaultFaqs = {
  heading: 'Get answers to the most asked questions',
  badge: 'FAQs',
  items: [
    {
      question: 'What kind of e-commerce businesses do you work with?',
      answer:
        'We work with Shopify stores, multi-channel brands, Amazon sellers, and D2C companies doing $500K+ in annual revenue.',
    },
    {
      question: 'How long does it take to set up a data pipeline?',
      answer:
        'Most pipelines are live within 2–4 weeks. We start with a free data audit (1–2 days), then design and deploy your custom pipeline.',
    },
    {
      question: 'Do I need a technical team to use Agenco?',
      answer:
        'No. We handle all the technical work — pipeline building, data engineering, and maintenance. Your team gets clean dashboards and alerts.',
    },
  ],
}

export default async function FaqPage() {
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
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about Agenco and our services.
        </p>
      </div>
      <FaqSectionClient heading={d.heading} badge={d.badge} items={d.items} />
    </div>
  )
}
