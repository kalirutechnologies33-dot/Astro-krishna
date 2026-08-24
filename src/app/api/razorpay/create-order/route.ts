import { NextResponse } from 'next/server';
import { razorpayClient } from '@/lib/razorpay';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      serviceId,
      deliveryMethod,
      clientName,
      clientEmail,
      clientPhone,
      gender,
      dob,
      tob,
      pob,
      specificConcerns,
      scheduledCallTime,
      amount,
    } = body;

    if (!serviceId || !clientName || !clientEmail || !clientPhone || !amount) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    let orderId = `order_mock_${Date.now()}`;
    let keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockKeyForDev123';

    // Attempt Razorpay order creation if real keys are configured
    try {
      if (process.env.RAZORPAY_KEY_SECRET && !process.env.RAZORPAY_KEY_SECRET.includes('mock')) {
        const razorpayOrder = await razorpayClient.orders.create({
          amount: Math.round(amount * 100),
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            serviceId,
            deliveryMethod,
            clientName,
            clientPhone,
          },
        });
        orderId = razorpayOrder.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay API offline or mock mode active, using fallback dev order ID:', rzpErr);
    }

    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Safely attempt Supabase recording
    try {
      await supabase.from('bookings').insert({
        id: bookingId,
        service_id: serviceId,
        delivery_method: deliveryMethod,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        gender,
        date_of_birth: dob,
        time_of_birth: tob,
        place_of_birth: pob,
        specific_concerns: specificConcerns,
        scheduled_call_time: deliveryMethod === 'AUDIO_CALL' ? scheduledCallTime : null,
        status: 'PENDING_PAYMENT',
      });
    } catch (dbErr) {
      console.warn('Supabase DB offline/mock mode:', dbErr);
    }

    return NextResponse.json({
      orderId,
      bookingId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      keyId,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
