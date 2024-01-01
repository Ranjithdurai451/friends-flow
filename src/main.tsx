import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './functions/store/index.tsx';
import { Provider } from 'react-redux';
import { QueryProvider } from './functions/store/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryProvider>
      <App />
    </QueryProvider>
  </Provider>
);
