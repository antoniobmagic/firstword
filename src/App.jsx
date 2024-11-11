import { useState, useEffect } from 'react';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { toast, Toaster } from 'react-hot-toast';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import WordleGame from './components/WordleGame';

function App() {
  const address = useAddress();
  const [userTier, setUserTier] = useState(1);
  const [wordsPlayed, setWordsPlayed] = useState(0);

  useEffect(() => {
    if (address) {
      loadUserData();
    }
  }, [address]);

  const loadUserData = async () => {
    const userRef = doc(db, 'users', address);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserTier(data.tier);
      setWordsPlayed(data.wordsPlayed);
    } else {
      await setDoc(userRef, {
        tier: 1,
        wordsPlayed: 0,
        lastPlayedDate: null
      });
    }
  };

  const handleGameWin = async () => {
    if (!address) return;

    const userRef = doc(db, 'users', address);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();

    if (data.wordsWon === data.tier * 2) {
      await updateDoc(userRef, {
        tier: data.tier + 1,
        wordsWon: 0
      });
      toast.success(`Congratulations! You've reached tier ${data.tier + 1}`);
      setUserTier(data.tier + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Web3 Wordle</h1>
          <ConnectWallet />
        </div>
        
        {address ? (
          <>
            <div className="mb-4 text-center">
              <p>Current Tier: {userTier}</p>
              <p>Daily Words Available: {userTier}</p>
            </div>
            <WordleGame 
              onWin={handleGameWin}
              userTier={userTier}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl">Connect your wallet to play</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;