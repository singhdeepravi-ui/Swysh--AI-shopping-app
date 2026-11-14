import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  Heart, 
  X, 
  Info, 
  Bookmark, 
  User, 
  ShoppingBag, 
  ChevronRight, 
  Check, 
  Leaf, 
  Zap,
  ArrowLeft,
  Settings,
  History
} from 'lucide-react';
import { Aesthetic, Category, Gender, Product, UserProfile, Brand } from './types';
import { PRODUCTS, BRANDS } from './mockData';

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: (profile: UserProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'Unisex',
    categories: [],
    aesthetic: [],
    budget: 'Mid-range',
    sustainabilityFocus: false,
    likedProducts: [],
    passedProducts: [],
    savedProducts: [],
    followedBrands: []
  });

  const steps = [
    {
      title: "Who are you shopping for?",
      field: 'gender',
      options: ['Men', 'Women', 'Unisex']
    },
    {
      title: "What are you looking for?",
      field: 'categories',
      options: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'],
      multiple: true
    },
    {
      title: "What's your vibe?",
      field: 'aesthetic',
      options: ['Minimalist', 'Streetwear', 'Vintage', 'Boho', 'Luxury', 'Athleisure', 'Y2K'],
      multiple: true
    },
    {
      title: "Sustainability matters to me",
      field: 'sustainabilityFocus',
      type: 'toggle'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const toggleOption = (field: keyof UserProfile, option: any) => {
    setProfile(prev => {
      const current = prev[field] as any[];
      if (current.includes(option)) {
        return { ...prev, [field]: current.filter(i => i !== option) };
      } else {
        return { ...prev, [field]: [...current, option] };
      }
    });
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 font-sans">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Step {step + 1} of {steps.length}</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">{currentStep.title}</h1>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentStep.type === 'toggle' ? (
              <button
                onClick={() => setProfile(prev => ({ ...prev, sustainabilityFocus: !prev.sustainabilityFocus }))}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  profile.sustainabilityFocus ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Leaf className={profile.sustainabilityFocus ? 'text-green-400' : 'text-gray-400'} />
                  <span className="font-semibold">Prioritize Sustainable Brands</span>
                </div>
                {profile.sustainabilityFocus && <Check size={20} />}
              </button>
            ) : (
              currentStep.options?.map(option => {
                const isSelected = currentStep.multiple 
                  ? (profile[currentStep.field as keyof UserProfile] as any[]).includes(option)
                  : profile[currentStep.field as keyof UserProfile] === option;

                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (currentStep.multiple) {
                        toggleOption(currentStep.field as keyof UserProfile, option);
                      } else {
                        setProfile(prev => ({ ...prev, [currentStep.field]: option }));
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      isSelected ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    {isSelected && <Check size={18} />}
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto w-full pt-8">
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          {step === steps.length - 1 ? 'Start Swyshing' : 'Continue'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ 
  product, 
  onSwipe, 
  onDetail 
}: { 
  product: Product; 
  onSwipe: (dir: 'left' | 'right') => void;
  onDetail: (p: Product) => void;
  key?: React.Key;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-50, -150], [0, 1]);

  const brand = BRANDS.find(b => b.id === product.brandId);

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
      }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlays for Like/Pass */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg] pointer-events-none">
          <span className="text-4xl font-black text-green-500 uppercase">Swysh</span>
        </motion.div>
        <motion.div style={{ opacity: passOpacity }} className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg] pointer-events-none">
          <span className="text-4xl font-black text-red-500 uppercase">Pass</span>
        </motion.div>

        {/* Gradient Bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-20">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded uppercase tracking-wider">
                  {product.aesthetic}
                </span>
                {brand?.isSustainable && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-green-500/80 text-white px-2 py-1 rounded uppercase tracking-wider">
                    <Leaf size={10} /> Eco
                  </span>
                )}
                {brand?.isEmerging && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-500/80 text-white px-2 py-1 rounded uppercase tracking-wider">
                    <Zap size={10} /> Emerging
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">{product.name}</h2>
              <p className="text-white/80 font-medium">{brand?.name} • ${product.price}</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onDetail(product); }}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Info size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetail = ({ product, onClose, onSave }: { product: Product, onClose: () => void, onSave: (id: string) => void }) => {
  const brand = BRANDS.find(b => b.id === product.brandId);

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="relative h-2/5">
        <img src={product.images[0]} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <span className="text-2xl font-bold">${product.price}</span>
          </div>
          <p className="text-gray-500 font-medium">{brand?.name}</p>
        </div>

        <div className="flex gap-4">
          {brand?.isSustainable && (
            <div className="flex-1 p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                <Leaf size={16} />
                <span className="text-xs uppercase tracking-wider">Sustainable</span>
              </div>
              <p className="text-xs text-green-600/80 leading-relaxed">
                {brand.description}
              </p>
            </div>
          )}
          {brand?.isEmerging && (
            <div className="flex-1 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                <Zap size={16} />
                <span className="text-xs uppercase tracking-wider">Emerging Brand</span>
              </div>
              <p className="text-xs text-blue-600/80 leading-relaxed">
                Fresh talent from {brand.name}.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">About this item</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          {product.sustainabilityFeatures && (
            <div className="flex flex-wrap gap-2">
              {product.sustainabilityFeatures.map(f => (
                <span key={f} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-8 space-y-4">
          <button className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
            <ShoppingBag size={20} />
            Buy Now
          </button>
          <button 
            onClick={() => onSave(product.id)}
            className="w-full border-2 border-gray-100 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Bookmark size={20} />
            Save to Wishlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'onboarding' | 'feed' | 'saved' | 'profile'>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stack, setStack] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Initial stack
    setStack([...PRODUCTS].sort(() => Math.random() - 0.5));
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setView('feed');
    
    // Simple AI personalization: Filter stack based on gender and aesthetic
    const filtered = PRODUCTS.filter(p => {
      const genderMatch = profile.gender === 'Unisex' || p.gender === profile.gender || p.gender === 'Unisex';
      const aestheticMatch = profile.aesthetic.length === 0 || profile.aesthetic.includes(p.aesthetic);
      return genderMatch && aestheticMatch;
    });
    setStack(filtered.length > 0 ? filtered : PRODUCTS);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedProduct = stack[stack.length - 1];
    if (!swipedProduct) return;

    setStack(prev => prev.slice(0, -1));
    setHistory(prev => [swipedProduct.id, ...prev]);

    if (direction === 'right') {
      setUserProfile(prev => prev ? { ...prev, likedProducts: [...prev.likedProducts, swipedProduct.id] } : null);
      // In a real app, we'd trigger a recommendation update here
    } else {
      setUserProfile(prev => prev ? { ...prev, passedProducts: [...prev.passedProducts, swipedProduct.id] } : null);
    }

    // Refill stack if empty
    if (stack.length <= 1) {
      setStack([...PRODUCTS].sort(() => Math.random() - 0.5));
    }
  };

  const handleSave = (id: string) => {
    setUserProfile(prev => {
      if (!prev) return null;
      if (prev.savedProducts.includes(id)) return prev;
      return { ...prev, savedProducts: [...prev.savedProducts, id] };
    });
    setSelectedProduct(null);
  };

  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const savedProducts = PRODUCTS.filter(p => userProfile?.savedProducts.includes(p.id));

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Swysh</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('saved')} className={`p-2 rounded-full transition-colors ${view === 'saved' ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
            <Bookmark size={22} />
          </button>
          <button onClick={() => setView('profile')} className={`p-2 rounded-full transition-colors ${view === 'profile' ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
            <User size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {view === 'feed' && (
          <div className="h-full flex flex-col p-4">
            <div className="flex-1 relative max-w-md mx-auto w-full">
              <AnimatePresence>
                {stack.map((product, index) => (
                  index >= stack.length - 3 && (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onSwipe={handleSwipe}
                      onDetail={setSelectedProduct}
                    />
                  )
                ))}
              </AnimatePresence>
              
              {stack.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-6 bg-gray-100 rounded-full">
                    <History size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold">End of the line!</h3>
                  <p className="text-gray-500 max-w-xs">We're finding more styles for you. Check back in a bit or explore your saved items.</p>
                  <button onClick={() => setStack([...PRODUCTS])} className="text-black font-bold underline">Refresh Feed</button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="py-8 flex justify-center gap-6">
              <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:scale-110 transition-transform active:scale-95"
              >
                <X size={32} />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:scale-110 transition-transform active:scale-95"
              >
                <Heart size={32} fill="currentColor" />
              </button>
            </div>
          </div>
        )}

        {view === 'saved' && (
          <div className="h-full overflow-y-auto p-6 space-y-8 bg-white">
            <div className="flex items-center gap-4">
              <button onClick={() => setView('feed')} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-3xl font-bold tracking-tight">Your Wishlist</h2>
            </div>

            {savedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <Bookmark size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-500">Items you save will appear here.</p>
                <button onClick={() => setView('feed')} className="bg-black text-white px-8 py-3 rounded-xl font-bold">Start Swyshing</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {savedProducts.map(product => (
                  <div key={product.id} className="space-y-2 group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative">
                      <img src={product.images[0]} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2">
                        <button className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
                          <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-gray-500">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'profile' && (
          <div className="h-full overflow-y-auto p-6 space-y-8 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {userProfile?.gender[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg">Aanya</h3>
                <p className="text-sm text-gray-500">Urban India • Style Explorer</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.aesthetic.map(a => (
                    <span key={a} className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">{a}</span>
                  ))}
                  {userProfile?.categories.map(c => (
                    <span key={c} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{c}</span>
                  ))}
                  {userProfile?.sustainabilityFocus && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
                      <Leaf size={14} /> Eco-Conscious
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-3xl space-y-1">
                  <span className="text-2xl font-bold">{userProfile?.likedProducts.length}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Likes</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl space-y-1">
                  <span className="text-2xl font-bold">{userProfile?.savedProducts.length}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Saved</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setView('onboarding')}
              className="w-full py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:text-black hover:border-black transition-all"
            >
              Reset Preferences
            </button>
          </div>
        )}
      </main>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
