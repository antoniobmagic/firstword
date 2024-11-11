const Grid = ({ attempts, currentAttempt, word, maxAttempts }) => {
  const getLetterStatus = (letter, index, isAttempted) => {
    if (!isAttempted) return '';
    if (letter === word[index]) return 'bg-green-500';
    if (word.includes(letter)) return 'bg-yellow-500';
    return 'bg-gray-700';
  };

  return (
    <div className="grid gap-2">
      {[...Array(maxAttempts)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {[...Array(5)].map((_, colIndex) => {
            const isCurrentRow = rowIndex === attempts.length;
            const letter = isCurrentRow 
              ? currentAttempt[colIndex] 
              : attempts[rowIndex]?.[colIndex];
            const status = getLetterStatus(
              letter, 
              colIndex, 
              rowIndex < attempts.length
            );

            return (
              <div
                key={colIndex}
                className={`w-14 h-14 flex items-center justify-center border-2 
                  font-bold text-2xl uppercase transition-colors ${status}`}
              >
                {letter || ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;