import { useQuery } from '@apollo/client';
import { GET_PROMPTS } from '../../graphql/queries';

interface Prompt {
  id: string;
  genre: string;
  prompt: string;
}

interface PromptsData {
  getPrompts: Prompt[];
}

function PromptsList() {
  const { loading, error, data } = useQuery<PromptsData>(GET_PROMPTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {data?.getPrompts.map((prompt) => (
        <div key={prompt.id}>{prompt.prompt}</div>
      ))}
    </div>
  );
}

export default PromptsList;
