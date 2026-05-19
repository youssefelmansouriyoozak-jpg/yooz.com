# Plan d'Optimisation SEO Complet - YOOZAK

## Résumé
Optimisation complète du référencement SEO du site e-commerce YOOZAK pour améliorer sa visibilité sur les moteurs de recherche au Maroc, avec focus sur les pages manquantes de métadonnées, l'accessibilité, la performance et les données structurées.

## Analyse de l'État Actuel

### Ce qui est déjà en place
- **Métadonnées globales** (`layout.tsx`): Titre, description, mots-clés configurés
- **Open Graph & Twitter Cards**: Configurés pour le partage social
- **JSON-LD**: Organization, WebSite, ShoeStore sur la page d'accueil
- **Sitemap dynamique**: `/sitemap.xml` fonctionnel avec produits/collections/blog
- **Robots.txt**: Configuré correctement
- **Pages avec SEO complet**: Accueil, Produits, Collections, Blog

### Lacunes Identifiées

| Page | Problème |
|------|----------|
| `/lookbook` | Aucune métadonnée SEO, pas de JSON-LD |
| `/login` | Aucune métadonnée (Client Component) |
| `/register` | Aucune métadonnée (Client Component) |
| `/account` | Métadonnées minimales |
| Images | Alt text manquant sur plusieurs composants |
| Balises H1 | Structure non optimale sur certaines pages |
| Performance | Images non optimisées pour Core Web Vitals |
| Liens internes | Maillage interne à améliorer |
| FAQ Schema | Absent - opportunité pour featured snippets |

---

## Phases d'Implémentation

### Phase 1: Métadonnées des Pages Manquantes

#### 1.1 Page Lookbook (`src/app/lookbook/page.tsx`)
**Objectif**: Ajouter métadonnées et JSON-LD pour la page lookbook

```typescript
// Ajouter en haut du fichier (convertir en Server Component ou créer layout.tsx)
export const metadata: Metadata = {
  title: "Lookbook Mode 2026 - Inspirations & Tendances Chaussures",
  description: "Explorez notre lookbook mode 2026. Découvrez les dernières tendances chaussures et trouvez l'inspiration pour vos plus beaux looks au Maroc.",
  keywords: ["lookbook mode", "tendances chaussures 2026", "inspiration mode maroc", "style chaussures"],
  alternates: {
    canonical: "https://yoozak.com/lookbook",
  },
  openGraph: {
    title: "Lookbook Mode 2026 | YOOZAK Maroc",
    description: "Découvrez nos univers mode et trouvez l'inspiration pour vos plus beaux looks.",
    url: "https://yoozak.com/lookbook",
    type: "website",
  },
};
```

**JSON-LD à ajouter**:
```typescript
const lookbookJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Lookbook YOOZAK 2026",
  description: "Inspirations mode et tendances chaussures",
  url: "https://yoozak.com/lookbook",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 6,
    itemListElement: lookbookData.map((look, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: look.title,
      description: look.description,
    })),
  },
};
```

#### 1.2 Pages Login/Register
**Stratégie**: Créer des fichiers `layout.tsx` séparés pour ces routes

**Fichier**: `src/app/login/layout.tsx`
```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - Accédez à Votre Compte",
  description: "Connectez-vous à votre compte YOOZAK pour suivre vos commandes et accéder à vos avantages exclusifs.",
  robots: { index: false, follow: true }, // Ne pas indexer les pages de connexion
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Fichier**: `src/app/register/layout.tsx`
```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - Créez Votre Compte & Obtenez -10%",
  description: "Créez votre compte YOOZAK et recevez immédiatement 10% de réduction sur votre première commande. Livraison gratuite au Maroc.",
  keywords: ["créer compte yoozak", "inscription yoozak", "réduction première commande"],
  alternates: {
    canonical: "https://yoozak.com/register",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

#### 1.3 Page Account (`src/app/account/layout.tsx`)
```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Compte - Gérer Mes Commandes",
  description: "Gérez votre compte YOOZAK, suivez vos commandes et accédez à vos avantages fidélité.",
  robots: { index: false, follow: true },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

---

### Phase 2: Optimisation des Images et Accessibilité

#### 2.1 Attributs Alt Manquants
**Fichiers à modifier**:

| Fichier | Action |
|---------|--------|
| `src/components/sections/hero.tsx` | Ajouter alt descriptifs aux images hero |
| `src/components/sections/promo-cards.tsx` | Alt pour les cartes promotionnelles |
| `src/components/sections/category-circles.tsx` | Alt pour les catégories |
| `src/components/sections/footwear-grid.tsx` | Alt pour la grille de produits |
| `src/components/sections/blog-preview.tsx` | Alt pour les aperçus d'articles |

**Exemple de correction** (`hero.tsx`):
```typescript
// Avant
<Image src={heroImage} alt="" fill />

// Après
<Image 
  src={heroImage} 
  alt="Collection de chaussures YOOZAK - Nouvelle collection 2026" 
  fill 
  priority
/>
```

#### 2.2 Attributs ARIA pour l'Accessibilité
**Fichiers à modifier**:
- `src/components/sections/header.tsx`: Ajouter `aria-label` aux boutons et icônes
- Tous les composants interactifs

```typescript
// Exemple header.tsx
<button 
  aria-label="Ouvrir le menu de navigation"
  className="lg:hidden ..."
>
  <Menu className="w-6 h-6" aria-hidden="true" />
</button>

<button 
  aria-label={`Panier - ${totalItems} article(s)`}
  className="..."
>
  <ShoppingBag aria-hidden="true" />
</button>
```

---

### Phase 3: Données Structurées Avancées

#### 3.1 FAQ Schema pour les Pages Produits
**Fichier**: `src/app/products/[handle]/page.tsx`

```typescript
function generateFAQJsonLd(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la politique de livraison pour ${product.title} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Livraison gratuite partout au Maroc sous 1-3 jours ouvrables. Paiement à la livraison disponible.",
        },
      },
      {
        "@type": "Question",
        name: "Comment choisir ma pointure ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos chaussures taillent normalement. Référez-vous à votre pointure habituelle. En cas de doute, contactez notre service client.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je retourner ou échanger mon article ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, vous disposez de 14 jours pour retourner ou échanger votre article dans son état d'origine.",
        },
      },
    ],
  };
}
```

#### 3.2 BreadcrumbList Amélioré
**Améliorer** les breadcrumbs existants avec des labels plus descriptifs:

```typescript
// Pour collections
{
  "@type": "ListItem",
  position: 2,
  name: "Chaussures Femme", // Au lieu de "Collections"
  item: "https://yoozak.com/collections/all",
}
```

#### 3.3 Review Schema (Avis Clients)
**Fichier**: `src/app/products/[handle]/page.tsx`

```typescript
// Ajouter au JSON-LD Product existant
review: [
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Client Vérifié" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody: "Excellent produit, livraison rapide !",
  },
],
```

---

### Phase 4: Optimisation Technique

#### 4.1 Amélioration du Sitemap
**Fichier**: `src/app/sitemap.ts`

Ajouter les pages manquantes:
```typescript
// Ajouter au staticPages
{
  url: `${baseUrl}/lookbook`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.6,
},
{
  url: `${baseUrl}/register`,
  lastModified: new Date(),
  changeFrequency: 'yearly',
  priority: 0.3,
},
```

#### 4.2 Vérification Google Search Console
**Fichier**: `src/app/layout.tsx`

Remplacer le placeholder:
```typescript
verification: {
  google: "VOTRE_VRAI_CODE_VERIFICATION", // Obtenir depuis Google Search Console
},
```

#### 4.3 Canonical URLs Dynamiques
S'assurer que chaque page a une URL canonique unique:
```typescript
// Dans generateMetadata de chaque page
alternates: {
  canonical: `https://yoozak.com${pathname}`,
},
```

---

### Phase 5: Contenu et Maillage Interne

#### 5.1 Enrichissement des Descriptions Produits
- Ajouter des mots-clés longue traîne dans les descriptions
- Inclure les termes de recherche locaux (villes marocaines)

#### 5.2 Liens Internes Stratégiques
**Fichiers à modifier**:
- `src/components/sections/newsletter-footer.tsx`: Ajouter liens vers collections populaires
- `src/app/blog/[slug]/page.tsx`: Ajouter liens vers produits connexes

```typescript
// Exemple dans le footer
<nav aria-label="Collections populaires">
  <h3>Collections Populaires</h3>
  <Link href="/collections/bottines">Bottines Femme</Link>
  <Link href="/collections/mocassins">Mocassins Homme</Link>
  <Link href="/collections/sandales">Sandales</Link>
</nav>
```

#### 5.3 Page 404 Optimisée
**Créer**: `src/app/not-found.tsx`

```typescript
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Non Trouvée | YOOZAK",
  description: "La page que vous recherchez n'existe pas. Découvrez notre collection de chaussures.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black">404</h1>
        <p>Page non trouvée</p>
        <Link href="/collections/all">Voir nos produits</Link>
      </div>
    </div>
  );
}
```

---

### Phase 6: Performance et Core Web Vitals

#### 6.1 Optimisation des Images
- Ajouter `priority` aux images above-the-fold
- Utiliser `sizes` appropriés pour le responsive
- Implémenter le lazy loading pour les images below-the-fold

```typescript
// Hero image
<Image 
  src={heroUrl}
  alt="..."
  priority
  sizes="100vw"
  quality={85}
/>

// Images de produit dans la grille
<Image 
  src={productUrl}
  alt="..."
  loading="lazy"
  sizes="(max-width: 768px) 50vw, 20vw"
/>
```

#### 6.2 Preload des Ressources Critiques
**Fichier**: `src/app/layout.tsx`

```typescript
// Dans le head
<link rel="preconnect" href="https://cdn.shopify.com" />
<link rel="dns-prefetch" href="https://cdn.shopify.com" />
```

---

## Checklist de Validation SEO

### Avant Déploiement
- [ ] Toutes les pages ont des métadonnées uniques
- [ ] Toutes les images ont des attributs alt descriptifs
- [ ] JSON-LD validé sur https://validator.schema.org
- [ ] Sitemap accessible et complet
- [ ] Code Google Search Console ajouté
- [ ] URLs canoniques vérifiées
- [ ] Pas de contenu dupliqué

### Après Déploiement
- [ ] Soumettre sitemap dans Google Search Console
- [ ] Vérifier l'indexation avec "site:yoozak.com"
- [ ] Tester les rich snippets avec Google Rich Results Test
- [ ] Vérifier Open Graph avec Facebook Debugger
- [ ] Analyser Core Web Vitals avec PageSpeed Insights

---

## Fichiers à Créer/Modifier

| Action | Fichier | Description |
|--------|---------|-------------|
| Créer | `src/app/lookbook/layout.tsx` | Métadonnées lookbook |
| Créer | `src/app/login/layout.tsx` | Métadonnées login |
| Créer | `src/app/register/layout.tsx` | Métadonnées register |
| Créer | `src/app/account/layout.tsx` | Métadonnées account |
| Créer | `src/app/not-found.tsx` | Page 404 optimisée |
| Modifier | `src/app/lookbook/page.tsx` | Convertir en Server Component + JSON-LD |
| Modifier | `src/app/sitemap.ts` | Ajouter pages manquantes |
| Modifier | `src/app/layout.tsx` | Vrai code verification Google |
| Modifier | `src/components/sections/header.tsx` | Aria labels |
| Modifier | `src/components/sections/hero.tsx` | Alt images |
| Modifier | `src/app/products/[handle]/page.tsx` | FAQ Schema |

---

## Priorité d'Implémentation

1. **Haute**: Phase 1 (Métadonnées manquantes) + Code Google Verification
2. **Haute**: Phase 3 (JSON-LD FAQ) - Impact direct sur les rich snippets
3. **Moyenne**: Phase 2 (Accessibilité) - Améliore l'UX et indirectement le SEO
4. **Moyenne**: Phase 4 (Technique) - Sitemap complet
5. **Basse**: Phase 5 (Contenu) - Amélioration continue
6. **Basse**: Phase 6 (Performance) - Optimisation progressive

---

## Résultats Attendus

| Métrique | Actuel | Objectif (3 mois) |
|----------|--------|-------------------|
| Pages indexées | ~50 | 100+ |
| Position moyenne | N/A | Top 20 pour mots-clés cibles |
| Rich snippets | Basique | Produits + FAQ + Reviews |
| Core Web Vitals | À mesurer | Vert sur les 3 métriques |
| Taux de clics (CTR) | N/A | +30% avec rich snippets |
