import { Metadata } from 'next'
import { getContactPage } from '@/lib/queries'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ContactPageClient from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Agenco',
  description:
    'Book a free consultation with Agenco. Transform your e-commerce data into competitive advantage.',
}

export const revalidate = 60

export default async function ContactPage() {
  const data = (await getContactPage()) || {}

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active="contact" />
      <ContactPageClient data={data} />
      <Footer />
    </div>
  )
}
