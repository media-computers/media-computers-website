import React from "react";
import { FaShieldAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <FaShieldAlt className="text-blue-600 text-3xl mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>
        <p className="text-gray-500 mb-2 text-sm">Effective Date: <span className="font-semibold">22/7/2025</span></p>
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-700"><FaGlobe className="text-blue-500" /><a href="http://www.mediacomputereducation.com" className="underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">www.mediacomputereducation.com</a></div>
          <div className="flex items-center gap-2 text-gray-700"><FaEnvelope className="text-blue-500" />media1.comin@gmail.com</div>
          <div className="flex items-center gap-2 text-gray-700"><FaPhone className="text-blue-500" />+91 86186 66589</div>
          <div className="flex items-center gap-2 text-gray-700"><FaMapMarkerAlt className="text-blue-500" />Modern Complex, Kaktives Road near Channama Circle, Belagavi - 591001</div>
        </div>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">1. How We Collect Information</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Website forms</li>
            <li>Facebook/Instagram lead ads</li>
            <li>WhatsApp and email inquiries</li>
            <li>Website trackers like cookies and pixels</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">2. What We Do With Collected Information</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Share course details and offers</li>
            <li>Improve our website and services</li>
            <li>Run ads and analyze audience interest</li>
          </ul>
          <p className="mt-2 text-gray-700">We never sell your data to third parties.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Cookies, Pixels & Trackers We Use</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Meta Pixel (for Facebook/Instagram ad tracking)</li>
            <li>Google Analytics (to understand visitor behavior)</li>
            <li>Cookies to enhance user experience</li>
          </ul>
          <p className="mt-2 text-gray-700">These tools may collect non-personal info like browser type, time spent, and page views.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Advertising Networks</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Meta Ads (Facebook & Instagram)</li>
            <li>Google Ads</li>
          </ul>
          <p className="mt-2 text-gray-700">These may use your behavior on our site to show you relevant ads.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Opt-In / Opt-Out Rights</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Opt-in by submitting your data through our forms</li>
            <li>Opt-out by disabling cookies or ad settings in your browser</li>
            <li>Adjust ad preferences via:
              <ul className="list-disc ml-6">
                <li><a href="https://www.facebook.com/adpreferences/ad_settings" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Facebook Ad Settings</a></li>
                <li><a href="https://adssettings.google.com/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Request or Delete Your Data</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>View the personal data we store</li>
            <li>Have your data removed or updated</li>
          </ul>
          <p className="mt-2 text-gray-700">Just contact us at <span className="font-semibold">+91 86186 66589</span></p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Contact Information</h2>
          <ul className="list-none ml-0 text-gray-700">
            <li><span className="font-semibold">Business Name:</span> Media Computer Education</li>
            <li><span className="font-semibold">Email:</span> media1.comin@gmail.com</li>
            <li><span className="font-semibold">Phone/WhatsApp:</span> +91 86186 66589</li>
            <li><span className="font-semibold">Location:</span> Modern Complex, Kaktives Road near Channama Circle, Belagavi - 591001</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Updates to This Policy</h2>
          <p className="text-gray-700">We may update this policy from time to time. Please check this page for the latest version.</p>
        </section>
      </div>
    </div>
  );
} 