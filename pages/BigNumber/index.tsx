import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "./index.module.css";
import BN from "bn.js";
import BigNumber from "bignumber.js";

const App = () => {
  useEffect(() => {
    const balance = 1e19;

    try {
      const balanceBN = new BN(balance);
      console.log("balanceBN:", balanceBN.toNumber());
    } catch (error) {
      console.error(error);
    }

    try {
      const balanceBigNumber = new BigNumber(balance);
      console.log("balanceBigNumber:", balanceBigNumber.toNumber());
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>UseDapp</title>
        <meta name="description" content="UseDapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>BigNumber</h1>

        <div>BN.js 长度过长时会溢出 使用 BigNumber.js 代替</div>
      </main>
    </div>
  );
};

export default App;
