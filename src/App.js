import { Template, Loading, Annotation } from './components';
import { useLoading } from './lib/loading';

function App() {
  const loading = useLoading();

  return (
    <>
      <Loading visible={loading.loading} />
      <Template />
      {!loading.loading && <Annotation />}
    </>
  );
}

export default App;
