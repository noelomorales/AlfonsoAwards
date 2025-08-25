import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
