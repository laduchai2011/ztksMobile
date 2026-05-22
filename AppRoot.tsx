import { Provider } from 'react-redux';
import { store } from '@src/redux';
import App from '@src/App';

export default function AppRoot() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
