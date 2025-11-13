import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I search for properties?",
      answer: "You can search for properties using our search bar on the homepage or listings page. Filter by property type (land, rental, retail), price range, size, location, and more. You can also view all properties on an interactive map."
    },
    {
      question: "Are all properties verified?",
      answer: "Yes, we verify all property listings for authenticity and ensure that property details are accurate. However, we recommend conducting your own due diligence and legal verification before making any purchase or rental decisions."
    },
    {
      question: "How can I contact a property owner?",
      answer: "Each property listing includes contact information for the property agent or owner. You can call, email, or send a message directly through the contact form on the property detail page."
    },
    {
      question: "Can I save properties to view later?",
      answer: "Yes! Click the heart icon on any property card to add it to your favorites. You can access all your saved properties from the Favorites page in the navigation menu."
    },
    {
      question: "What types of properties do you list?",
      answer: "We list three main categories: Land Plots (agricultural and residential land), Rental Spaces (homes and apartments), and Retail Spaces (commercial properties for businesses and shops)."
    },
    {
      question: "How often are new properties added?",
      answer: "New properties are added regularly as they become available. Properties listed within the last 7 days are marked with a 'New' badge. You can sort listings by date to see the newest properties first."
    },
    {
      question: "What areas do you cover?",
      answer: "We primarily focus on Cheyyar and surrounding areas in Tamil Nadu. All our listings are within the Cheyyar region to provide local expertise and better service."
    },
    {
      question: "How do I know if a property is still available?",
      answer: "Each property displays its current status: Available, Pending, or Sold. We update these statuses regularly. You can also filter your search to show only available properties."
    },
    {
      question: "Can I schedule a property viewing?",
      answer: "Yes! Contact the property agent through the contact information provided on the property detail page to schedule a viewing at your convenience."
    },
    {
      question: "What should I bring to a property viewing?",
      answer: "We recommend bringing a valid ID, a notebook for taking notes, and a camera if you want to take photos. It's also helpful to have a list of questions you want to ask about the property."
    },
    {
      question: "Are there any fees for using this service?",
      answer: "Browsing and searching for properties is completely free. Commission fees may apply when a transaction is completed, which will be discussed with you upfront."
    },
    {
      question: "How do I list my property on your platform?",
      answer: "To list your property, please contact us through our Contact page. Our team will guide you through the listing process and discuss the details and requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <AccordionItem value={`item-${index}`} className="border-0">
                <AccordionTrigger className="px-6 pt-6 pb-4 hover:no-underline">
                  <span className="text-left font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>

        <Card className="mt-12 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
