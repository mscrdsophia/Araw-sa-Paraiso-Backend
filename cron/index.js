const cron = require('node-cron');
const Room = require('../models/room.model'); // Import the Room model

console.log('Cron job running...');

// Schedule job to run every day at midnight
cron.schedule(' * * * * * ', async () => {
  try {
    const today = new Date();

    // Reset availability AND clear booking dates
    const result = await Room.updateMany(
      { checkoutDate: { $lte: today }, isAvailable: false },
      { 
        $set: { 
          isAvailable: true,
          checkinDate: null,
          checkoutDate: null 
        } 
      }
    );

    console.log(`${result.modifiedCount} rooms updated as available.`);
  } catch (error) {
    console.error('Error updating rooms:', error);
  }
});

module.exports = cron;

