import React, { useState } from 'react';
import { X, Check, CreditCard, Zap, Shield, Loader2, IndianRupee, Smartphone } from 'lucide-react';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

export const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ isOpen, onClose, onPurchase }) => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const plans = [
    { id: 'micro', name: 'Micro', credits: 100, price: 100, features: ['Valid for 7 days', 'Basic Tool Access'] },
    { id: 'starter', name: 'Starter', credits: 500, price: 500, features: ['Valid for 1 month', 'Standard Support', 'All Tools Access'] },
    { id: 'standard', name: 'Standard', credits: 1000, price: 1000, popular: true, features: ['Valid for 3 months', 'Priority Processing', 'GPT-4 Access'] },
    { id: 'enterprise', name: 'Power User', credits: 5000, price: 5000, features: ['No Expiration', 'Dedicated GPU', 'API Access', '24/7 Support'] },
  ];

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      const plan = plans.find(p => p.id === selectedPlan);
      if (plan) {
        onPurchase(plan.credits);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-[#161b22] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        <button onClick={onClose} className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white z-20 bg-black/20 rounded-full p-1">
          <X size={20} />
        </button>

        {/* Scrollable Content Wrapper for Mobile */}
        <div className="flex flex-col md:flex-row w-full overflow-y-auto">
          
          {/* Left Side: Plan Selection */}
          <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-700/50">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Top up Credits</h2>
              <p className="text-gray-400 text-xs md:text-sm">1 Rupee = 1 Credit. Choose your package.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                    selectedPlan === plan.id 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2.5 right-4 bg-primary-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Best Value
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm md:text-base">{plan.name}</h3>
                      <span className="text-accent-cyan font-mono font-bold text-xs bg-accent-cyan/10 px-2 py-0.5 rounded-md">
                        {plan.credits.toLocaleString()} Credits
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      {plan.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Check size={8} className="text-green-500" /> {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-lg md:text-xl font-bold text-white flex items-center md:justify-end">
                    <IndianRupee size={16} className="mr-0.5" />
                    {plan.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Payment */}
          <div className="w-full md:w-[320px] bg-gray-900/50 p-6 md:p-8 flex flex-col flex-shrink-0">
            <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">Payment Method</h3>
            
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <button 
                onClick={() => setPaymentMethod('upi')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'upi' ? 'border-primary-500 bg-gray-800' : 'border-gray-700 hover:bg-gray-800'
                }`}
              >
                <Smartphone size={18} className="text-gray-300" />
                <div className="text-left">
                  <span className="text-xs md:text-sm font-medium text-gray-200 block">UPI</span>
                  <span className="text-[10px] text-gray-500 block">Google Pay, PhonePe, Paytm</span>
                </div>
              </button>
              
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'card' ? 'border-primary-500 bg-gray-800' : 'border-gray-700 hover:bg-gray-800'
                }`}
              >
                <CreditCard size={18} className="text-gray-300" />
                <span className="text-xs md:text-sm font-medium text-gray-200">Credit / Debit Card</span>
              </button>
              
              <button 
                onClick={() => setPaymentMethod('crypto')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'crypto' ? 'border-primary-500 bg-gray-800' : 'border-gray-700 hover:bg-gray-800'
                }`}
              >
                <Shield size={18} className="text-gray-300" />
                <span className="text-xs md:text-sm font-medium text-gray-200">Crypto</span>
              </button>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
                <span>Credits</span>
                <span className="flex items-center"><Zap size={10} className="mr-1"/> {selectedPlanDetails?.credits}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
                <span>Exchange Rate</span>
                <span>1 INR = 1 Credit</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white mb-6 pt-4 border-t border-gray-700">
                <span>Total</span>
                <span className="flex items-center"><IndianRupee size={16}/> {selectedPlanDetails?.price}</span>
              </div>

              <button 
                onClick={handlePurchase}
                disabled={isProcessing || isSuccess}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  isSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-primary-600 to-accent-purple text-white hover:opacity-90'
                }`}
              >
                {isProcessing ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : isSuccess ? (
                  <>
                    <Check size={20} /> Payment Successful!
                  </>
                ) : (
                  <>
                    Pay <IndianRupee size={14}/> {selectedPlanDetails?.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};