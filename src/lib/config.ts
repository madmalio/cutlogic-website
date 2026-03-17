const fallbackCheckoutUrl = "https://app.cutlogic.app";

export function getPublicCheckoutUrl() {
  const configured =
    process.env.LEMON_CHECKOUT_URL?.trim() ||
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL?.trim() ||
    "";
  return configured || fallbackCheckoutUrl;
}
