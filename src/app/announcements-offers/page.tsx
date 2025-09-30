export const metadata = {
  title: 'Announcements & Offers | Media Computers',
  description: 'Latest announcements, deals, and special offers from Media Computers.',
};

export default function AnnouncementsOffersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-orange-600 dark:text-orange-400">
          Announcements & Offers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
          Stay updated with our latest announcements, promotions, and special offers. Check back often for new deals!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-2">New Batch Enrollments</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Enroll now and get early bird discounts for select courses.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Festive Offer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Flat 15% off on all weekend batches this month.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Refer & Earn</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Refer a friend and both get additional discounts.</p>
          </div>
        </div>

        {/* Festive Offer Detailed Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Text description box */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Festival of Learning: Dassehra & Diwali Offers!</h2>
            <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
              This October, celebrate the festivals by investing in your future! Media Computer Education, Belagavi, brings you special discounts on skill-building courses.
            </p>
            <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-300">📅 Offer Period: 1st - 31st October</p>

            <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-gray-100">🔥 Featured Courses & Offers:</h3>
            <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>TallyPrime (Master Business Accounts) - ₹ 2999/-</li>
              <li>MSC Office (Become Office Ready) - ₹ 1999/-</li>
              <li>Python (Future Ready Coding) - ₹ 1999/-</li>
              <li>Power BI & AI Tools - ₹ 1999/- each</li>
              <li>Digital Marketing - ₹ 1999/-</li>
              <li>Spoken English - ₹ 999/-</li>
              <li>C & C++ Programming - ₹ 999/- each</li>
            </ul>

            <p className="mt-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              Why Wait? Get Job-Ready Now!
            </p>
            <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
              Perfect your office skills, master coding, learn to analyze data, or speak English confidently. Our courses are designed to make you industry-ready.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
              📍 Location: Media Computer Education, Modern Complex, Kaktives Road, Belagavi.<br />
              📞 Contact: 831-256-4508 | 831-313-5228
            </p>
            <p className="mt-4 text-base font-semibold text-orange-600 dark:text-orange-400">
              Light up your career this Diwali! Enroll today.
            </p>
          </div>

          {/* Image box with 4:5 ratio */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: '125%' }}>
              {/* 4:5 aspect ratio (height/width = 1.25 => 125%) */}
              <img
                src="/images/deepawali_banner.jpg"
                alt="Deepawali Offer Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              Banner image (4:5). Using <code>/public/images/deepawali_banner.jpg</code>.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


