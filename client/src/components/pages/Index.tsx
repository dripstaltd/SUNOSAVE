import { Head } from "../shared/Head";

function Index() {
  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content prose">
          <div>
            <h1 className="text-3xl font-bold">
              <a className="link link-primary" target="_blank" href="https://vitejs.dev/" rel="noreferrer">
                Vite
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://reactjs.org/" rel="noreferrer">
                React
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://www.typescriptlang.org/" rel="noreferrer">
                TypeScript
              </a>{' '}
              +{' '}
              <a className="link link-primary" target="_blank" href="https://tailwindcss.com/" rel="noreferrer">
                TailwindCSS
              </a>{' '}
              Starter
            </h1>
            <p className="mt-4 text-lg">
              For fast <b>prototyping</b>. Already set up{' '}
              <a
                className="link link-primary"
                target="_blank"
                href="https://github.com/firebase/firebase-js-sdk"
                rel="noreferrer"
              >
                Firebase(v9)
              </a>
              ,{' '}
              <a className="link link-primary" target="_blank" href="https://daisyui.com/" rel="noreferrer">
                daisyUI
              </a>
              ,{' '}
              <a className="link link-primary" target="_blank" href="https://github.com/eslint/eslint" rel="noreferrer">
                ESLint
              </a>
              ,{' '}
              <a
                className="link link-primary"
                target="_blank"
                href="https://github.com/prettier/prettier"
                rel="noreferrer"
              >
                Prettier
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
