export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'tendances' | 'conseils' | 'nouveautes' | 'entretien';
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'tendances-chaussures-automne-hiver-2025',
    title: 'Les Tendances Chaussures Automne-Hiver 2025-2026',
    excerpt: 'Découvrez les incontournables de la saison : mocassins revisités, bottes cavalières, et sneakers hybrides qui dominent les podiums.',
    content: `
# Les Tendances Chaussures Automne-Hiver 2025-2026

La saison automne-hiver 2025-2026 s'annonce riche en audace et en confort. Les créateurs osent des formes audacieuses, mêlant ornements précieux et praticité au quotidien.

## Le Mocassin : Star Incontestée

Le mocassin s'impose comme LA chaussure phare de cet hiver. D'inspiration britannique avec une touche contemporaine, il se décline en cuir verni, semelles épaisses et détails dorés. Le daim devient le matériau tendance par excellence.

## Bottes : Toutes les Déclinaisons

Les bottes se multiplient sous toutes leurs formes :
- **Bottes cavalières** : Le grand retour avec élégance
- **Chelsea boots revisitées** : Plus modernes que jamais
- **Cuissardes oversize** : Pour les plus audacieuses
- **Boots country** : Semelles épaisses et caractère

## Sneakers Hybrides

Les baskets se portent avec absolument tout. La fusion ballerine-sneaker s'impose comme le modèle hybride ultime. Les versions éco-responsables et les coloris pastel délicats sont particulièrement prisés.

## Maximalisme Assumé

Franges, dentelles, motifs fantaisie, cristaux scintillants... Les collections sont dominées par des modèles qui surprennent par la richesse de leur ornementation. Les imprimés animaliers seront l'une des tendances phares.
    `,
    category: 'tendances',
    image: 'https://wjnerekpjeqqbejnvjcd.supabase.co/storage/v1/object/sign/Yoozak/Mode_HiverBlog.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWNhYzI0Yi01NjM0LTQ3ZGMtOTI0Yi1lMzY0ZThiODIwZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJZb296YWsvTW9kZV9IaXZlckJsb2cuanBnIiwiaWF0IjoxNzY4ODY0NjY3LCJleHAiOjQzNjA4NjQ2Njd9.D7OrVW-Hqa35GrOGo3CkCe8LvJMueIR4a1OyZxCZHjI',
    author: 'Yoozak Mode',
    date: '2025-01-15',
    readTime: '5 min',
    tags: ['tendances', 'automne-hiver', '2025', 'mode']
  },
  {
    id: '2',
    slug: 'comment-choisir-ses-bottines-parfaites',
    title: 'Comment Choisir ses Bottines Parfaites ?',
    excerpt: 'Guide complet pour trouver la paire idéale selon votre morphologie, votre style et vos besoins au quotidien.',
    content: `
# Comment Choisir ses Bottines Parfaites ?

Les bottines sont un indispensable du dressing. Mais comment choisir la paire parfaite parmi tant de modèles ? Voici notre guide complet.

## Selon Votre Morphologie

### Petites Silhouettes
Optez pour des bottines à talons avec une tige courte qui allonge la jambe. Les modèles pointus créent un effet d'optique flatteur.

### Silhouettes Élancées
Vous pouvez tout vous permettre ! Les bottines plates, les modèles chunky ou les talons hauts s'adaptent parfaitement.

## Selon Votre Style

### Style Classique
Chelsea boots en cuir noir ou marron, lignes épurées et finitions soignées.

### Style Rock
Boots à boucles, clous, cuir vieilli ou vernis noir. N'hésitez pas sur les semelles crantées.

### Style Bohème
Bottines en daim, franges, broderies et couleurs terreuses.

## Les Critères Essentiels

1. **Le Confort** : Essayez toujours en fin de journée
2. **La Qualité du Cuir** : Investissez dans du vrai cuir
3. **La Semelle** : Antidérapante et amortissante
4. **La Fermeture** : Zip latéral pour faciliter l'enfilage
    `,
    category: 'conseils',
    image: 'https://wjnerekpjeqqbejnvjcd.supabase.co/storage/v1/object/sign/Yoozak/ChoixdebottineBlog.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWNhYzI0Yi01NjM0LTQ3ZGMtOTI0Yi1lMzY0ZThiODIwZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJZb296YWsvQ2hvaXhkZWJvdHRpbmVCbG9nLmpwZyIsImlhdCI6MTc2ODg2NTg5MywiZXhwIjo0MzYwODY1ODkzfQ.1mDfNppER5GtkJsw8FT8J28JO-J0Z8SfIxSLseN4J4U',
    author: 'Yoozak Mode',
    date: '2025-01-12',
    readTime: '4 min',
    tags: ['bottines', 'guide', 'conseils', 'morphologie']
  },
  {
    id: '3',
    slug: 'sneakers-eco-responsables-avenir-mode',
    title: 'Sneakers Éco-Responsables : L\'Avenir de la Mode',
    excerpt: 'Les grandes marques révolutionnent l\'industrie avec des baskets durables sans compromettre le style.',
    content: `
# Sneakers Éco-Responsables : L'Avenir de la Mode

L'industrie de la chaussure se transforme. Les sneakers éco-responsables ne sont plus un marché de niche mais une véritable révolution.

## Les Matériaux Innovants

### Cuir de Raisin
Fabriqué à partir des résidus de l'industrie viticole, ce matériau bluffant imite parfaitement le cuir traditionnel.

### Plastique Océanique Recyclé
Des marques récupèrent le plastique des océans pour créer des sneakers stylées et durables.

### Caoutchouc Naturel
Les semelles en caoutchouc d'hévéa certifié FSC remplacent les dérivés du pétrole.

## Les Marques Pionnières

- **Veja** : Le pionnier français
- **Allbirds** : L'innovation en laine mérinos
- **Cariuma** : Le bambou brésilien
- **On Running** : Performance et durabilité

## Pourquoi Adopter l'Éco-Responsable ?

1. Réduction de l'empreinte carbone de 30% en moyenne
2. Qualité souvent supérieure et durabilité accrue
3. Design aussi tendance que les modèles classiques
4. Contribution à une mode plus éthique
    `,
      category: 'nouveautes',
      image: 'https://wjnerekpjeqqbejnvjcd.supabase.co/storage/v1/object/sign/Yoozak/ImageBlogSutainable.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWNhYzI0Yi01NjM0LTQ3ZGMtOTI0Yi1lMzY0ZThiODIwZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJZb296YWsvSW1hZ2VCbG9nU3V0YWluYWJsZS5qcGciLCJpYXQiOjE3Njg4NjMxMzUsImV4cCI6NDM2MDg2MzEzNX0.3WaltwAjsD7VLVVEWq3Vax-0KD60wRcGn898awAQIdg',
      author: 'Yoozak Mode',
      date: '2025-01-10',
      readTime: '6 min',
      tags: ['sneakers', 'éco-responsable', 'durabilité', 'innovation']
    },
  {
    id: '4',
    slug: 'entretien-chaussures-cuir-guide-complet',
    title: 'Entretien des Chaussures en Cuir : Guide Complet',
    excerpt: 'Tous nos secrets pour préserver vos chaussures en cuir et les garder impeccables pendant des années.',
    content: `
# Entretien des Chaussures en Cuir : Guide Complet

Le cuir est un matériau noble qui demande attention et soins réguliers. Voici comment préserver vos chaussures.

## Le Kit Indispensable

- Brosse à chaussures en crin de cheval
- Chiffon doux en coton
- Cirage de qualité (couleur assortie)
- Crème nourrissante incolore
- Embauchoirs en cèdre

## Routine d'Entretien Hebdomadaire

### Étape 1 : Dépoussiérage
Brossez délicatement pour retirer poussières et saletés.

### Étape 2 : Nettoyage
Appliquez une crème nettoyante avec un chiffon doux en mouvements circulaires.

### Étape 3 : Nourriture
Massez une crème nourrissante pour hydrater le cuir en profondeur.

### Étape 4 : Cirage
Appliquez le cirage en couche fine, laissez sécher 10 minutes, puis lustrez.

## Astuces de Pro

- **Alternez vos paires** : Laissez reposer vos chaussures 24h entre deux ports
- **Séchage naturel** : Jamais près d'une source de chaleur
- **Imperméabilisation** : Appliquez un spray protecteur avant la première utilisation
- **Embauchoirs** : Toujours après chaque utilisation pour maintenir la forme
    `,
    category: 'entretien',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
    author: 'Yoozak Mode',
    date: '2025-01-08',
    readTime: '5 min',
    tags: ['entretien', 'cuir', 'conseils', 'soins']
  },
  {
    id: '5',
    slug: 'mocassins-comeback-chaussure-annee',
    title: 'Le Grand Retour des Mocassins : La Chaussure de l\'Année',
    excerpt: 'Du preppy américain aux podiums parisiens, le mocassin s\'impose comme le must-have absolu de 2025.',
    content: `
# Le Grand Retour des Mocassins : La Chaussure de l'Année

Oubliez l'image poussiéreuse du mocassin de votre grand-père. En 2025, il devient l'accessoire mode le plus convoité.

## L'Évolution du Mocassin

### Les Années 50-60
Symbole du style preppy américain, porté sur les campus universitaires.

### Les Années 80-90
Gucci réinvente le genre avec son mors emblématique, devenu iconique.

### 2025
Explosion de créativité : semelles plateformes, cuir verni, détails dorés, versions chunky.

## Comment le Porter ?

### Avec un Jean
L'alliance parfaite : mocassins noirs vernis + jean droit = chic décontracté.

### Avec une Jupe Midi
Le combo tendance par excellence pour un look parisien assumé.

### Avec un Costume
Osez la version sans chaussettes pour un twist moderne.

## Les Modèles à Adopter

1. **Le Penny Loafer** : L'intemporel revisité
2. **Le Mocassin à Mors** : L'élégance Gucci-style
3. **Le Chunky Loafer** : La version audacieuse
4. **Le Mocassin Plateforme** : Pour prendre de la hauteur
    `,
    category: 'tendances',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    author: 'Yoozak Mode',
    date: '2025-01-05',
    readTime: '4 min',
    tags: ['mocassins', 'tendances', '2025', 'style']
  },
  {
    id: '6',
    slug: 'chaussures-mariage-guide-ultime',
    title: 'Chaussures de Mariage : Le Guide Ultime',
    excerpt: 'Escarpins, sandales ou sneakers ? Trouvez la paire parfaite pour le plus beau jour de votre vie.',
    content: `
# Chaussures de Mariage : Le Guide Ultime

Le choix des chaussures de mariage est crucial. Elles doivent être belles, confortables et parfaitement assorties à votre robe.

## Selon Votre Robe

### Robe Longue Princesse
Escarpins classiques ou sandales à talons fins. La chaussure sera peu visible, privilégiez le confort.

### Robe Courte ou Midi
Tous les styles sont permis ! C'est l'occasion de faire un statement avec des chaussures originales.

### Robe Bohème
Sandales plates ornées, espadrilles compensées ou même pieds nus pour les mariages nature.

## Les Tendances 2025

### Escarpins Satin
Le grand classique se pare de broderies délicates et de perles.

### Sandales à Bride
Élégantes et confortables, parfaites pour danser toute la nuit.

### Sneakers de Luxe
La tendance qui monte : des baskets blanches customisées pour les mariées modernes.

## Nos Conseils Confort

1. **Rodez-les** : Portez-les chez vous plusieurs fois avant le jour J
2. **Prévoyez une paire de rechange** : Des ballerines pliables pour la fin de soirée
3. **Semelles gel** : Pour un confort optimal toute la journée
4. **Talons raisonnables** : Maximum 8cm pour pouvoir danser
    `,
    category: 'conseils',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    author: 'Yoozak Mode',
    date: '2025-01-02',
    readTime: '5 min',
    tags: ['mariage', 'conseils', 'escarpins', 'élégance']
  }
];

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: BlogArticle['category']): BlogArticle[] => {
  return blogArticles.filter(article => article.category === category);
};

export const getLatestArticles = (count: number = 3): BlogArticle[] => {
  return [...blogArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const categoryLabels: Record<BlogArticle['category'], string> = {
  tendances: 'Tendances',
  conseils: 'Conseils',
  nouveautes: 'Nouveautés',
  entretien: 'Entretien'
};
