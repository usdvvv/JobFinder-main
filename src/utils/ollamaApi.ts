
interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

const ollamaUrl = 'http://localhost:11434';

export async function askMistral(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompt,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Ollama API Error:', error);
    return "I'm having trouble connecting to my AI brain right now. Please check that Ollama is running with the Mistral model. Run: 'ollama run mistral'";
  }
}

export async function checkOllamaConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, { method: 'GET' });
    return response.ok;
  } catch (error) {
    console.error('Ollama Connection Error:', error);
    return false;
  }
}

export function generateJobPrompt(question: string, jobData: any[]): string {
  const jobsInfo = jobData.map(job => 
    `Job ID: ${job.id}, Title: ${job.title}, Company: ${job.company}, Location: ${job.location}, Salary: ${job.salary}`
  ).join('\n');

  return `
You are a helpful AI assistant for a job search platform. Below is the available job data:

${jobsInfo}

User question: ${question}

Please answer the question based on the job data provided. If the question is about specific jobs, provide relevant details from the data.
`;
}
