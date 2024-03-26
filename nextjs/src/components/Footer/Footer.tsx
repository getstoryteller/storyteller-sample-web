import Image from 'next/image';
import { FOOTER_LINKS, FOOTER_SOCIAL_LINKS } from './constants';

import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        className={styles.logo}
        src="/storyteller-logo-light.svg"
        alt="Storyteller Logo"
        width={172}
        height={35}
      />
      {FOOTER_LINKS.map((category, categoryIndex) => (
        <section key={category.label}>
          <h3 id={category.label}>{category.label}</h3>
          <ul aria-labelledby={category.label} className={styles.links}>
            {category.links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          {categoryIndex === FOOTER_LINKS.length - 1 && <FooterSocialLinks />}
        </section>
      ))}
    </footer>
  );
}

function FooterSocialLinks() {
  return (
    <ul className={styles.social} aria-label="Social links">
      {FOOTER_SOCIAL_LINKS.map((link) => (
        <li key={link.label}>
          <a href={link.href} title={link.label}>
            {link.icon()}
          </a>
        </li>
      ))}
    </ul>
  );
}
