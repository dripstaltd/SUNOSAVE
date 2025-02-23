import { useQuery } from '@apollo/client';
import { GET_LYRICS } from '../../graphql/queries';

interface Prompt {
  id: string;
  genre: string;
  prompt: string;
}

interface Lyrics {
  id: string;
  userId: string;
  lyrics: string;
  createdAt: string;
  updatedAt: string;
  prompts: Prompt[];
}

interface LyricsData {
  getLyrics: Lyrics[];
}

function LyricsList() {
  const { loading, error, data } = useQuery<LyricsData>(GET_LYRICS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getLyrics.map((lyric) => (
        <div key={lyric.id}>
          <p>{lyric.lyrics}</p>
        </div>
      ))}
    </div>
  );
}

export default LyricsList;