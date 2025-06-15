import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8 text-center">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
} 