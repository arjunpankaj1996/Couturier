import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './variable.css';
import QueryProvider from './context/queryClientProvider';
import { store } from './store/store';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryProvider>
            <App />
        </QueryProvider>
    </Provider>
);
