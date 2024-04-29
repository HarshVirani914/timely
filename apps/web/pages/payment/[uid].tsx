import PaymentPage from "@timely/features/ee/payments/components/PaymentPage";
import { getServerSideProps } from "@timely/features/ee/payments/pages/payment";
import type { inferSSRProps } from "@timely/types/inferSSRProps";

import PageWrapper from "@components/PageWrapper";

export default function Payment(props: inferSSRProps<typeof getServerSideProps>) {
  return <PaymentPage {...props} />;
}
Payment.PageWrapper = PageWrapper;
export { getServerSideProps };
