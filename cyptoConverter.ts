import CryptoConvert from "crypto-convert";

const convert = new CryptoConvert();

type PaymentMethod = "BTC" | "ETH" | "USDT";
type Amount = number;

type Converted = {
  paymentMethod: PaymentMethod;
  amount: Amount;
};

export const convertAmount = async ({ paymentMethod, amount }: Converted) => {
  try {
    console.log(paymentMethod, amount, "-----------------");
    await convert.ready(); //Wait for the initial cache to load

    const convertedAmount = convert.USD[paymentMethod](amount);

    console.log(convertedAmount);

    return convertedAmount;
  } catch (error) {
    console.log("error in crpto----------------", error);
    return error;
  }

  //... convert any pair
  // prices are automatically updated on background
};
