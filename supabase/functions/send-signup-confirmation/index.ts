
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SignupEmailRequest {
  email: string;
  fullName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName }: SignupEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "DreamJob <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to DreamJob!",
      html: `
        <h1>Welcome, ${fullName}!</h1>
        <p>Thanks for signing up with DreamJob.</p>
        <p>You can now log in and start applying for jobs.</p>
        <p>Best wishes,<br>The DreamJob Team</p>
      `,
    });

    console.log("Signup confirmation email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending signup confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
