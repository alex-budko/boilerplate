exports.createStripePayment = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    
    const amount = data.amount;
    const payment_method = data.payment_method;
    const currency = data.currency;
    
    const customerDoc = await admin.firestore().collection('stripe_customers').doc(context.auth.uid).get();
    const customer = customerDoc.data().customer_id;
    
    await stripe.paymentIntents.create({
      amount,
      payment_method,
      currency,
      customer,
      confirmation_method: 'automatic',
      confirm: true,
    });
  });
  