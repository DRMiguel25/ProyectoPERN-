// seed.js — Inserta masivamente las 12 guitarras en la API REST local
// Requiere Node.js v18+ (fetch nativo incluido)
// Uso: node seed.js

const API_URL = 'http://localhost:4000/Api/products';

const guitars = [
  {
    name: 'Lukather',
    image: 'guitarra_01',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 299,
  },
  {
    name: 'SRV',
    image: 'guitarra_02',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 349,
  },
  {
    name: 'Borland',
    image: 'guitarra_03',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 329,
  },
  {
    name: 'VAI',
    image: 'guitarra_04',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 299,
  },
  {
    name: 'Thompson',
    image: 'guitarra_05',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 399,
  },
  {
    name: 'White',
    image: 'guitarra_06',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 329,
  },
  {
    name: 'Cobain',
    image: 'guitarra_07',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 349,
  },
  {
    name: 'Dale',
    image: 'guitarra_08',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 379,
  },
  {
    name: 'Krieger',
    image: 'guitarra_09',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 289,
  },
  {
    name: 'Campbell',
    image: 'guitarra_10',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 349,
  },
  {
    name: 'Reed',
    image: 'guitarra_11',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 399,
  },
  {
    name: 'Hazel',
    image: 'guitarra_12',
    description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
    price: 379,
  },
];

async function seedGuitars() {
  console.log(`🎸 Iniciando seed — ${guitars.length} guitarras a insertar...\n`);

  for (const guitar of guitars) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guitar),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [${guitar.name}] Error ${response.status}: ${errorText}`);
        continue;
      }

      const data = await response.json();
      console.log(`✅ [${guitar.name}] Guardada con éxito — ID asignado: ${data.id}`);
    } catch (error) {
      console.error(`❌ [${guitar.name}] Falló la petición: ${error.message}`);
    }
  }

  console.log('\n🏁 Seed finalizado.');
}

seedGuitars();
