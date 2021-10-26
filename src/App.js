import { Template, Loading, Annotation, Credits } from './components';
import { useLoading } from './lib/loading';

function App() {
  const loading = useLoading();

  return (
    <>
      <Loading visible={loading.loading} />
      <Template />
      {!loading.loading && <Annotation />}
      <Credits />
    </>
  );
}

export default App;
