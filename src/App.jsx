import React, { useState, useEffect } from 'react';
import { getTheme, applyTheme } from './utils/theme';
import { createRipple } from './utils/ripple';
import { getCardContent } from './data/cardContent';
import {
  GateIcon,
  WifiIcon,
  TvIcon,
  GroceryIcon,
  PoolIcon,
  SpaIcon,
  RestaurantIcon,
  MapIcon,
  TrailServicesIcon,
  CheckoutIcon,
} from './components/Icons';
import { Card } from './components/Card';
import { Dialog } from './components/Dialog';
import { LanguageModal } from './components/LanguageModal';
import { ImageZoom } from './components/ImageZoom';
import { BackgroundBubbles } from './components/BackgroundBubbles';

function App() {
  console.log('[App] Component function called');

  const [openDialog, setOpenDialog] = useState(null);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastVisited, setLastVisited] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(getTheme());
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  console.log('[App] State initialized, language:', language);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      if (!language) {
        setShowLanguageModal(true);
      }
    }, 300);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setLastVisited(JSON.parse(sessionStorage.getItem('lastVisited') || '[]'));

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const themeInterval = setInterval(() => {
      const newTheme = getTheme();
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
        applyTheme(newTheme);
      }
    }, 60000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearInterval(themeInterval);
    };
  }, [currentTheme, language]);

  useEffect(() => {
    const handleClick = (e) => {
      const rippleElement = e.target.closest('.card-hover, .btn-premium, .haptic');
      if (rippleElement && !rippleElement.querySelector('.ripple-container')) {
        const container = document.createElement('div');
        container.className = 'ripple-container';
        rippleElement.appendChild(container);
      }
      if (rippleElement) {
        createRipple(e, rippleElement);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const openImage = (src) => setZoomedImg(src);
  const closeImage = () => setZoomedImg(null);

  const cardIcons = {
    gate: <GateIcon />,
    wifi: <WifiIcon />,
    tv: <TvIcon />,
    grocery: <GroceryIcon />,
    pool: <PoolIcon />,
    spa: <SpaIcon />,
    sushi: <RestaurantIcon />,
    trips: <MapIcon />,
    trail_services: <TrailServicesIcon />,
    checkout: <CheckoutIcon />,
  };

  console.log('[App] About to call getCardContent with theme:', currentTheme, 'language:', language);
  const cardContent = getCardContent(currentTheme, language, openImage);
  console.log('[App] cardContent received, length:', cardContent?.length);
  const cards = cardContent.map((card) => ({
    ...card,
    icon: cardIcons[card.id],
  }));
  console.log('[App] cards mapped, length:', cards?.length);

  const openDialogHandler = (id) => {
    setOpenDialog(id);
    if (navigator.vibrate) navigator.vibrate(50);
    const newVisited = [id, ...lastVisited.filter((v) => v !== id)].slice(0, 3);
    setLastVisited(newVisited);
    sessionStorage.setItem('lastVisited', JSON.stringify(newVisited));
  };

  const closeDialog = () => setOpenDialog(null);

  const handleInstallClick = async () => {
    if (isIOS) {
      setOpenDialog('ios-install');
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true');
      }
      setDeferredPrompt(null);
    } else {
      setOpenDialog('browser-install');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'GrappA Guest Guide',
      text: 'Check out the GrappA Guest Guide - Your complete resort companion!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slideUp z-50';
        notification.textContent = 'Link copied to clipboard!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    setShowLanguageModal(false);
  };

  const currentCard = cards.find((c) => c.id === openDialog);

  console.log('[App] About to render, isLoaded:', isLoaded, 'cards.length:', cards.length);

  return (
    <div className="min-h-screen p-4 relative">
      <BackgroundBubbles />

      {isOffline && (
        <div className="fixed top-4 left-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg text-center animate-slideUp z-50">
          <span className="font-semibold">Offline Mode</span> - Some features may be limited
        </div>
      )}

      <div className="absolute top-0 right-0 p-2 flex gap-2 z-50">
        {language && (
          <button
            onClick={() => setShowLanguageModal(true)}
            className={`px-3 py-3 rounded-xl transition-all haptic shadow-lg ${
              currentTheme === 'day' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-slate-700 hover:bg-slate-800 text-white'
            }`}
            aria-label="Change Language"
          >
            <span className="text-sm font-bold">{language === 'en' ? 'EN' : 'HE'}</span>
          </button>
        )}
        <button
          onClick={handleShare}
          className={`px-3 py-3 rounded-xl transition-all haptic shadow-lg ${
            currentTheme === 'day' ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-slate-700 hover:bg-slate-800 text-white'
          }`}
          aria-label="Share GrappA Guest Guide"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            share
          </span>
        </button>
      </div>

      <div className={`text-center mb-8 pt-16 transition-all duration-1000 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="glass-enhanced rounded-2xl p-6 max-w-md mx-auto shadow-xl">
          <h1 className="text-4xl font-black mb-2 gradient-text">GrappA Guest Guide</h1>
          <p className={`text-lg font-medium ${currentTheme === 'day' ? 'text-slate-600' : 'text-white'}`}>
            Resort Information & Services
          </p>
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              className="mt-4 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all shadow-md haptic text-sm"
            >
              <span className="flex items-center gap-2">
                <span>📲</span>
                <span>Add to Home Screen</span>
              </span>
            </button>
          )}
        </div>
        {lastVisited.length > 0 && (
          <div className="mt-6 max-w-md mx-auto">
            <p className="text-sm mb-2" style={{ color: currentTheme === 'day' ? '#64748b' : 'rgba(255,255,255,0.6)' }}>
              Recently viewed:
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {lastVisited.map((id) => {
                const card = cards.find((c) => c.id === id);
                return card ? (
                  <button
                    key={id}
                    onClick={() => openDialogHandler(id)}
                    className="px-3 py-1 bg-slate-100/60 backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-700 text-sm hover:bg-slate-200/70 transition-all haptic"
                  >
                    {card.title}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5 max-w-lg mx-auto">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            isLoaded={isLoaded}
            currentTheme={currentTheme}
            onClick={() => openDialogHandler(card.id)}
          />
        ))}
      </div>

      <Dialog
        isOpen={!!currentCard}
        onClose={closeDialog}
        title={currentCard?.title || ''}
        content={currentCard?.content}
        currentTheme={currentTheme}
      />

      <LanguageModal isOpen={showLanguageModal} onSelectLanguage={selectLanguage} currentTheme={currentTheme} />

      <ImageZoom src={zoomedImg} onClose={closeImage} currentTheme={currentTheme} />
    </div>
  );
}

export default App;
