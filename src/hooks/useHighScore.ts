import { useState, useEffect } from "react";

export function useHighScore(score: number) {

  const [ highScore, setHighScore ] = useState(score);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [ score, setHighScore ]);

  return highScore;
}
