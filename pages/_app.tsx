import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const ErrorLogger: React.ComponentType<FallbackProps> = (props) => (
  <pre>{JSON.stringify(props.error, undefined, 2)}</pre>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorLogger}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
