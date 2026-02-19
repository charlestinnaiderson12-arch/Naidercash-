
import { STRIPE_CONFIG } from './config';

export const stripeIssuingService = {
  /**
   * Simule kreyasyon yon kat vityèl sou Stripe
   */
  createVirtualCard: async (holderName: string) => {
    console.log(`Konekte ak Stripe nan anviwònman: ${STRIPE_CONFIG.ENVIRONMENT}`);
    
    // Nan yon aplikasyon reyèl, ou ta fè yon fetch nan BACKEND ou 
    // ki li menm ap rele Stripe API ak Secret Key la.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'ic_12345',
          last4: '8823',
          brand: 'Mastercard',
          status: 'active',
          holder: holderName
        });
      }, 2000);
    });
  },

  /**
   * Tcheke si kle a konfigure
   */
  isConfigured: () => {
    return STRIPE_CONFIG.PUBLISHABLE_KEY !== 'pk_test_votre_cle_piblik_isit_la';
  }
};
