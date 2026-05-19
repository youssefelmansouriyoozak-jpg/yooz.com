"use client";

import { useEffect } from 'react';
import { fbEvents } from '@/lib/facebook-pixel';

export default function CollectionTracker({ collectionTitle }: { collectionTitle: string }) {
  useEffect(() => {
    fbEvents.viewCategory(collectionTitle);
  }, [collectionTitle]);

  return null;
}
