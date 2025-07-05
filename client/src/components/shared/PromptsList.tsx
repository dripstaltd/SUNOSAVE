import { useQuery } from '@apollo/client';
import { GET_PROMPTS, GET_PROMPTS_BY_USER } from '../../graphql/queries';
import { useAuthState } from '../../hooks/auth';

interface Prompt {
  id: string;
  genre: string;
  prompt: string;
}

interface PromptsData {
  getPrompts?: Prompt[];
  getPromptsByUser?: Prompt[];
}

function PromptsList() {
  const authState = useAuthState();
  const query = authState.currentUser ? GET_PROMPTS_BY_USER : GET_PROMPTS;
  const variables = authState.currentUser ? { userId: authState.currentUser.uid } : undefined;
  const { loading, error, data } = useQuery<PromptsData>(query, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const prompts = data?.getPrompts ?? data?.getPromptsByUser ?? [];
  return (
    <div>
      {prompts.map((prompt) => (
        <div key={prompt.id}>{prompt.prompt}</div>
      ))}
    </div>
  );
}

export default PromptsList;
