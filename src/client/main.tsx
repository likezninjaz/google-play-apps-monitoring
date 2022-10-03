import ReactDOM from 'react-dom/client';

import { Root } from './modules';

const main = () => {
  const rootElement = document.getElementById('root');

  if (rootElement === null) return;

  ReactDOM.createRoot(rootElement).render(<Root />);
};

main();
