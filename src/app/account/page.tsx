import { getSession, logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { LogOut, Package, User, ShoppingBag, ChevronRight, PartyPopper, Zap, Copy, Sparkles } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const customer = await getSession();
  const params = await searchParams;
  const showWelcome = params.welcome === 'true';

  if (!customer) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FBFBFB] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {showWelcome && (
          <div className="bg-primary text-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-700">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150">
              <PartyPopper size={300} />
            </div>
            <div className="absolute -bottom-20 -left-20 p-8 opacity-5 -rotate-12 scale-150">
              <Sparkles size={400} />
            </div>
            
            <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.3em] border border-white/30">Bienvenue !</span>
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-[0.85]">
                C'est le moment de <br />
                <span className="text-white/80">se faire plaisir</span>
              </h2>
              
              <p className="text-white/90 font-medium text-lg max-w-xl mb-12 leading-relaxed">
                Votre compte Yoozak est prêt ! Pour vous remercier de nous avoir rejoint, voici votre cadeau de bienvenue exclusif.
              </p>
              
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/10">
                <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-white text-primary rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-xl shadow-black/10">
                    <Zap size={36} className="fill-primary" />
                  </div>
                  <div className="text-center md:text-left">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Votre Code Promo (-10%)</p>
                      <p className="text-4xl font-black tracking-tighter">N9Y1FP72AB5D</p>
                    </div>
                  </div>
                  
                  <Button asChild className="bg-white text-primary hover:bg-white/90 h-auto py-6 px-12 rounded-[1.5rem] font-black uppercase tracking-widest text-[13px] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20">
                    <Link href="/collections/all?discount=N9Y1FP72AB5D">Utiliser maintenant</Link>
                  </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Mon Compte</h1>
            <p className="text-muted-foreground font-medium text-lg">Heureux de vous revoir, {customer.firstName} !</p>
          </div>
          <form action={logout}>
            <Button variant="outline" className="rounded-full px-10 border-2 font-black uppercase tracking-widest text-[11px] h-14 hover:bg-destructive hover:text-white hover:border-destructive transition-all group shadow-sm">
              <LogOut className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Déconnexion
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 pb-8 pt-10 text-center border-b border-primary/5">
              <div className="mx-auto w-24 h-24 bg-white rounded-[2rem] shadow-md flex items-center justify-center mb-4 border border-primary/10">
                <User className="text-primary w-12 h-12" />
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Informations</CardTitle>
            </CardHeader>
            <CardContent className="pt-10 space-y-8 px-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nom Complet</p>
                <p className="font-bold text-lg">{customer.firstName} {customer.lastName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="font-bold text-lg break-all">{customer.email}</p>
              </div>
              {customer.phone && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Téléphone</p>
                  <p className="font-bold text-lg">{customer.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
                <Package className="text-primary w-8 h-8" /> Mes Commandes
              </h2>
              <span className="bg-foreground text-background px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-foreground/10">
                {customer.orders?.edges?.length || 0} Commandes
              </span>
            </div>

            {customer.orders?.edges?.length === 0 ? (
              <Card className="border-dashed border-2 border-muted bg-white/50 rounded-[2.5rem] py-24 text-center">
                <CardContent className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-muted-foreground/30" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black uppercase tracking-tight">Aucune commande</p>
                    <p className="text-muted-foreground font-medium max-w-[280px]">Votre prochaine paire de chaussures n'attend que vous !</p>
                  </div>
                  <Button asChild className="mt-4 bg-primary text-white hover:bg-primary/90 rounded-full px-10 h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
                    <Link href="/collections/all">Découvrir la collection</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {customer.orders.edges.map((edge: any) => {
                  const order = edge.node;
                  return (
                    <Card key={order.id} className="border-none shadow-md hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group bg-white">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                          <div className="w-20 h-20 bg-muted/50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                            <Package className="text-muted-foreground w-10 h-10 group-hover:text-primary transition-colors duration-500" />
                          </div>
                          <div className="flex-1 text-center md:text-left space-y-1">
                            <h3 className="text-xl font-black uppercase tracking-tight">Commande #{order.orderNumber}</h3>
                            <p className="text-muted-foreground font-medium">
                              {new Date(order.processedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="text-center md:text-right px-8 border-x border-muted/50 hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Montant Total</p>
                            <p className="text-2xl font-black text-primary">
                              {formatPrice(order.totalPrice.amount)}
                            </p>
                          </div>
                          <Button variant="ghost" className="rounded-full w-14 h-14 p-0 hover:bg-primary/10 group-hover:bg-primary/10 transition-all">
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
