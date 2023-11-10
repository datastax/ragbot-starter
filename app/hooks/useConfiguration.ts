import { useState, useEffect } from 'react'

export type SimilarityMetric = "cosine" | "euclidean" | "dot_product";

const  useConfiguration = () => {
  // Initial state values are set to defaults or undefined
  const [useRag, setUseRag] = useState<boolean>(true);
  const [llm, setLlm] = useState<string>('gpt-3.5-turbo');
  const [similarityMetric, setSimilarityMetric] = useState<SimilarityMetric>('cosine');

  useEffect(() => {
    // Check if window is defined (avoids localStorage errors)
    if (typeof window !== 'undefined') {
      const storedRag = localStorage.getItem('useRag');
      const storedLlm = localStorage.getItem('llm');
      const storedSimilarityMetric = localStorage.getItem('similarityMetric');

      if (storedRag) setUseRag(JSON.parse(storedRag));
      if (storedLlm) setLlm(storedLlm);
      if (storedSimilarityMetric) setSimilarityMetric(storedSimilarityMetric as SimilarityMetric);
    }
  }, []);

  const setConfiguration = (rag: boolean, llm: string, similarityMetric: SimilarityMetric) => {
    setUseRag(rag);
    setLlm(llm);
    setSimilarityMetric(similarityMetric);
  }

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useRag', JSON.stringify(useRag));
      localStorage.setItem('llm', llm);
      localStorage.setItem('similarityMetric', similarityMetric);
    }
  }, [useRag, llm, similarityMetric]);

  return {
    useRag,
    llm,
    similarityMetric,
    setConfiguration,
  };
}

export default useConfiguration;
