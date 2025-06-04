import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, institution, message, role, recipients } = await req.json()

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: Deno.env.get('SMTP_HOST') || '',
      port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      username: Deno.env.get('SMTP_USERNAME') || '',
      password: Deno.env.get('SMTP_PASSWORD') || '',
    });

    const emailContent = `
      New Contact Form Submission:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Institution: ${institution}
      Role: ${role}
      Message: ${message}
    `;

    // Send to all recipients
    for (const recipient of recipients) {
      await client.send({
        from: Deno.env.get('SMTP_FROM') || '',
        to: recipient,
        subject: `New Contact Form Submission from ${name}`,
        content: emailContent,
      });
    }

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})