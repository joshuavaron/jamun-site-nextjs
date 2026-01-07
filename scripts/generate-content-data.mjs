import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const outputDir = path.join(process.cwd(), 'src/data');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ============================================
// COMMITTEES (already handled, but included for completeness)
// ============================================
function generateCommitteeData() {
  const contentDirectory = path.join(process.cwd(), 'content/committees');
  const outputFile = path.join(outputDir, 'committees.json');

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

  const data = {
    en: getAllCommittees('en'),
    es: getAllCommittees('es'),
    zh: getAllCommittees('zh'),
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${data.en.length} EN, ${data.es.length} ES, and ${data.zh.length} ZH committees`);
}

// ============================================
// BLOG POSTS
// ============================================
function generateBlogData() {
  const contentDirectory = path.join(process.cwd(), 'content/blog');
  const outputFile = path.join(outputDir, 'blog.json');

  function getAllPosts(locale) {
    const localeDir = path.join(contentDirectory, locale);

    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const files = fs.readdirSync(localeDir);
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        return {
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || '/images/conferences/hero-main.webp',
          category: data.category || 'News',
          author: {
            name: data.author?.name || 'JAMUN Team',
            avatar: data.author?.avatar,
          },
          publishedAt: data.publishedAt || new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          readTimeMinutes: Math.ceil(stats.minutes),
          featured: data.featured || false,
          canonicalSlug: data.canonicalSlug,
          locale,
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });

    return posts;
  }

  const data = {
    en: getAllPosts('en'),
    es: getAllPosts('es'),
    zh: getAllPosts('zh'),
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${data.en.length} EN, ${data.es.length} ES, and ${data.zh.length} ZH blog posts`);
}

// ============================================
// MODEL UN RESOURCES
// ============================================
function generateResourcesData() {
  const contentDirectory = path.join(process.cwd(), 'content/modelun-resources');
  const outputFile = path.join(outputDir, 'modelun-resources.json');

  function getAllResources(locale) {
    const localeDir = path.join(contentDirectory, locale);

    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const files = fs.readdirSync(localeDir);
    const resources = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled Resource',
          description: data.description || '',
          category: data.category || 'Skills',
          format: data.format || 'Article',
          duration: data.duration,
          pages: data.pages,
          downloadUrl: data.downloadUrl,
          image: data.image,
          author: data.author,
          featured: data.featured || false,
          tags: data.tags || [],
          publishedAt: data.publishedAt,
          canonicalSlug: data.canonicalSlug,
          locale,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return resources;
  }

  const data = {
    en: getAllResources('en'),
    es: getAllResources('es'),
    zh: getAllResources('zh'),
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${data.en.length} EN, ${data.es.length} ES, and ${data.zh.length} ZH Model UN resources`);
}

// ============================================
// MOCK TRIAL RESOURCES
// ============================================
function generateMockTrialResourcesData() {
  const contentDirectory = path.join(process.cwd(), 'content/mocktrial-resources');
  const outputFile = path.join(outputDir, 'mocktrial-resources.json');

  function getAllResources(locale) {
    const localeDir = path.join(contentDirectory, locale);

    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const files = fs.readdirSync(localeDir);
    const resources = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled Resource',
          description: data.description || '',
          category: data.category || 'Skills',
          format: data.format || 'Article',
          duration: data.duration,
          pages: data.pages,
          downloadUrl: data.downloadUrl,
          image: data.image,
          author: data.author,
          featured: data.featured || false,
          tags: data.tags || [],
          publishedAt: data.publishedAt,
          canonicalSlug: data.canonicalSlug,
          locale,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return resources;
  }

  const data = {
    en: getAllResources('en'),
    es: getAllResources('es'),
    zh: getAllResources('zh'),
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${data.en.length} EN, ${data.es.length} ES, and ${data.zh.length} ZH Mock Trial resources`);
}

// ============================================
// MATHLETES RESOURCES
// ============================================
function generateMathletesResourcesData() {
  const contentDirectory = path.join(process.cwd(), 'content/mathletes-resources');
  const outputFile = path.join(outputDir, 'mathletes-resources.json');

  function getAllResources(locale) {
    const localeDir = path.join(contentDirectory, locale);

    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const files = fs.readdirSync(localeDir);
    const resources = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled Resource',
          description: data.description || '',
          category: data.category || 'Skills',
          format: data.format || 'Article',
          duration: data.duration,
          pages: data.pages,
          downloadUrl: data.downloadUrl,
          image: data.image,
          author: data.author,
          featured: data.featured || false,
          tags: data.tags || [],
          publishedAt: data.publishedAt,
          canonicalSlug: data.canonicalSlug,
          locale,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return resources;
  }

  const data = {
    en: getAllResources('en'),
    es: getAllResources('es'),
    zh: getAllResources('zh'),
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${data.en.length} EN, ${data.es.length} ES, and ${data.zh.length} ZH Mathletes resources`);
}

// Run all generators
console.log('Generating content data for Cloudflare Workers...\n');
generateCommitteeData();
generateBlogData();
generateResourcesData();
generateMockTrialResourcesData();
generateMathletesResourcesData();
console.log('\nAll content data generated successfully!');
