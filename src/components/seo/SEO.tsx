import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  url?: string;
}

export function SEO({
  title = 'Premium 3D Web Development & Custom AI Software Agency | The Webpage Builder',
  description = 'Global agency specializing in premium 3D web experiences, Three.js, React applications, and enterprise AI software. We engineer digital solutions that scale worldwide. Book a strategy call.',
  type = 'website',
  name = 'The Webpage Builder',
  url = 'https://thewebpagebuilder.in'
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* OpenGraph tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={name} />
      <meta property='og:url' content={url} />
      
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content="summary_large_image" />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
}
