import type { NextPage } from "next";
import Head from "next/head";
import Container from "../components/Container";
import Footer from "../components/Footer";
import GameGrid from "../components/GameGrid";
import Keyboard from "../components/Keyboard";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>ljwordle | Word Game</title>
        <meta name="description" content="Guess the hidden word in 6 tries." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <GameGrid />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
