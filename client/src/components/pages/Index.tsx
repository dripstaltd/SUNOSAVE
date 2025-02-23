import { Head } from "../shared/Head";
import LyricsList from "../shared/LyricsList";
import CreateLyricsForm from "../shared/CreateLyricsForm";

function Index() {
  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content prose">
          <CreateLyricsForm />
          <LyricsList />
        </div>
      </div>
    </>
  );
}

export default Index;
