import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cfxCode = searchParams.get('code');

  if (!cfxCode) {
    return NextResponse.json(
      { error: 'Code CFX manquant', code: 'MISSING_CFX' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://servers-frontend.fivem.net/api/servers/single/${cfxCode}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'DevLab-Dashboard/1.0'
        },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      const errorMessages = {
        404: 'Serveur introuvable',
        429: 'Trop de requêtes, veuillez réessayer plus tard',
        500: 'Erreur serveur FiveM',
        503: 'Service FiveM indisponible'
      };

      throw new Error(errorMessages[response.status as keyof typeof errorMessages] || 
        `Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server fetch error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Erreur lors de la récupération des données du serveur';

    return NextResponse.json(
      { 
        error: errorMessage,
        code: 'FETCH_ERROR' 
      },
      { status: 500 }
    );
  }
} 