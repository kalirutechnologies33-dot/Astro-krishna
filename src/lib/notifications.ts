export async function sendConfirmationNotifications(booking: any) {
  const isAudioCall = booking.delivery_method === 'AUDIO_CALL';
  const cleanPhone = (booking.client_phone || '').replace(/\D/g, '');

  console.log(`[Astro Krishna] Notification queued for Booking ID: ${booking.id || 'N/A'}`);
  console.log(`[Delivery Method]: ${booking.delivery_method} | [Client]: ${booking.client_name} (${cleanPhone})`);

  const whatsappMessage = isAudioCall
    ? `✨ *Namaste ${booking.client_name}*,\n\nYour 1-on-1 Cosmic Consultation with *Acharya Krishna* is CONFIRMED.\n\n📅 *Scheduled Slot:* ${booking.scheduled_call_time || 'Next Available'}\n🔮 *Consultation:* ${booking.services?.title || 'Vedic Reading'}\n\nAcharya Krishna will call you directly at your registered phone number. Please keep your core life questions ready.\n\n— *Team Astro Krishna*`
    : `✨ *Namaste ${booking.client_name}*,\n\nYour order for the *Detailed Written Kundli Report* has been received.\n\n⏳ *Delivery Window:* Within 48 Hours\n📩 *Delivery Channels:* Direct WhatsApp PDF + Email to ${booking.client_email}\n\nAcharya Krishna is currently computing your planetary transits and divisional charts.\n\n— *Team Astro Krishna*`;

  console.log(`[Simulated WhatsApp Payload]:\n${whatsappMessage}`);

  return { success: true };
}
