import { Head } from '../shared/Head';

function Page404() {
  return (
    <>
      <Head title={'The page is not found'}></Head>
      <div className="hero min-h-screen bg-gray-800">
        <div className="text-center hero-content text-3xl font-bold text-white prose">
          <div>
            <h1>The page is not found.</h1>
            <div className="mt-4">
              <a href="/" className="link-primary">
                Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
