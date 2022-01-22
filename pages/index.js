import Head from 'next/head';
import StatisticsSection from '../components/StatisticsSection';
import Hero from '../components/Hero';
import BoostSection from '../components/BoostSection';
import Footer from '../components/Footer';

export default function Home() {


  return (
    <div style={{ overflow: 'hidden' }}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generate shorter links for your brand" />
        <link rel="icon" href="/images/favicon-32x32.png" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Hero maxWidth='lg' sx={{ mt: { xs: 2, md: 7 } }} />
      <StatisticsSection maxWidth='lg' />
      <BoostSection maxWidth='lg' />
      <Footer maxWidth='lg' />
    </div >
  )
}
