
/**
 * NAIDERCASH Configuration File
 * Mete kle Stripe ou yo isit la.
 */

export const STRIPE_CONFIG = {
  // Mete "Publishable Key" (pk_test_...) Stripe ba ou a isit la
  // SA SEKIRIZE POU FRONTEND
  PUBLISHABLE_KEY: 'pk_test_votre_cle_piblik_isit_la',
  
  // ATANSYON: Pa janm mete "Secret Key" (sk_test_...) nan fichye sa a.
  // Pou sekirite bankè, Secret Key la dwe rete sèlman nan yon Backend (Node.js, Python, elatriye).
  
  ENVIRONMENT: 'sandbox', // oswa 'production'
  CURRENCY: 'usd'
};
