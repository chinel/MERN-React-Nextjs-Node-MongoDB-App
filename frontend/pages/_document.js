import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // The get InitialProps is used for SSR
  //   static async getInitialProps(ctx) {
  //     const initialProps = await Document.getInitialProps(ctx);
  //     return { ...initialProps };
  //   }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="UTF-8" />
          <meta
            view="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdn.usebootstrap.com/bootstrap/4.3.1/css/bootstrap.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
