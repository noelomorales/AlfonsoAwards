import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/biography', label: 'Biography' },
  { href: '/timeline', label: 'Timeline & Map' },
  { href: '/awards', label: 'Awards' },
  { href: '/photos', label: 'Photos' },
  { href: '/documents', label: 'Documents' }
];

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <header>
        <h1 className="visually-hidden">Alfonso Malavé</h1>
        <nav aria-label="Main">
          <ul>
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    router.pathname === item.href || router.pathname.startsWith(item.href + '/')
                      ? 'active'
                      : ''
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; Alfonso Malavé Tribute</p>
      </footer>
    </>
  );
}
