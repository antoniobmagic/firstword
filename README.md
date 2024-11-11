# Web3 Wordle con Telegram

Juego de Wordle integrado con Web3 y Telegram, con sistema de clasificación y múltiples wallets soportadas.

## Características

- Integración con múltiples wallets (MetaMask, Rabby, Core)
- Login con email vía ThirdWeb
- Sistema de clasificación basado en aciertos
- Bot de Telegram integrado
- Base de datos Firebase
- Múltiples palabras por día según nivel

## Configuración

### Prerrequisitos

- Node.js v16 o superior
- Cuenta de Firebase
- Bot de Telegram
- Cuenta de ThirdWeb

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd web3-wordle
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` con:
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_TELEGRAM_BOT_TOKEN=tu_bot_token
   VITE_THIRDWEB_CLIENT_ID=tu_client_id
   ```

4. Configura Firebase:
   - Crea un nuevo proyecto en Firebase Console
   - Habilita Firestore Database
   - Copia las credenciales al archivo `.env`

5. Configura el Bot de Telegram:
   - Habla con @BotFather en Telegram
   - Crea un nuevo bot y obtén el token
   - Añade el token al archivo `.env`

6. Configura ThirdWeb:
   - Crea una cuenta en ThirdWeb
   - Obtén tu Client ID
   - Añádelo al archivo `.env`

### Ejecución

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Inicia el bot de Telegram:
   ```bash
   npm run bot
   ```

## Estructura de la Base de Datos

### Colecciones de Firebase

- `users`: Información de usuarios y niveles
- `dailyWords`: Palabras del día
- `scores`: Puntuaciones y estadísticas

## Uso

1. Conecta tu wallet o inicia sesión con email
2. Juega la palabra del día
3. Sube de nivel acertando palabras
4. Interactúa con el bot de Telegram usando:
   - `/start`: Iniciar el bot
   - `/play palabra`: Intentar adivinar la palabra

## Mantenimiento

- Las palabras se actualizan diariamente
- Los niveles se resetean mensualmente
- Backup automático de la base de datos

## Licencia

MIT