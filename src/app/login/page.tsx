"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight, LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-[#FBFBFB] px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="space-y-4 pt-12 pb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-2">
            <LogIn className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tight">Connexion</CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            Accédez à votre compte Yoozak
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive text-sm font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <p>{state.error}</p>
              </div>
            )}

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
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mot de passe</Label>
                <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                  Oublié ?
                </Link>
              </div>
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
              className="w-full bg-foreground text-background hover:bg-primary transition-all duration-300 rounded-full h-14 font-black uppercase tracking-widest text-xs group mt-2 shadow-xl shadow-foreground/10"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Connexion...
                </>
              ) : (
                <>
                  Se connecter <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="bg-muted/30 flex flex-col space-y-4 py-8 px-8 border-t border-muted/50">
          <div className="text-center text-sm">
            <span className="text-muted-foreground font-medium">Pas encore de compte ?</span>{" "}
            <Link href="/register" className="font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-tight text-xs ml-1">
              S'inscrire
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
