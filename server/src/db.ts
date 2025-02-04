import mongoose from 'mongoose'

const MAX_RETRIES = 5
const RETRY_INTERVAL = 10000 // 10 секунд

const connectDB = async () => {
  let retries = 0

  const tryConnect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || '', {
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        w: 'majority',
      })
      console.log(`MongoDB подключена: ${conn.connection.host}`)
      return true
    } catch (error) {
      console.error(`Попытка ${retries + 1}/${MAX_RETRIES} подключения к MongoDB не удалась:`, error)
      return false
    }
  }

  while (retries < MAX_RETRIES) {
    const isConnected = await tryConnect()
    if (isConnected) return

    retries++
    if (retries < MAX_RETRIES) {
      console.log(`Ожидание ${RETRY_INTERVAL/1000} секунд перед следующей попыткой...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL))
    }
  }

  if (retries === MAX_RETRIES) {
    console.error('Не удалось подключиться к MongoDB после нескольких попыток')
    // Не завершаем процесс, позволяем серверу работать без БД
  }
}

// Обработка разрыва соединения
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB отключена. Попытка переподключения...')
  setTimeout(connectDB, RETRY_INTERVAL)
})

// Схема для сохранения статистики игроков
const PlayerStatsSchema = new mongoose.Schema({
  playerId: String,
  playerName: String,
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  lastPlayed: { type: Date, default: Date.now }
})

export const PlayerStats = mongoose.model('PlayerStats', PlayerStatsSchema)

export default connectDB 