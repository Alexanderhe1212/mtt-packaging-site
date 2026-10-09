import {createRoot} from 'react-dom/client';
import StudioApp from '../app/StudioApp';
import '../app/globals.css';
import '../app/studio.css';
createRoot(document.getElementById('root')!).render(<StudioApp/>);
