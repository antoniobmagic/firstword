import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import Keyboard from './Keyboard';
import Grid from './Grid';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const WordleGame = ({ userTier, onWin }) => {
  const [word, setWord] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
  const [usedLetters, setUsedLetters] = useState({});

  useEffect(() => {
    fetchDailyWord();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const fetchDailyWord = async () => {
    const wordDoc = await getDoc(doc(db, 'dailyWords', new Date().toISOString().split('T')[0]));
    if (wordDoc.exists()) {
      setWord(wordDoc.data().word.toLowerCase());
    }
  };

  const updateLetterStates = (attempt) => {
    const newUsedLetters = { ...usedLetters };
    
    attempt.split('').forEach((letter, index) => {
      if (letter === word[index]) {
        newUsedLetters[letter] = 'correct';
      } else if (word.includes(letter)) {
        if (newUsedLetters[letter] !== 'correct') {
          newUsedLetters[letter] = 'present';
        }
      } else {
        if (!newUsedLetters[letter]) {
          newUsedLetters[letter] = 'absent';
        }
      }
    });
    
    setUsedLetters(newUsedLetters);
  };

  const checkAttempt = () => {
    if (currentAttempt.length !== WORD_LENGTH) return;
    
    const newAttempts = [...attempts, currentAttempt];
    setAttempts(newAttempts);
    updateLetterStates(currentAttempt);
    
    if (currentAttempt === word) {
      setGameStatus('won');
      onWin();
      toast.success('Congratulations! You won!');
    } else if (newAttempts.length === MAX_ATTEMPTS) {
      setGameStatus('lost');
      toast.error(`Game Over! The word was: ${word}`);
    }
    
    setCurrentAttempt('');
  };

  const handleKeyPress = (e) => {
    if (gameStatus !== 'playing') return;

    if (e.key === 'Enter') {
      checkAttempt();
    } else if (e.key === 'Backspace') {
      setCurrentAttempt(prev => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentAttempt.length < WORD_LENGTH) {
      setCurrentAttempt(prev => prev + e.key.toLowerCase());
    }
  };

  const handleKeyboardInput = (key) => {
    if (gameStatus !== 'playing') return;
    
    if (key === 'ENTER') {
      checkAttempt();
    } else if (key === 'BACKSPACE') {
      setCurrentAttempt(prev => prev.slice(0, -1));
    } else if (currentAttempt.length < WORD_LENGTH) {
      setCurrentAttempt(prev => prev + key.toLowerCase());
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Grid 
        attempts={attempts}
        currentAttempt={currentAttempt}
        word={word}
        maxAttempts={MAX_ATTEMPTS}
      />
      <Keyboard 
        onKeyPress={handleKeyboardInput}
        usedLetters={usedLetters}
      />
    </div>
  );
};

export default WordleGame;