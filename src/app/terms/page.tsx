import React from 'react';
import { Layers } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
        {/* Compact Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
          <div className="w-12 h-12 rounded-[1rem] bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
            <Layers size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Terms & Conditions</h1>
        </div>
        
        {/* Content */}
        <div className="space-y-6 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          <p>Welcome to Age Calculator Box. By accessing and using this website, you agree to follow these Terms and Conditions. Please read them carefully before using our website and tools.</p>
          
          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Use of Website</h2>
          <p>Age Calculator Box provides free online age calculation tools for informational and personal use only.</p>
          <p>Users agree to use this website responsibly and not misuse, damage, or interfere with the functionality or security of the website.</p>
          
          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Tool Accuracy</h2>
          <p>We aim to provide accurate age calculation results through our tools. However, we do not guarantee that all calculations will always be completely error-free or suitable for official purposes.</p>
          <p>Users should independently verify important information when needed.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Intellectual Property</h2>
          <p>All content, design elements, text, graphics, logos, and tools available on Age Calculator Box are protected by applicable copyright and intellectual property laws.</p>
          <p>Users may not copy, reproduce, or redistribute website content without permission.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Third-Party Services</h2>
          <p>Our website may contain third-party advertisements, affiliate links, or links to external websites for additional services or information.</p>
          <p>We are not responsible for the content, policies, or practices of third-party websites.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Google AdSense and Affiliate Links</h2>
          <p>Age Calculator Box may display ads provided by Google AdSense and may include affiliate product recommendations.</p>
          <p>We may earn commissions from qualifying purchases or ad interactions at no extra cost to users.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">User Responsibility</h2>
          <p>Users are responsible for how they use the information and tools available on this website.</p>
          <p>Age Calculator Box will not be responsible for any loss, damage, or issues arising from the use of our website or services.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Privacy</h2>
          <p>By using this website, users also agree to our Privacy Policy regarding data handling and website usage.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Changes to Terms</h2>
          <p>We may update or modify these Terms and Conditions at any time without prior notice.</p>
          <p>Users are encouraged to review this page regularly for updates.</p>

          <h2 className="text-xl font-black text-slate-800 mt-8 mb-3">Contact</h2>
          <p>If you have any questions regarding these Terms and Conditions, you can contact us through the Contact page available on our website.</p>
        </div>

      </div>
    </div>
  );
}