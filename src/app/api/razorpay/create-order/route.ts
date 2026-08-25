import { NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';
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

    if (!clientName || !clientEmail || !clientPhone || !amount) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    const keyId = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '').trim();
    const razorpay = getRazorpayClient();

    // 1. Create Razorpay Order
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(Number(amount) * 100), // amount in paise
        currency: 'INR',
        receipt: `ak_${Date.now()}`.slice(0, 40),
        notes: {
          clientName: String(clientName),
          clientPhone: String(clientPhone),
          deliveryMethod: String(deliveryMethod),
        },
      });
    } catch (rzpErr: any) {
      console.error('Razorpay Order Creation Error:', rzpErr);
      return NextResponse.json(
        { error: rzpErr?.error?.description || rzpErr?.message || 'Razorpay order creation failed' },
        { status: 500 }
      );
    }

    // 2. Insert into Supabase Bookings
    let bookingRecordId = razorpayOrder.id;
    try {
      const { data: booking } = await supabase
        .from('bookings')
        .insert({
          delivery_method: deliveryMethod,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          gender: gender || 'Female',
          date_of_birth: dob || new Date().toISOString().split('T')[0],
          time_of_birth: tob || '12:00',
          place_of_birth: pob || 'India',
          specific_concerns: specificConcerns || '',
          scheduled_call_time: deliveryMethod === 'AUDIO_CALL' ? scheduledCallTime : null,
          status: 'PENDING_PAYMENT',
        })
        .select('id')
        .single();

      if (booking) {
        bookingRecordId = booking.id;
        await supabase.from('transactions').insert({
          booking_id: booking.id,
          razorpay_order_id: razorpayOrder.id,
          amount_inr: Number(amount),
          payment_status: 'CREATED',
        });
      }
    } catch (supabaseErr) {
      console.warn('Supabase logging skipped:', supabaseErr);
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      bookingId: bookingRecordId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: keyId,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
