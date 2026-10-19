import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/site.css';
import './styles/privacy.css';

const root = document.getElementById('root');
const application = <StrictMode><App page={root.dataset.page} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
