import React from "react";

import styles from "./categories.module.scss";
import Link from "next/link";
import HelpIcon from "@/icons/help";

const CategoryItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.categoryItem}>
      <Link href={link || "/"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore</h2>
      <ul className={styles.categories}>
        <CategoryItem name="New In" emoji="⚡" link="/" />
        <CategoryItem name="Apparel" emoji="👚" link="/category/Apparel" />
        <CategoryItem name="Footwear" emoji="👠" link="/category/Footwear" />
        <CategoryItem
          name="Accessories"
          emoji="👜"
          link="/category/Accessories"
        />
        <CategoryItem
          name="Sporting Goods"
          emoji="🤸"
          link="/category/Sporting_Goods"
        />
        <CategoryItem
          name="Personal Care"
          emoji="🎁"
          link="/category/Personal_Care"
        />
        <CategoryItem
          name="Home"
          emoji="🏡"
          link="/category/Home"
        />
      </ul>
      <div className={styles.helpContainer}>
        <div className={styles.helpIcon}>
          <HelpIcon width={18} height={18} />
        </div>
        <span>Help Center</span>
      </div>
    </div>
  );
}
