import { useQuery } from '@apollo/client';
import { GET_LYRICS_BY_USER } from '../../graphql/queries';
import { useAuthState } from '../../hooks/auth';

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
  getLyricsByUser: Lyrics[];
}

function LyricsList() {
  const authState = useAuthState();
  const { loading, error, data } = useQuery<LyricsData>(GET_LYRICS_BY_USER, {
    variables: { userId: authState.currentUser?.uid },
    skip: !authState.currentUser?.uid,
  });

  if (!authState.currentUser) return <p>Please sign in to view your lyrics</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getLyricsByUser.map((lyric) => (
        <div key={lyric.id}>
          <p>{lyric.lyrics}</p>
        </div>
      ))}
    </div>
  );
}

export default LyricsList;