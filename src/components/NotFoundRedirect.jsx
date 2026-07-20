import { Navigate, useParams } from 'react-router-dom';

// Any unmatched path under a valid /:lang segment (bad slug, missing param,
// stale link) lands here instead of react-router's default error page.
export default function NotFoundRedirect() {
  const { lang } = useParams();
  return <Navigate to={`/${lang}/`} replace />;
}
