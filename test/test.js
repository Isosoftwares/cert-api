const { default: mongoose } = require("mongoose");
const Account = require("../models/Account");
const Client = require("../models/Client");
const Transactions = require("../models/Transactions");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createAccount = async (req, res) => {
  const { clientId, accountName } = req.body;
  if (!clientId || !accountName)
    return res.status(400).json({ message: "Client Id is required" });

  const client = await Client.findById(mongoose.Types.ObjectId(clientId))
    .lean()
    .exec();

  // if (!client) return res.status(400).json({ message: "No client found" });

  // const customer = await stripe.customers.create({
  //   name: client.name,
  //   email: client.systemEmail,
  // });

  // if (!customer.id)
  //   return res.status(400).json({ message: "Something went wrong" });

  // const instructions = getUsdFundingInstructions(customer.id);

  // if (!instructions)
  //   return res.status(400).json({ message: "Something went wrong" });

  // const financialAddresses = extractFinancialAddresses(instructions);

  // const account = await stripe.accounts.create({
  //   type: 'express',
  //   country: 'ES', // Spain's country code instead of 'US'
  //   email: 'antonjenga55@gmail.com',
  //   business_type: 'individual',
  //   individual: {
  //     first_name: 'Your First Name',
  //     last_name: 'Your Last Name',
  //     address: {
  //       line1: 'Calle Example 123',
  //       city: 'Madrid', // Spanish city
  //       postal_code: '28001', // Spanish postal code format
  //       country: 'ES' // Spain's country code
  //       // Note: Spain doesn't use 'state' like the US does
  //     },
  //     dob: {
  //       day: 1,
  //       month: 1,
  //       year: 1990
  //     },
  //     phone: '+34612345678', // Spanish phone format with country code
  //     // For Spain, you'll need different ID verification
  //     id_number: '12345678Z' // Spanish DNI/NIE format
  //   },
  //   business_profile: {
  //     mcc: '5734',
  //     product_description: 'Digital goods',
  //     // url: 'https://example.com'
  //   },
  //   capabilities: {
  //     card_payments: {requested: true},
  //     transfers: {requested: true}
  //   }
  // });

  // 2. Create onboarding link
  // const onboardingLink = await stripe.accountLinks.create({
  //   account: account.id,
  //   refresh_url: "https://yourplatform.com/reauth",
  //   return_url: "https://yourplatform.com/success",
  //   type: "account_onboarding",
  // });

  // await Account.create({
  //   accountName,
  //   customerId: customer.id,
  //   financialAddresses,
  // });

  const customer = await stripe.customers.create(
    {
      name: "Sarah Smith",
      email: "sarah@gmail.com",
    },
    {
      stripeAccount: "acct_1RCbwmPZUKRefDLQ", // ID of the connected account
    }
  );

  const instructions = getUsdFundingInstructions(customer.id);

  res
    .status(200)
    .json({ message: "Account created successfully", customer, instructions });
};

const transferToConnectedAccount = async (req, res) => {
  try {
    const accountId = "acct_1RCSn3Q7ePpeOCSm";
    // await stripe.accounts.update(accountId, {
    //   individual: {
    //     first_name: "Antonio",
    //     last_name: "Garcia",
    //     phone: "+34612345678",
    //     address: {
    //       city: "Madrid",
    //       line1: "Calle Gran Via 1",
    //       postal_code: "28013",
    //     },
    //     dob: {
    //       day: 15,
    //       month: 5,
    //       year: 1985,
    //     },
    //   },
    // });
    const transfer = await stripe.transfers.create({
      amount: 1000, // amount in cents
      currency: "usd",
      destination: "acct_1RCbwmPZUKRefDLQ", // connected account ID
      transfer_group: "ORDER_95",
    });

    res.status(200).json(transfer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

async function getUsdFundingInstructions(customerId) {
  const instructions = await stripe.customers.createFundingInstructions(
    customerId,
    {
      funding_type: "bank_transfer",
      currency: "usd",
      bank_transfer: { type: "us_bank_transfer" },
    },
    {
      stripeAccount: "acct_1RCbwmPZUKRefDLQ", // ID of the connected account
    }
  );

  return instructions.bank_transfer; // includes account number, routing number, reference, etc.
}

// Helper function to extract financial addresses
const extractFinancialAddresses = (instructions) => {
  if (!instructions || !instructions.financial_addresses) return [];

  return instructions.financial_addresses.map((address) => {
    const baseInfo = {
      type: address.type,
      supported_networks: address.supported_networks || [],
    };

    if (address.type === "aba") {
      return {
        ...baseInfo,
        aba: {
          account_holder_name: address.aba.account_holder_name || "",
          account_number: address.aba.account_number || "",
          account_type: address.aba.account_type || "",
          routing_number: address.aba.routing_number || "",
          bank_name: address.aba.bank_name || "",
          account_holder_address: address.aba.account_holder_address || {},
          bank_address: address.aba.bank_address || {},
        },
      };
    } else if (address.type === "swift") {
      return {
        ...baseInfo,
        swift: {
          account_holder_name: address.swift.account_holder_name || "",
          account_number: address.swift.account_number || "",
          account_type: address.swift.account_type || "",
          swift_code: address.swift.swift_code || "",
          bank_name: address.swift.bank_name || "",
          account_holder_address: address.swift.account_holder_address || {},
          bank_address: address.swift.bank_address || {},
        },
      };
    }

    return baseInfo;
  });
};

const getAccounts = async (req, res) => {
  const page = req?.query?.page || 1;
  const perPage = req?.query?.perPage || 20;
  const skip = (page - 1) * parseInt(perPage);

  const { clientId, accountName = "" } = req.query;

  const filters = {
    accountName: { $regex: accountName, $options: "i" },
  };

  clientId && (filters.clientId = mongoose.Types.ObjectId(clientId));

  try {
    const [accounts, count] = await Promise.all([
      Account.find(filters)
        .sort({ createdAt: -1 })
        .limit(parseInt(perPage))
        .skip(skip)
        .lean()
        .exec(),
      Account.countDocuments(filters),
    ]);

    if (!accounts?.length) {
      return res.status(200).json({ message: "No accounts found" });
    }

    res.json({ accounts, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const updateAccountStatus = async (req, res) => {
  const { accountId, status } = req.body;

  if (!accountId || !status)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const account = await Account.findById(
      mongoose.Types.ObjectId(accountId)
    ).exec();

    account.status = status;

    await account.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getOneAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const payClient = async (req, res) => {
  try {
    const { accountId, amount } = req.body;

    if (!accountId || !amount)
      return res.status(400).json({ message: "All fields are required" });

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }

    if (account.balance < parseFloat(amount))
      return res.status(400).json({ message: "No enough balance" });

    account.balance -= parseFloat(amount);

    await account.save();

    await Transactions.create({
      accountId,
      clientId: account.clientId,
      type: "withdraw",
      receivableAmount: amount,
      amount,
    });

    res.status(200).json({
      success: true,
      message: "Account balance updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  updateAccountStatus,
  getOneAccount,
  payClient,
  transferToConnectedAccount,
};
