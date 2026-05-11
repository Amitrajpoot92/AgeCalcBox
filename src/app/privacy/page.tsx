import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
        {/* Compact Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
          <div className="w-12 h-12 rounded-[1rem] bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        </div>
        
        {/* Content */}
        <div className="space-y-6 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          <p>At Age Calculator Box, we value your privacy and are committed to keeping your information safe while using our website.</p>
          <p>This Privacy Policy explains how we collect, use, and protect information when you visit and use our online tools.</p>
          
          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Information We Collect</h2>
          <p>Age Calculator Box is designed to work without requiring users to create an account or provide personal details.</p>
          <p>We do not store the dates or age calculation data entered by users in our tools.</p>
          <p>However, some non-personal information may be collected automatically through standard website technologies, such as:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-500">
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>General website usage data</li>
          </ul>
          <p>This information helps us improve website performance and user experience.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Cookies</h2>
          <p>Our website may use cookies to improve functionality, analyze traffic, and provide a better browsing experience.</p>
          <p>Cookies are small files stored on your device that help websites work properly.</p>
          <p>Users can disable cookies anytime through their browser settings.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Third-Party Services</h2>
          <p>We may use trusted third-party services such as analytics tools or advertising partners to improve our website and support our services.</p>
          <p>These services may use cookies or similar technologies according to their own privacy policies.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Google AdSense</h2>
          <p>Age Calculator Box may display advertisements provided by Google AdSense or other advertising partners.</p>
          <p>Third-party vendors, including Google, may use cookies to serve ads based on users’ previous visits to this website or other websites.</p>
          <p>Users can learn more about how Google uses advertising data by visiting Google's advertising policy pages.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Data Protection</h2>
          <p>We take reasonable steps to maintain website security and provide a safe browsing experience for all users.</p>
          <p>However, no method of internet transmission or electronic storage is completely secure.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Children’s Privacy</h2>
          <p>Our website is not directed toward children under the age of 13. We do not knowingly collect personal information from children.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">External Links</h2>
          <p>Our website may contain links to external websites or third-party services. We are not responsible for the privacy practices or content of those websites.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect website improvements, legal updates, or service changes.</p>
          <p>Users are encouraged to review this page periodically for any updates.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us through the Contact page available on our website.</p>
        </div>

      </div>
    </div>
  );
}