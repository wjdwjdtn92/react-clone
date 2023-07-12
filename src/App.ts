import Test from './components/Test';
import { nodeType } from './types';

function App(): nodeType {
  return {
    type: 'div',
    props: { id: 'container' },
    children: [Test()],
  };
}

export default App;
