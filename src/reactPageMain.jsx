import { createRoot } from "react-dom/client";
import './reactMain.css';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app">Hellow React</div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));

import Accordion from './ReactComponents/Accordion';
import {sections} from '@/dummyData';

root.render(<Accordion sections={sections} />);
