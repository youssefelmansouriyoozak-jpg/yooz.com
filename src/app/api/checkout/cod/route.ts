import { createCodOrder } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Incoming COD Order Body:', JSON.stringify(body, null, 2));
    const { firstName, lastName, phone, city, address, items, email } = body;

    if (!firstName || !lastName || !phone || !city || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    const { draftOrder, userErrors } = await createCodOrder({
      firstName,
      lastName,
      phone,
      city,
      address,
      email,
      items
    });

    if (userErrors && userErrors.length > 0) {
      console.error('Shopify Errors:', userErrors);
      return NextResponse.json(
        { success: false, error: userErrors[0].message },
        { status: 400 }
      );
    }

    if (!draftOrder) {
      return NextResponse.json(
        { success: false, error: "Échec de la création de la commande" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      orderId: draftOrder.order?.id,
      orderName: draftOrder.order?.name,
      status: draftOrder.order?.displayFinancialStatus
    });

  } catch (error: any) {
    console.error('COD Checkout Error:', error);
    return NextResponse.json(
      { success: false, error: "Une erreur interne est survenue" },
      { status: 500 }
    );
  }
}
