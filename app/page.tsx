import fs from 'fs';
import path from 'path';
import ClientPage from './ClientPage';

export default async function Page() {
  const imagesDir = path.join(process.cwd(), 'public', 'Images');
  let images: string[] = [];
  
  try {
    const files = fs.readdirSync(imagesDir);
    // Filter only image files (jpg, png, webp, jpeg, etc.)
    images = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `/Images/${file}`);
  } catch (error) {
    console.error('Failed to read images directory', error);
  }

  return <ClientPage images={images} />;
}
