"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Percent, X } from 'lucide-react';

export default function DiscountNotification() {
  const searchParams = useSearchParams();
  const discount = searchParams.get('discount');

  useEffect(() => {
    if (discount === 'N9Y1FP72AB5D') {
      toast.success("Code promo N9Y1FP72AB5D appliqué !", {
        description: "Votre réduction de 10% sera calculée lors de la validation de votre commande.",
        duration: 5000,
        icon: <Percent className="w-5 h-5 text-primary" />,
      });
      // Store in localStorage for persistence during the session
      localStorage.setItem('applied_discount', discount);
    }
  }, [discount]);

  return null;
}
