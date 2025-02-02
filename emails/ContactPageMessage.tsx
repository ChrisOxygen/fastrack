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

interface ContactPageMessageProps {
  name?: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactPageMessage = ({
  name,
  email,
  subject,
  message,
}: ContactPageMessageProps) => {
  const previewText = `Hello ${name}, Verify your email.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`/static/fastrack-green.png`}
                width="150"
                height="100%"
                alt="Fastrack"
                className="my-0"
              />
            </Section>
            <Heading className="mx-0 mb-[30px] p-0 text-[24px] font-normal text-black">
              New Contact Message
            </Heading>
            <Text className="text-left text-[14px] leading-[24px] text-black">
              <span className="font-bold">Name: </span>
              <span className="">{name}</span>
            </Text>
            <hr />
            <Text className="text-left text-[14px] leading-[24px] text-black">
              <span className="font-bold">Subject: </span>
              <span className="">{subject}</span>
            </Text>
            <hr />
            <Text className="text-left text-[14px] leading-[24px] text-black">
              <span className="font-bold">Email: </span>
              <span className="">{email}</span>
            </Text>
            <hr />

            <Text className="text-left text-[14px] leading-[24px] text-black">
              <span className="font-bold">Message: </span> <br />
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactPageMessage;
