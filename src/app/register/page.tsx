"use client";

import { useActionState } from "react";
import { register } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight, UserPlus, AlertCircle, Loader2, Phone } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-[#FBFBFB] px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="space-y-4 pt-12 pb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-2">
            <UserPlus className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tight">Inscription</CardTitle>
          <CardDescription className="font-medium text-muted-foreground px-4">
            Rejoignez Yoozak et débloquez immédiatement votre réduction de bienvenue.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          {/* Discount Badge */}
          <div className="mb-8 p-5 bg-primary rounded-[2rem] text-white flex items-center gap-5 shadow-lg shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <span className="text-6xl font-black">%</span>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
              <span className="text-white font-black text-lg">-10%</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Cadeau de Bienvenue</p>
              <p className="text-[13px] font-bold leading-tight">
                Créez votre compte et recevez un code promo de 10% sur votre commande.
              </p>
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive text-sm font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <p>{state.error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Prénom</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="Jean" 
                  required 
                  disabled={isPending}
                  className="rounded-2xl border-muted bg-muted/30 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Nom</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Dupont" 
                  required 
                  disabled={isPending}
                  className="rounded-2xl border-muted bg-muted/30 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="votre@email.com" 
                required 
                disabled={isPending}
                className="rounded-2xl border-muted bg-muted/30 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Téléphone (Mobile)</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="06XXXXXXXX" 
                  required 
                  disabled={isPending}
                  className="rounded-2xl border-muted bg-muted/30 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-12 pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Mot de passe</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                disabled={isPending}
                className="rounded-2xl border-muted bg-muted/30 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-12"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-foreground text-background hover:bg-primary transition-all duration-300 rounded-full h-14 font-black uppercase tracking-widest text-xs group mt-4 shadow-xl shadow-foreground/10"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Création en cours...
                </>
              ) : (
                <>
                  Créer mon compte <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="bg-muted/30 flex flex-col space-y-4 py-8 px-8 border-t border-muted/50">
          <div className="text-center text-sm">
            <span className="text-muted-foreground font-medium">Déjà un compte ?</span>{" "}
            <Link href="/login" className="font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-tight text-xs ml-1">
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
