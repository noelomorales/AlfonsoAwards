import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
      <header className="site-header">
        <h1 className="visually-hidden">Alfonso Malavé</h1>
        <div className="brand">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/72/Emblem_of_the_United_States_Marine_Corps.svg"
            alt="US Marine Corps emblem"
            width={40}
            height={40}
            priority
          />
          <span className="site-title">First Sergeant Alfonso Malavé</span>
        </div>
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
