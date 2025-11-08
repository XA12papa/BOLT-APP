"use client";

import React from "react";
import styles from "./Calculator.module.css";

type Props = {
  value: string;
};

export default function Display({ value }: Props): JSX.Element {
  return <div className={styles.display}>{value}</div>;
}