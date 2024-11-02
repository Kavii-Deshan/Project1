import { getDatabase, ref, set } from 'firebase/database';

// Initialize Firebase Database
const database = getDatabase();

// Function to write multiple QR codes to Firebase
const writeMultipleQrCodes = async () => {
  const qrCodesRef = ref(database, 'QRCodes');

  const qrCodeData = {
    uniqueQrCodeId1: {
      code: 'test1',
      otherData: 'any additional info if needed'
    },
    uniqueQrCodeId2: {
      code: 'test2',
      otherData: 'additional info for test2'
    }
  };

  try {
    await set(qrCodesRef, qrCodeData);
    console.log('QR Codes written successfully!');
  } catch (error) {
    console.error('Error writing QR Codes:', error.message);
  }
};

// Call the function to write data
writeMultipleQrCodes();