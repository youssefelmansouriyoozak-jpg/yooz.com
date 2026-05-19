import { getAllCustomers } from "@/lib/shopify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, ShoppingBag, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function AdminCustomersPage() {
  const customers = await getAllCustomers();

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FBFBFB] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Gestion Clients</h1>
            <p className="text-muted-foreground font-medium">Liste des clients synchronisés avec Shopify</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-sm border font-black uppercase tracking-widest text-xs flex items-center gap-3">
            <User className="text-primary w-4 h-4" /> {customers.length} Clients au total
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {customers.length === 0 ? (
            <Card className="border-dashed border-2 border-muted bg-white/50 rounded-[2rem] py-16 text-center">
              <CardContent className="flex flex-col items-center gap-4">
                <User size={48} className="text-muted-foreground/30" />
                <p className="text-muted-foreground font-medium">Aucun client trouvé.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/50">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Client</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Commandes</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dépenses totales</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {customers.map((edge: any) => {
                      const customer = edge.node;
                      return (
                        <tr key={customer.id} className="hover:bg-muted/5 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary">
                                {customer.firstName?.[0]}{customer.lastName?.[0]}
                              </div>
                              <div>
                                <p className="font-black uppercase tracking-tight text-sm">
                                  {customer.firstName} {customer.lastName}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-medium">ID: {customer.id.split('/').pop()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Mail size={14} className="text-muted-foreground" /> {customer.email}
                              </div>
                              {customer.phone && (
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  <Phone size={14} className="text-muted-foreground" /> {customer.phone}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2 font-black text-sm">
                              <ShoppingBag size={16} className="text-primary" /> {customer.ordersCount}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2 font-black text-lg text-primary">
                              {formatPrice(customer.totalSpent)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
