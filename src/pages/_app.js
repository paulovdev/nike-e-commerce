import "@/styles/globals.css";
import Nav from "@/components/Nav";
import PreLoader from "@/pre-loader/pre-loader";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <PreLoader />
      <Nav />
      <Component {...pageProps} key={router.asPath} />
    </>
  );
}
