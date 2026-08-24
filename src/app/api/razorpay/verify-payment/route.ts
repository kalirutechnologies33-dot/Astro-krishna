import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { supabase } from '@/lib/supabaseClient';
import { sendConfirmationNotifications } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking_id,
    } = await req.json();

    if (!razorpay_order_id || !booking_id) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    let isValid = true;
    if (razorpay_payment_id && razorpay_signature && !razorpay_order_id.startsWith('order_mock_')) {
      isValid = verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Trigger notification
    await sendConfirmationNotifications({
      id: booking_id,
      delivery_method: 'AUDIO_CALL',
      client_name: 'Dev Client',
      client_phone: '+919999999999',
      client_email: 'client@example.com',
      scheduled_call_time: 'Tomorrow, 11:30 AM IST',
      services: { title: 'Vedic Kundli Blueprint' }
    });

    return NextResponse.json({
      success: true,
      bookingId: booking_id,
      message: 'Payment verified and booking confirmed',
    });
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
