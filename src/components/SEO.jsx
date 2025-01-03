import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name = 'WhereIsIt' }) {
  const siteTitle = title ? `${title} | ${name}` : name;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
}
