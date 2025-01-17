import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cfxCode = searchParams.get('code');

  if (!cfxCode) {
    return NextResponse.json(
      { error: 'Code CFX manquant' },
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données du serveur' },
      { status: 500 }
    );
  }
} 