import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  name?: string;
  verificationLink?: string;
}

export const VerificationEmail = ({
  name,

  verificationLink,
}: VerificationEmailProps) => {
  const previewText = `Hello ${name}, Verify your email.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px] text-center">
            <Section className="mt-[32px]">
              <Img
                src={`/static/fastrack-green.png`}
                width="150"
                height="100%"
                alt="Fastrack"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 mb-[30px] p-0 text-center text-[24px] font-normal text-black">
              Email Verification
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thanks for joining Fastrack. To complete your registration, please
              verify your email address.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verificationLink}
              >
                Verifiy Your Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={verificationLink}
                className="text-blue-600 no-underline"
              >
                {verificationLink}
              </Link>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              THis link will expire in 10 minutes.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This verification email was intended for{" "}
              <span className="text-black">{name}</span>. If you were not
              expecting this verification, you can ignore this email. If you are
              concerned about your accounts safety, please get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
