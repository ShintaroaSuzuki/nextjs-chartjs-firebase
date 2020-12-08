import UserProvider from '../context/userContext';
import '../styles/layout.scss';

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
