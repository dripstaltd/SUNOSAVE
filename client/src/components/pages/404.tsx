import { Head } from '../shared/Head';

function Page404() {
  return (
    <>
      <Head title={'The page is not found'}></Head>
      <div className="hero mx-auto h-full bg-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-base-content">404</h1>
            <p className="py-6 text-base-content/80">The page is not found.</p>
            <a href="/" className="btn btn-primary">
              Take me home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
