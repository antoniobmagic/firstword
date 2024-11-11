import TelegramBot from 'node-telegram-bot-api';
import { db } from './src/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Web3 Wordle! Visit our website to connect your wallet and start playing.');
});

bot.onText(/\/play (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userGuess = match[1].toLowerCase();
  
  const todayWord = await getTodayWord();
  if (!todayWord) {
    bot.sendMessage(chatId, 'No word available for today. Please try again later.');
    return;
  }

  const result = checkWord(userGuess, todayWord);
  bot.sendMessage(chatId, result);
});

function checkWord(guess, word) {
  if (guess.length !== 5) {
    return 'Words must be 5 letters long!';
  }

  if (guess === word) {
    return '🎉 Correct! You found today\'s word!';
  }

  const feedback = guess.split('').map((letter, i) => {
    if (letter === word[i]) return '🟩';
    if (word.includes(letter)) return '🟨';
    return '⬛';
  }).join('');

  return `${feedback}\nTry again!`;
}

async function getTodayWord() {
  const wordDoc = await getDoc(doc(db, 'dailyWords', new Date().toISOString().split('T')[0]));
  return wordDoc.exists() ? wordDoc.data().word.toLowerCase() : null;
}

console.log('Telegram bot is running...');