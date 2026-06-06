"use client";

import * as React from "react";
import { Share2, Gift, Heart, X, Copy, Check } from "lucide-react";
import { Button } from "./button";

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  variant?: "default" | "icon" | "floating" | "banner" | "product";
  className?: string;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// AJOUT: TikTok icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
  </svg>
);

export function ShareButton({
  url,
  title = "Découvrez ceci sur Yoozak!",
  description = "",
  variant = "default",
  className = ""
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState(url || "");
  const [copied, setCopied] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  // AJOUT: état pour afficher le toast "lien copié pour Instagram/TikTok"
  const [socialCopyToast, setSocialCopyToast] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (!url) {
        setCurrentUrl(window.location.href);
      }
      const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(checkMobile);
    }
  }, [url]);

  const shareText = `${title}${description ? '\n' + description : ''}\n\n👉 `;

  // ── Facebook ── fonctionne parfaitement
  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(title)}`;
    if (isMobile) {
      window.location.href = fbUrl;
    } else {
      window.open(fbUrl, 'facebook-share', 'width=580,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    }
    setIsOpen(false);
  };

  // ── WhatsApp ── fonctionne parfaitement
  const handleWhatsAppShare = () => {
    const waUrl = isMobile
      ? `whatsapp://send?text=${encodeURIComponent(shareText + currentUrl)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText + currentUrl)}`;
    if (isMobile) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, 'whatsapp-share', 'width=580,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    }
    setIsOpen(false);
  };

  // ── Instagram ── pas d'API de partage URL (limitation Instagram)
  // La meilleure solution possible : copier le lien + ouvrir l'app
  const handleInstagramShare = async () => {
    await copyToClipboard(currentUrl);
    setSocialCopyToast("instagram");
    setTimeout(() => setSocialCopyToast(""), 3000);
    if (isMobile) {
      setTimeout(() => { window.location.href = 'instagram://'; }, 500);
    } else {
      window.open('https://www.instagram.com/', '_blank');
    }
  };

  // ── TikTok ── même limitation qu'Instagram, pas d'API de partage URL
  // Copie le lien + ouvre l'app TikTok
  const handleTikTokShare = async () => {
    await copyToClipboard(currentUrl);
    setSocialCopyToast("tiktok");
    setTimeout(() => setSocialCopyToast(""), 3000);
    if (isMobile) {
      setTimeout(() => { window.location.href = 'snssdk1233://'; }, 500);
    } else {
      window.open('https://www.tiktok.com/', '_blank');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try { document.execCommand("copy"); } catch (err) { console.error("Copy failed", err); }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyLink = async () => {
    await copyToClipboard(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description || title, url: currentUrl });
        return true;
      } catch { return false; }
    }
    return false;
  };

  const handleShareClick = async () => {
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
      const shared = await handleNativeShare();
      if (!shared) setIsOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  const ShareModal = ({ children }: { children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={() => setIsOpen(false)}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          className="relative bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 w-full md:max-w-md shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors">
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    );
  };

  const ShareContent = () => (
    <>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Partagez avec vos proches!</h3>
        <p className="text-muted-foreground text-sm">Faites découvrir Yoozak à un ami et partagez vos coups de coeur</p>
      </div>

      {/* Toast Instagram / TikTok */}
      {socialCopyToast && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <Check size={16} className="text-green-600 shrink-0" />
          <p className="text-xs font-semibold text-green-700">
            Lien copié ! Collez-le dans votre publication {socialCopyToast === "instagram" ? "Instagram" : "TikTok"} 📋
          </p>
        </div>
      )}
     
      {/* 4 boutons : Facebook, WhatsApp, Instagram, TikTok */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={handleFacebookShare} className="group flex flex-col items-center gap-2" type="button">
          <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg shadow-[#1877F2]/30 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-active:scale-95">
            <FacebookIcon />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Facebook</span>
        </button>

        <button onClick={handleWhatsAppShare} className="group flex flex-col items-center gap-2" type="button">
          <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-active:scale-95">
            <WhatsAppIcon />
          </div>
          <span className="text-xs font-medium text-muted-foreground">WhatsApp</span>
        </button>

        <button onClick={handleInstagramShare} className="group flex flex-col items-center gap-2" type="button">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-active:scale-95">
            <InstagramIcon />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Instagram</span>
        </button>

        {/* AJOUT TikTok */}
        <button onClick={handleTikTokShare} className="group flex flex-col items-center gap-2" type="button">
          <div className="w-14 h-14 rounded-2xl bg-[#010101] text-white flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-active:scale-95">
            <TikTokIcon />
          </div>
          <span className="text-xs font-medium text-muted-foreground">TikTok</span>
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-muted-foreground truncate outline-none"
          />
          <button
            onClick={handleCopyLink}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              copied ? 'bg-green-500 text-white' : 'bg-foreground text-background hover:bg-primary'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copié!' : 'Copier'}
          </button>
        </div>
      </div>
     
      <div className="mt-4 pb-4 md:pb-0">
        <p className="text-xs text-center text-muted-foreground">
          {isMobile ? "Appuyez sur une icône pour partager" : "Cliquez sur une icône pour partager"}
        </p>
      </div>
    </>
  );

  if (variant === "floating") {
    return (
      <>
        <button
          onClick={handleShareClick}
          className={`fixed bottom-6 right-6 z-50 group ${className}`}
          aria-label="Partager"
          type="button"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform">
              <Share2 size={22} />
            </div>
          </div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hidden md:block">
            Partagez avec un ami!
          </div>
        </button>
        <ShareModal><ShareContent /></ShareModal>
      </>
    );
  }

  if (variant === "product") {
    return (
      <>
        <button
          onClick={handleShareClick}
          type="button"
          className={`group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all ${className}`}
        >
          <Heart size={16} className="group-hover:scale-110 transition-transform" />
          <span>Partager</span>
        </button>
        <ShareModal><ShareContent /></ShareModal>
      </>
    );
  }

  if (variant === "banner") {
    return (
      <>
        <div className={`bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-4 md:p-5 ${className}`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm md:text-base">Vous aimez ce que vous voyez?</p>
                <p className="text-muted-foreground text-xs md:text-sm">Partagez cette découverte avec vos proches!</p>
              </div>
            </div>
            <button
              onClick={handleShareClick}
              type="button"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-primary active:scale-95 transition-all"
            >
              <Share2 size={16} />
              Partager maintenant
            </button>
          </div>
        </div>
        <ShareModal><ShareContent /></ShareModal>
      </>
    );
  }

  if (variant === "icon") {
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className={`hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all ${className}`}
          aria-label="Partager"
          onClick={handleShareClick}
          type="button"
        >
          <Share2 size={18} />
        </Button>
        <ShareModal><ShareContent /></ShareModal>
      </>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className={`gap-2 hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all ${className}`}
        onClick={handleShareClick}
        type="button"
      >
        <Share2 size={16} />
        Partager
      </Button>
      <ShareModal><ShareContent /></ShareModal>
    </>
  );
}

export function FloatingShareButton() {
  return <ShareButton variant="floating" />;
}

export function ShareBanner({ title, className }: { title?: string; className?: string }) {
  return <ShareButton variant="banner" title={title} className={className} />;
}