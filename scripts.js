const { default: axios } = require("axios");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const webhookId = "we_1REmyzBr1OBUUF9VKrP8bVgc";
const accountId = "acct_1RCbwmPZUKRefDLQ";

const resendEvent = async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const queryParams = {
      type: "customer_cash_balance_transaction.created",
      limit: parseInt(limit, 10),
    };

    const events = await stripe.events.list(
      {
        type: "customer_cash_balance_transaction.created",
        limit: 100,
      },
      {
        stripeAccount: accountId,
      }
    );

    const results = {
      total: events.data.length,
      succeeded: 0,
      failed: 0,
      errors: [],
    };

    // console.log(events)

    const webhookUrl = "https://api.zyftpay.com/payments/webhook";

    // Resend each event
    for (const event of events.data) {
      try {
        const resp = await axios.post(webhookUrl, event, {
          headers: {},
        });

        // Extract only relevant info (status + minimal data)
        const cleanResponse = {
          status: resp.status,
          data: resp.data, // The webhook's response body (if any)
          eventId: event.id,
        };

        results.succeeded++;
        console.log(`✅ Success (${results.succeeded})`, cleanResponse);
      } catch (error) {
        results.failed++;
        results.errors.push({
          eventId: event.id,
          error: error.message,
        });

        // Log error details concisely
        console.log(`❌ Failed (${results.failed})`, {
          eventId: event.id,
          error: error.response?.data || error.message,
        });
      }
    }

    return res.status(200).json({
      message: "Events resend process completed",
      length: events?.data.length,
      results: events,
    });
  } catch (error) {
    console.error("Error resending events:", error);
    return res.status(500).json({
      error: "Failed to resend events",
      message: error.message,
    });
  }
};

module.exports = { resendEvent };
