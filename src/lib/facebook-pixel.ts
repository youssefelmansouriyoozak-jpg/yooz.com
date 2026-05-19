// Facebook Pixel Helper - ID: 525469750001745

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const FB_PIXEL_ID = '525469750001745';

// Track page views
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Standard Facebook Events
export const fbEvents = {
  // User views product
  viewContent: (product: { id: string; name: string; price: number; currency?: string }) => {
    event('ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency || 'MAD',
    });
  },

  // User adds item to cart
  addToCart: (product: { id: string; name: string; price: number; quantity?: number; currency?: string }) => {
    event('AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency || 'MAD',
      num_items: product.quantity || 1,
    });
  },

  // User initiates checkout
  initiateCheckout: (items: { ids: string[]; value: number; numItems: number; currency?: string }) => {
    event('InitiateCheckout', {
      content_ids: items.ids,
      content_type: 'product',
      value: items.value,
      currency: items.currency || 'MAD',
      num_items: items.numItems,
    });
  },

  // User completes purchase
  purchase: (order: { ids: string[]; value: number; numItems: number; currency?: string }) => {
    event('Purchase', {
      content_ids: order.ids,
      content_type: 'product',
      value: order.value,
      currency: order.currency || 'MAD',
      num_items: order.numItems,
    });
  },

  // User adds payment info
  addPaymentInfo: () => {
    event('AddPaymentInfo');
  },

  // User searches
  search: (searchString: string) => {
    event('Search', {
      search_string: searchString,
    });
  },

  // User views collection/category
  viewCategory: (category: string) => {
    event('ViewContent', {
      content_category: category,
      content_type: 'product_group',
    });
  },

  // User adds to wishlist
  addToWishlist: (product: { id: string; name: string; price: number; currency?: string }) => {
    event('AddToWishlist', {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      currency: product.currency || 'MAD',
    });
  },

  // User completes registration
  completeRegistration: (method?: string) => {
    event('CompleteRegistration', {
      content_name: method || 'website',
    });
  },

  // User contacts (newsletter, form)
  lead: (source?: string) => {
    event('Lead', {
      content_name: source || 'contact_form',
    });
  },

  // Custom: User clicks contact/WhatsApp
  contact: (method: string) => {
    event('Contact', {
      content_name: method,
    });
  },
};
