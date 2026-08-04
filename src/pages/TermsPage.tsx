import { SEO } from "../components/seo/SEO";
import { motion } from "framer-motion";

export function TermsPage() {
  return (
    <>
      
      <SEO title="Terms | The Webpage Builder" description="The Webpage Builder - Terms. Premium 3D web development and custom AI software agency." url="https://thewebpagebuilder.in/terms" />{/* Page Hero */}
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
              Terms of Service
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Last Updated: June 8, 2026. Please read these Terms of Service carefully before using our website or services.
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
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the website located at <a href="https://thewebpagebuilder.in" className="text-white underline hover:text-zinc-300">thewebpagebuilder.in</a> (the "Site") or any services provided by The Webpage Builder ("we", "us", "our"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">2. Services Offered</h2>
              <p className="mb-4">
                The Webpage Builder is a premium digital design and software development agency. We build websites, web applications, mobile applications, custom database solutions, and artificial intelligence configurations. Strategy calls, digital audits, and demonstration materials provided via the Site are offered for proposal evaluation purposes and do not represent formal development agreements.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">3. User Representation & Lead Submission</h2>
              <p className="mb-4">
                When submitting information through our lead forms, call booking widgets, or email, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Provide accurate, current, and complete details about yourself and your organization.</li>
                <li>Not submit false or misleading data, including spoofed phone numbers or email addresses.</li>
                <li>Ensure that any project concepts or materials you share do not infringe upon any third-party intellectual property rights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Intellectual Property Rights</h2>
              <p className="mb-4">
                Unless otherwise indicated, the Site and its original content, design features, interactive animations, logos, and graphics are our proprietary property and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4">
                Client project code, private designs, and application databases delivered under a paid service agreement are governed by separate, bilateral master service agreements (MSAs) and are fully assigned to the respective client upon completion of payment.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
              <p className="mb-4">
                The materials on the Site are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall The Webpage Builder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if we have been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">7. Governing Law</h2>
              <p className="mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in India for the resolution of any disputes.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-900">
              <h2 className="text-xl font-bold text-white mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
