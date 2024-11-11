const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const Keyboard = ({ onKeyPress, usedLetters }) => {
  const getKeyClass = (key) => {
    const baseClass = 'px-3 py-4 rounded font-bold transition-colors';
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return `${baseClass} px-4 text-sm`;
    }
    
    switch (usedLetters[key.toLowerCase()]) {
      case 'correct':
        return `${baseClass} bg-green-500`;
      case 'present':
        return `${baseClass} bg-yellow-500`;
      case 'absent':
        return `${baseClass} bg-gray-700`;
      default:
        return `${baseClass} bg-gray-400`;
    }
  };

  return (
    <div className="grid gap-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;