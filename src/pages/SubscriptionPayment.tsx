import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SubscriptionPayment() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      features: [
        '1 Resume',
        'Basic Templates',
        'PDF Download',
        'Limited AI Suggestions',
        'Watermark on downloads'
      ],
      highlighted: false,
      cta: 'Current Plan'
    },
    {
      name: 'Pro',
      price: { monthly: 9.99, annual: 7.99 },
      features: [
        'Unlimited Resumes',
        'All Premium Templates',
        'PDF & Word Download',
        'Advanced AI Analysis',
        'Cover Letter Builder',
        'ATS Optimization',
        'No Watermark',
        'Priority Support'
      ],
      highlighted: true,
      cta: 'Upgrade to Pro'
    },
    {
      name: 'Enterprise',
      price: { monthly: 29.99, annual: 24.99 },
      features: [
        'Everything in Pro',
        'Team Collaboration',
        'Custom Branding',
        'API Access',
        'Dedicated Account Manager',
        'SSO Integration',
        'Advanced Analytics',
        'Custom Templates'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-8 text-primary">
                <svg className="w-full h-full fill-current" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" opacity="0.5"/>
                  <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                ResumeBuilder
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-9">
              <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors">Templates</Link>
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#">Examples</a>
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#">Support</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/review">
                <button className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Unlock premium features and take your resume to the next level
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105 border-4 border-blue-300'
                  : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="flex justify-center mb-4">
                  <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className={`text-2xl font-black mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
                  /{billingCycle === 'monthly' ? 'month' : 'month (billed annually)'}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className={`flex items-start gap-3 text-sm ${plan.highlighted ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    <span className={`material-symbols-outlined text-lg ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-primary hover:bg-slate-100'
                    : plan.name === 'Free'
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-default'
                    : 'bg-primary text-white hover:bg-blue-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Form (for Pro/Enterprise) */}
        <div className="mt-16 max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Payment Information
          </h2>

          <form className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute right-3 top-3 flex gap-2">
                  <span className="text-2xl">💳</span>
                </div>
              </div>
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">lock</span>
              Complete Secure Payment
            </button>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Your payment is secured with 256-bit SSL encryption
            </p>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee for all paid plans. No questions asked.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
