import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_LYRICS } from '../../graphql/mutations';
import { GET_LYRICS_BY_USER } from '../../graphql/queries';
import { useAuthState } from '../../hooks/auth';

function CreateLyricsForm() {
  const [lyrics, setLyrics] = useState('');
  const authState = useAuthState();
  const [createLyrics, { loading, error }] = useMutation(CREATE_LYRICS, {
    refetchQueries: [
      {
        query: GET_LYRICS_BY_USER,
        variables: { userId: authState.currentUser?.uid }
      }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authState.currentUser?.uid) return;

    try {
      await createLyrics({
        variables: {
          userId: authState.currentUser.uid,
          lyrics
        }
      });
      setLyrics(''); // Clear form after success
    } catch (err) {
      console.error('Error creating lyrics:', err);
    }
  };

  if (!authState.currentUser) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder="Enter your lyrics..."
        className="w-full p-2 border rounded"
        rows={4}
      />
      <button
        type="submit"
        disabled={loading || !lyrics.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {loading ? 'Saving...' : 'Save Lyrics'}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
}

export default CreateLyricsForm;