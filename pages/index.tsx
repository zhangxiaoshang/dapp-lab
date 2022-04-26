import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dapp lab</title>
        <meta name="description" content="dapp lab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://dapp-lab.vercel.app/">Dapp lab!</a>
        </h1>

        <p className={styles.description}>Some Dapp demo</p>

        <div className={styles.grid}>
          <Link href="/UseDapp">
            <div className={styles.card}>
              <h2>UseDapp &rarr;</h2>
              <p>usedapp & ethers</p>
            </div>
          </Link>

          <Link href="/BigNumber">
            <div className={styles.card}>
              <h2>BigNumber &rarr;</h2>
              <p>BigNumber.js & BN.js</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
