import React from "react";
import { Card, CardBody, Input, Textarea, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export const Contact: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const templateParams = {
        from_name: name,
        message: message,
        from_email: email,
      };

      await emailjs.send(
        "service_4afezz9",
        "template_psaivfh",
        templateParams,
        "IvmaDC9Xs_5GhASnP"
      );

      setSubmitStatus({
        type: "success",
        message:
          "Message sent! Thank you for your message. I'll get back to you soon.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "lucide:mail",
      label: "Email",
      value: "leonardo.faustino.sec@gmail.com",
      link: "mailto:leonardo.faustino.sec@gmail.com",
    },
    {
      icon: "lucide:phone",
      label: "Phone",
      value: "+55 (64) 9.8110-7095",
      link: "tel:+5564981107095",
    },
    {
      icon: "lucide:map-pin",
      label: "Location",
      value: "Goias, Brasil",
      link: null,
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: "lucide:github", url: "https://github.com/Tkl02" },
    {
      name: "LinkedIn",
      icon: "lucide:linkedin",
      url: "https://linkedin.com/in/leonardo-faustino",
    },
    {
      name: "Twitter",
      icon: "lucide:twitter",
      url: "https://twitter.com/LeoDias208666",
    },
    {
      name: "Instagram",
      icon: "lucide:instagram",
      url: "https://instagram.com/leonardo.faustin0/",
    },
  ];

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="section-title">Contact Me</h1>
        <p className="max-w-3xl mb-12 text-lg text-default-600">
          Have a question or want to work together? Feel free to reach out using
          the form below or through any of my social media channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardBody className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onValueChange={setName}
                  variant="bordered"
                  isRequired
                  startContent={
                    <Icon icon="lucide:user" className="text-default-400" />
                  }
                />
                <Input
                  label="Email"
                  placeholder="your.email@example.com"
                  value={email}
                  onValueChange={setEmail}
                  variant="bordered"
                  type="email"
                  isRequired
                  startContent={
                    <Icon icon="lucide:mail" className="text-default-400" />
                  }
                />
                <Textarea
                  label="Message"
                  placeholder="How can I help you?"
                  value={message}
                  onValueChange={setMessage}
                  variant="bordered"
                  minRows={5}
                  isRequired
                />

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-success-50 text-success border border-success-200"
                        : "bg-danger-50 text-danger border border-danger-200"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Icon
                        icon={
                          submitStatus.type === "success"
                            ? "lucide:check-circle"
                            : "lucide:alert-circle"
                        }
                        width={20}
                        height={20}
                        className="flex-shrink-0 mt-0.5"
                      />
                      <p className="text-sm">{submitStatus.message}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <Icon icon="lucide:send" />}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardBody className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <Icon icon={item.icon} width={20} height={20} />
                    </div>
                    <div>
                      <h3 className="text-sm text-default-600">{item.label}</h3>
                      {item.link ? (
                        <Link
                          href={item.link}
                          className="font-medium text-foreground"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="font-medium text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">Connect With Me</h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    isExternal
                    className="flex items-center gap-3 p-3 transition-colors rounded-medium bg-content2 hover:bg-content3"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-content1">
                      <Icon icon={social.icon} width={18} height={18} />
                    </div>
                    <span className="font-medium">{social.name}</span>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h2 className="mb-4 text-2xl font-semibold">Office Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-default-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Saturday</span>
                  <span className="font-medium">By appointment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-default-500">
                All times are in Pacific Time Zone (UTC-8)
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
