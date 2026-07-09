import { motion } from "framer-motion";

export function PrivacyPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ Legal</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              Privacy Policy
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Last Updated: June 8, 2026. This Privacy Policy describes how The Webpage Builder collects, uses, and discloses your information when you use our website or services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="prose prose-invert max-w-none space-y-8 text-zinc-400 font-light leading-relaxed text-sm sm:text-base"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you fill out contact forms, request free digital audits, request private demos, schedule strategy calls, or otherwise communicate with us. This information may include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Name and contact data (such as name, email address, phone number).</li>
                <li>Professional details (such as company name, website URL).</li>
                <li>Project details (such as estimated budget, timeline, project requirements, and vision).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to operate, maintain, and provide the features and functionality of our services, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Responding to your inquiries, audit requests, and booking confirmations.</li>
                <li>Preparing custom project roadmap assessments and pricing proposals.</li>
                <li>Maintaining administrative dashboard databases to organize incoming sales leads.</li>
                <li>Sending administrative emails, calendar invitations, or security alerts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">3. Data Retention & Protection</h2>
              <p className="mb-4">
                Your personal details and project specs are stored securely via Supabase database infrastructure. We apply strict security protocols to prevent unauthorized access, alteration, disclosure, or destruction of your personal data.
              </p>
              <p className="mb-4">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
              <p className="mb-4">
                We do not sell, rent, trade, or share your personal information with third parties for their marketing purposes. We may share information only:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>With trusted backend database providers (such as Supabase) to store and protect your data.</li>
                <li>If required to do so by law or in response to valid requests by public authorities.</li>
                <li>To protect and defend the rights or property of The Webpage Builder.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">5. GDPR Compliance (Your Rights)</h2>
              <p className="mb-4">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). These include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right of rectification if your information is inaccurate.</li>
                <li>The right to object to or restrict our processing of your data.</li>
                <li>The right to withdraw consent at any time.</li>
              </ul>
              <p className="mb-4">
                If you wish to exercise any of these rights, please contact us at <a href="mailto:thewebpagebuilder@gmail.com" className="text-white underline hover:text-zinc-300">thewebpagebuilder@gmail.com</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Cookies & Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some features of our site (such as persistent sessions for administration) may not function properly.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-900">
              <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-white mt-2 font-medium">
                Email: <a href="mailto:thewebpagebuilder@gmail.com" className="underline hover:text-zinc-300">thewebpagebuilder@gmail.com</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
