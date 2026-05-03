import emailjs from "@emailjs/browser";

// These should ideally be in environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_5uypl7w";
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || "template_39g4jq2";
const STATUS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_STATUS_TEMPLATE_ID || "template_c8hkemg";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "LXAiVQ5SptciSfinK";

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Message shown to customer based on status
const getStatusMessage = (status: string): string => {
  switch (status) {
    case "processing":
      return "Your order is being carefully prepared by our team. We will notify you once it has been shipped.";
    case "shipped":
      return "Your order is on its way! Our delivery team will bring it to you shortly.";
    case "delivered":
      return "Your order has been delivered! We hope you love your new fragrance. Thank you for choosing Shiz Perfumes.";
    case "cancelled":
      return "Unfortunately your order has been cancelled. If you have any questions or concerns, please contact us directly.";
    default:
      return "Your order status has been updated.";
  }
};

// Format items array into a readable string for the email
const formatItems = (items: any[]): string => {
  if (!items || items.length === 0) return "No items found.";
  return items
    .map((item) => `• ${item.name} x${item.quantity || 1} — KES ${(item.price * (item.quantity || 1)).toLocaleString()}`)
    .join("\n");
};

// Send order confirmation email when customer places an order
export const sendOrderConfirmationEmail = async (order: any): Promise<void> => {
  try {
    const commitmentFee = Math.ceil(order.total * 0.5);  // 50% rounded up
    const remainingBalance = order.total - commitmentFee;

    const templateParams = {
      customer_name: `${order.customer?.firstName} ${order.customer?.lastName}`,
      customer_email: order.customer?.email,
      order_id: order.id?.slice(0, 8).toUpperCase(),
      order_date: new Date().toLocaleDateString("en-KE", {
        day: "numeric", month: "long", year: "numeric",
      }),
      order_items: formatItems(order.items),
      order_total: order.total?.toLocaleString(),
      commitment_fee: commitmentFee.toLocaleString(),      // 👈 new
      remaining_balance: remainingBalance.toLocaleString(), // 👈 new
      delivery_address: order.customer?.address,
      delivery_city: order.customer?.city,
      delivery_country: order.customer?.country,
    };

    await emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("✅ Order confirmation email sent");
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};

// Send status update email when seller updates order status
export const sendStatusUpdateEmail = async (order: any, newStatus: string): Promise<void> => {
  try {
    const templateParams = {
      customer_name: `${order.customer?.firstName} ${order.customer?.lastName}`,
      customer_email: order.customer?.email,
      order_id: order.id?.slice(0, 8).toUpperCase(),
      order_status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
      status_message: getStatusMessage(newStatus),
      order_items: formatItems(order.items),
      order_total: order.total?.toLocaleString(),
    };

    await emailjs.send(SERVICE_ID, STATUS_TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("✅ Status update email sent");
  } catch (error) {
    console.error("❌ Failed to send status update email:", error);
  }
};
