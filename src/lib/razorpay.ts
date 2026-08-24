import Razorpay from 'razorpay';
import crypto from 'crypto';

export const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockKeyForDev123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mockSecretForDev123456789',
});

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'mockSecretForDev123456789';
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
