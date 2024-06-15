import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// This function triggers when a purchase is completed
export const addTokensOnPurchase = functions.firestore
    .document('purchases/{purchaseId}')
    .onCreate(async (snapshot, context) => {
        const purchase = snapshot.data();
        const userId = purchase?.userId;
        const tokensToAdd = purchase?.tokens;

        // Get the current token count
        const userRef = admin.firestore().doc(`users/${userId}`);
        const doc = await userRef.get();
        if (!doc.exists) {
            throw new Error(`No user found for ID: ${userId}`);
        }

        let currentTokens = doc.data()?.tokens || 0;
        currentTokens += tokensToAdd;

        try {
            await userRef.update({ tokens: currentTokens });
        } catch (error) {
            functions.logger.error(`Error updating tokens: ${error}`);
            return false;
        }
    });