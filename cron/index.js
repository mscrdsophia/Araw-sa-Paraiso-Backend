const cron = require('node-cron');
const Room = require('../models/room.model'); // Import the Room model




console.log('Cron job running...');

// Schedule job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();

    // Find rooms where checkoutDate has passed and update isAvailable to true
    const result = await Room.updateMany(
      { checkinDate: { $lte: today }, isAvailable: false }, 
      { $set: { isAvailable: true } }
    );

    console.log(`${result.modifiedCount} rooms updated as available.`);
  } catch (error) {
    console.error('Error updating rooms:', error);
  }
});