import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";

import {
  DAppProvider,
  useEthers,
  Config,
  shortenIfAddress,
  Hardhat,
} from "@usedapp/core";
import { ethers } from "ethers";
import Greeter from "./Greeter.json";
import { useState, useRef, useEffect } from "react";

const rpc = "http://192.168.1.4:8545";
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const multicallAddresses = "0x0f5d1ef48f12b6f691401bfe88c2037c690a6afe";

const getProviderOrSigner = (
  library?: ethers.providers.JsonRpcProvider,
  account?: string | null,
  defaultRPC?: string
): ethers.providers.Provider | ethers.Signer | undefined => {
  if (library && account) {
    return library.getSigner(account).connectUnchecked();
  }

  return ethers.getDefaultProvider(defaultRPC);
};

const config: Config = {
  multicallAddresses: {
    [Hardhat.chainId]: multicallAddresses,
  },
};

const App = () => {
  const greeterRef = useRef<any>(null);
  const {
    activateBrowserWallet,
    account,
    chainId,
    active,
    deactivate,
    library,
  } = useEthers();
  const [newGreeting, setNewGreeting] = useState("");

  useEffect(() => {
    const providerOrSigner = getProviderOrSigner(library, account, rpc);
    greeterRef.current = new ethers.Contract(
      greeterAddress,
      Greeter.abi,
      providerOrSigner
    );
  }, [account, library]);

  const handleGreet = async () => {
    const msg = await greeterRef.current.greet();
    alert(msg);
  };

  const setGreeting = async () => {
    const tx = await greeterRef.current.setGreeting(newGreeting);
    await tx.wait();
    await handleGreet();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>UseDapp</title>
        <meta name="description" content="UseDapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>UseDapp</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            {!account && (
              <button onClick={activateBrowserWallet}>Connect wallet</button>
            )}
            {account && (
              <>
                <p>chainId: {chainId}</p>
                <p>active: {String(active)}</p>
                <p>Account: {shortenIfAddress(account)}</p>

                <p>
                  <button type="button" onClick={deactivate}>
                    Disconnect
                  </button>
                </p>
              </>
            )}
          </div>

          <div className={styles.card}>
            <p>Greeter Contract: {shortenIfAddress(greeterAddress)}</p>
            {account && <button onClick={handleGreet}>greet</button>}

            <p>
              <input
                type="text"
                onChange={(e) => setNewGreeting(e.target.value)}
              />
              <button onClick={setGreeting}>setGreeting</button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const UseDapp: NextPage = () => {
  return (
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  );
};

export default UseDapp;
