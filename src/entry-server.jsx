import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Build-time only: produces the static HTML crawlers see before React mounts.
export function render() {
  return renderToString(<App />);
}
