"use client";
import { useEffect, useRef } from "react";
import styles from "./SliderSearch.module.scss";

export const SliderSearch = () => {
  const items = [
    "iPhone 16 PRO MAX 256 Гб",
    "Apple Vision Pro 512 Гб",
    "iPhone 14 PRO 128 Гб",
    "MacBook PRO 14 2024 512 Гб",
    "iPad PRO 16'' 2024 128 Гб",
  ];

  const handleFamousItem = () => {};

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    inputRef.current?.addEventListener(
      "focus",
      () => {
        const searchElement = document.getElementById("btn-srch");
        if (searchElement && inputRef.current) {
          searchElement.style.color = "#aab974";
          inputRef.current.style.borderBottom = "1px solid #aab974";
        }
      },
      {
        signal: controller.signal,
      }
    );

    inputRef.current?.addEventListener(
      "focusout",
      () => {
        const searchElement = document.getElementById("btn-srch");
        if (searchElement && inputRef.current) {
          searchElement.style.color = "#a2a2a2";
          inputRef.current.style.borderBottom = "1px solid #a2a2a2";
        }
      },
      {
        signal: controller.signal,
      }
    );

    return () => controller.abort();
  }, [inputRef.current]);

  return (
    <div className={styles["search-block"]}>
      <div className={styles["search-box"]}>
        <button id="btn-srch" className={styles["btn-search"]}>
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          ref={inputRef}
          className={styles["input-search"]}
          placeholder="Поиск PARK MOBILE..."
        />
      </div>
      <h3 className={styles["search-most-famous-header"]}>
        Самое популярное...
      </h3>
      <ul className={styles["search-most-famous"]}>
        {items.map((el, index) => (
          <li key={index} onClick={handleFamousItem}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
