import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/committees');
const outputFile = path.join(process.cwd(), 'src/data/committees.json');

function getAllCommittees(locale) {
  const localeDir = path.join(contentDirectory, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  const committees = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(localeDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        name: data.name || 'Untitled Committee',
        abbreviation: data.abbreviation || slug.toUpperCase(),
        category: data.category || 'General Assembly',
        topic: data.topic || '',
        description: data.description || '',
        level: data.level || 'Beginner-Friendly',
        delegationSize: data.delegationSize || 'Single',
        delegateCount: data.delegateCount || 0,
        image: data.image || '/images/conferences/model-un.webp',
        color: data.color || 'bg-jamun-blue',
        executives: data.executives || [],
        documents: data.documents || [],
        countries: data.countries || [],
        featured: data.featured || false,
        isAdHoc: data.isAdHoc || false,
        redHerringTopics: data.redHerringTopics || [],
        canonicalSlug: data.canonicalSlug,
        locale,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return committees;
}

// Generate data for all locales
const data = {
  en: getAllCommittees('en'),
  es: getAllCommittees('es'),
};

// Ensure the directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the JSON file
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log(`Generated ${outputFile} with ${data.en.length} EN and ${data.es.length} ES committees`);
