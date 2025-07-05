import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROMPT } from '../../graphql/mutations';
import { GET_PROMPTS_BY_USER } from '../../graphql/queries';
import { useAuthState } from '../../hooks/auth';

function CreatePromptForm() {
  const [genre, setGenre] = useState('');
  const [prompt, setPrompt] = useState('');
  const authState = useAuthState();
  const [createPrompt, { loading, error }] = useMutation(CREATE_PROMPT, {
    refetchQueries: [
      {
        query: GET_PROMPTS_BY_USER,
        variables: { userId: authState.currentUser?.uid }
      }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authState.currentUser?.uid) return;
    try {
      await createPrompt({
        variables: {
          userId: authState.currentUser.uid,
          genre,
          prompt
        }
      });
      setGenre('');
      setPrompt('');
    } catch (err) {
      console.error('Error creating prompt:', err);
    }
  };

  if (!authState.currentUser) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        className="w-full p-2 border rounded input input-bordered input-primary"
      />
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt"
        className="w-full p-2 border rounded input input-bordered input-primary"
        rows={4}
      />
      <button
        type="submit"
        disabled={loading || !genre.trim() || !prompt.trim()}
        className="btn btn-outline btn-primary"
      >
        {loading ? 'Saving...' : 'Save Prompt'}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
}

export default CreatePromptForm;
