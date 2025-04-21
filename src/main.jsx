import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './variable.css';
import QueryProvider from './context/queryClientProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryProvider>
        <App />
    </QueryProvider>
);
