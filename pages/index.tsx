import { readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { resolve } from "path";
import Container from "../components/Container";
import Footer from "../components/Footer";
import GameGrid from "../components/GameGrid";
import Header from "../components/Header";
import styles from "../styles/Home.module.scss";

interface HomeProps {
  word: string;
  words: string;
}

const Home: NextPage<HomeProps> = ({ word, words }) => {
  return (
    <div className={styles.root}>
      <Head>
        <title>ljwordle | Word Game</title>
        <meta name="description" content="Guess the hidden word in 6 tries." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container>
          <GameGrid word={word} words={words} />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const words = readFileSync(resolve(".", "data", "words.txt"), {
    encoding: "utf-8",
  }).toUpperCase();

  const split = words.split("\r\n");

  const max = split.length;

  const word = split[Math.floor(Math.random() * max) - 1];

  return {
    props: { word, words },
  };
};

export default Home;
