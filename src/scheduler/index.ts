import cron from 'node-cron'
import User from '@/database/models/user'

cron.schedule('0 0 * * *', async () => {
  const today = new Date()
  const day = today.getDate()

  try {
    const usersToUpdate = await User.findAll({
      where: {
        subscriptionRenewalDay: day,
      },
    })

    for (const user of usersToUpdate) {
      // await updateUserServices(user.id)
      console.log(`Subscription updated for: ${user.id}`)
    }

    console.log('Subscription updating finished')
  } catch (error) {
    console.error('Error during updating subscriptions:', error)
  }
})
